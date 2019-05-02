<!-- 在线支付 -->
<template>
  <div class="onlinePay">
    <!-- 头部 -->
    <choiceCityComHead title="订单支付" />
    
    <!-- 支付区域 -->
    <div class="onlinePayContainer">
      <div class="priceBox">
        <div class="price clear">
          <h4 class="left">支付订单费用</h4>
          <span class="right">RMB<b>3200</b></span>
          <p class="clear">
            价格浮动频繁，请在<span>44分59秒</span>内完成支付，逾期订单将自动取消
          </p>
        </div>
        <div class="showDetail">
          <span>查看订单详情</span>
        </div>
      </div>
    <!-- 查看详情 -->
    <div class="lookDeatil">
      <!-- 车辆信息 -->
      <carDetails />
      <!-- 费用明细 -->
      <div class="detailsCharges">
        <div class="titleCharges" @click.stop="clickOpen('Charges')">
          费用明细
        </div>
          <div class="infoCharges">
            <div v-if="orderDetail.order_type != 'Offline'">
              <p>
                <span>在线支付包含</span>
                <span>
                  <span class="leftSpan"
                    >{{ orderDetail.online_currency }}&nbsp;{{
                      orderDetail.online_pay
                    }}</span
                  >
                  <!-- <span class="rightSpan">约{{orderDetail.}}&nbsp;{{orderDetail.}}</span> -->
                </span>
              </p>
              <ul class="insurance-ul" v-if="orderDetail.order_type == 'Online'">
                <li
                  v-for="(item, index) in orderDetail.details_qualifier.split(',')"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              <p>
                <span>到店支付包含</span>
                <span>
                  <span class="modal-body-leftSpan"
                    >{{ orderDetail.offline_currency }}
                    {{ orderDetail.offline_pay }}</span
                  >
                </span>
              </p>
              <ul class="insurance-ul" v-if="orderDetail.details_qualifier">
                <li
                  v-for="(i, indexs) in orderDetail.details_qualifier.split(',')"
                  :key="'un' + indexs"
                >
                  {{ i }}
                </li>
              </ul>
              <ul class="insurance-ul" v-if="orderDetail.extra_equipment">
                <li
                  v-for="(item, index) in orderDetail.extra_equipment.split(',')"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
              <ul class="insurance-ul" v-if="orderDetail.extra_service">
                <li
                  v-for="(items, index) in orderDetail.extra_service.split(',')"
                  :key="'a' + index"
                >
                  {{ items }}
                </li>
              </ul>
            </div>
            <div>
              <span class="tips"
                >(门店服务的具体价格和库存需以门店为准，此处价格仅供参考，可能在门店加收额外税费)</span
              >
            </div>
            <div class="youhuiMessage">
              <p>优惠信息</p>
              <!--打折优惠名称 -->
              <p class="discount-info" v-if="orderDetail.discount_name">
                {{ orderDetail.discount_name }}
              </p>
              <!--满减优惠名称 -->
              <p class="discount-info" v-if="orderDetail.full_discountname">
                {{ orderDetail.full_discountname }}
              </p>
              <!--CDP优惠名称  -->
              <p class="discount-info" v-if="orderDetail.cdp_name">
                {{ orderDetail.cdp_name }}
              </p>
              <!--PC优惠名称  -->
              <p class="discount-info" v-if="orderDetail.pc_name">
                {{ orderDetail.pc_name }}
              </p>
            </div>
            <div class="youhuiMessage last-div">
              <p>
                <span>优惠前价格</span>
                <span style="text-decoration: line-through;color:#9EA3AA"
                  >{{ orderDetail.beforeoffer_currency }}&nbsp;{{
                    orderDetail.beforeoffer_pay
                  }}</span
                >
              </p>
              <p class>
                <span>订单总额</span>
                <span class="origin">
                  {{ orderDetail.total_currency }}
                  <span class="fot-38">{{ orderDetail.total_pay }}</span>
                </span>
              </p>
              <p class="last-p spancolor-hui">
                约{{ orderDetail.exchange_currency }}&nbsp;{{
                  orderDetail.exchange_pay
                }}
              </p>
            </div>
          </div>
      </div>
      <!-- 驾驶人信息 -->
      <div class="driver-modular">
        <div class="titleCharges" @click="clickOpen('Driver')">
          <span>驾驶人信息</span>
        </div>
          <div class="driver-info">
            <ul>
              <li>
                <span>名</span>
                <span>{{ orderDetail.sur_name }}</span>
              </li>
              <li>
                <span>姓</span>
                <span>{{ orderDetail.given_name }}</span>
              </li>
              <li>
                <span>年龄</span>
                <span>{{ orderDetail.a_ge }}</span>
              </li>
              <li>
                <span>电子邮箱</span>
                <span>{{ orderDetail.e_mail }}</span>
              </li>
              <li>
                <span>电话</span>
                <span
                  >{{ orderDetail.areacity_code }}&nbsp;{{
                    orderDetail.phone_number
                  }}</span
                >
              </li>
              <li v-if="orderDetail.gold_cardnum">
                <span>Hertz金卡号</span>
                <span>{{ orderDetail.gold_cardnum }}</span>
              </li>
              <li v-if="orderDetail.passenger_num">
                <span>常旅客号</span>
                <span>{{ orderDetail.passenger_num }}</span>
              </li>
              <li v-if="orderDetail.emergency_contactname">
                <span>紧急联系人姓名</span>
                <span>{{ orderDetail.emergency_contactname }}</span>
              </li>
              <li
                v-if="
                  orderDetail.emergency_contactcode && orderDetail.emergency_contacttel
                "
              >
                <span>紧急联系人手机号</span>
                <span
                  >{{ orderDetail.emergency_contactcode }}&nbsp;{{
                    orderDetail.emergency_contacttel
                  }}</span
                >
              </li>
            </ul>
          </div>
      </div>
      <!-- 取车前免费取消 -->
      <div class="cancel-prompt">
        <div class="titleCharges" @click="clickOpen('Prompt')">
          取车前免费取消
        </div>
          <div class="cancel-info">
            <p>旅行计划还没确定？</p>
            <div>
              别担心，订单可在取车时间（当地时间：{{
                orderDetail.pickup_datetime.replace('T'," ")
              }}）前可免费取消。马上下单不要错过优惠价格。
            </div>
          </div>
      </div>
    </div>
      <div class="choosePayType">
        <p>请选择支付方式</p>
        <ul>
          <li>
            <router-link to="/">
              <img src="@/assets/images/alipay.png" alt="" />
              支付宝
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="@/assets/images/bankpay.png" alt="" />
              银联云闪付
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="@/assets/images/bankpay.png" alt="" />
              银联支付
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 提示信息弹窗 -->
    <div
      class="promptLayer"
      v-show="isShowPromptLayer"
      @click="isShowPromptLayer = false"
    >
      <div class="promptLayerBox">
        尊敬的客户，您现在购买的产品/服务供应商在中国境外，根据中华人民共和国国家外汇管理局外汇管理相关业务要求，
        请真实准确的输入以下个人信息。如信息有误，将会影响您的支付体验。
        赫兹不会储存您的以上信息。
      </div>
    </div>
    <!-- 身份证弹窗 -->
    <div class="identityLayer" v-show="isShowIdentityLayer">
      <div class="identityLayerBox">
        <div class="title">提示信息</div>
        <div class="content">
          <div class="input clear">
            <div class="name left">
              <label>*</label>
              <input type="text" placeholder="姓名" v-model="name" />
            </div>
            <div class="number right">
              <label>*</label>
              <input type="text" placeholder="身份证号" v-model="number" />
            </div>
          </div>
          <p>
            尊敬的客户，您现在购买的产品/服务供应商在中国境外，根据中华人民共和国国家外汇管理局外汇管理相关业务要求，
            请真实准确的输入以下个人信息。如信息有误，将会影响您的支付体验。
            赫兹不会储存您的以上信息。
          </p>
          <div class="btns">
            <button class="goPay" @click="goPay()">立即支付</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import choiceCityComHead from "../common/choiceCityComHead";
