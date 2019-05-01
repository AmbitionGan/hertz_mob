<!-- 谷歌地图 -->
<template>
    <div class="googleMap">
        <div class="search" v-show="!$store.state.isClearMap">
            <span class="closeView left" @click="$store.state.isShowMap = false"></span>
            <div class="input left">
                <input type="text" placeholder="输入酒店/地址/坐标" class="left" v-model="searchValue">
                <div v-if="searchData.length > 0">
                    <ul v-show="isShowSearchList">
                        <li v-for="(item, index) in searchData" :key="index" @click="getNearbyStore(index)">
                            <p>{{item.name + ' - ' + item.address}}</p>
                        </li>
                    </ul>
                </div>
                <div v-else class="noSearch" v-show="isShowSearchList">
                    未找到对应的城市，请换个关键词试试。
                </div>
            </div>
            <i class="searchBtn left" @click="clearValue()" v-show="searchValue != ''"></i>
        </div>
        <div id="mapContainer" ref="mapContainer">

        </div>
        <div class="storeLayer" :class="{'active': isShowStoreLayer}" ref="storeLayer" v-show="!$store.state.isClearMap">
            <button class="closeBtn" @click="closeStoreLayer"></button>
            <div class="logo">
                <img :src="storeImg" alt="">
            </div>
            <h4>{{name}}</h4>
            <p><span>门店地址：</span><span>{{address}}</span></p>
            <p>
                <span>营业时间：</span>
                <ul class="clear">
                    <li v-for="(item, index) in businesshours" :key="index">{{item}}</li>
                </ul>
            </p>
            <p><span>联系电话：</span><span>{{tel}}</span></p>
            <button class="goListBtn" @click="goListBtn()">查看该门店车型报价</button>
        </div>
    </div>
</template>

<script>
import indexApi from '@/api/'

