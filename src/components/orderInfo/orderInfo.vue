<template>
  <div class="orderInfo-page">
    <choiceCityComHead title="订单信息"></choiceCityComHead>
    <carDetails></carDetails>
    <!-- ============================待支付==================================== -->
    <div class="info-page-title" v-if="details.order_status=='WaitPay'&&timeOut==false">
      <div class="title-info">
        <div class="title-name">
          <span class="names">在线支付费用</span>
          <span class="title-cost">
            <span>{{details.online_currency}}</span>
            {{details.online_pay}}
          </span>
          <div style="clear:both"></div>
        </div>
        <p class="payment-time">
          价格浮动频繁，请在
          <span class="times">{{timetoPay}}</span>
          内完成支付，逾期订单将自动取消
        </p>
      </div>
      <div class="title-btn">
        <div class="btn" @click="payment">立即支付</div>
        <p @click="cancelOrder()">取消订单</p>
      </div>
    </div>
    <!-- ==============================已取车=================================== -->
    <div class="info-page-title" v-if="details.order_status=='Used'">
      <div class="title-info">
        <p class="odd-numbers">预约确认单号：{{details.unique_orderid}}</p>
        <p class="numbers">订单号：{{details.series_code}}</p>
      </div>
      <div class="title-btn">
        <div class="btn" @click="reBooking">再次预定</div>
      </div>
    </div>
    <!-- =============================预定成功================================== -->
    <div class="info-page-title" v-if="details.order_status=='Success'">
      <div class="title-info">
        <p class="odd-numbers">预约确认单号：{{details.unique_orderid}}</p>
        <p class="numbers">订单号：{{details.series_code}}</p>
      </div>
      <div class="title-btn">
        <div class="btn" @click="reBooking">再次预定</div>
        <div class="down-btn">
          <span @click="downloadOrder">下载订单至本地</span>
          <span @click="sendOrder">发送确认订单至其他联系人</span>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
    <!-- ============================已取消 订单超时========================== -->
    <div
      class="info-page-title"
      v-if="details.order_status=='Cancel'||details.order_status=='PayTimeOut'||(details.order_status=='WaitPay'&&timeOut==true)"
    >
      <div class="title-info">
        <p class="cancelled">已取消</p>
        <p class="numbers">订单号：{{details.series_code}}</p>
      </div>
      <div class="cancelled-btn">
        <div class="del-btn btn" @click="deleteOrder">删除订单</div>
        <div class="re-btn btn" @click="againChangeCar">重新选车</div>
        <div style="clear:both"></div>
      </div>
    </div>
    <!-- =============================费用明细=================================== -->
    <div class="detailsCharges">
      <div class="titleCharges" @click.stop="clickOpen('Charges')">
        费用明细
        <img :class="showsBoxCharges?'img-inverse':''" src="@/assets/images/bot-jiao.png" alt>
      </div>
      <collapseTransition>
        <div class="infoCharges" v-if="showsBoxCharges">
          <div v-if="details.order_type!='Offline'">
            <p>
              <span>在线支付包含</span>
              <span>
                <span class="leftSpan">{{details.online_currency}}&nbsp;{{details.online_pay}}</span>
                <!-- <span class="rightSpan">约{{details.}}&nbsp;{{details.}}</span> -->
              </span>
            </p>
            <ul class="insurance-ul" v-if="details.order_type=='Online'">
              <li v-for="(item,index) in details.details_qualifier.split(',')" :key="index">{{item}}</li>
            </ul>
          </div>
          <div v-if="priceInfo.offline_pay>0">
            <p>
              <span>到店支付包含</span>
              <span>
                <span
                  class="modal-body-leftSpan"
                >{{details.offline_currency}} {{details.offline_pay}}</span>
              </span>
            </p>
            <ul class="insurance-ul" v-if="details.details_qualifier">
              <li
                v-for="(i,indexs) in details.details_qualifier.split(',')"
                :key="'un'+indexs"
              >{{i}}</li>
            </ul>
            <ul class="insurance-ul" v-if="details.extra_equipment">
              <li v-for="(item,index) in details.extra_equipment.split(',')" :key="index">{{item}}</li>
            </ul>
            <ul class="insurance-ul" v-if="details.extra_service">
              <li
                v-for="(items,index) in details.extra_service.split(',')"
                :key="'a'+index"
              >{{items}}</li>
            </ul>
          </div>
          <div v-if="priceInfo.offline_pay>0">
            <span class="tips">(门店服务的具体价格和库存需以门店为准，此处价格仅供参考，可能在门店加收额外税费)</span>
          </div>
          <div
            class="youhuiMessage"
            v-if="details.discount_name||details.full_discountname||details.cdp_name||details.pc_name"
          >
            <p>优惠信息</p>
            <!--打折优惠名称 -->
            <p class="discount-info" v-if="details.discount_name">{{details.discount_name}}</p>
            <!--满减优惠名称 -->
            <p class="discount-info" v-if="details.full_discountname">{{details.full_discountname}}</p>
            <!--CDP优惠名称  -->
            <p class="discount-info" v-if="details.cdp_name">{{details.cdp_name}}</p>
            <!--PC优惠名称  -->
            <p class="discount-info" v-if="details.pc_name">{{details.pc_name}}</p>
          </div>
          <div class="youhuiMessage last-div">
            <p v-if="details.beforeoffer_pay>0">
              <span>优惠前价格</span>
              <span
                style="text-decoration: line-through;color:#9EA3AA"
              >{{details.beforeoffer_currency}}&nbsp;{{details.beforeoffer_pay}}</span>
            </p>
            <p v-if="details.total_pay>0">
              <span>订单总额</span>
              <span class="origin">
                {{details.total_currency}}
                <span class="fot-38">{{details.total_pay}}</span>
              </span>
            </p>
            <p
              class="last-p spancolor-hui"
            >约{{details.exchange_currency}}&nbsp;{{details.exchange_pay}}</p>
          </div>
        </div>
      </collapseTransition>
    </div>
    <!-- =============================驾驶人信息================================= -->
    <div class="driver-modular">
      <div class="titleCharges" @click="clickOpen('Driver')">
        <span>驾驶人信息</span>
        <img :class="showsBoxDriver?'img-inverse':''" src="@/assets/images/bot-jiao.png" alt>
      </div>
      <collapseTransition>
        <div class="driver-info" v-if="showsBoxDriver">
          <ul>
            <li>
              <span>名</span>
              <span>{{details.sur_name}}</span>
            </li>
            <li>
              <span>姓</span>
              <span>{{details.given_name}}</span>
            </li>
            <li>
              <span>年龄</span>
              <span>{{details.a_ge}}</span>
            </li>
            <li>
              <span>电子邮箱</span>
              <span>{{details.e_mail}}</span>
            </li>
            <li>
              <span>电话</span>
              <span>{{details.areacity_code}}&nbsp;{{details.phone_number}}</span>
            </li>
            <li v-if="details.gold_cardnum">
              <span>Hertz金卡号</span>
              <span>{{details.gold_cardnum}}</span>
            </li>
            <li v-if="details.passenger_num">
              <span>常旅客号</span>
              <span>{{details.passenger_num}}</span>
            </li>
            <li v-if="details.emergency_contactname">
              <span>紧急联系人姓名</span>
              <span>{{details.emergency_contactname}}</span>
            </li>
            <li v-if="details.emergency_contactcode&&details.emergency_contacttel">
              <span>紧急联系人手机号</span>
              <span>{{details.emergency_contactcode}}&nbsp;{{details.emergency_contacttel}}</span>
            </li>
          </ul>
        </div>
      </collapseTransition>
    </div>
    <div class="cancel-prompt">
      <div class="titleCharges" @click="clickOpen('Prompt')">
        取车前免费取消
        <img :class="showsBoxPrompt?'img-inverse':''" src="@/assets/images/bot-jiao.png" alt>
      </div>
      <collapseTransition>
        <div class="cancel-info" v-if="showsBoxPrompt">
          <p>旅行计划还没确定？</p>
          <div>别担心，订单可在取车时间（当地时间：{{details.pickup_datetime.replace('T',"")}}）前可免费取消。马上下单不要错过优惠价格。</div>
        </div>
      </collapseTransition>
    </div>
    <!-- =============================重要提示=================================== -->
    <div class="important-hints">
      <div class="titleCharges" @click="clickOpen('Hints')">
        重要提示！必读！！！
        <img
          :class="showsBoxHints?'img-inverse':''"
          src="@/assets/images/bot-jiao.png"
          alt
        >
      </div>
      <collapseTransition>
        <div class="hints-info" v-if="showsBoxHints">
          <ul>
            <li>
              <div>
                <p>1</p>用户提车时，需要出示提车单，主驾驶员本人的护照、国际信用卡、驾照以及 国际驾照认证件（如果您持有车行翻译件，或英文公证件，或国际驾照(IDP)亦可）。如需多人开车，请在取车时向店员添加额外驾驶人(Additional driver)，同样需要出示符合要求的驾照证件、护照和国际信用卡，可能会额外收费
              </div>
            </li>
            <li>
              <div>
                <p>2</p>所有在门店支付的费用和押金都以信用卡支付，提车时请携带有足够额度的国际信用卡（租车押金根据不同车型一般是 500-3000美元，欧洲高级/豪华车型组以及9座以上的车型组将会达5000美元或以上），高档车型可能需要两张信用卡。境外消费可能产生货币转换手续费、汇率差，具体标准请咨询发卡银行。
              </div>
            </li>
            <li>
              <div>
                <p>3</p>在柜台办理提车手续时，签字确认之前请务必仔细查看单据上的结算金额（显示为Estimated rental charges）是否和订单上一致。若不一致， 门店可能添加了额外保险或者服务，这些额外保险非强制，请根据实际需求考虑是否选购；若不购买，请告知门店员工去掉即可，以免产生不必要的收费。如果与门店协商过程有任何问题，请致电赫兹。 查看合同样本，了解收费项目。
              </div>
            </li>
            <li>
              <div>
                <p>4</p>所有在门店支付的费用和押金都以信用卡支付，提车时请携带有足够额度的国际信用卡（租车押金根据不同车型一般是 500-3000美元，欧洲高级/豪华车型组以及9座以上的车型组将会达5000美元或以上），高档车型可能需要两张信用卡。境外消费可能产生货币转换手续费、汇率差，具体标准请咨询发卡银行。
              </div>
            </li>
          </ul>
        </div>
      </collapseTransition>
    </div>
  </div>