import payApi from "@/api/pay";
import { common } from "@/assets/mixin/common";
import carDetails from "../common/carDetails";

export default {
  name: "onlinePay",
  components: {
    choiceCityComHead,
    carDetails
  },
  mixins: [common],
  data() {
    return {
      // 提醒弹窗
      isShowPromptLayer: false,

      // 个人信息弹窗
      isShowIdentityLayer: false,

      // 订单详情
      orderDetail: {
        pickup_datetime: ''
      },

      // 订单车辆详情
      orderDetailCar: {},

      // 姓名
      name: "",

      // 身份证号
      number: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getOrderDetail();
    },

    /**
     * @param {String} str 支付类型
     */
    getPay(str) {
      let params = {
        address: "",
        guid: this.$route.query.guid,
        href: "",
        idnumber: "320125199604170018",
        name: "甘志成",
        pmode: "306",
        random: Math.random()
          .toString(36)
          .substr(8)
      };
      this.$loadingToast.show();
      payApi
        .getPay(params)
        .then(res => {
          this.$loadingToast.close();
          if (res.ErrorCode == 0) {
            if (res.Result != "") {
              // window.open(res.Result)
              location.href = res.Result;
            }
          } else {
            this.messageLayer(res.ErrorMsg, 0);
          }
        })
        .catch(err => {
          this.$loadingToast.close();
          this.messageLayer("请求失败，请重试", 0);
        });
    },

    /**
     * 身份验证
     */
    goPay() {
      if (this.name == "") {
        this.messageLayer("姓名不能为空");
        return;
      }

      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(this.number)) {
        this.messageLayer("身份证号码错误");
        return;
      }
      this.isShowIdentityLayer = false;
      this.isShowPromptLayer = true;
    },

    /**
     * 获取订单详情
     */
    getOrderDetail() {
      payApi
        .getOrderDeatil({ guid: this.$route.query.guid })
        .then(res => {
          if (res.ErrorCode == 0) {
            this.orderDetail = res.Result[0];
            this.getOrderDetailCar();
          } else {
            this.messageLayer(res.ErrorMsg, 0);
          }
        })
        .catch(err => {
          this.messageLayer("请求失败，请重试", 0);
        });
    },

    /**
     * 获取订单车辆详情
     */
    getOrderDetailCar() {
      payApi
        .getOrderDeatilCar({ guid: this.$route.query.guid })
        .then(res => {
          if (res.ErrorCode == 0) {
            this.orderDetailCar = res.Result;
            this.assignCarInfo();
          } else {
            this.messageLayer(res.ErrorMsg, 0);
          }
        })
        .catch(err => {
          console.log(err);
          this.messageLayer("请求失败，请重试", 0);
        });
    },

    /**
     * 赋值公共车辆信息组件
     */
    assignCarInfo() {
      // logo
      this.$store.state.detailBrands = pubMethod.getBrandLogo(
        this.orderDetail.brands
      ).images;
      //取车地址
      this.$store.state.picAddress = this.orderDetail.pickup_locationname;
      //取车日期
      this.$store.state.pickupDate = this.orderDetail.pickup_datetime.split(
        "T"
      )[0];
      //取车时间
      this.$store.state.pickupTime = this.orderDetail.pickup_datetime.split(
        "T"
      )[1];
      //取车周几
      this.$store.state.pickupdayofweek = this.orderDetail.pickup_week;
      //还车地址
      this.$store.state.reAddress = this.orderDetail.return_locationname;
      //还车日期
      this.$store.state.reDate = this.orderDetail.return_datetime.split("T")[0];
      //还车时间
      this.$store.state.reTime = this.orderDetail.return_datetime.split("T")[1];
      //还车周几
      this.$store.state.returndayofweek = this.orderDetail.return_week;
      //车辆图片地址
      this.$store.state.image_path = this.orderDetail.image_path;
      //车辆简介
      this.$store.state.short_description = this.orderDetailCar.short_description;
      //乘客数量
      this.$store.state.num_adult_passengers = this.orderDetailCar.num_adult_passengers;
      //大行李数量
      this.$store.state.num_large_suitcase = this.orderDetailCar.num_large_suitcase;
      //小行李数量
      this.$store.state.num_small_suitcase = this.orderDetailCar.num_small_suitcase;
      //自动挡手动挡
      this.$store.state.transmission_type =
        this.orderDetailCar.transmission_type == 1 ? "automatic" : "";
      //租借天数
      this.$store.state.dayspan = this.orderDetail.usecar_time;
      // 取车指引信息
      this.$store.state.carDetails = this.orderDetailCar;
      this.$store.state.takeTransLat = this.$route.query.take.split(",")[0];
      this.$store.state.takeTransLng = this.$route.query.take.split(",")[1];
      this.$store.state.retTransLat = this.$route.query.ret.split(",")[0];
      this.$store.state.retTransLng = this.$route.query.ret.split(",")[1];
    }
  },
  watch: {
    // 姓名输入
    name() {
      this.name = pubMethod.filterCode(this.name);
    }
  }
};
</script>

