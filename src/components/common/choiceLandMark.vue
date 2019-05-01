<!-- 选择地标 -->
<template>
    <div class="choiceLandMark">
    	<!-- 公共头部 -->
        <choice-city-com-head title="取还车地点" />
        <!-- 搜索 -->
        <!-- <div class="search">
            <div class="input">
                <input type="text" placeholder="输入城市/机场/火车站/商圈" autocomplete="off">
            </div>
        </div> -->
        <landMarkSearch ref="landMarkSearch"/>
        <!-- 列表区域 -->
		<div class="listContainer clear" v-show="!$store.state.isSearching" ref="listContainer">
			<div class="landMarkClassify left">
				<ul>
					<li v-for="(item, index) in landMarkClassify" :key="index" :class="{'active': classifyActiveIndex == index}" @click="classfiyPosition(index)">
						{{item.title}}
					</li>
				</ul>
			</div>
			<div class="lankMarkList left" :class="{'loading': isLoading}" ref="lankMarkList">
				<dl v-for="(item, index) in landMarkClassify" :key="index">
					<dt><span>{{item.title}}</span></dt>
					<dd v-for="(ele, i) in item.list" :key="i"  @click="chooseLand(index, i)">
						<h4>{{ele.placename}}</h4>
						<p>{{ele.placeenname}}</p>
					</dd>
				</dl>
			</div>
		</div>
    </div>
</template>

<script>
import choiceCityComHead from './choiceCityComHead'
import landMarkSearch from './landMarkSearch'
import indexApi from '@/api/index'