</template>
<script>
import orderApi from "@/api/orderCompletion.js";
import collapseTransition from "@/assets/js/collapse";
import choiceCityComHead from "@/components/common/choiceCityComHead"; //顶部
import carDetails from "@/components/common/carDetails";
import logos from "@/assets/js/common";
import { common } from "@/assets/mixin/common";
export default {
  components: {
    collapseTransition,
    choiceCityComHead,
    carDetails
  },
  mixins: [common],
  data() {
    return {
      details: {}, //订单详情
      serverTime: "", //服务器时间
      timetoPay: "", //待支付时间
      timeOut: false, //支付时间是否超时
      showsBoxCharges: false, //在对哪个模块进行展开搜索操作
      showsBoxDriver: false,
      showsBoxHints: false,
      showsBoxPrompt: false,
      surplusTime: "",
      loadingNum: 0
    };
  },
  watch: {
    loadingNum(newValue, oldValue) {
      if (newValue == 2) {
        this.$loadingToast.close();
      }
    }
  },
  methods: {
    // 获取订单车辆信息
    getCardetails() {
      orderApi
        .getCardetails(this.$route.query.guid)
        .then(res => {
          if (res.ErrorCode == 0) {
            if (res.Result[0]) {
              this.$store.state.detailBrands = logos.getBrandLogo(
                res.Result[0].brands
              );
              // //取车地址
              this.$store.state.picAddress =
                res.Result[0].pickuplocation_details.description_location_name;
              // //还车地址
              this.$store.state.reAddress =
                res.Result[0].returnlocation_details.description_location_name;

              // //车辆图片地址
              this.$store.state.image_path = res.Result[0].image_path;
              // //车辆简介
              this.$store.state.short_description =
                res.Result[0].short_description;
              // //乘客数量
              this.$store.state.num_adult_passengers =
                res.Result[0].num_adult_passengers;
              // //大行李数量
              this.$store.state.num_large_suitcase =
                res.Result[0].num_large_suitcase;
              // //小行李数量
              this.$store.state.num_small_suitcase =
                res.Result[0].num_small_suitcase;
              // //自动挡手动挡
              this.$store.state.transmission_type =
                res.Result[0].transmission_type == 1 ? "automatic" : "手动挡";
              this.$store.state.carDetails = res.Result[0];
            }
          } else {
            this.messageLayer(res.ErrorMsg);
          }
          loadingNum++;
        })
        .catch(err => {
          this.messageLayer("获取订单车辆信息失败");
        });
    },
    // 立即支付
    payment() {
      this.$router.push({
        path: "/onlinePay",
        query: {
          guid: this.details.guid
        }
      });
    },
    // 取消订单
    cancelOrder() {
      this.$router.push({
        path: "/cancelReserve",
        query: {
          guid: this.details.guid
        }
      });
    },
    // 再次预定
    reBooking() {
      this.$router.push("/");
    },
    // 删除订单
    deleteOrder() {
      this.$loadingToast.show();
      orderApi
        .delOrder(this.$route.query.guid)
        .then(res => {
          this.$loadingToast.close();
          if (res.ErrorCode == 0) {
            this.messageLayer("删除成功");
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          } else {
            this.messageLayer("删除失败");
          }
        })
        .catch(res => {
          this.$loadingToast.close();
          this.messageLayer("删除失败");
        });
    },
    // 重新选车
    againChangeCar() {
      this.$router.push("/");
    },
    // 下载订单至本地
    downloadOrder() {},
    // 发送订单
    sendOrder() {
      this.$router.push({
        path: "/sendOut",
        query: {
          guid: this.details.guid
        }
      });
    },
    // 点击展开 收起
    clickOpen(val) {
      switch (val) {
        case "Charges":
          this.showsBoxCharges = !this.showsBoxCharges;
          break;
        case "Driver":
          this.showsBoxDriver = !this.showsBoxDriver;
          break;
        case "Hints":
          this.showsBoxHints = !this.showsBoxHints;
          break;
        case "Prompt":
          this.showsBoxPrompt = !this.showsBoxPrompt;
          break;

        default:
          break;
      }
    },
    // 获取订单详情
    orderDetail() {
      orderApi
        .orderDetail(this.$route.query.guid)
        .then(res => {
          if (res.ErrorCode == 0) {
            this.details = res.Result[0];
            // //取车日期
            this.$store.state.pickupDate = this.details.pickup_datetime.substring(
              0,
              this.details.pickup_datetime.indexOf("T")
            );
            // //取车时间
            this.$store.state.pickupTime = this.details.pickup_datetime.split(
              "T"
            )[1];
            // //取车周几
            this.$store.state.pickupdayofweek = this.details.pickup_week;
            // //还车日期
            this.$store.state.reDate = this.details.return_datetime.split(
              "T"
            )[0];
            // //还车时间
            this.$store.state.reTime = this.details.return_datetime.split(
              "T"
            )[1];
            // //还车周几
            this.$store.state.returndayofweek = this.details.return_week;
            // //租借天数
            this.$store.state.dayspan = this.details.usecar_time;
            this.serverDate(); //获取服务器时间
          } else {
            this.messageLayer(res.ErrorMsg);
          }
          loadingNum++;
        })
        .catch(res => {
          this.messageLayer("获取订单详情失败");
        });
    },
    // 获取服务器时间
    serverDate() {
      orderApi
        .serverDate()
        .then(res => {
          if (res.ErrorCode == 0) {
            this.serverTime = res.Result;
            this.countTimeDiff();
          } else {
            this.messageLayer(res.ErrorMsg);
          }
        })
        .catch(res => {
          this.messageLayer("获取服务器时间失败");
        });
    },
    countTimeDiff() {
      let time1 = new Date(this.serverTime).getTime(); //服务器时间
      let time2 = new Date(this.details.post_time).getTime(); //下单时间
      let difference = time1 - time2; //服务器和下单时间差
      let considerTime = 45 * 60 * 1000;
      this.surplusTime = considerTime - difference;
      if (this.surplusTime <= 0) {
        this.timeOut = true;
        // this.messageLayer('超时')
      } else {
        this.countTime();
      }
    },
    countTime() {
      var totalSeconds = parseInt(this.surplusTime / 1000);
      //取模（余数）
      var modulo = totalSeconds % (60 * 60 * 24);
      modulo = modulo % (60 * 60);
      //分钟
      var minutes = Math.floor(modulo / 60);
      //秒
      var seconds = modulo % 60;
      //输出到页面
      let dates = minutes + "分钟" + seconds + "秒";
      this.timetoPay = dates; //待支付时间
      if (this.surplusTime < 1000) {
        this.timeOut = true;
        // this.messageLayer('已超时')
      } else {
        this.timeOut = false;
        this.surplusTime -= 1000;
        setTimeout(() => {
          return this.countTime();
        }, 1000);
      }
    }
  },
  mounted() {
    this.$loadingToast.show();
    this.$store.state.takeTransLat = this.$route.query.take.split(",")[0];
    this.$store.state.takeTransLng = this.$route.query.take.split(",")[1];
    this.$store.state.retTransLat = this.$route.query.ret.split(",")[0];
    this.$store.state.retTransLng = this.$route.query.ret.split(",")[1];
    this.orderDetail(); //获取订单详情
    this.getCardetails(); //获取订单车辆信息
  }
};
</script>
<style lang="less" scoped>
.orderInfo-page {
  background: #f3f3f5;
  .titleCharges {
    border-bottom: 1px solid #cecece;
    padding: 0 0.41rem 0 0.42rem;
    height: 0.89rem;
    line-height: 0.89rem;
    font-size: 0.36rem;
    img {
      float: right;
      width: 0.37rem;
      height: 0.19rem;
      margin-top: 0.38rem;
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transition: transform 0.5s;
    }
    .img-inverse {
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transition: transform 0.5s;
    }
  }
  .info-page-title {
    background-color: #57585a;
    .title-info {
      padding: 0.48rem 0.41rem 0.45rem 0.42rem;
      border-bottom: 1px solid #7c7d7f;
      .title-name {
        .names {
          height: 0.38rem;
          line-height: 0.38rem;
          font-size: 0.36rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          float: left;
        }
        .title-cost {
          float: right;
          color: #ffcc00;
          font-size: 0.38rem;
          span {
            color: #ffcc00;
            font-size: 0.14rem;
          }
        }
      }
      .payment-time {
        margin-top: 0.28rem;
        font-weight: 400;
        line-height: 0.32rem;
        font-size: 0.18rem;
        color: rgba(255, 255, 255, 1);
        .times {
          color: #ff0000;
        }
      }
      .odd-numbers {
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.36rem;
        font-weight: 400;
        color: rgba(255, 204, 0, 1);
      }
      .numbers {
        margin-top: 0.28rem;
        height: 0.18rem;
        line-height: 0.18rem;
        font-size: 0.18rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .cancelled {
        height: 0.42rem;
        line-height: 0.42rem;
        background: url(../../assets/images/cancelImg.png) no-repeat;
        background-size: 0.41rem;
        padding-left: 0.63rem;
        font-size: 0.36rem;
        font-weight: 400;
        color: rgba(255, 204, 0, 1);
      }
    }
    .cancelled-btn {
      padding: 0.33rem 0.4rem 0.3rem 0.4rem;
      .btn {
        width: 3.17rem;
        text-align: center;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
      }
      .del-btn {
        background: linear-gradient(
          0deg,
          rgba(243, 243, 245, 1),
          rgba(255, 255, 255, 1)
        );
        box-shadow: 0rem 0.05rem 0.24rem 0rem rgba(0, 0, 0, 0.26);
        border-radius: 0.1rem;
        float: left;
        margin-right: 0.17rem;
      }
      .re-btn {
        background: linear-gradient(
          0deg,
          rgba(255, 186, 0, 1),
          rgba(255, 204, 0, 1)
        );
        box-shadow: 0rem 0.05rem 0.24rem 0rem rgba(0, 0, 0, 0.26);
        border-radius: 0.1rem;
        float: right;
        margin-left: 0.17rem;
      }
    }
    .title-btn {
      padding: 0.4rem 0.41rem 0.36rem 0.4rem;
      .btn {
        width: 100%;
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
        border-radius: 0.1rem;
        background: linear-gradient(
          0deg,
          rgba(255, 186, 0, 1),
          rgba(255, 204, 0, 1)
        );
        box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
      }
      p {
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(150, 156, 163, 1);
        margin-top: 0.28rem;
      }
      .down-btn {
        margin-top: 0.27rem;
        height: 0.3rem;
        font-size: 0.3rem;
        font-weight: 400;
        span:nth-child(1) {
          color: rgba(255, 255, 255, 1);
          float: left;
        }
        span:nth-child(2) {
          color: #969ca3;
          float: right;
        }
      }
    }
  }
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
  .important-hints {
    margin-top: 0.21rem;
    background-color: #fff;
    .hints-info {
      padding: 0.32rem 0.42rem 0.62rem 0.41rem;
      ul {
        li {
          margin-bottom: 0.72rem;
          div {
            color: #969ca3;
            font-size: 0.24rem;
            line-height: 0.48rem;
            p {
              display: inline-block;
              width: 0.24rem;
              text-align: center;
              height: 0.24rem;
              line-height: 0.24rem;
              background: rgba(88, 89, 91, 1);
              border-radius: 50%;
              color: #fff;
              font-size: 0.18rem;
            }
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
