<template>
  <div class="order-page" @click="clickPage">
    <choiceCityComHead title="填写订单信息" style="border-bottom:1px solid #CFCFCF"></choiceCityComHead>
    <carDetails></carDetails>
    <!-- ==============================填写驾驶人信息============================================= -->
    <div class="fill-in-modol">
      <div class="fill-in-driversMessage-title form-group">
        <span>驾驶人信息</span>
        <span class="spancolor-hui">驾驶员姓名须与驾照、护照拼音/英文一致</span>
        <img
          src="@/assets/images/driversicon.png"
          v-if="$store.state.isLogined"
          alt
          @click="openDriver"
        >
      </div>
      <div
        class="fill-in-driversMessage-change form-group"
        @click="openDriver"
        v-if="!$store.state.isLogined"
      >
        <span>选择常用驾驶人</span>
        <img src="@/assets/images/select.png" alt>
        <span class="notLogged">登录后可选择常用驾驶人</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          name
          v-model="fillInInfo.name"
          class="form-control"
          placeholder="英文名或拼音*"
          onkeyup="value=value.replace(/[^a-zA-Z]/g,'')"
          style="text-transform:Uppercase"
        >
      </div>
      <div class="form-group">
        <input
          type="text"
          name
          v-model="fillInInfo.surname"
          class="form-control"
          placeholder="英文姓或拼音*"
          onkeyup="value=value.replace(/[^a-zA-Z]/g,'')"
          style="text-transform:Uppercase"
        >
      </div>
      <div class="form-group age-group" @click.stop="openAge">
        <span v-if="!fillInInfo.age">年龄*</span>
        <span class="age-span">{{this.fillInInfo.age}}</span>
        <img src="@/assets/images/select.png" alt>
        <div v-if="isOpenAge">
          <ul>
            <li @click.stop="changeAge('25+')">25+</li>
            <li @click.stop="changeAge('20-24')">20-24</li>
            <li @click.stop="changeAge('18-19')">18-19</li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="fillInInfo.email"
          placeholder="Email(用于接受确认单邮件)*"
        >
      </div>
      <div class="form-group code-group">
        <p @click.stop="openCode" class="codeP">
          +
          <!-- <input type="text" v-model="fillInInfo.areacode" disabled> -->
          <span>{{fillInInfo.areacode}}</span>
          <img src="@/assets/images/bot-jiao.png" :class="{'detailsinverse':isOpenCode}" alt>
        </p>
        <input
          type="text"
          class="form-control tel-input"
          v-model="fillInInfo.phone"
          placeholder="电话(用于接受订单信息及紧急信息)*"
          onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
        >
        <div style="clear:both"></div>
        <div v-if="isOpenCode" class="code-list-box">
          <ul>
            <li v-for="(item,index) in codeList" :key="index" @click.stop="changeCode(item)">
              <span>{{item.cnName}}</span>
              <span>+{{item.mobileCode}}</span>
              <div style="clear:both"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="fill-in-driversMessage-tips form-group" @click="openDeatils">
        <span>如填写更多详细信息，请点击展开</span>
        <img src="@/assets/images//bot-jiao.png" :class="{'imginverse':isDetailsShow}" alt>
      </div>
      <collapseTransition>
        <div v-if="isDetailsShow" class="details-box">
          <div class="form-group gold-group">
            <input
              type="text"
              class="form-control"
              v-model="fillInInfo.goldcardnum"
              placeholder="Hertz金卡号"
            >
            <span class="special" @click.stop="gotoGold">注册成为Hertz金卡</span>
          </div>
          <div class="form-group age-group" @click.stop="openAir">
            <span v-if="!fillInInfo.airlinecompany">航空公司</span>
            <span class="age-span">{{this.fillInInfo.airlinecompany}}</span>
            <img src="@/assets/images/bot-jiao.png" :class="{'detailsinverse':isOpenAir}" alt>
            <div v-if="isOpenAir">
              <ul>
                <li
                  v-for="(item,index) in airList"
                  :key="index"
                  @click.stop="changeAir(item)"
                >{{item.title}}</li>
              </ul>
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              name
              v-model="fillInInfo.passengernum"
              class="form-control"
              placeholder="常旅客号"
            >
          </div>

          <div class="form-group code-group">
            <p @click.stop="opencontactCode" class="codeP">
              +
              <!-- <input type="text" v-model="fillInInfo.emergencycontactcode" disabled> -->
              <span>{{fillInInfo.emergencycontactcode}}</span>
              <img
                src="@/assets/images/bot-jiao.png"
                :class="{'detailsinverse':isOpencontactCode}"
                alt
              >
            </p>
            <input
              type="text"
              class="form-control tel-input"
              v-model="fillInInfo.emergencycontacttel"
              placeholder="电话(便于紧急情况下联系)"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
            >
            <div style="clear:both"></div>
            <div v-if="isOpencontactCode" class="code-list-box">
              <ul>
                <li
                  v-for="(item,index) in codeList"
                  :key="index"
                  @click.stop="changecontactCode(item)"
                >
                  <span>{{item.cnName}}</span>
                  <span>+{{item.mobileCode}}</span>
                  <div style="clear:both"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </collapseTransition>
      <div
        class="save-btn"
        @click="saveDriver"
        v-if="$store.state.isLogined&&(isModifyN||isModifyS||isModifyA||isModifyE||isModifyAR||isModifyP||isModifyG||isModifyAIR||isModifyPA||isModifyEM||isModifyEME)"
      >保存驾驶人至常用驾驶人</div>
    </div>
    <!-- ==============================填写航班信息============================================= -->
    <div class="fill-in-modol">
      <div class="fill-in-driversMessage-title form-group">
        <span>航班信息</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          name
          class="form-control"
          v-model="fillInInfo.airlinecode"
          placeholder="到达航班号（方便为您预留车辆）"
        >
      </div>
      <div class="aviation-tips">
        注：提供到达航班号，如果航班延误导致取车时间推迟，我们
        会为您安排修改时间。
      </div>
    </div>
    <!-- ==============================填写优惠券============================================= -->
    <div class="fill-in-couponMessage fill-in-modol">
      <div class="fill-in-driversMessage-title form-group" @click="changeCoupon">
        <span class="coupon-name">优惠券</span>
        <p style="float:right;" v-if="number<=0">
          <i class="origin" v-if="$store.state.isLogined">{{aLen}}张可用</i>
          <i class="origin" v-if="!$store.state.isLogined">登录后可使用优惠券</i>
          <img src="@/assets/images/select.png" alt>
        </p>
        <div class="selected" v-if="number>0">已选中'{{number}}'张</div>
      </div>
      <div>
        <p class="counp-list" v-if="counpon.discountgu">
          {{counpon.discountgu}}
          <span @click="cancelCoupon('discountgu')">X</span>
        </p>
        <p class="counp-list" v-if="counpon.fulldiscountgu">
          {{counpon.fulldiscountgu}}
          <span @click="cancelCoupon('fulldiscountgu')">X</span>
        </p>
        <p class="counp-list" v-if="counpon.cdpgu">
          {{counpon.cdpgu}}
          <span @click="cancelCoupon('cdpgu')">X</span>
        </p>
        <p class="counp-list" v-if="counpon.pcgu">
          {{counpon.pcgu}}
          <span @click="cancelCoupon('pcgu')">X</span>
        </p>
      </div>
      <div class="noborder">
        <span>我有其他优惠券</span>
      </div>

      <div class="form-group">
        <input
          type="text"
          name
          v-if="number<2&&$store.state.isLogined"
          class="form-control discount-code"
          placeholder="优惠券代码"
          v-model="couponCode"
          @blur="testCoupon"
        >
        <p class="no-used" v-show="noUsedTps">优惠券代码不可用</p>
        <div class="locked" v-if="number==2||!$store.state.isLogined">
          <img src="@/assets/images/locked.png" alt>
        </div>
      </div>
    </div>
    <!-- tips -->
    <div class="Agreement">
      注：点击提交订单即表示我已经阅读并接受
      <span @click="gotoClause">《赫兹租车条款和条件》</span>
    </div>
    <div class="elastic-frame" v-if="elastic" @click="closeElastic"></div>
    <div :class="['driver-list-box',driverListShow?'shows':'']">
      <div class="driver-list-title">选择驾驶人</div>
      <div class="driver-list">
        <span v-if="driverList.length==0">}您还没有添加常用驾驶人，立即添加常用驾驶人</span>
        <ul v-if="driverList.length>0">
          <li
            v-for="(item,index) in driverList"
            :key="index"
            @click.stop="changeDriver(item,index)"
          >
            <p>{{item.name}}{{item.surname}}</p>
            <p>
              <span>+{{item.areacode}}</span>
              <span>{{item.phone}}</span>
            </p>
            <img src="@/assets/images/change-pencil.png" alt>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['cost-box',costBoxShow?'shows':'',]">
      <div class="cost-box-title">费用明细</div>
      <div class="cost-box-info">
        <div v-if="priceInfo.isonline">
          <p>
            <span>在线支付包含</span>
            <span>
              <span class="leftSpan">{{priceInfo.fromcurrencycode}}&nbsp;{{priceInfo.online}}</span>
              <span class="rightSpan">约{{priceInfo.tocurrencycode}}&nbsp;{{priceInfo.onlinecny}}</span>
            </span>
          </p>
          <ul class="insurance-ul">
            <li v-for="(item,index) in onlineInsurance" :key="index">{{item}}</li>
          </ul>
        </div>
        <div
          v-if="isReturnfare||rateParams.portablegps>0||rateParams.infantchildseat>0||rateParams.boosterseat>0||additional.length>0"
        >
          <p>
            <span>到店支付包含</span>
            <span>
              <span
                class="modal-body-leftSpan"
              >{{priceInfo.fromcurrencycode}}&nbsp;{{priceInfo.offline}}</span>
            </span>
          </p>
          <ul class="insurance-ul">
            <li v-for="(item,index) in additional" :key="'a'+index">{{item}}</li>
            <li
              v-for="(item,index) in onlineInsurance"
              :key="index"
              v-if="couponParams.type==2&&onlineInsurance"
            >{{item}}</li>
            <!-- 额外服务 -->
            <li v-if="isReturnfare">异地还车费</li>
            <li v-if="rateParams.portablegps>0">GPS</li>
            <li v-if="rateParams.infantchildseat>0">婴儿座椅 X {{rateParams.infantchildseat}}</li>
            <li v-if="rateParams.childtoddlerseat>0">幼儿座椅 X {{rateParams.childtoddlerseat}}</li>
            <li v-if="rateParams.boosterseat>0">儿童座椅 X {{rateParams.boosterseat}}</li>
          </ul>
        </div>
        <div
          v-if="isReturnfare||rateParams.portablegps>0||rateParams.infantchildseat>0||rateParams.boosterseat>0||additional.length>0"
        >
          <span class="tips">(门店服务的具体价格和库存需以门店为准，此处价格仅供参考，可能在门店加收额外税费)</span>
        </div>
        <div
          class="youhuiMessage"
          v-if="counpon.discountgu||counpon.fulldiscountgu||counpon.cdpgu||counpon.pcgu"
        >
          <p>优惠信息</p>
          <p class="discount-info" v-if="counpon.discountgu">{{counpon.discountgu}}</p>
          <p class="discount-info" v-if="counpon.fulldiscountgu">{{counpon.fulldiscountgu}}</p>
          <p class="discount-info" v-if="counpon.cdpgu">{{counpon.cdpgu}}</p>
          <p class="discount-info" v-if="counpon.pcgu">{{counpon.pcgu}}</p>
        </div>
        <div class="youhuiMessage last-div">
          <p v-if="counpon.discountgu||counpon.fulldiscountgu||counpon.cdpgu||counpon.pcgu">
            <span>优惠前价格</span>
            <span
              style="text-decoration: line-through;color:#9EA3AA"
            >{{priceInfo.fromcurrencycode}}&nbsp;{{priceInfo.befortotal}}</span>
          </p>
          <p class>
            <span>订单总额</span>
            <span class="origin">
              {{priceInfo.fromcurrencycode}}
              <span class="fot-38">{{priceInfo.aftertotal}}</span>
            </span>
          </p>
          <p class="last-p">约{{priceInfo.tocurrencycode}} {{priceInfo.aftertotalcny}}</p>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div class="page-footer-left">
        <p v-if="priceInfo.isonline">
          在线需付
          <br>
          {{priceInfo.fromcurrencycode}}
          <span>{{priceInfo.online}}</span>
          <br>
          约{{priceInfo.tocurrencycode}}
          <span>{{priceInfo.onlinecny}}</span>
        </p>
        <p
          v-if="isReturnfare||rateParams.portablegps>0||rateParams.infantchildseat>0||rateParams.boosterseat>0"
        >
          到店需付
          <br>
          约{{priceInfo.fromcurrencycode}}
          <span>{{priceInfo.offline}}</span>
        </p>
        <p @click="seeCost">
          费用
          <br>明细
        </p>
      </div>
      <div class="page-footer-right" @click="placeOrder">
        <p>
          预估总额
          <br>
          {{priceInfo.fromcurrencycode}}&nbsp;{{priceInfo.aftertotal}}
        </p>
        <p>{{oneClick?'提交订单':'确认订单下一步'}}</p>
      </div>
    </div>
    <!-- 优惠券页面 -->
    <couponPage
      :couponParams="couponParams"
      v-on:childByValue="childByValue"
      v-on:childByshow="childByshow"
      v-if="couponShows"
    ></couponPage>
  </div>
