<template>
  <div class="detailPage-address">
    <div class="detailPage-address-top">
      <img :src="$store.state.image_path" alt="" class="carImage">
      <div class="modelOfCar">
        <p><span>{{$store.state.short_description}}</span><span class="spancolor-hui">或同级</span></p>
        <p>
          <a href="">{{$store.state.num_adult_passengers}}乘客</a>
          <a href="">{{$store.state.num_large_suitcase}}大{{$store.state.num_small_suitcase}}小行李</a>
          <a href="">{{($store.state.transmission_type == "automatic")?'自动挡':'手动挡'}}</a>
        </p>

      </div>
    </div>
    <div class="detailPage-address-bottom">
      <div>
        <p>{{$store.state.picAddress}}</p>
        <p>{{$store.state.pickupDate}}&nbsp;{{$store.state.pickupdayofweek}}  {{$store.state.pickupTime}}</p>
      </div>
      <div>
        <p>{{$store.state.dayspan}}天</p>
        <p><img src="../../../static/images/jiantou.png" class="jiantou"></p>
      </div>
      <div>
        <p>{{$store.state.reAddress}}</p>
        <p>{{$store.state.reDate}}&nbsp;{{$store.state.returndayofweek}}  {{$store.state.reTime}}</p>
      </div>
    </div>
    <div class="goQuyin">
      <img :src="$store.state.detailBrands" alt="">
      <p>由境外租车品牌Hertz提供服务</p>
      <a href="javascript:void(0)" @click="mapShowFunction">
        <span>取还车指引</span>
        <img src="../../../static/images/select.png" alt="">
      </a>
    </div>
    <!--地图弹窗-->
    <div class="detailMap" v-if="mapShow">
      <header class="mapHeader">
        <img src="../../../static/images/goBack-white.png" class="goBack" @click="mapShow = false">
        <a href="javascript:void(0)" :class="(changeIndex=='1')?'on':''" @click="changeCar('1')"><span>取车指引</span></a>
        <a href="javascript:void(0)" :class="(changeIndex=='2')?'on':''" @click="changeCar('2')"><span>还车指引</span></a>
      </header>
      <div class="mapWrap">
        <google-map></google-map>
      </div>
      <footer class="mapFooter">
        <h4>取车门店信息</h4>
        <ul>
          <li>
            <span>门店地址：</span>
            <p>{{mapAddress}}</p>
          </li>
          <li>
            <span>营业时间：</span>
            <p>{{mapTime}}</p>
          </li>
          <li>
            <span>联系电话：</span>
            <p>{{mapTel}}</p>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
  import GoogleMap from "../common/googleMap";
  export default {
    name: 'carMassage',
    data() {
      return {
        changeIndex:"1",
        mapShow:false,
        mapAddress:"",
        mapTime:"",
        mapTel:""
      }
    },
    mounted() {
    },
    methods: {
      //地图控制
      mapShowFunction:function(){
        this.mapShow = true;
        this.changeCar('1');
      },
      changeCar:function(param){
        this.$store.state.mapData = [];
        this.mapShow = false;
        this.changeIndex = param;
        this.$nextTick(()=>{
          this.mapShow = true;
          this.$store.state.isClearMap = true;
          var lat,lng,mapAddress,mapTime,mapTel,takeLat,takeLng,brands;
          if(param == '1'){
            lat = Number(this.$store.state.carDetails.pickuplocation_details.lat);
            lng = Number(this.$store.state.carDetails.pickuplocation_details.lng);
            takeLat = Number(this.$store.state.takeTransLat);
            takeLng = Number(this.$store.state.takeTransLng);
            mapAddress = this.$store.state.carDetails.pickuplocation_details.address;
            mapTime = this.$store.state.carDetails.pickuplocation_details.open_time;
            mapTel = this.$store.state.carDetails.pickuplocation_details.tel;
            brands = this.$store.state.carDetails.pickuplocation_details.brands
          }else{
            lat = Number(this.$store.state.carDetails.returnlocation_details.lat);
            lng = Number(this.$store.state.carDetails.returnlocation_details.lng);
            takeLat = Number(this.$store.state.retTransLat);
            takeLng = Number(this.$store.state.retTransLng);
            mapAddress = this.$store.state.carDetails.returnlocation_details.address;
            mapTime = this.$store.state.carDetails.returnlocation_details.open_time;
            mapTel = this.$store.state.carDetails.returnlocation_details.tel;
            brands = this.$store.state.carDetails.pickuplocation_details.brands
          }
          this.$store.state.mapData.push({
            lat:lat,
            lng:lng
          })
          this.$store.state.mapData.push({
            lat:takeLat,
            lng:takeLng,
            brand:brands
          })
          this.mapAddress = mapAddress;
          this.mapTime = mapTime;
          this.mapTel = mapTel;

          console.log(this.$store.state.mapData);
        })

      }
    },
    components: {GoogleMap},
  }
</script>

<style lang="less" scoped>
  //地图
  .mapHeader
  {
    background: rgba(0,0,0,0.5);
    height:40px;
    line-height: 32px;
    position: absolute;
    z-index: 2000;
    width:100%;
    font-size:16px;
    text-align: center;
    a{
      margin-right: 20px;
      &:last-child{
        margin-right: 0;
      }
      span{
        display: inline-block;
        padding:0 10px 0px;
        line-height: 38px;
        color:#fff;
      }
      &.on{
        span{
          border-bottom:2px solid #ffcc00;
          color:#ffcc00;
        }
      }
    }
    img{
      position: absolute;
      left:0.4rem;
      top:50%;
      transform: translateY(-50%);
    }
  }
  .detailMap{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background: #fff;
    z-index: 90000;
    .googleMap{
      height:50%;
    }
    .mapFooter{
      position: absolute;
      left:0;
      bottom:0;
      width:100%;
      height:50%;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 0px 20px rgba(0,0,0,0.4);
      overflow: hidden;
      z-index: 5000;
      padding:16px;
      box-sizing: border-box;
      h4{
        font-size:18px;
        padding-bottom: 6px;
        margin-bottom: 10px;
        border-bottom: 1px solid #caced1;
      }
      li{
        font-size:15px;
        color:#979ca2;
        line-height: 2em;
      }
    }
  }
</style>
