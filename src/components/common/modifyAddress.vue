<template>
  <div class="personal_header_wrap">
    <div class="personal_header">
      <img src="../../../static/images/goBack-white.png" class="goBack" @click="gobackPage">
      <div class="detailPage-address-bottom index-list-body-bottom">
        <div>
          <p>{{$store.state.takeCarLand}}</p>
          <p>{{$store.state.takeCarMonth}}月{{$store.state.takeCarDay}}日 {{$store.state.takeCarweek}} <br> {{$store.state.takeCarHour}}:{{$store.state.takeCarMin}} {{$store.state.takeCarPeriod}}</p>
        </div>
        <div>
          <p class="number-day">7天</p>

          <p>
            <img src="../../../static/images/jiantou.png" alt="" class="jiantou">
          </p>
        </div>
        <div>
          <p>{{$store.state.retCarLand}}</p>
          <p>{{$store.state.retCarMonth}}月{{$store.state.retCarDay}}日 {{$store.state.retCarweek}} <br> {{$store.state.retCarHour}}:{{$store.state.retCarMin}} {{$store.state.retCarPeriod}}</p>
        </div>
        <p class="change-city" @click="showFindCar">
          <img src="../../../static/images/change.png" alt="">
        </p>
      </div>
    </div>
    <find-car v-if="findCarState"></find-car>
  </div>
</template>

<script>
  import FindCar from "./findCar";
  export default {
    name: 'modifyAddress',
    components: {FindCar},
    data() {
      return {
        findCarState:false
      }
    },
    mounted() {
    },
    methods: {
      showFindCar:function(){
        if(this.findCarState == true){
          this.findCarState = false;
        }else{
          this.findCarState = true;
        }
      },
      gobackPage:function(){
        history.go(-1)
      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  .personal_header_wrap{
    .findCar{
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
  }
</style>
