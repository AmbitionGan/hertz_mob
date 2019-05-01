<!-- 地标搜索 -->
<template>
    <div class="landMarkSearch">
        <div class="input">
            <input type="text" placeholder="输入城市/机场/火车站/商圈" autocomplete="off" v-model="searchValue" ref="searchInput">
        </div>
        <div class="searchList" v-show="isShowSearchList">
            <ul>
                <li v-for="(item, index) in searchData" :key="index" @click="chooseLandMark(index)">
                    <i><img :src="conversionIcon(item.placetype)" alt=""></i>
                    <h4>{{item.placename + ', ' + item.cityname + ', ' + item.countryname}}</h4>
                    <p>{{item.placeenname}}</p>
                </li>
            </ul>
            <p v-show="notFindLandMark">未找到对应的地标，请换个关键词试试。</p>
        </div>
    </div>
</template>

<script>
import indexApi from '../../api/index'

export default {
    name: 'landMarkSearch',
    props: ['showValue'],
    data () {
        return {
            // 搜索数据
            searchData: [],

            // 是否显示搜索列表
            isShowSearchList: false,

            // 输入框值
            searchValue: '',

            // 未找到地标
            notFindLandMark: false,

            // 是否第一次进入并且赋值给输入框的值
            isFirstEnter: false,

            surplusTime: 0
        }
    },
    mounted () {
    },
    methods: {
        /**
         * 初始化
         */
        init () {
            if (this.$store.state.isTakeCar) {
                // 选择取车城市的情况下
                if (this.$store.state.takeCarLand != '') {
                    this.isFirstEnter = true
                    this.searchValue = this.$store.state.takeCarLand
                }
            }else{
                // 选择换车城市的情况下 
                if (this.$store.state.retCarLand != '') {
                    this.isFirstEnter = true
                    this.searchValue = this.$store.state.retCarLand
                }
            }
        },
        /**
         * 根据地标类型转换icon
         * @param {String} placetype 地标类型
         */
        conversionIcon (placetype) {
            let iconArr = [require('@/assets/images/icon_land.png'), require('@/assets/images/icon_LAP.png'), require('@/assets/images/icon_LDT.png')]
            let iconSrc
            switch (placetype) {
                case 'LAP':
                    iconSrc = iconArr[1]
                    break;
                case 'LDT':
                    iconSrc = iconArr[2]
                    break;
                default:
                    iconSrc = iconArr[0]
                    break;
            }
            return iconSrc
        },

        /**
         * 获取搜索数据
         */
        getSearchLandMark () {
            this.$loadingToast.show()
            indexApi.getLandMark({type: 5, placekey: this.searchValue})
			.then(res => {
                this.$loadingToast.close()
                this.searchData = []
                if (res.Result.length > 0) {
                    this.searchData = res.Result
                }else{
                    this.notFindLandMark = true
                }
			})
			.catch(err => {
                this.$loadingToast.close()
				alert('获取地标失败')
			})
        },

        /**
         * 选择搜索的地标
         * @param {Number} index 选中的下标
         */
        chooseLandMark (index) {
            this.$store.state.isSearching = false
            let curData = this.searchData[index];
            if (this.$store.state.isTakeCar) {
                // 选择取车城市的情况下
                this.$store.state.takeCarLand = curData.placename
                this.$store.state.takeCarBrand = curData.brands
                this.$store.state.takeCarGuid = curData.guid
                this.$store.state.takeCarCountry = curData.countrycode
                this.$store.state.takeCarCoor = curData.latitude + ',' + curData.longitude
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
                this.$store.state.retCarLand = curData.placename
                this.$store.state.retCarBrand = curData.brands
                this.$store.state.retCarGuid = curData.guid
                this.$store.state.retCarCountry = curData.countrycode
                this.$store.state.retCarCoor = curData.latitude + ',' + curData.longitude

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
            this.searchData = []
            this.$store.state.isShowChoiceCity = false
            this.$store.state.isShowChoiceLand = false
            // if (this.$store.state.isGoHome) {
            //     this.$router.push({path: '/'})
            // }else{
            //     if (this.$route.path === '/choiceCity') {
            //         this.$router.go(-1)
            //     }else{
            //         this.$router.go(-2)
            //     }
            //     // this.$router.push({
            //     //     path: this.$store.state.redirectPath,
            //     //     query: this.$store.state.redirectQuery
            //     // })
            // }
        },
    },
    watch: {
        /**
         * 监听输入框的输入
         */
        searchValue () {
            if (this.isFirstEnter) {
                this.isFirstEnter = false
                return
            }   
            this.searchValue = pubMethod.filterCode(this.searchValue)
            let val = this.searchValue
            this.notFindLandMark = false
            setTimeout(() => {
                if (this.searchValue === val && this.searchValue != "") {
                    this.$store.state.isSearching = true
                    this.isShowSearchList = true
                    this.getSearchLandMark()
                    this.$refs.searchInput.blur()
                }else if (this.searchValue == "") {
                    this.isShowSearchList = false
                    this.searchData = []
                    this.$store.state.isSearching = false
                }
            }, 1000)
        } 
    }
}

</script>

<style lang='less' scoped>
.landMarkSearch {
    background: #fff;
    padding-bottom: .47rem;
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
    .searchList {
        width: 100%;
        padding: 0 .4rem;
        margin: .1rem auto 0;
        color: #3B444F;
        font-size: .24rem;
        height: calc(100vh - 1.52rem);
        overflow-y: auto;
        li {
            position: relative;
            padding: .29rem 0 .29rem .37rem;
            border-bottom: 1px solid #CECECE;
            &:last-child {
                border-bottom: none;
            }
            h4 {
                margin-bottom: .1rem;
            }
            i {
                display: block;
                position: absolute;
                left: 0;
                top: .29rem;
                width: .24rem;
                text-align: center;
                img {
                    max-width: 100%;
                }
            }
        }
        > p {
            padding: .29rem 0;
        }
    }
}
</style>