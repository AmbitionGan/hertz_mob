<!-- 选择城市 -->
<template>
    <div class="choiceCity">
        <!-- 公共头部 -->
        <choice-city-com-head title="取还车城市" />
        <!-- 搜索 -->
        <!-- <div class="search">
            <div class="input">
                <input type="text" placeholder="输入城市/机场/火车站/商圈" autocomplete="off">
            </div>
        </div> -->
        <landMarkSearch ref="landMarkSearch"/>
        <!-- 列表区域 -->
        <div class="listContainer clear" v-show="!$store.state.isSearching">
            <div class="hot left">
                <span>热门</span>
                <ul>
                    <li v-for="(item, index) in hotCountry" :key="item.countryid" @click="choiceHotClassity(index)" :class="{'active': index == activeIndex}">
                        {{item.countryname}}
                    </li>
                </ul>
            </div>
            <div class="list left">
                <span @click="$store.state.isShowMap = true">地图上搜索地址</span>
                <div class="history" v-if="historyArr.length > 0">
                    <span>搜索历史</span>
                    <ol class="clear">
                        <li v-for="(item, index) in historyArr" :key="index">
                            <div class="item ellipsis">
                                {{item}}
                            </div>
                        </li>
                    </ol>
                </div>
                <div class="choiceCityList" ref="choiceCityList">
                    <dl class="clear" v-for="(item, index) in hotCountryAllCity" :key="index">
                        <dt>{{item.initials}}</dt>
                        <dd v-for="(ele, i) in item.itemlist" :key="ele.cityid" @click="chooseCity(index, i)">
                            <div class="item ellipsis">
                                {{ele.cityname}}
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="alphabetSearch left">
                <span>热门</span>
                <ul ref="alphabetMoveArea">
                    <li v-for="(item, index) in englishAlphabet" :key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 谷歌地图 -->
        <googleMap v-show="$store.state.isShowMap"/>
    </div>
</template>

<script>
import choiceCityComHead from './choiceCityComHead'
import landMarkSearch from './landMarkSearch'
import googleMap from './googleMap'
import indexApi from '@/api/index'

export default {
    name: 'choiceCity',
    components: {
        choiceCityComHead,
        landMarkSearch,
        googleMap
    },
    data () {
        return {
            // 热门国家 和 洲
            hotCountry: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],

            // 英文字母
            englishAlphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

            // 热门国家的所有城市
            hotCountryAllCity: [
                {
                    initials: "A",
                    itemlist: [{countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}]
                },
                {
                    initials: "B",
                    itemlist: [{countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}]
                },
                {
                    initials: "C",
                    itemlist: [{countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}]
                },
                {
                    initials: "D",
                    itemlist: [{countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}, {countryid: ' ', cityname: ' '}]
                },
            ],

            // 历史城市
            historyArr: [],

            // 选中的分类下标
            activeIndex: 0,

            // 是否加载完
            isLoaded: false,
        }
    },
    mounted () {

    },
    methods: {
        /**
         * 初始化选择城市
         */
        init () {
            // 获取地标
            this.$loadingToast.show()
            indexApi.getLandMark(null)
            .then(res => {
                this.hotCountry = res.Result
                this.choiceHotClassity(0)
            })
            .catch(err => {
                alert('地标请求错误！')
            })

            // 字母移动
            this.alphabetMove()

            // 计算列表高度
            setTimeout(() => {
                var listContainer = document.querySelector('.listContainer');
                listContainer.style.height = window.innerHeight - document.querySelector('.landMarkSearch').clientHeight - document.querySelector('.choiceCityComHead').clientHeight + 'px'
            }, 10)
            
            // 初始化搜索
            this.initSearch()
        },
        /**
         * 选择热门国家分类 请求所有城市
         */
        choiceHotClassity (index) {
            this.$loadingToast.show()
            this.activeIndex = index
            indexApi.getLandMark({type: 4, countryid: this.hotCountry[index].countryid, column: false})
            .then(res => {
                this.$loadingToast.close()
                this.hotCountryAllCity = res.Result
            })
            .catch(res => {
                this.$loadingToast.close()
                alert('请求所有城市错误！')
            })
        },

        /**
         * 选择城市
         * @param {Number} index 城市数据数组大分类下标
         * @param {Number} i 城市数据数组大分类下小分类下标
         */
        chooseCity (index, i) {
            let tmpCityData = this.hotCountryAllCity[index].itemlist[i]
            this.$store.state.choiceCityId = tmpCityData.cityid
            this.$emit('initChoiceLand', true)
            // this.$router.push({path: '/choiceLandMark', query:{'isTakeCar': !this.$route.query.isTakeCar ? 0 : 1, 'cityid': tmpCityData.cityid}})            
        },

        /**
         * 字母滑动
         */
        alphabetMove () {
            let childNodes = this.$refs.alphabetMoveArea.childNodes
            this.$refs.alphabetMoveArea.ontouchstart = (e) => {
                this.computedMoveAlphabet(e, childNodes[0])
            }
            this.$refs.alphabetMoveArea.ontouchmove = (e) => {
                this.computedMoveAlphabet(e, childNodes[0])
            }
        },

        /**
         * 计算手指在哪个字母上
         */
        computedMoveAlphabet (e, childNode) {
            e.preventDefault()
            var moveTouch = e.touches[0];
            var moveY = moveTouch.clientY;
            let alphabet = this.englishAlphabet[Math.floor((moveY - this.$refs.alphabetMoveArea.offsetTop) / childNode.offsetHeight)]
            this.listAreaMove(alphabet)
        },

        /**
         * 列表区域滑动
         */
        listAreaMove (alphabet) {
            let listNode = this.$refs.choiceCityList
            let listChildNodes = this.$refs.choiceCityList.childNodes
            this.hotCountryAllCity.forEach((ele, index) => {
                if (ele.initials == alphabet) {
                    listNode.scrollTop = listChildNodes[index].offsetTop - listChildNodes[0].offsetTop
                }
            })
        },

        /**
         * 初始化搜索
         */
        initSearch () {
            this.$refs.landMarkSearch.init()
        },
    }
}
</script>