<style lang="less" scoped>
.onlinePay {
  min-height: 100vh;
  background: #fff;
}
.onlinePayContainer {
  .price {
    padding: 0.46rem 0.3rem;
    background: #57585a;
    border-bottom: 1px solid #7c7d7f;
    h4 {
      font-size: 0.36rem;
      line-height: 0.52rem;
      color: #fff;
    }
    > span {
      color: #ffcc00;
      > b {
        margin-left: 5px;
        font-size: 0.48rem;
        color: #ffcc00;
      }
    }
    > p {
      clear: both;
      color: #fff;
      padding-top: 0.28rem;
      span {
        color: #ff0000;
      }
    }
  }
  .showDetail {
    padding: 0.21rem 0.45rem;
    background: #57585a;
    span {
      color: #ffcc00;
      text-decoration: underline;
    }
  }
  .choosePayType {
    > p {
      background: #f3f3f5;
      color: #969ca3;
      padding: 0 0.4rem;
      line-height: 0.9rem;
    }
    li {
      > a {
        display: block;
        font-size: 0.3rem;
        padding-left: 1.97rem;
        line-height: 1.5rem;
        border-bottom: 1px solid #e9e9e9;
        position: relative;
        img {
          width: 1.37rem;
          height: 0.75rem;
          position: absolute;
          left: 0.19rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &:first-child {
        img {
          width: 0.87rem;
          height: 0.87rem;
          left: 0.49rem;
        }
      }
    }
  }
}
.promptLayer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  .promptLayerBox {
    width: 6.75rem;
    padding: 0.45rem 0.31rem 0.45rem 0.36rem;
    position: absolute;
    top: 2.71rem;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    line-height: 0.4rem;
    color: #969ca3;
    border-radius: 0.05rem;
  }
}
.identityLayer {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  .identityLayerBox {
    position: absolute;
    width: 6.68rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      line-height: 0.98rem;
      padding: 0 0.35rem;
      background: #58595b;
      color: #fff;
      font-size: 0.36rem;
      border-top-left-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
    }
    .content {
      padding: 0.55rem 0.35rem 0.71rem;
      background: #fff;
      border-bottom-left-radius: 0.08rem;
      border-bottom-right-radius: 0.08rem;
      > p {
        color: #6b727b;
        line-height: 0.3rem;
        margin-bottom: 0.7rem;
        font-size: 0.24rem;
      }
      .input {
        margin-bottom: 0.3rem;
        label {
          color: red;
          position: absolute;
          left: 0;
          top: 0;
        }
        input {
          width: 100%;
          line-height: 0.4rem;
          border-bottom: 1px solid #e8e8e8;
        }
        .name {
          position: relative;
          width: 2.2rem;
          padding-left: 0.15rem;
          height: 100%;
          line-height: 0.4rem;
        }
        .number {
          position: relative;
          width: 3.4rem;
          padding-left: 0.15rem;
          height: 100%;
          line-height: 0.4rem;
        }
      }
      .btns {
        text-align: right;
        button {
          width: 2.08rem;
          height: 0.58rem;
          line-height: 0.58rem;
          text-align: center;
          font-size: 0.28rem;
          border-radius: 0.08rem;
          margin-left: 0.1rem;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
          &.goPay {
            width: 100%;
            background: #ffc300;
            color: #3b444f;
            margin-left: 0;
          }
        }
      }
    }
  }
}
.lookDeatil {
    padding-top: .19rem;
    background: #f3f3f5;
}
.titleCharges {
    border-bottom: 1px solid #cecece;
    padding: 0 0.41rem 0 0.42rem;
    height: 0.89rem;
    line-height: 0.89rem;
    font-size: 0.36rem;
}
// 费用明细
.detailsCharges {
    margin-top: 0.19rem;
    background: #fff;
    .infoCharges {
      padding: 0.4rem;
      .youhuiMessage {
        .discount-info {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(150, 156, 163, 1);
          margin-bottom: 0.06rem;
        }
        p {
          margin-bottom: 0.25rem;
        }
        .last-p {
          margin-bottom: 0;
          float: right;
        }
      }
      .last-div {
        margin-bottom: 0;
        .origin {
          color: #ff9c00;
          .fot-38 {
            color: #ff9c00;
          }
        }
      }
      div {
        display: table;
        width: 100%;
        margin-bottom: 0.25rem;
        font-size: 0.24rem;

        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tips {
          height: 0.72rem;
          line-height: 0.49rem;
          color: #969ca3;
          font-size: 0.24rem;
        }
        .insurance-ul {
          li {
            float: left;
            color: #969ca3;
            border-right: 0.02rem solid #969ca3;
            padding: 0 0.12rem;
            height: 0.24rem;
            line-height: 0.24rem;
            margin-top: 0.24rem;
          }
          li:nth-child(1) {
            padding-left: 0;
          }
          li:last-child {
            margin-right: 0.12rem;
          }
        }

        .leftSpan {
          color: #ff9c00;
        }
        .rightSpan {
          color: #969ca3;
          margin-left: 17px;
        }
      }
    }
  }
  // 驾驶人信息
