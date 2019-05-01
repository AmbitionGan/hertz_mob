<!--  -->
<template>
  <div class="coupon-page">
    <div class="coupon-title">
      优惠券
      <span @click="clickClose">X</span>
    </div>
    <ul class="coupon-ul">
      <li :class="{active:type=='available'}" @click="switchType('available')">可用优惠券({{aLen}})</li>
      <li :class="{active:type=='unavailable'}" @click="switchType('unavailable')">不可用优惠券({{uLen}})</li>
    </ul>
    <div class="tab-contents">
      <div class="contents-page" v-if="type=='available'">
        <p class="type-title" v-if="couponParams.type==2">CDP优惠</p>
        <p class="type-title" v-if="couponParams.type==1">打折</p>
        <div
          class="coupon-list"
          v-for="(item,index) in couponList.available.group0"
          :key="index"
          @click="changeSelectCDP(item,index)"
        >
          <p class="coupan-p1" v-if="item.styles">{{item.describe}}{{item.couponavail_ablebrand}}</p>
          <p class="coupan-p1s" v-else>{{item.describe}}</p>
          <p class="coupan-p2">到期时间：{{(item.expiredate).replace('T',' ')}}</p>
          <img
            class="logo"
            src="@/assets/images/couponIcon.png"
            alt
            v-show="item.couponavail_ablebrands==='Hertz'"
          >
          <img
            class="logos"
            src="@/assets/images/logos.png"
            alt
            v-if="item.couponavail_ablebrands!='Hertz'"
          >
          <img class="select" src="@/assets/images/Selected.png" alt v-if="item.isSelect">
          <img class="select" src="@/assets/images/Unselected.png" alt v-else>
        </div>
        <p class="type-title" v-if="couponParams.type==2">PC优惠</p>
        <p class="type-title" v-if="couponParams.type==1">满减</p>
        <div
          class="coupon-list"
          v-for="(item,index) in couponList.available.group1"
          :key="'a'+index"
          @click="changeSelectPC(item,index)"
        >
          <p class="coupan-p1" v-if="item.styles">{{item.describe}}</p>
          <p class="coupan-p1s" v-else>{{item.describe}}</p>
          <p class="coupan-p2">到期时间：{{(item.expiredate).replace('T',' ')}}</p>
          <img
            class="logo"
            src="@/assets/images/couponIcon.png"
            alt
            v-if="item.couponavail_ablebrands==='Hertz'"
          >
          <img class="logos" src="@/assets/images/logos.png" alt v-else>
          <img class="select" src="@/assets/images/Selected.png" alt v-if="item.isSelect">
          <img class="select" src="@/assets/images/Unselected.png" alt v-else>
        </div>
      </div>
      <div class="contents-page" v-if="type=='unavailable'">
        <p class="type-title" v-if="couponParams.type==2">CDP优惠</p>
        <p class="type-title" v-if="couponParams.type==1">打折</p>
        <div
          class="coupon-list"
          v-for="(item,index) in couponList.unavailable.group0"
          :key="'un'+index"
        >
          <p class="coupan-p1">{{item.describe}}</p>
          <p class="coupan-p2">到期时间：{{(item.expiredate).replace('T',' ')}}</p>
          <p class="coupan-cause">{{item.cause}}</p>
          <img class="logo" src="@/assets/images/couponIcon.png" alt>
        </div>
        <p class="type-title" v-if="couponParams.type==2">PC优惠</p>
        <p class="type-title" v-if="couponParams.type==1">满减</p>
        <div class="coupon-list" v-for="(item,index) in couponList.unavailable.group1" :key="index">
          <p class="coupan-p1">{{item.describe}}</p>
          <p class="coupan-p2">到期时间：{{(item.expiredate).replace('T',' ')}}</p>
          <p class="coupan-cause">{{item.cause}}</p>
          <img class="logo" src="@/assets/images/couponIcon.png" alt>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="sure-btn" @click="sureCoupon">确定</div>
    </div>
  </div>
</template>