export default {
    name: 'googleMap',
    data () {
        return {
            // 地图实例
            map: Object,

            // 自定义添加标记的构造方法实例化后的变量
            popup: Object,

            // 自定义添加标记的构造方法
            Popup: Object,

            // 地图中心店 lat 坐标
            centerLat: 39.9253343,

            // 地图中心店 lng 坐标
            centerLng: 116.4095068,

            // 输入框的值
            searchValue: '',

            // 搜索数据
            searchData: [],

            // 地图点数据
            // mapData: [],

            // 是否显示门店信息弹窗
            isShowStoreLayer: false,

            // 地图上标记的点
            popups: [],
            
            // 门店品牌
            storeImg: '',

            // 门店名称
            name: '',

            // 门店地址
            address: '',

            // 营业时间
            businesshours: [],

            // 门店电话
            tel: '',

            // 品牌
            brand: '',

            // 门店code
            code: '',

            // 门店guid
            guid: '',

            // 门店 国家
            country: '',

            // 是否第一次进入并且赋值
            isFirstEnter: false,

            // 是否显示搜索列表
            isShowSearchList: false
        }
    },
    mounted () {
        this.getUserCurPosition()
        this.initMap()
    },
    methods: {
        /**
         * 初始化地图
         */
        initMap () {
            this.definePopupClass()
            this.map = new google.maps.Map(document.getElementById('mapContainer'), {
                center: { lat: this.centerLat, lng: this.centerLng },
                zoom: 11,
                mapTypeControl: false,
                gestureHandling: 'greedy'
            })
            let timer = setInterval(() => {
                if (!!document.querySelector("#mapContainer a")) {
                    document.querySelector("#mapContainer a").style.display = 'none'
                    clearInterval(timer)
                }
            }, 1000)
            if (this.$store.state.mapData.length > 0) {
                this.triggerAdd()
            }
            
        },

        /**
         * 触发添加点坐标
         */
        triggerAdd () {
            this.clearPoints()
            this.$store.state.mapData.forEach((ele, i) => {
                this.addPopup(ele, i)
            })
        },

        /**
         * 添加点
         */
        addPopup (popupInfo, i) {
            let z = document.createElement('div');
            if (!i) {
                z.className = 'popup-bubble-content city-point';
                z.innerHTML = '<div data-index="'+ i +'" class="popup-point" style="background:url('+ require('../../assets/images/city_point.png') +') no-repeat center center;"></div>';
                this.map.setCenter({lat: popupInfo.lat, lng: popupInfo.lng})
            }else{
                z.className = 'popup-bubble-content store-point';
                z.innerHTML = '<div data-index="'+ i +'" class="popup-point" style="background:url('+ require('../../assets/images/store_point.png') +') no-repeat center center;"></div><div class="content">' + pubMethod.brandsChangeAlphabet(popupInfo.brand).content + '</div>'
            }
            this.popup = new this.Popup(new google.maps.LatLng(popupInfo.lat, popupInfo.lng), z)
            if (!this.$store.state.isClearMap) {
                this.popupClick(this.popup, i)
            }
            this.popups.push(this.popup)
            this.popup.setMap(this.map)
        },

        /**
         * 创建自定义添加标记的方法
         */
        definePopupClass () {
            this.Popup = function (position, content) {
                this.position = position;
                // content.className('popup-bubble-content');

                var pixelOffset = document.createElement('div');
                pixelOffset.className = 'popup-bubble-anchor';
                pixelOffset.appendChild(content);

                this.anchor = document.createElement('div');
                this.anchor.className = 'popup-tip-anchor';
                this.anchor.appendChild(pixelOffset);

                this.stopEventPropagation();
            };

            this.Popup.prototype = Object.create(google.maps.OverlayView.prototype);

            this.Popup.prototype.onAdd = function () {
                this.getPanes().floatPane.appendChild(this.anchor);
            };

            this.Popup.prototype.onRemove = function () {
                if (this.anchor.parentElement) {
                    this.anchor.parentElement.removeChild(this.anchor);
                }
            };

            this.Popup.prototype.draw = function () {
                
                var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
                var display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';
                if (display === 'block') {
                    this.anchor.style.left = divPosition.x + 'px';
                    this.anchor.style.top = divPosition.y + 'px';
                }
                if (this.anchor.style.display !== display) {
                    this.anchor.style.display = display;
                }
            };

            this.Popup.prototype.stopEventPropagation = function () {
                var anchor = this.anchor;
                anchor.style.cursor = 'auto';
                ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
                    'pointerdown']
                    .forEach(function (event) {
                        anchor.addEventListener(event, function (e) {
                            e.stopPropagation();
                        });
                    });
            };
        },

        /**
         * 清除标记
         */
        clearPoints () {
            if (this.popups.length > 0) {
                this.popups.forEach(ele => {
                    ele.onRemove();
                })
                this.popups = []
            }
        },

        /**
         * 点击标记
         */
        popupClick (ele, i) {
            ele.anchor.addEventListener('click',(e) => {
                if (i != 0) {
                    this.$refs.storeLayer.style.height = 'auto'
                    let chooseData = this.$store.state.mapData[i]
                    this.storeImg = pubMethod.brandsChangeAlphabet(chooseData.brand).src
                    this.name = chooseData.name
                    this.address = chooseData.address
                    this.tel = chooseData.tel
                    this.businesshours = chooseData.businesshours
                    this.isShowStoreLayer = true
                    this.brand = chooseData.brand
                    this.code = chooseData.code
                    this.guid = chooseData.guid
                    this.country = chooseData.country
                    this.$nextTick(()=>{
                        this.$refs.storeLayer.style.height = this.$refs.storeLayer.clientHeight + 'px'
                        this.$refs.mapContainer.style.height = document.body.clientHeight - this.$refs.storeLayer.clientHeight + 'px'
                        this.map.setCenter({lat: chooseData.lat, lng: chooseData.lng})
                    })
                }
                
            })
        },
        
        /**
         * 关闭门店信息弹窗
         */
        closeStoreLayer () {
            this.isShowStoreLayer = false
            this.$refs.mapContainer.style.height = '100%'
            this.map.setCenter({lat: this.$store.state.mapData[0].lat, lng: this.$store.state.mapData[0].lng})
        },

        /**
         * 获取搜索数据
         */
        getSearchData (val) {
            indexApi.getMapSearch({k: val})
            .then(res => {
                this.isShowSearchList = true
                this.searchData = res.Result
                this.$loadingToast.close()
            })
            .catch(err => {
                alert('搜索错误，请重试')
            })
        },

        /**
         * 点击搜索数据获取附近门店
         */
        getNearbyStore (index) {
            this.$store.state.mapData = []
            this.isShowSearchList = false
            let curData = this.searchData[index]
            this.$store.state.mapData.push(curData)
            this.triggerAdd()
            indexApi.getMapSearchStore({lat: curData.lat, lng: curData.lng})
            .then(res => {
                res.Result.forEach(ele => {
                    this.$store.state.mapData.push(ele)
                    this.triggerAdd()
                })
            })
            .catch(err => {
                alert('获取地标附近门店')
            })
        },

        /**
         * 获取当前用户坐标
         */
        getUserCurPosition () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    // 获取用户坐标成功 并 设置为中心点
                    var crd = pos.coords;
                    this.centerLat = crd.latitude;
                    this.centerLng = crd.longitude;
                }, err => {
                    // 获取用户坐标报错
                    console.log('ERROR(' + err.code + '): ' + err.message);
                },{
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                })
            }
        },

        /**
         * 设置取车地点 或 还车地点
         */
        goListBtn () {
            if (this.$route.query.isTakeCar == 1) {
                // 取车情况
                this.$store.state.takeCarLand = this.name
                this.$store.state.takeCarBrand = this.brand
                this.$store.state.pickuplocation = this.code
                this.$store.state.takeCarGuid = this.guid
                this.$store.state.takeCarCountry = this.country
                if (this.$store.state.retCarLand === '') {
                    this.$store.state.retCarLand = this.$store.state.takeCarLand
                    this.$store.state.retCarBrand = this.$store.state.takeCarBrand
                    this.$store.state.returnlocation = this.$store.state.pickuplocation
                    this.$store.state.retCarGuid = this.$store.state.takeCarGuid
                    this.$store.state.retCarCountry = this.$store.state.takeCarCountry
                }
            }else{
                // 还车情况
                this.$store.state.retCarLand = this.name
                this.$store.state.retCarBrand = this.brand
                this.$store.state.returnlocation = this.code
                this.$store.state.retCarGuid = this.guid
                this.$store.state.retCarCountry = this.country
                if (this.$store.state.takeCarLand === '') {
                    this.$store.state.takeCarLand = this.$store.state.retCarLand
                    this.$store.state.takeCarBrand = this.$store.state.retCarBrand
                    this.$store.state.pickuplocation = this.$store.state.returnlocation
                    this.$store.state.takeCarGuid = this.$store.state.retCarGuid
                    this.$store.state.takeCarCountry = this.$store.state.retCarCountry
                }
            }
            this.$store.state.isShowMap = false
            this.$router.push({
                path: '/'
            })
        },

        /**
         * 清除搜索
         */
        clearValue () {
            this.searchValue = ""
            this.clearPoints()
            this.map.setCenter({lat: this.centerLat, lng: this.centerLng})
            this.isShowStoreLayer = false
            this.$refs.mapContainer.style.height = '100%'
        }

    },
    watch: {
        searchValue () {
            this.searchValue = pubMethod.filterCode(this.searchValue)
            let val = this.searchValue
            if (this.searchValue == "") {
                this.$store.state.mapData = []
                this.clearPoints()
                this.map.setCenter({lat: this.centerLat, lng: this.centerLng})
                this.isShowStoreLayer = false
                this.$refs.mapContainer.style.height = '100%'
                this.isShowSearchList = false
            }
            setTimeout(() => {
                if (this.searchValue === val && this.searchValue != "") {
                    this.$loadingToast.show()
                    this.getSearchData(this.searchValue)
                    this.isShowStoreLayer = false
                    this.$refs.mapContainer.style.height = '100%'
                }
            }, 1000)
        }
    }
}
</script>