</template>
<script>
import orderApi from "@/api/orderCompletion.js";
import collapseTransition from "@/assets/js/collapse";
import couponPage from "@/components/fillInOrder/coupon";
import carDetails from "@/components/common/carDetails";
import choiceCityComHead from "@/components/common/choiceCityComHead";
import { common } from "@/assets/mixin/common";

export default {
  components: {
    collapseTransition,
    couponPage,
    carDetails,
    choiceCityComHead
  },
  mixins: [common],
  data() {
    return {
      codeList: [], //获取国际区号列表
      phoneVerification: null, //手机号验证正则
      phoneVerifications: null, //常用联系人手机号码验证正则
      fillInInfo: {
        guid: "", //常用驾驶人guid
        age: "", //年龄
        airlinecompany: "", //航空公司名称
        airlinecode: "", //航空公司代码
        areacode: "", //区号
        email: "", //邮箱
        emergencycontactname: "", //联系人姓名
        emergencycontacttel: "", //联系人电话
        emergencycontactcode: "", //联系人电话区号
        goldcardnum: "", //金卡号
        name: "", //名字
        passengernum: "", //常旅客号
        phone: "", //电话
        surname: "" //姓
      },
      isOpenAge: false,
      isOpenAir: false,
      isOpenCode: false, //国际区号列表
      isOpencontactCode: false, //紧急联系人国际区号
      elastic: false, //弹框
      driverListShow: false, //驾驶人列表
      costBoxShow: false, //费用明细弹框
      //驾驶人列表
      driverList: [],
      isOpenDetailed: false, //是否打开常用驾驶人详细信息
      oneClick: true, //提交订单是否是第一次点击
      isDetailsShow: false, //填写详情是否打开
      isModifyN: true, //驾驶人信息是否进行了修改  初始进入为true    true时候显示保存按钮
      isModifyS: true,
      isModifyA: true,
      isModifyE: true,
      isModifyAR: true, //区号是否修改
      isModifyP: true,
      isModifyG: false,
      isModifyAIR: false,
      isModifyPA: false,
      isModifyEM: false,
      isModifyEME: false,
      modifyIndex: "",
      rateParams: {
        //获取价格信息的参数
        guid: "", //保险 GUID
        infantchildseat: "", //婴儿座椅
        childtoddlerseat: "", //幼儿座椅
        boosterseat: "", //儿童座椅
        portablegps: "", //GPS
        discountguid: "", //  打折GUID
        fulldiscountguid: "", //满减GUID
        cdpguid: "", //CDP GUID
        pcguid: "" //PC GUID
      },
      priceInfo: {}, //获取到的价格信息
      // 获取优惠券     车型组件请往这里传数据
      couponParams: {
        type: Number(), //类型  1 线上   2 线下
        country_code: "", //国家
        brands: "", //使用品牌
        stroe: "", //取车门店
        sipp: "", //车型
        pickuptime: "", //取车时间
        returntime: "" //还车时间
      },
      aLen: Number(), //可用优惠券数量
      couponShows: false, //优惠券列表的显隐
      onlineInsurance: [], //在线支付保险
      isReturnfare: "", //异地还车保险费用
      counpon: {
        discountgu: "",
        fulldiscountgu: "",
        cdpgu: "",
        pcgu: ""
      },
      number: "", //已选中几张优惠券
      couponCode: "", //优惠券代码
      noUsedTps: false, //优惠券代码不可用提示
      airList: [], //航空公司列表
      isNext: true, //是否可以下一步  防止重复提交
      isSave: true, //保存常用联系人 防止重复提交
      loadingNum: 0,
      additional: [] //额外服务
    };
  },
  computed: {
    name() {
      return this.fillInInfo.name;
    },
    surname() {
      return this.fillInInfo.surname.toUpperCase();
    },
    age() {
      return this.fillInInfo.age;
    },
    email() {
      return this.fillInInfo.email;
    },
    areacode() {
      return this.fillInInfo.areacode;
    },
    phone() {
      return this.fillInInfo.phone;
    },
    // 金卡号
    goldcardnum() {
      return this.fillInInfo.goldcardnum;
    },
    airlinecompany() {
      return this.fillInInfo.airlinecompany;
    },
    // 常旅客号
    passengernum() {
      return this.fillInInfo.passengernum;
    },
    // 紧急联系人区号
    emergencycontactcode() {
      return this.fillInInfo.emergencycontactcode;
    },
    // 紧急联系人电话
    emergencycontacttel() {
      return this.fillInInfo.emergencycontacttel;
    }
  },
  watch: {
    name(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].name) {
          this.isModifyN = true;
        } else {
          this.isModifyN = false;
        }
      }
    },
    surname(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].surname) {
          this.isModifyS = true;
        } else {
          this.isModifyS = false;
        }
      }
    },
    age(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].age) {
          this.isModifyA = true;
        } else {
          this.isModifyA = false;
        }
      }
    },
    email(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].email) {
          this.isModifyE = true;
        } else {
          this.isModifyE = false;
        }
      }
    },
    areacode(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].areacode) {
          this.isModifyAR = true;
        } else {
          this.isModifyAR = false;
        }
      }
    },
    phone(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyP = true;
        } else {
          this.isModifyP = false;
        }
      }
    },
    goldcardnum(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyG = true;
        } else {
          this.isModifyG = false;
        }
      }
    },
    airlinecompany(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyAIR = true;
        } else {
          this.isModifyAIR = false;
        }
      }
    },
    passengernum(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyPA = true;
        } else {
          this.isModifyPA = false;
        }
      }
    },
    emergencycontactcode(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyEM = true;
        } else {
          this.isModifyEM = false;
        }
      }
    },
    emergencycontacttel(newValue, oldValue) {
      if (this.modifyIndex) {
        if (newValue != this.driverList[this.modifyIndex].phone) {
          this.isModifyEME = true;
        } else {
          this.isModifyEME = false;
        }
      }
    },
    loadingNum(newValue, oldValue) {
      if (newValue == 4) {
        this.$loadingToast.close();
      }
    }
  },
  methods: {
    // 跳转注册金卡
    gotoGold() {
      window.open("https://www.hertz.cn/rentacar/member/enrollment/skinnyGold");
    },
    // 获取航空公司列表
    getAirLine() {
      orderApi
        .getAirLine()
        .then(res => {
          if (res.ErrorCode == 0) {
            this.airList = res.Result;
          } else {
            this.messageLayer(res.ErrorMsg);
          }
          this.loadingNum++;
        })
        .catch(res => {
          this.airList = [];
          this.messageLayer("获取航空公司列表失败");
        });
    },
    // 取消优惠券
    cancelCoupon(val) {
      switch (val) {
        case "discountgu":
          this.counpon.discountgu = "";
          break;
        case "fulldiscountgu":
          this.counpon.fulldiscountgu = "";
          break;
        case "cdpgu":
          this.counpon.cdpgu = "";
          break;
        case "pcgu":
          this.counpon.pcgu = "";
          break;
        default:
          break;
      }
      let arr = [];
      if (this.counpon.discountgu) {
        arr.push(this.counpon.discountgu);
      }
      if (this.counpon.fulldiscountgu) {
        arr.push(this.counpon.fulldiscountgu);
      }
      if (this.counpon.cdpgu) {
        arr.push(this.counpon.cdpgu);
      }
      if (this.counpon.pcgu) {
        arr.push(this.counpon.pcgu);
      }
      this.number = arr.length;
    },
    // 获取保险信息
    getvehDetails() {
      orderApi
        .getvehDetails({
          guid: this.$route.query.guid ? this.$route.query.guid : ""
        })
        .then(res => {
          if (res.ErrorCode == 0) {
            let params =
              res.Result.insurance[
                this.$route.query.active
                  ? this.$route.query.active.split(",")[0]
                  : "0"
              ][
                this.$route.query.active
                  ? this.$route.query.active.split(",")[1]
                  : "0"
              ];
            this.rateParams.guid = params.param_guid; //获取价格信息 保险参数 GUID       通过获取保险信息之后 拿地址栏内的active 赋值给获取价格信息需要的guid 参数
            //tournumber存在 是在线支付 不存在是到店支付
            params.tournumber == ""
              ? (this.couponParams.type = 2)
              : (this.couponParams.type = 1);
            this.isReturnfare = params.returnfare; //异地还车保险
            this.onlineInsurance = params.inclusions.inclusions_cn.split(","); //在线支付保险
            this.additional = []; //额外服务
            for (let index = 0; index < this.onlineInsurance.length; index++) {
              if (
                this.onlineInsurance[index] == "额外驾驶人" ||
                this.onlineInsurance[index] == "燃油" ||
                this.onlineInsurance[index] == "高级道路救援"
              ) {
                this.additional.push(this.onlineInsurance[index]);
                this.onlineInsurance.splice(index, 1);
              }
            }
            this.couponParams.country_code = res.Result.country_code; //国家
            this.couponParams.brands = res.Result.returnlocation_details.brands; //使用品牌
            this.couponParams.stroe = res.Result.pickuplocation; //门店
            this.couponParams.sipp = res.Result.sipp; //车型
            this.couponParams.pickuptime = res.Result.pickupdatetime.replace(
              "T",
              ""
            ); //取车时间
            this.couponParams.returntime = res.Result.returndatetime.replace(
              "T",
              ""
            ); //还车时间
            if (this.$store.state.isLogined) {
              this.getCoupon(); //获取优惠券信息
            }
            this.rateParams.discountguid =
              "00000000-0000-0000-0000-000000000000"; //打折
            this.rateParams.fulldiscountguid =
              "00000000-0000-0000-0000-000000000000"; //满减
            this.rateParams.cdpguid = "00000000-0000-0000-0000-000000000000";
            this.rateParams.pcguid = "00000000-0000-0000-0000-000000000000";
            this.$store.state.detailBrands = pubMethod.getBrandLogo(
              res.Result.pickuplocation_details.brands
            ).images;
            // //取车日期
            this.$store.state.pickupDate = res.Result.pickupdatetime.substring(
              0,
              res.Result.pickupdatetime.indexOf("T")
            );
            // debugger;
            // //取车时间
            this.$store.state.pickupTime = res.Result.pickupdatetime.split(
              "T"
            )[1];
            // //取车周几
            this.$store.state.pickupdayofweek = res.Result.pickupdayofweek;
            // //还车日期
            this.$store.state.reDate = res.Result.returndatetime.split("T")[0];
            // //还车时间
            this.$store.state.reTime = res.Result.returndatetime.split("T")[1];
            // //还车周几
            this.$store.state.returndayofweek = res.Result.returndayofweek;
            // //租借天数
            this.$store.state.dayspan = res.Result.dayspan;
            this.$store.state.detailBrands = pubMethod.getBrandLogo(
              res.Result.pickuplocation_details.brands
            ).images;
            // //取车地址
            this.$store.state.picAddress =
              res.Result.pickuplocation_details.description_location_name;
            // //还车地址
            this.$store.state.reAddress =
              res.Result.returnlocation_details.description_location_name;

            // //车辆图片地址
            this.$store.state.image_path = res.Result.image_path;
            // //车辆简介
            this.$store.state.short_description = res.Result.short_description;
            // //乘客数量
            this.$store.state.num_adult_passengers =
              res.Result.num_adult_passengers;
            // //大行李数量
            this.$store.state.num_large_suitcase =
              res.Result.num_large_suitcase;
            // //小行李数量
            this.$store.state.num_small_suitcase =
              res.Result.num_small_suitcase;
            // //自动挡手动挡
            this.$store.state.transmission_type =
              res.Result.transmission_type == "automatic"
                ? "automatic"
                : "手动挡";
            this.$store.state.carDetails = res.Result;
            this.getrate(); //获取价格信息
          } else {
            this.messageLayer(res.ErrorMsg);
          }
        })
        .catch(res => {
          this.messageLayer("获取保险信息失败");
        });
    },
    // 优惠券接收组件参数 关闭
    childByshow(data) {
      this.couponShows = data;
    },
    // 选择优惠券guid 的参数 在这里接收
    childByValue(childValue) {
      // childValue就是子组件传过来的值
      this.rateParams.discountguid = childValue.discountguid
        ? childValue.discountguid
        : "00000000-0000-0000-0000-000000000000"; //打折
      this.rateParams.fulldiscountguid = childValue.fulldiscountguid
        ? childValue.fulldiscountguid
        : "00000000-0000-0000-0000-000000000000"; //满减
      this.rateParams.cdpguid = childValue.cdpguid
        ? childValue.cdpguid
        : "00000000-0000-0000-0000-000000000000";
      this.rateParams.pcguid = childValue.pcguid
        ? childValue.pcguid
        : "00000000-0000-0000-0000-000000000000";
      let arr = [];
      this.counpon.discountgu = childValue.discountguidDes
        ? childValue.discountguidDes
        : " ";
      if (this.counpon.discountgu) {
        arr.push(this.counpon.discountgu);
      }
      this.counpon.fulldiscountgu = childValue.discountguidDes
        ? childValue.fulldiscountguidDes
        : " ";
      if (this.counpon.fulldiscountgu) {
        arr.push(this.counpon.fulldiscountgu);
      }
      this.counpon.cdpgu = childValue.discountguidDes
        ? childValue.cdpguidDes
        : " ";
      if (this.counpon.cdpgu) {
        arr.push(this.counpon.cdpgu);
      }

      this.counpon.pcgu = childValue.discountguidDes ? childValue.pcguDes : " ";
      if (this.counpon.pcgu) {
        arr.push(this.counpon.pcgu);
      }
      this.number = arr.length;
      this.getrate(); //获取价格信息
    },
    //获取优惠券信息
    getCoupon() {
      orderApi
        .getCoupon(this.couponParams)
        .then(res => {
          // this.loadingNum++;
          if (res.ErrorCode == 0) {
            this.couponList = res.Result;
            if (this.couponList) {
              this.aLen =
                this.couponList.available.group0.length +
                this.couponList.available.group1.length;
            } else {
              this.aLen = 0;
            }
          } else {
            this.messageLayer(res.ErrorMsg);
          }
        })
        .catch(res => {
          this.messageLayer("获取优惠券信息失败");
        });
    },
    // 获取价格信息
    getrate() {
      this.rateParams.infantchildseat = this.$route.query.facility
        ? this.$route.query.facility.split(",")[0]
        : "0"; //婴儿座椅
      this.rateParams.childtoddlerseat = this.$route.query.facility
        ? this.$route.query.facility.split(",")[1]
        : "0"; //幼儿座椅
      this.rateParams.boosterseat = this.$route.query.facility
        ? this.$route.query.facility.split(",")[2]
        : "0"; //儿童座椅
      this.rateParams.portablegps = this.$route.query.facility2
        ? this.$route.query.facility2
        : "0"; //GPS
      orderApi
        .getrate(this.rateParams)
        .then(res => {
          this.loadingNum++;
          if (res.ErrorCode == 0) {
            this.priceInfo = res.Result;
          } else {
            this.messageLayer(res.ErrorMsg);
          }
        })
        .catch(res => {
          this.priceInfo = {};
          this.loadingNum++;
          this.messageLayer("获取价格信息失败");
        });
    },
    clickPage() {
      this.isOpenAge = false; //年龄列表
      this.isOpenCode = false; //国际区号列表
      this.isOpencontactCode = false;
      this.isOpenAir = false;
    },
    // 获取国际区号列表
    getAreacode() {
      orderApi
        .getAreacode()
        .then(res => {
          if (res.ErrorCode == 0) {
            this.codeList = res.Result;
            this.fillInInfo.areacode = this.codeList[0].mobileCode;
            this.fillInInfo.emergencycontactcode = this.codeList[0].mobileCode;
            this.phoneVerification = eval(
              this.codeList[0].Regex.replace("\\/", "/").replace("\\/", "/")
            );
            this.phoneVerifications = eval(
              this.codeList[0].Regex.replace("\\/", "/").replace("\\/", "/")
            );
          } else {
            this.messageLayer(res.ErrorMsg);
          }
          this.loadingNum++;
        })
        .catch(res => {
          this.messageLayer("获取国际区号列表失败");
        });
    },
    // 打开关闭年龄选择
    openAge() {
      this.isOpenAge = !this.isOpenAge;
    },
    // 打开航空公司选择
    openAir() {
      this.isOpenAir = !this.isOpenAir;
    },
    // 选择航空公司
    changeAir(val) {
      this.fillInInfo.airlinecompany = val.title;
      this.isOpenAir = false;
    },
    // 选择年龄
    changeAge(val) {
      this.fillInInfo.age = val;
      this.isOpenAge = false;
    },
    // 打开详细信息填写
    openDeatils() {
      this.isDetailsShow = !this.isDetailsShow;
    },
    // 打开关闭国际区号列表
    openCode() {
      this.isOpenCode = !this.isOpenCode;
    },
    // 打开关闭紧急联系人国际区号列表
    opencontactCode() {
      this.isOpencontactCode = !this.isOpencontactCode;
    },
    // 选择国际区号
    changeCode(item) {
      this.fillInInfo.areacode = item.mobileCode;
      this.phoneVerification = eval(
        item.Regex.replace("\\/", "/").replace("\\/", "/")
      );
      this.isOpenCode = false;
    },
    // 选择常用联系人国际区号
    changecontactCode(item) {
      this.fillInInfo.emergencycontactcode = item.mobileCode;
      this.phoneVerifications = eval(
        item.Regex.replace("\\/", "/").replace("\\/", "/")
      );
      this.isOpencontactCode = false;
    },
    // 获取常用驾驶人列表
    getDriverList() {
      if (this.$store.state.isLogined) {
        orderApi
          .getDriverList()
          .then(res => {
            if (res.ErrorCode == 0) {
              this.driverList = res.Result;
            } else {
              this.messageLayer(res.ErrorMsg);
            }
            this.loadingNum++;
          })
          .catch(res => {
            this.loadingNum++;
            this.messageLayer("获取常用驾驶人列表失败");
          });
      } else {
        this.loadingNum++;
      }
    },
    // 添加常用驾驶人接口
    addDriver(data) {
      if (this.isSave) {
        this.isSave = false;
        orderApi
          .addDriver(data)
          .then(res => {
            if (res.ErrorCode == 0) {
              this.messageLayer("保存成功");
              this.getDriverList();
            } else {
              this.messageLayer(res.ErrorMsg);
            }
            this.isSave = true;
          })
          .catch(res => {
            this.messageLayer("保存失败");
            this.isSave = true;
          });
      }
    },
    // 打开驾驶人列表
    openDriver() {
      if (this.$store.state.isLogined) {
        this.elastic = this.driverListShow = true;
      } else {
        this.$router.push("/login");
      }
    },
    // 选择驾驶人
    changeDriver(item, index) {
      this.elastic = false; //弹框
      this.driverListShow = false; //驾驶人列表框

      this.fillInInfo.guid = item.guid; //常用驾驶人guid
      this.fillInInfo.age = item.age; //年龄
      this.fillInInfo.airlinecompany = item.airlinecompany; //航空公司名称
      this.fillInInfo.airlinecode = item.airlinecode; //航空公司代码
      this.fillInInfo.areacode = item.areacode; //区号
      this.fillInInfo.email = item.email; //邮箱
      this.fillInInfo.emergencycontactname = item.emergencycontactname; //联系人姓名
      this.fillInInfo.emergencycontacttel = item.emergencycontacttel; //联系人电话
      this.fillInInfo.emergencycontactcode = item.emergencycontactcode; //联系人电话区号
      this.fillInInfo.goldcardnum = item.goldcardnum; //金卡号
      this.fillInInfo.name = item.name; //名字
      this.fillInInfo.passengernum = item.passengernum; //常旅客号
      this.fillInInfo.phone = item.phone; //电话
      this.fillInInfo.surname = item.surname; //姓

      this.isModifyN = false;
      this.isModifyS = false;
      this.isModifyA = false;
      this.isModifyE = false;
      this.isModifyAR = false;
      this.isModifyP = false;
      this.isModifyG = false;
      this.isModifyAIR = false;
      this.isModifyPA = false;
      this.isModifyEM = false;
      this.isModifyEME = false;
      this.modifyIndex = index;
    },
    // 保存驾驶人信息
    saveDriver() {
      if (!this.fillInInfo.name) return this.messageLayer("请输入英文名或拼音");
      if (!this.fillInInfo.surname)
        return this.messageLayer("请输入英文姓或拼音");
      if (!this.fillInInfo.age) return this.messageLayer("请选择年龄");
      if (!this.fillInInfo.email) return this.messageLayer("请输入邮箱");
      if (
        this.fillInInfo.email &&
        !/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(
          this.fillInInfo.email
        )
      )
        return this.messageLayer("邮箱格式错误，请重新输入");
      if (!this.fillInInfo.phone) return this.messageLayer("请输入电话");
      if (!this.phoneVerification.test(this.fillInInfo.phone))
        return this.messageLayer("电话格式错误，请重新输入");
      let data = {
        name: this.fillInInfo.name,
        surname: this.fillInInfo.surname,
        email: this.fillInInfo.email,
        phone: this.fillInInfo.phone,
        airlinecode: this.fillInInfo.airlinecode,
        airlinecompany: this.fillInInfo.airlinecompany,
        areacitycode: "+" + this.fillInInfo.areacode,
        emergencycontactcode: "+" + this.fillInInfo.emergencycontactcode,
        emergencycontactname: this.fillInInfo.emergencycontactname,
        emergencycontacttel: this.fillInInfo.emergencycontacttel,
        goldcardnum: this.fillInInfo.goldcardnum,
        guid: this.fillInInfo.guid,
        passengernum: this.fillInInfo.passengernum
      };
      this.addDriver(data);
    },
    // 选择优惠券
    changeCoupon() {
      if (this.$store.state.isLogined) {
        if (this.aLen > 0) {
          this.couponShows = true;
        }
      } else {
        this.$router.push("/login");
      }
    },
    // 关闭弹框
    closeElastic() {
      this.elastic = false;
      if (this.driverListShow) return (this.driverListShow = false);
      if (this.costBoxShow) return (this.costBoxShow = false);
    },

    // 跳转条款页面 查看条款和条件
    gotoClause() {
      this.$router.push("/clause");
    },
    // 查看费用明细
    seeCost() {
      this.elastic = !this.elastic;
      this.costBoxShow = !this.costBoxShow;
    },
    // 验证优惠券代码
    testCoupon() {
      if (this.couponCode) {
        let params = this.couponParams;
        params.coupon_code = this.couponCode;
        orderApi
          .couponInput(params)
          .then(res => {
            if (res.ErrorCode == 0) {
              if (this.couponParams.type == 1) {
                //线上    打折
                if (
                  res.Result.available.group0 &&
                  res.Result.available.group0.length > 0
                ) {
                  if (this.counpon.discountgu) {
                    this.noUsedTps = true;
                  } else {
                    this.noUsedTps = false;
                    this.rateParams.discountguid =
                      res.Result.available.group0[0].guid;
                    this.counpon.discountgu =
                      res.Result.available.group0[0].describe;
                  }
                }
                //线上    满减
                if (
                  res.Result.available.group1 &&
                  res.Result.available.group1.length > 0
                ) {
                  if (this.counpon.fulldiscountgu) {
                    this.noUsedTps = true;
                  } else {
                    this.noUsedTps = false;
                    this.rateParams.fulldiscountguid =
                      res.Result.available.group1[0].guid;
                    this.counpon.fulldiscountgu =
                      res.Result.available.group1[0].describe;
                  }
                }
              }
              if (this.couponParams.type == 2) {
                //线上    GDP
                if (
                  res.Result.available.group0 &&
                  res.Result.available.group0.length > 0
                ) {
                  if (this.counpon.cdpgu) {
                    this.noUsedTps = true;
                  } else {
                    this.noUsedTps = false;
                    this.rateParams.cdpguid =
                      res.Result.available.group0[0].guid;
                    this.counpon.cdpgu =
                      res.Result.available.group0[0].describe;
                  }
                }
                //线上    PC 组
                if (
                  res.Result.available.group1 &&
                  res.Result.available.group1.length > 0
                ) {
                  if (this.counpon.pcgu) {
                    this.noUsedTps = true;
                  } else {
                    this.noUsedTps = false;
                    this.rateParams.pcguid =
                      res.Result.available.group1[0].guid;
                    this.counpon.pcgu = res.Result.available.group1[0].describe;
                  }
                }
              }
            } else {
              this.messageLayer(res.ErrorMsg);
            }
          })
          .catch(res => {
            this.messageLayer("验证优惠券代码失效");
          });
      }
    },
    // 提交订单
    placeOrder() {
      if (!this.fillInInfo.name) return this.messageLayer("请输入英文名或拼音");
      if (!this.fillInInfo.surname)
        return this.messageLayer("请输入英文姓或拼音");
      if (!this.fillInInfo.age) return this.messageLayer("请选择年龄");
      if (!this.fillInInfo.email) return this.messageLayer("请输入邮箱");
      if (
        this.fillInInfo.email &&
        !/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(
          this.fillInInfo.email
        )
      )
        return this.messageLayer("邮箱格式错误，请重新输入");
      if (!this.fillInInfo.phone) return this.messageLayer("请输入电话");
      if (
        !this.phoneVerification.test(
          this.fillInInfo.areacode + this.fillInInfo.phone
        )
      )
        return this.messageLayer("电话格式错误，请重新输入");
      if (this.couponCode) {
        if (this.noUsedTps) return false;
      }
      if (this.fillInInfo.emergencycontacttel) {
        if (
          !this.phoneVerifications.test(
            this.fillInInfo.emergencycontactcode +
              this.fillInInfo.emergencycontacttel
          )
        ) {
          return this.messageLayer("紧急联系人电话格式错误，请重新输入");
        }
      }
      if (this.oneClick) {
        this.elastic = true;
        this.costBoxShow = true;
        this.oneClick = false;
      } else {
        let data = {
          guid: this.rateParams.guid, //保险 GUID
          infantchildseat: this.rateParams.infantchildseat, //婴儿座椅
          childtoddlerseat: this.rateParams.childtoddlerseat, //幼儿座椅
          boosterseat: this.rateParams.boosterseat, //儿童座椅
          portablegps: this.rateParams.portablegps, //GPS
          driverguid: this.fillInInfo.guid
            ? this.fillInInfo.guid
            : "00000000-0000-0000-0000-000000000000", //常用驾驶人GUID
          email: this.fillInInfo.email, //邮箱
          phonenumber: this.fillInInfo.phone, //联系电话
          areacitycode: "+" + this.fillInInfo.areacode, //国际区号
          givenname: this.fillInInfo.name, //英文名或拼音
          surname: this.fillInInfo.surname, //英文姓或拼音
          age: this.fillInInfo.age, //年龄
          goldcardnum: this.fillInInfo.goldcardnum, // 赫兹金卡号
          airlinecompany: this.fillInInfo.airlinecompany, //航空公司
          airlinecode: this.fillInInfo.airlinecode, //航空公司代码
          passengernum: this.fillInInfo.passengernum, //航空公司常旅客号
          emergencycontactname: this.fillInInfo.emergencycontactname, //紧急联系人
          emergencycontacttel: this.fillInInfo.emergencycontacttel, //紧急联系电话
          emergencycontactcode: "+" + this.fillInInfo.emergencycontactcode, //紧急联系电话区号
          cardcode: "", //卡类别代码
          cardnumber: "", // 卡号
          cardholderrph: "", // 信用卡cvc
          cardtype: 1, //卡类别   1 信用卡  2 储蓄卡
          cardexpiredate: "", //有效期
          discountguid: this.rateParams.discountguid, //打折GUID
          fulldiscountguid: this.rateParams.fulldiscountguid, //满减GUID
          cdpguid: this.rateParams.cdpguid, //CDP GUID
          pcguid: this.rateParams.pcguid, //PC GUID
          channel: "pc", //渠道（pc，phone，wechat,ios ,android）
          hotelmembershipid: "", //酒店常旅客号
          hotelcode: "", //酒店代码
          referenceid: "" //下单唯一标识
        };
        if (this.isNext) {
          this.isNext = false;
          this.$loadingToast.show();
          orderApi
            .submitOrder(data)
            .then(res => {
              this.$loadingToast.close();
              if (res.ErrorCode == 0) {
                if (this.priceInfo.isonline) {
                  // 跳转到在线支付页面
                  this.$router.push({
                    path: "/onlinePay",
                    query: {
                      guid: res.Result,
                      take: this.$route.query.take,
                      ret: this.$route.query.ret
                    }
                  });
                } else {
                  this.$router.push({
                    path: "/orderInfo",
                    query: {
                      guid: res.Result,
                      take: this.$route.query.take,
                      ret: this.$route.query.ret
                    }
                  });
                }
              } else {
                this.messageLayer(res.ErrorMsg);
              }
              this.isNext = true;
            })
            .catch(res => {
              this.$loadingToast.close();
              this.isNext = true;
              this.messageLayer("提交订单失败");
            });
        }
      }
    }
  },
  mounted() {
    this.$loadingToast.show();
    this.$store.state.takeTransLat = this.$route.query.take.split(",")[0];
    this.$store.state.takeTransLng = this.$route.query.take.split(",")[1];
    this.$store.state.retTransLat = this.$route.query.ret.split(",")[0];
    this.$store.state.retTransLng = this.$route.query.ret.split(",")[1];
    this.getAirLine(); //航空公司列表
    this.getDriverList(); //获取常用驾驶人列表
    this.getAreacode(); //获取国际区号列表
    this.getvehDetails(); //获取保险信息
  }
};
</script>
<style lang="less" scoped>
.order-page {
  font-size: 0.24rem;
  color: rgb(59, 68, 79);
  background-color: #f3f3f5;
  position: relative;
  padding-bottom: 1.23rem;
  .fill-in-modol {
    padding: 0.44rem 0.4rem;
    background: #fff;
    margin-top: 0.2rem;
    display: table;
    width: 100%;
    .fill-in-driversMessage-title {
      display: table;
      width: 100%;
      border-bottom: 0.02rem solid #cecece;
      padding-bottom: 0.1rem;
      span {
        float: left;
        margin-right: 0.2rem;
      }
      .spancolor-hui {
        color: #969ca3;
        display: inline-block;
        width: 3.96rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 0.23rem;
        height: 0.24rem;
        float: right;
        vertical-align: middle;
      }
      p {
        img {
          width: 0.13rem;
          height: 0.24rem;
          margin-left: 0.2rem;
          float: none;
          display: inline-block;
          margin-bottom: 0.04rem;
        }
      }
    }
    .aviation-tips {
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
      line-height: 0.36rem;
    }
    .noborder {
      border: none;
      margin-top: 0.15rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
      margin-bottom: 0.12rem;
    }
    .counp-list {
      height: 0.42rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
      line-height: 0.25rem;
      padding-bottom: 0.17rem;
      border-bottom: 1px solid #cfcfcf;
      margin-top: 0.15rem;
      position: relative;
      span {
        position: absolute;
        right: 0;
        color: #cecece;
      }
    }
    .counp-list:nth-child(1) {
      margin-top: 0.19rem;
      margin-bottom: 0.15rem;
    }
    .discount-code {
      border: 1px solid #cecece !important;
      padding-left: 0.15rem !important;
      padding-right: 0.15rem !important;
    }
    .fill-in-driversMessage-change {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 0.02rem solid #cecece;
      .notLogged {
        margin-right: 0.26rem;
        height: 0.23rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(255, 156, 0, 1);
        line-height: 0.23rem;
        float: right;
      }
      img {
        float: right;
        width: 0.12rem;
        height: 0.23rem;
        margin: 0;
        vertical-align: middle;
      }
    }
    .ages {
      input {
        height: calc(~"100% - 0.12rem");
      }
      img {
        float: right;
        width: 0.12rem;
        height: 0.23rem;
        margin: 0;
        vertical-align: middle;
      }
    }
    .form-group {
      display: table;
      width: 100%;
      margin-bottom: 0.1rem;
      .form-control {
        padding: 0.1rem 0;
        border: none;
        border-bottom: 1px solid #cecece;
        box-shadow: none;
        border-radius: 0;
        display: block;
        width: 100%;
        font-size: 0.24rem;
      }
      .form-control:focus {
        box-shadow: none !important;
      }
      .tel-input {
        width: 73%;
        float: right;
      }
      .origin {
        color: #ff9c00 !important;
        .fot-38 {
          color: #ff9c00;
        }
      }
      .coupon-name {
        margin-top: 0.06rem;
      }
      .selected {
        float: right;
        width: 1.96rem;
        text-align: center;
        height: 0.34rem;
        line-height: 0.34rem;
        border: 1px solid #ff9c00;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(255, 156, 0, 1);
        border-radius: 0.2rem;
      }
      .codeP {
        width: 20%;
        float: left;
        padding: 0.1rem 0;
        border-bottom: 1px solid #cecece;
        font-size: 0.24rem;
        span {
          font-size: 0.24rem;
          display: inline-block;
          width: 46%;
        }
        textarea:disabled,
        input:disabled {
          color: #333;
          background-color: #fff;
          color: #3b444f;
        }
        img {
          width: 0.25rem;
          height: 0.12rem;
          vertical-align: middle;
          display: inline-block;
          margin: 0;
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.5s;
        }
        .detailsinverse {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          transition: transform 0.5s;
        }
      }
    }
    .code-group {
      position: relative;
      .code-list-box {
        position: absolute;
        width: 100%;
        bottom: 1px solid #ff9c00;
        right: 0;
        top: 100%;
        height: 2rem;
        overflow-y: scroll;
        border: 1px solid #ff9c00;
        background: #fff;
        ul {
          li {
            padding: 0.1rem 0.2rem;
            span:nth-child(2) {
              float: right;
            }
          }
        }
      }
    }
    .age-group {
      position: relative;
      border-bottom: 1px solid #cecece;
      padding: 0.2rem 0 0.1rem 0;
      span {
        color: rgba(112, 114, 117, 1);
      }
      span:nth-child(2) {
        margin-left: 0.2rem;
      }
      .age-span {
        color: #333;
      }
      img {
        margin: 0;
        width: 0.12rem;
        height: 0.23rem;
        float: right;
      }
      div {
        position: absolute;
        right: 0;
        bottom: -1.32rem;
        border: 1px solid #ff9c00;
        height: 1.32rem;
        background: #fff;
        width: 100%;
        z-index: 1;
        overflow-y: scroll;
        ul {
          li {
            padding: 0.1rem 0.08rem;
            height: 0.44rem;
            line-height: 0.24rem;
          }
        }
      }
    }
    .fill-in-driversMessage-tips {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0;
      border-bottom: 0.02rem solid #cecece;
      img {
        width: 0.25rem;
        height: 0.12rem;
        vertical-align: middle;
        margin: 0;
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: transform 0.5s;
      }
      .imginverse {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transition: transform 0.5s;
      }
    }
    .details-box {
      .gold-group {
        position: relative;
      }
      .special {
        position: absolute;
        font-size: 0.18rem;
        color: #ff9c00;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
      }
      .age-group {
        div {
          height: 2rem;
          bottom: -2rem;
        }
      }

      img {
        width: 0.25rem;
        height: 0.12rem;
        vertical-align: middle;
        margin: 0;
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: transform 0.5s;
      }
      .detailsinverse {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transition: transform 0.5s;
      }
    }
    .save-btn {
      width: 100%;
      height: 0.84rem;
      line-height: 0.84rem;
      text-align: center;
      font-size: 0.3rem;
      border-radius: 0.1rem;
      margin-top: 0.4rem;
      border-radius: 0.1rem;
      background: linear-gradient(
        0deg,
        rgba(255, 186, 0, 1),
        rgba(255, 204, 0, 1)
      );
      box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
      border: none;
    }
  }
  .Agreement {
    padding: 0.4rem;
    // margin-bottom: 1.23rem;
  }

  .elastic-frame {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #000;
    opacity: 0.5;
  }
  .driver-list-box {
    z-index: 3;
    padding: 0 0.4rem;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    transition: all 0.3s;
    opacity: 0;
    .driver-list-title {
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      height: 0.95rem;
      line-height: 0.95rem;
      background-color: #ffcd00;
      text-align: center;
      font-size: 0.36rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
    }
    .driver-list {
      padding: 0 0.41rem 0.06rem 0.38rem;
      background-color: #fff;
      border-bottom-left-radius: 0.1rem;
      border-bottom-right-radius: 0.1rem;
      ul {
        li {
          padding: 0.31rem 0;
          border-bottom: 1px solid #cbced2;
          position: relative;
          img {
            width: 0.38rem;
            height: 0.38rem;
            position: absolute;
            right: 0;
            top: 0.47rem;
          }
          p {
            padding-left: 0.02rem;
            font-size: 0.24rem;
            height: 0.24rem;
            line-height: 0.24rem;
          }
          p:nth-child(1) {
            color: #3b444f;
            margin-bottom: 0.26rem;
          }
          p:nth-child(2) {
            span {
              color: #969ca3;
            }
          }
        }
        li:last-child {
          border: none;
        }
      }
    }
  }
  .cost-box {
    z-index: 3;
    padding: 0 0.4rem;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    transition: all 0.3s;
    opacity: 0;
    .cost-box-title {
      height: 0.95rem;
      line-height: 0.95rem;
      text-align: center;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      background-color: #ffcd00;
      color: #3b444f;
      font-size: 0.36rem;
      font-weight: 400;
    }
    .cost-box-info {
      padding: 0.37rem 0.4rem 0.39rem 0.4rem;
      background-color: #fff;
      .youhuiMessage {
        .discount-info {
          font-size: 0.18rem;
          font-weight: 400;
          color: rgba(150, 156, 163, 1);
          margin-bottom: 0.06rem;
        }
        p {
          margin-bottom: 0.16rem;
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
            font-size: 0.38rem;
          }
        }
      }
      div {
        display: table;
        width: 100%;
        margin-bottom: 0.37rem;
        font-size: 0.24rem;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.08rem;
        }
        .tips {
          height: 0.72rem;
          line-height: 0.3rem;
          color: #3b444f;
          font-size: 0.18rem;
        }
        .insurance-ul {
          li {
            float: left;
            color: #969ca3;
            border-right: 0.02rem solid #969ca3;
            padding: 0 0.12rem;
            height: 0.24rem;
            line-height: 0.24rem;
            margin-top: 0.08rem;
          }
          li:nth-child(1) {
            padding-left: 0;
          }
          li:last-child {
            border-right: none;
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
  .shows {
    transform: translateY(-1.57rem);
    opacity: 1;
  }
  .page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #ffd100;
    .page-footer-left {
      width: 64%;
      float: left;
      background: #ffd100;
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.4rem;
    }
    .page-footer-right {
      float: right;
      background: #58595b;
      padding: 0.2rem 0.4rem;
      width: 36%;
      float: right;
      color: #fff;
      p:nth-child(1) {
        color: #fff;
      }
      p:nth-child(2) {
        color: #ffd100;
      }
    }
  }
  .locked {
    width: 100%;
    height: 0.56rem;
    line-height: 0.56rem;
    vertical-align: middle;
    border: 1px solid rgba(206, 206, 206, 1);
    padding: 0.1rem 0.15rem;
    img {
      width: 0.24rem;
      height: 0.29rem;
    }
  }
  .no-used {
    color: #ff9c00;
    padding: 0.05rem 0;
  }
}
</style>