<script>
import orderApi from "@/api/orderCompletion.js";
export default {
  // 接受父组件的值
  props: {
    couponParams: Object,
    required: true
  },
  data() {
    return {
      type: "available",
      couponList: {
        available: {
          group0: [],
          group1: []
        },
        unavailable: {
          group0: [],
          group1: []
        }
      }, //优惠券信息
      aLen: 0, //可用优惠券数量
      uLen: 0 //不可用优惠券数量
    };
  },

  mounted() {
    this.getCoupon(); //获取优惠券信息
  },

  methods: {
    // 点击关闭页面
    clickClose() {
      this.$emit("childByshow", false);
    },
    // 获取优惠券信息
    getCoupon() {
      orderApi
        .getCoupon(this.couponParams)
        .then(res => {
          this.couponList = res.Result;
          if (this.couponList) {
            this.aLen =
              this.couponList.available.group0 +
              this.couponList.available.group1;
            this.uLen =
              this.couponList.unavailable.group0 +
              this.couponList.unavailable.group1;
          } else {
            this.aLen = this.uLen = 0;
          }
          if (this.couponList) {
            if (this.couponList.available) {
              // 给优惠券都加一个字段 isSelect  表示都未选择
              if (
                this.couponList.available.group0 &&
                this.couponList.available.group0.length > 0
              ) {
                this.couponList.available.group0.map(item => {
                  item.isSelect = false;
                  item.styles = true;
                });
              }
              if (
                this.couponList.available.group1 &&
                this.couponList.available.group1.length > 0
              ) {
                this.couponList.available.group1.map(item => {
                  item.styles = true;
                  item.isSelect = false;
                });
              }
            }
          }
        })
        .catch(res => {});
    },
    // 切换优惠券类型
    switchType(val) {
      this.type = val;
    },
    //选择优惠券CDP
    changeSelectCDP(item, index) {
      this.couponList.available.group0.map(items => {
        items.isSelect = false;
        items.styles = false;
      });
      item.isSelect = true;
      item.styles = true;
    },
    //选择优惠券PC
    changeSelectPC(item, index) {
      this.couponList.available.group1.map(items => {
        items.isSelect = false;
        items.styles = false;
      });
      item.isSelect = true;
      item.styles = true;
    },
    // 确定优惠单
    sureCoupon() {
      var aSelect1 = {
        discountguid: "", //打折
        fulldiscountguid: "", //满减
        cdpguid: "",
        pcguid: ""
      };
      if (this.couponList) {
        if (this.couponList.available) {
          // 给优惠券都加一个字段 isSelect  表示都未选择
          if (
            this.couponList.available.group0 &&
            this.couponList.available.group0.length > 0
          ) {
            this.couponList.available.group0.map(item => {
              if (item.isSelect) {
                if (this.couponParams.type == 1) {
                  aSelect1.discountguid = item.guid; //打折
                  aSelect1.discountguidDes = item.describe; //打折
                }
                if (this.couponParams.type == 2) {
                  //线下
                  aSelect1.cdpguid = item.guid; //打折
                  aSelect1.cdpguidDes = item.describe; //打折
                }
              }
            });
          }
          if (
            this.couponList.available.group1 &&
            this.couponList.available.group1.length > 0
          ) {
            this.couponList.available.group1.map(item => {
              if (item.isSelect) {
                if (this.couponParams.type == 1) {
                  aSelect1.fulldiscountguid = item.guid; //满减
                  aSelect1.fulldiscountguidDes = item.describe; //打折
                }
                if (this.couponParams.type == 2) {
                  //线下
                  aSelect1.pcguid = item.guid; //满减
                  aSelect1.pcguiddDes = item.describe; //打折
                }
              }
            });
          }
          if (aSelect1.length != 0) {
            this.$emit("childByValue", aSelect1);
            this.$emit("childByshow", false);
          }
          if (aSelect1.length == 0) {
            alert("请选择优惠券");
          }
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
.coupon-page {
  padding: 1.04rem 0 1.78rem 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #f3f3f4;
  .coupon-title {
    height: 1.04rem;
    line-height: 1.04rem;
    background-color: #fff;
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(59, 68, 79, 1);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    span {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      right: 0.4rem;
    }
  }
  .coupon-ul {
    margin-top: 0.2rem;
    background: #fff;
    display: table;
    width: 100%;
    padding: 0 0.4rem;
    height: 1rem;
    line-height: 1rem;
    li {
      width: 50%;
      float: left;
      text-align: center;
      background: #fff;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
    }
  }
  .tab-contents {
    height: calc(~"100vh - 4.56rem");
    overflow-y: scroll;
    padding-top: 0.54rem;
    .contents-page {
      padding: 0 0.4rem;
      margin-bottom: 0.3rem;
      .type-title {
        height: 0.29rem;
        line-height: 0.29rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(150, 156, 163, 1);
        margin-bottom: 0.3rem;
      }
      .coupon-list {
        background: #fff;
        border-radius: 0.15rem;
        height: 2.18rem;
        padding: 0.28rem 0.35rem;
        margin-bottom: 0.3rem;
        position: relative;
        box-shadow: 0px 0px 21px 0px rgba(6, 0, 1, 0.24);
        .coupan-p1 {
          width: 90%;
          height: 0.38rem;
          font-size: 0.38rem;
          font-weight: bold;
          color: rgba(59, 68, 79, 1);
          line-height: 0.38rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .coupan-p1s {
          width: 90%;
          height: 0.38rem;
          font-size: 0.38rem;
          font-weight: bold;
          color: rgba(88, 89, 91, 1);
          line-height: 0.38rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.5;
        }
        .coupan-p2 {
          height: 0.24rem;
          line-height: 0.24rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(88, 89, 91, 1);
          opacity: 0.5;
          margin-top: 0.16rem;
        }
        .coupan-cause {
          margin-top: 0.2rem;
          height: 0.24rem;
          line-height: 0.24rem;
          font-size: 0.24rem;
          font-weight: 400;
          color: #58595b;
          opacity: 0.5;
        }
        .logo {
          width: 3.53rem;
          height: 1.34rem;
          position: absolute;
          top: 0.57rem;
          left: 3.15rem;
        }
        .logos {
          width: 4.04rem;
          height: 0.31rem;
          position: absolute;
          bottom: 0.34rem;
          right: 0.17rem;
        }
        .select {
          position: absolute;
          width: 0.41rem;
          height: 0.41rem;
          top: 0.27rem;
          right: 0.27rem;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 0.42rem 0.4rem 0.52rem 0.4rem;
    height: 1.78rem;
    .sure-btn {
      height: 0.84rem;
      line-height: 0.84rem;
      background: linear-gradient(
        0deg,
        rgba(255, 186, 0, 1),
        rgba(255, 204, 0, 1)
      );
      box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
      text-align: center;
      border-radius: 0.1rem;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
    }
  }
}
</style>