<style lang='less' scoped>
.choiceCityComHead {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
}
.landMarkSearch {
    position: fixed;
    left: 0;
    top: 1.04rem;
    width: 100%;
    z-index: 2;
}
.choiceCity {
    height: 100vh;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
}
/* 列表区域 */
.listContainer {
    width: 100%;
    height: calc(100vh - 2.17rem);
    overflow: hidden;
    padding-top: 2.17rem;
    box-sizing: content-box;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    .hot {
        width: 1.76rem;
        height: 100%;
        overflow-y: auto;
        position: absolute;
        left: 0;
        top: 2.17rem;
        z-index: 2;
        > span {
            padding-left: .41rem;
            display: block;
            color: #3B444F;
            font-size: .24rem;
            margin-bottom: .27rem;
        }
        ul {
            background: #FFCD00;
            padding-top: .06rem;
        }
        li {
            display: block;
            padding: .17rem 0 .17rem .41rem;
            min-height: .6rem;
            background: #FFCD00;
            color: #3B444F;
            font-size: .24rem;
            &.active {
                background: #fff!important;
                color: #3B444F!important;
                border: none;
            }
            &:nth-last-of-type(1), &:nth-last-of-type(2), &:nth-last-of-type(3), &:nth-last-of-type(4), &:nth-last-of-type(5) {
                background: #57585A;
                color: #fff;
            }
            &:nth-last-of-type(5) {
                border-top: 1px solid #fff;
            }
        }
    }
    .list {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        > span {
            color: #3B444F;
            display: inline-block;
            margin-bottom: .48rem;
            padding-right: .32rem;
            margin-left: 2.2rem;
            position: relative;
            &::after {
                content: '';
                width: .18rem;
                height: .24rem;
                background: url(../../assets/images/mapSearch_icon.png) no-repeat center center;
                background-size: contain;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        .history {
            margin-bottom: .3rem;
            > span {
                
                display: block;
                color: #BCBCBB;
                margin-bottom: .22rem;
            }
            ol {
                margin: 0 -.045rem;
                 li {
                    float: left;
                    width: 50%;
                    margin-bottom: .1rem;
                    .item {
                        margin: 0 .045rem;
                        background: #F3F3F4;
                        height: .5rem;
                        line-height: .5rem;
                        text-align: center;
                    }
                }
            }
        }
        .choiceCityList {
            height: calc(100% - .74rem);
            padding: 0 .045rem;
            padding-left: 2.2rem;
            padding-right: .95rem;
            overflow-y: auto;
            dl {
                margin: 0 -.045rem .3rem;
                dt {
                    display: block;
                    margin-bottom: .26rem;
                    padding: 0 .045rem;
                }
                dd {
                    float: left;
                    width: 50%;
                    margin-bottom: .1rem;
                    .item {
                        margin: 0 .045rem;
                        background: #F3F3F4;
                        height: .5rem;
                        line-height: .5rem;
                        text-align: center;
                    }
                }
            }
        }
    }
    .alphabetSearch {
        margin-left: .25rem;
        padding-left: .1rem;
        border-left: 1px solid #CFCFCF;
        position: absolute;
        top: 2.17rem;
        right: .15rem;
        z-index: 2;
        > span {
            display: block;
            margin-bottom: .38rem;
        }
        li {
            width: .48rem;
            padding: .05rem 0;
            color: #3B444F;
            text-align: center;
        }
    }
}
</style>