.driver-modular {
    margin-top: 0.2rem;
    background: #fff;
    .driver-info {
        padding: 0.32rem 0 0.52rem 0.41rem;
        font-size: 0.24rem;
        ul {
        li {
            margin-bottom: 0.35rem;
            font-size: 0.24rem;
            height: 0.24rem;
            line-height: 0.24rem;
            span:nth-child(1) {
            color: #3b444f;
            display: inline-block;
            width: 2.3rem;
            margin-right: 0.63rem;
            }
            span:nth-child(2) {
            display: inline-block;
            color: #969ca3;
            }
        }
        li:last-child {
            margin-bottom: 0;
        }
        }
    }
}
// 取车前免费取消
.cancel-prompt {
    margin-top: 0.2rem;
    background-color: #fff;
    .cancel-title {
        padding-left: 0.41rem;
        height: 0.89rem;
        line-height: 0.89rem;
        border-bottom: 1px solid #cecece;
        font-size: 0.36rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
    }
    .cancel-info {
        padding: 0.31rem 0.4rem 0.56rem 0.41rem;
        font-size: 0.24rem;
        p {
        color: #3b444f;
        margin-bottom: 0.25rem;
        }
        div {
        height: 0.61rem;
        line-height: 0.36rem;
        color: #969ca3;
        }
    }
}
</style>