export default {
	name: 'choiceLandMark',
	components: {
        choiceCityComHead,
        landMarkSearch
	},
	data () {
		return {
			// 所有地标
			allLandMarkData: [],

			// 所有地标分类
			landMarkClassify: [
                {
                    title: ' ',
                    list: [{placename: ' ', placeenname: ''}, {placename: ' ', placeenname: ''}]
                },
                {
                    title: ' ',
                    list: [{placename: ' ', placeenname: ''}, {placename: ' ', placeenname: ''}, {placename: ' ', placeenname: ''}, {placename: ' ', placeenname: ''}, {placename: ' ', placeenname: ''}]
                }
            ],

            // 选中的分类
            classifyActiveIndex: 0,

            // 是否加载中
            isLoading: true
		}
	},
	mounted () {
    },
	methods: {
        /**
         * 初始化地标选择
         */
        init () {
            this.getLandMark()
        
            // 计算列表高度
            var listContainer = document.querySelector('.listContainer');
            listContainer.style.height = window.innerHeight - document.querySelector('.landMarkSearch').clientHeight - document.querySelector('.choiceCityComHead').clientHeight + 'px'

            // 初始化搜索
            this.initSearch()
        },

		/**
		 * 获取地标
		 */
		getLandMark () {
            this.$loadingToast.show()
            this.isLoading = true
			indexApi.getLandMark({type: 5, cityid: this.$store.state.choiceCityId})
			.then(res => {
                this.$loadingToast.close()
                this.isLoading = false
				this.allLandMarkData = res.Result
				this.dealLandMarkClassify()
			})
			.catch(err => {
                this.$loadingToast.close()
                this.isLoading = false
				alert('获取地标失败')
			})
		},

		/**
		 * 处理数据分类逻辑
		 */
		dealLandMarkClassify () {
            this.landMarkClassify = [];
			let lap = {
				title: '机场',
				list: []
			}
			let ldt = {
				title: '火车站',
				list: []
			}
			let landMark = {
				title: '地标',
				list: []
			}
			this.allLandMarkData.forEach(ele => {
				switch (ele.placetype) {
					case 'LAP':
						lap.list.push(ele)
						break;
					case 'LDT':
						ldt.list.push(ele)
						break;
					default:
						landMark.list.push(ele)
						break;
				}
			})
			if (lap.list.length > 0) {
				this.landMarkClassify.push(lap)
			}

			if (ldt.list.length > 0) {
				this.landMarkClassify.push(ldt)
			}

			if (landMark.list.length > 0) {
				this.landMarkClassify.push(landMark)
            }
            this.$nextTick(() => {
                this.getListOffsetTop()
            })
		},

		/**
         * 选择地标
         * @param {Number} index 地标数据数组大分类下标
         * @param {Number} i 地标数据数组大分类下小分类下标
         */
        chooseLand (index, i) {
            let tmpCityData = this.landMarkClassify[index].list[i]
            if (this.$store.state.isTakeCar) {
                // 选择取车城市的情况下
                this.$store.state.takeCarLand = tmpCityData.placename
                this.$store.state.takeCarBrand = tmpCityData.brands
                this.$store.state.takeCarGuid = tmpCityData.guid
                this.$store.state.takeCarCountry = tmpCityData.countrycode
                this.$store.state.takeCarCoor = tmpCityData.latitude + ',' + tmpCityData.longitude
                // 如果还车地标等于空
				if (this.$store.state.retCarLand === '') {
                    // 还车地标 = 取车地标
                    this.$store.state.retCarLand = this.$store.state.takeCarLand
                    this.$store.state.retCarBrand = this.$store.state.takeCarBrand
                    this.$store.state.retCarGuid = this.$store.state.takeCarGuid
                    this.$store.state.retCarCountry = this.$store.state.takeCarCountry
                    this.$store.state.retCarCoor = this.$store.state.takeCarCoor
                }
            }else{
                // 选择换车城市的情况下
                this.$store.state.retCarLand = tmpCityData.placename
                this.$store.state.retCarBrand = tmpCityData.brands
                this.$store.state.retCarGuid = tmpCityData.guid
                this.$store.state.retCarCountry = tmpCityData.countrycode
                this.$store.state.retCarCoor = tmpCityData.latitude + ',' + tmpCityData.longitude

                // 如果取车地标等于空
				if (this.$store.state.takeCarLand === '') {
                    // 取车地标 = 还车地标
                    this.$store.state.takeCarLand = this.$store.state.retCarLand
                    this.$store.state.takeCarBrand = this.$store.state.retCarBrand
                    this.$store.state.takeCarGuid = this.$store.state.retCarGuid
                    this.$store.state.takeCarCountry = this.$store.state.retCarCountry
                    this.$store.state.takeCarCoor = this.$store.state.retCarCoor
                }
            }
            // if (this.$store.state.isGoHome) {
            //     this.$router.push({path: '/'})
            // }else{
            //     this.$router.go(-2)
            //     // this.$router.push({
            //     //     path: this.$store.state.redirectPath,
            //     //     query: this.$store.state.redirectQuery
            //     // })
            // }
            this.$store.state.isShowChoiceLand = false
		},
        
        /**
         * 点击分类进行定位
         */
        classfiyPosition (index) {
            this.classifyActiveIndex = index
            let lankMarkList = this.$refs.lankMarkList
            let childNodes = lankMarkList.childNodes
            lankMarkList.scrollTop = childNodes[index].offsetTop - this.$refs.listContainer.offsetTop
        },

        /**
         * 获取列表内每个分类的区域高度
         */
        getListOffsetTop () {
            let lankMarkList = this.$refs.lankMarkList
            let childNodes = lankMarkList.childNodes
            let arr = []
            childNodes.forEach((ele, index) => {
                arr.push(ele.offsetTop - this.$refs.listContainer.offsetTop)
            })
            lankMarkList.onscroll = (e) => {
                for (let i = 0; i < arr.length; i++) {
                    if (i + 1 >= arr.length) {
                        if (e.target.scrollTop >= arr[i]) {
                            this.classifyActiveIndex = i
                        }
                    }else if (e.target.scrollTop < arr[1]) {
                        this.classifyActiveIndex = 0
                    }else{
                        if (e.target.scrollTop > arr[i] && e.target.scrollTop < arr[i + 1]) {
                            this.classifyActiveIndex = i
                        }
                    }
                }
            }
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
.choiceLandMark {
    height: 100vh;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
}
/* 搜索 */
.search {
    margin-bottom: .47rem;
    input {
        font-size: .24rem;
        line-height: .56rem;
        width: 100%;
    }
    .input {
        width: 6.7rem;
        padding-right: .4rem;
        margin: 0 auto;
        border-bottom: 1px solid #CFCFCF;
        position: relative;
        &::after {
            content: '';
            width: .38rem;
            height: .38rem;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -.19rem;
            background: url(../../assets/images/icon_search.png) no-repeat center center;
            background-size: contain;
        }
    }
}
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
    /* 左边分类 */
    .landMarkClassify {
        position: absolute;
        z-index: 2;
        width: 1.76rem;
        ul {
            background: #FFCD00;
            padding-top: 0.06rem;
            li {
                display: block;
                min-height: .6rem;
                padding: 0.17rem 0 0.17rem 0.41rem;
                background: #FFCD00;
                color: #3B444F;
                font-size: 0.24rem;
                &.active {
                    background: #fff !important;
                    border: none;
                }
            }
        }
    } 
    /* 地标列表 */
    .lankMarkList {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: .06rem .4rem 0 2.2rem;
        z-index: 1;
        dl {
            margin-bottom: .3rem;
            dt {
                padding: .17rem 0;
                margin-bottom: .15rem;
                min-height: 0.55rem;
                span {
                    display: inline-block;
                    min-width: .48rem;
                    min-height: .24rem;
                    
                }
            }
            dd {
                display: block;
                min-height: .86rem;
                margin-bottom: .1rem;
                padding: .15rem .27rem;
                background: #F3F3F4;
                h4 {
                    margin-bottom: 2px;
                }
            }
        }
        &.loading{
            span {
                background: #3B444F;
            }
        }
    }
}
</style>