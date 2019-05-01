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
        <p>{{$store.state.pickupDate}}&nbsp;{{$store.state.pickupdayofweek}}<br>{{$store.state.pickupTime}}</p>
      </div>
      <div>
        <p>{{$store.state.dayspan}}天</p>
        <p><img src="../../../static/images/jiantou.png" class="jiantou"></p>
      </div>
      <div>
        <p>{{$store.state.reAddress}}</p>
        <p>{{$store.state.reDate}}&nbsp;{{$store.state.returndayofweek}}<br>{{$store.state.reTime}}</p>
      </div>
    </div>
    <div class="goQuyin">
      <img :src="$store.state.detailBrands" alt="">
      <p>由境外租车品牌Hertz提供服务</p>
      <a href="">
        <span>取还车指引</span>
        <img src="../../../static/images/select.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'carMassage',
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {

    },
    computed: {}
  }
</script>

<style lang="less" scoped>

</style>