<style lang='less' scoped>
.googleMap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 97;
    background: #fff;
    .search {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        padding: .33rem .4rem;
        z-index: 2;
        .input {
            width: 5.36rem;
            height: .46rem;
            margin-left: .7rem;
            margin-right: .06rem;
            position: relative;
            input {
                width: 100%;
                height: .46rem;
                 line-height: .46rem;
                border-bottom: 1px solid #fff;
                background: none;
                color: #fff;
                &::-webkit-input-placeholder{
                    color: #fff;
                }
                &::-moz-placeholder {
                    color: #fff;
                }
                &:-moz-placeholder {
                    color: #fff;
                }
                &:-ms-input-placeholder {
                    color: #fff;
                }
            }
            ul {
                position: absolute;
                width: 100%;
                left: 0;
                top: .46rem;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.26);
                max-height: 6rem;
                overflow-y: auto;
                li {
                    display: block;
                    padding: .2rem;
                    border-bottom: 1px solid #ccc;
                    background: #fff;
                    line-height: .36rem;
                }
            }
            
        }   
        .closeView {
            width: .19rem;
            height: .46rem;
            background: url('../../assets/images/icon_back_white.png') no-repeat center center;
            background-size: contain;
        }
        .searchBtn {
            width: .38rem;
            height: .38rem;
            background: url('../../assets/images/clear_btn.png') no-repeat center center;
            background-size: cover;
            margin-top: .04rem;
        }
    }
    #mapContainer {
        height: 100%;
        transition: all 0.3s;
        z-index: 1;
    }
}

.storeLayer {
    width: 100%;
    padding: .37rem .38rem .5rem .4rem;
    border-top-left-radius: .13rem;
    border-top-right-radius: .13rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.26);
    transform: translateY(100%);
    transition: all .3s;
    z-index: 2;
    &.active{
        transform: translateY(0);
    }
    .closeBtn {
        width: .38rem;
        height: .38rem;
        position: absolute;
        right: .38rem;
        top: .37rem;
        z-index: 1;
        background: url('../../assets/images/map_close.png') no-repeat center center;
        background-size: cover;
    }
    .logo {
        width: 2.25rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        margin-bottom: .4rem;
        img {
            max-width: 100%;
            vertical-align: middle;
        }
    }
    h4 {
        font-size: .36rem;
        color: #3b444f;
        padding-bottom: .25rem;
        border-bottom: 1px solid #cacdd1;
        margin-bottom: .15rem;
    }
    > p {
        line-height: .5rem;
        color: #969ca3;
    }
    .goListBtn {
        display: block;
        width: 100%;
        height: .84rem;
        line-height: .84rem;
        background: linear-gradient(0deg,rgba(255,186,0,1),rgba(255,204,0,1));
        box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
        color: #3b444f;
        border-radius: .08rem;
        font-size: .3rem;
        margin-top: .45rem;
    }
    li {
        float: left;
        width: 33.33%;
    }
}

.noSearch {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    top: .46rem;
    background: #fff;
    padding: .2rem;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.26);
}
</style>