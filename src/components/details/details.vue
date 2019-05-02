<template>
  <div class="detailPage-body" v-loading="loading">
    <div id="mhz">
      <!-- header -->
      <get-car-header></get-car-header>
      <div class="detailPage">
        <car-massage></car-massage>
        <!--套餐部分-->
        <div class="setMeal">
          <h2>套餐</h2>
          <ul class="setMeal-ul">
            <li v-for="(items,index) in insure" :class="showList[index].state" :key="index" @click="insureSelect(index)">
              <div class="setMeal-ul-liLeft">
                <p>{{$store.state.insureList[index].title}}&nbsp;&nbsp;<span v-show="index != 0" class="recommend">推荐保险</span></p>
                <p class="last-child-p"><span><span v-html="$store.state.insureList[index].content2"></span></span></p>
                <a href="javascript:void(0)" @click="showInsure"></a>
              </div>
              <p class="setMeal-ul-liRight" v-show="showList[index].state != 'active' && showList[index].state != 'on'"><span class="pPrice-price">+{{$store.state.unitMoney}} <i>{{showList[index].price.toFixed(2)}}</i></span> <span class="pPrice-data">元/天</span></p>
              <img src="../../../static/images/activeBg.png" alt="" class="choose-li" v-show="showList[index].state == 'on'">
            </li>
          </ul>
        </div>
        <!--额外服务-->
        <div class="setMeal">
          <h2>额外服务</h2>
          <ul class="setMeal-ul additionalServices">
            <li v-for="(items,index) in server" :class="(items.state)?'on':''">
              <span>{{items.name}}</span>
              <p class="switch-additionalServices">
                <el-switch @change="selectServer(index,items.code)"
                  v-model="items.state"
                  active-color="#ffcc00"
                  inactive-color="#cccccc">
                </el-switch>
              </p>
            </li>
          </ul>
        </div>
        <!--额外设备-->
        <div class="setMeal">
          <h2>额外设备</h2>
          <ul class="setMeal-ul additionalEquipment">
            <li><span>GPS</span>
              <span class="switch-additionalServices">
                <el-switch @change="gpsFunction"
                  v-model="$store.state.gpsMenu"
                  active-color="#ffcc00"
                  inactive-color="#cccccc">
                </el-switch>
              </span>
            </li>
            <li><span>儿童座椅</span>
              <span class="switch-additionalServices">
                <el-switch @change="childFunction"
                           v-model="childState"
                           active-color="#ffcc00"
                           inactive-color="#cccccc">
                </el-switch>
              </span>
            </li>
            <li v-show="childState">
              <dl>
                <span>婴儿座椅</span>
                <div class="inputNumber">
                  <a href="javascript:void(0)" class="inputMenu reduce" @click="reduce('child1')">-</a>
                  <a href="javascript:void(0)" class="childNumber">{{$store.state.equiChild1}}</a>
                  <a href="javascript:void(0)" class="inputMenu add" @click="add('child1')">+</a>
                </div>
              </dl>
              <dl>
                <span>幼儿座椅</span>
                <div class="inputNumber">
                  <a href="javascript:void(0)" class="inputMenu reduce" @click="reduce('child2')">-</a>
                  <a href="javascript:void(0)" class="childNumber">{{$store.state.equiChild2}}</a>
                  <a href="javascript:void(0)" class="inputMenu add" @click="add('child2')">+</a>
                </div>
              </dl>
              <dl>
                <span>儿童座椅</span>
                <div class="inputNumber">
                  <a href="javascript:void(0)" class="inputMenu reduce" @click="reduce('child3')">-</a>
                  <a href="javascript:void(0)" class="childNumber">{{$store.state.equiChild3}}</a>
                  <a href="javascript:void(0)" class="inputMenu add" @click="add('child3')">+</a>
                </div>
              </dl>
            </li>
            <li><span>支付方式</span>
              <div class="paymentDiv">
                <span :class="$store.state.payState=='online'?'onlinePayment on':'onlinePayment'" @click="payMode('online')" v-show="payOnline">在线支付</span>
                <span :class="$store.state.payState=='arrive'?'shopPayment on':'shopPayment'" @click="payMode('arrive')" v-show="payArrive">到店支付</span>
              </div>
            </li>
          </ul>
        </div>
        <!--驾照要求 订单条款-->
        <div class="driversTranslator requirements">
          <ul class="driversTranslator_ul" role="tablist" >
            <li role="presentation" :class="positionTab == 0?'active':''">
              <a href="javascript:void(0)" aria-controls="available" role="tab" data-toggle="tab"  @click="showPosition('available')">驾照要求</a>
            </li>
            <li role="presentation" :class="positionTab == 1?'active':''">
              <a href="javascript:void(0)" aria-controls="unavailable" role="tab" data-toggle="tab" @click="showPosition('unavailable')">订单条款</a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane driversTranslator-tab-pane active" id="available">
              <h3 class="tab-title">驾照要求</h3>
              <div class="available-box" v-html="license"></div>
            </div>
            <div role="tabpanel" class="tab-pane coupon-tab-pane" id="unavailable">
              <h3 class="tab-title">订单条款</h3>
              <div class="unavailable-box" v-html="terms"></div>
            </div>
          </div>
        </div>
      </div>
      <footer-price></footer-price>
    </div>
    <!--展示弹窗-->
    <el-dialog custom-class = "dialogInsureOuter"
               :visible.sync="dialogInsure"
               width="90%">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <th widt="40%">保险包含</th>
            <th widt="20%">基本险</th>
            <th widt="20%">全险</th>
            <th widt="20%">超级全险</th>
          </tr>
          <tr v-for="(items,index) in insList">
            <td v-for="(val,nIndex) in 4">
              <span v-if="nIndex == 0"><span>{{items.name}}</span><p>{{items.describe}}</p></span>
              <span v-else-if="nIndex == 1">{{items.basic}}</span>
              <span v-else-if="nIndex == 2">{{items.allrisks}}</span>
              <span v-else>{{items.super}}</span>
            </td>
          </tr>
        </table>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import apiRequest from '@/api/index'
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import FooterPrice from "../common/footer_price";
  import CarMassage from "../common/carDetails";
  import GetCarHeader from "../common/getCarHeader";

  Vue.use(ElementUI);



  export default {
    name: 'carDetails',
    components: {GetCarHeader, CarMassage, FooterPrice},
    data() {
      return {
        value2:true,
        carDetails:{},
        active:false,
        picAddress:"",
        reAddress:"",
        brands:"",
        pickupDate:"",
        pickupTime:"",
        reDate:"",
        reTime:"",
        //保单大类
        insure:[],
        insureIndex:0,
        selectIndex:null,
        //去重排序后保单小类
        server:[],
        //是否有额外服务
        serverState:false,
        //选中小类服务项
        submitCode:[],
        //选中小类服务项code
        selectArr:[],
        //保单项-----------------------------/
        insureList:[],
        //显示保单剩余价格 ------------------/
        showList:[
        ],
        //是否到店支付
        payArrive:false,
        //是否在线支付
        payOnline:false,
        //总价钱(每天)
        dayTotalbase:0,
        dayTotal:0,
        dayArriveTotal:0,
        dayRateTotal:0,
        dayRateArriveTotal:0,
        //总价钱(总天)
        allTotalbase:0,
        allTotal:0,
        allArriveTotal:0,
        allRateTotal:0,
        allRateArriveTotal:0,
        license:"",
        terms:"",
        payState:"online",
        payIndex:false,
        groupIndex:{},
        gpsMenu:false,
        childMenu:false,
        insureGuid:"",
        insureArriveGuid:"",
        insureRateState:false,
        //
        equiGps:0,
        equiChild1:0,
        equiChild2:0,
        equiChild3:0,
        //
        childState:false,
        //
        dialogVisible:false,
        //
        resultGroup:[],
        loading:false,
        dialogInsure:false,
        insList:[],
        mapShow:false,
        positionTab:0
      }
    },
    mounted() {
      this.init();

      window.onscroll = function () {
        if(window.body.scrollTop < document.getElementById("unavailable").offsetTop){

        }
      }
    },
    methods: {
      //获取url
      urlSearch: function () {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
          }
        }
      },
      myDate:function(date){
        var arr=date.split("T");
        var d=arr[0];
        var darr = d.split('-');

        var t=arr[1];
        var tarr = t.split('.000');
        var marr = tarr[0].split(':');
        //parseInt(darr[0])+"年"+
        var dd = parseInt(darr[1])+"月"+parseInt(darr[2])+"日"
        return dd;
      },
      myTime:function(date){
        var arr=date.split("T");
        var t=arr[1];
        var tarr = t.split('.000');
        var marr = tarr[0].split(':');
        var dateUnit =  "AM";
        var hour = parseInt(marr[0]);
        if(parseInt(marr[0]) >= 0 && parseInt(marr[0]) <= 12){
          dateUnit = "AM"
        }else{
          dateUnit = "PM"
          hour = hour - 12;
        }
        var dd = hour +":"+parseInt(marr[1])+" "+dateUnit
        return dd;
      },
      showLogoSrc: function (param) {
        return pubMethod.getBrandLogo(param).images
      },
      /**
       * 初始化
       */
      init:function(){
        var that = this;
        this.$loadingToast.show();
        let param = new this.urlSearch();
        param.take.split(",").forEach(function(value, index, array){
          switch (index) {
            case 0:
              that.$store.state.takeTransLat = value;
              break;
            case 1:
              that.$store.state.takeTransLng = value;
              break;
          }
        });
        param.ret.split(",").forEach(function(value, index, array){
          switch (index) {
            case 0:
              that.$store.state.retTransLat = value;
              break;
            case 1:
              that.$store.state.retTransLng = value;
              break;
          }
        });
        apiRequest.getVehicleDetails({
          guid: param.guid
        }).then(res => {
          var data= res.Result;
          this.$loadingToast.close();
          this.$store.state.carDetails = data;
          this.$store.state.image_path = data.image_path;
          this.$store.state.short_description = data.short_description
          this.$store.state.num_adult_passengers = data.num_adult_passengers
          this.$store.state.num_large_suitcase = data.num_large_suitcase
          this.$store.state.num_small_suitcase = data.num_small_suitcase
          this.$store.state.transmission_type = data.transmission_type
          this.$store.state.pickupdayofweek = data.pickupdayofweek
          this.$store.state.dayspan = data.dayspan
          this.$store.state.returndayofweek = data.returndayofweek
          this.$store.state.picAddress = data.pickuplocation_details.address;
          this.$store.state.reAddress = data.returnlocation_details.address;
          this.$store.state.detailBrands = this.showLogoSrc(data.pickuplocation_details.brands);
          this.$store.state.pickupDate = this.myDate(data.pickupdatetime);
          this.$store.state.pickupTime = this.myTime(data.pickupdatetime);
          this.$store.state.reDate = this.myDate(data.returndatetime);
          this.$store.state.reTime = this.myTime(data.returndatetime);
          this.$store.state.unitMoney = data.currencycode;
          this.paramBrans = data.pickuplocation_details.brands;
          this.paramCountry = data.pickuplocation_details.country;
          this.paramState = data.pickuplocation_details.state;

          this.detailMoney(res);
          this.requestIns();
          this.resClause(res);
          this.insureSelect(0);
        }).catch(err => {
          console.log(err)
        });
      },
      /**
       * 获取协议和条款
       * res 协议回调 object
       */
      resClause:function(res){
        var that = this;
        var data = res.Result;
        apiRequest.resClause({
          country: data.country_code,
          brands: data.insurance[0][0].country
        }).then(resClause => {
          var data = resClause.Result;
          that.license = data.Drivers_license;
          that.terms = data.Order_terms;
        })
      },
      /**
       * 获取保险信息回调
       * res 保险信息回调 object
       */
      detailMoney:function(res){
        var that = this;
        var data = res.Result;
        var insurance = data.insurance;
        insurance.forEach(function(value,index){
          that.insure.push(value);
        })

        that.insureObj();

        //模拟数据
        // this.insure[2][0].inclusions.inclusions_code = "LDW,SLI,PPP,AAO,Taxes/Fees";
        // this.insure[2][1].inclusions.inclusions_code = "LDW,SLI,PPP,Taxes/Fees";
        // this.insure[2][2].inclusions.inclusions_code = "LDW,SLI,PPP,AAO,FPO,PER,Taxes/Fees";
      },
      /**
       * 初始化小类
       */
      initState:function(){
        var that = this;
        var groupArr = this.getSumCount().group;
        if(this.server == null){
          if(arguments[0] == null){
            this.callBackState();
            this.emptySelect(groupArr)
          }else{
            this.emptySelect(groupArr,arguments[0])
          }
        }else{
          var showArr = [];
          this.server.forEach(function(value, index, array){
            showArr.push(value.code);
          })
          var initCode = this.server[0].code;
          if(showArr.length == 0){
            if(arguments[0] == null){
              this.callBackState();
              this.emptySelect(groupArr)
            }else{
              this.emptySelect(groupArr,arguments[0])
            }
          }else{
            this.server.forEach(function(value, index, array){
              that.server[index].state = false;
            })
            setTimeout(function(){
              if(arguments[0] == null){
                that.callBackState();
                that.selectServer(0,initCode);
              }else{
                that.selectServer(0,initCode,arguments[0])
              }
            },2000)
          }
        }
      },
      /**
       * 生成保单信息
       * @return{
             title: string 保单标题,
             content: string 保单信息1,
             content2: string 保单信息2,
             unit: string 保单国家单位,
             price: string 保单价格
       * }
       */
      insureObj:function(){
        var that = this;
        that.insure.forEach(function(value,index){
          var name = "";
          var setInsureStr = "";
          var setInsureStr2 = "";
          //获取title
          var getTitle = value[0].inclusions.title;
          var getContent = value[0].inclusions.inclusions_cn.split(",");
          var getContent2 = value[0].inclusions.inclusions_cn2.split(",");
          //获取单位
          var getUnit = "+"+value[0].currencycode;
          //获取价钱
          var getPrice = value[0].priceday;

          //获取content
          getContent.forEach(function(insuValue,insuIndex){
            if(insuIndex == 0){
              setInsureStr+= insuValue;
            }else{
              setInsureStr+= "<br />+ "+insuValue
            }
          })
          getContent2.forEach(function(insuValue,insuIndex){
            if(insuIndex == 0){
              setInsureStr2+= insuValue;
            }else{
              setInsureStr2+= "<br />+ "+insuValue
            }
          })
          that.$store.state.insureList.push({
            title:getTitle,
            content:getContent,
            content2:setInsureStr2,
            unit:getUnit,
            price:getPrice
          });
        })
      },
      /**
       * 选择大类
       * @param nIndex 索引值 number
       */
      insureSelect:function(nIndex){
        var that = this;
        this.$store.state.insureIndex = nIndex;
        var arr = [];
        var code = [];
        this.insure[nIndex].forEach(function(value){
          var itemArr = value.inclusions.inclusions_code.split(",");
          itemArr.forEach(function(itemValue){
            if(itemValue == "AAO" || itemValue == "FPO" || itemValue == "PER"){
              arr.push(that.turnInsureName(itemValue).name);
              code.push(itemValue);
            }
            arr = that.unique22(arr);
            code = that.unique22(code);
          })
        });

        this.showBaseInsure(nIndex);

        if(arr.length == 0){
          that.serverState = false;
          this.server = null;
          if(arguments[1] == null){
            this.callBackState();
            this.initState();
          }else{
            this.initState(arguments[1],arguments[2]);
          }
        }else {
          that.serverState = true;
          arr.forEach(function (value, index, array) {
            arr[index] = {
              name: value,
              code: code[index],
              state: false
            }
          })
          this.server = arr;
          if(arguments[1] == null){
            this.callBackState();
            this.initState();
          }else{
            this.initState(arguments[1],arguments[2]);
          }
        }
      },
      /**
       * 选择小类
       * @param index 索引值 number
       * @param code 小类编码 string
       */
      selectServer:function(index,code){
        var that = this;
        var minArr = [];
        this.selectIndex = index;
        //所有小类项
        var groupArr = this.getSumCount().group;
        if(this.server[index].state == true){
          var turnCount = 0;
          var getIndex = [];
          this.selectArr = [];
          that.payOnline = false;
          that.payArrive = false;
          //判断是否有相同项
          this.submitCode.push(this.turnInsureName(code));
          var newSubmit = this.submitCode.sort(this.compare('order'));
          newSubmit.forEach(function(value, index, array){
            that.selectArr.push(value.code);
          })
          groupArr.forEach(function(value, index, array){
            var submitStr = that.selectArr.join(",");
            var valueStr = value.join(",");
            if(submitStr == valueStr){
              turnCount++;
              getIndex.push(index);
              if(that.getSumCount().arrive[index] != ''){
                that.payOnline = true;
              }else{
                that.payArrive = true;
              }
            }
          })

          //判断是否有 >0 改变状态，否则已选项不添加，并且不选中
          if(turnCount > 0){
            this.server[index].state = true;
            //是否有在线付款
            if(arguments[2] == null){
              that.callBackState();
              that.payStateFunction(that.payOnline);
            }else{
              that.payStateFunction(that.payOnline,arguments[2],arguments[3]);
            }
            //获取价格
            that.getChangePrice(getIndex,arguments[3]);
          }else{
            minArr = [];
            var minLength = 100;
            var resultArr = [];
            var getIndex = [];
            groupArr.forEach(function(value,minIndex){
              if(value.includes(that.selectArr[0]) == true){
                minArr.push(value);
                getIndex.push(minIndex);
              }
            })

            //取最短 且 含有当前编码的
            minArr.forEach(function(value,index){
              if(minLength > value.length && value.includes(code)){
                minLength = value.length;
                resultArr = value;
              }
            })


            that.selectArr = [];
            that.payOnline = false;
            that.payArrive = false;

            //关联付款
            groupArr.forEach(function(value, index, array){
              var resultStr = JSON.stringify(resultArr);
              var valueStr = JSON.stringify(value);
              if(resultStr == valueStr){
                if(that.getSumCount().arrive[index] != ''){
                  that.payOnline = true;
                }else{
                  that.payArrive = true;
                }
              }
            })

            //是否有在线付款
            if(arguments[2] == null){
              that.callBackState();
              that.payStateFunction(that.payOnline);
            }else{
              that.payStateFunction(that.payOnline,arguments[2],arguments[3]);
            }

            //获取价格
            that.getChangePrice(getIndex,arguments[3]);


            //筛选出最终结果
            resultArr.forEach(function(reValue){
              that.server.forEach(function(serValue, serIndex){
                if(reValue == serValue.code){
                  that.server[serIndex].state = true;
                  that.selectArr.push(that.server[serIndex].code);
                }
              })
            })
          }

        }else{
          this.server[index].state = false;
          this.deleteCode(code);
          minArr = [];
          var resultArr = [];
          var getIndex = [];
          var selectArr= JSON.stringify(that.selectArr);
          that.payOnline = false;
          that.payArrive = false;
          groupArr.forEach(function(value,groupIndex){
            if(JSON.stringify(value) == selectArr){
              minArr = value;
              getIndex.push(groupIndex);
              if(that.getSumCount().arrive[index] != ''){
                that.payOnline = true;
              }else{
                that.payArrive = true;
              }
            }
          })

          //是否有在线付款
          if(arguments[2] == null){
            that.callBackState();
            that.payStateFunction(that.payOnline);
          }else{
            that.payStateFunction(that.payOnline,arguments[2],arguments[3]);
          }

          //获取价格
          that.getChangePrice(getIndex,arguments[3]);

          if(arguments[2] == null){
            that.callBackState();
            that.emptySelect(groupArr);
          }else{
            that.emptySelect(groupArr,arguments[2],arguments[3]);
          }
        }
        if(minArr.length == 0){
          this.selectIndex = null;
        }
      },
      /**
       * 小类为空的信息
       * groupArr 组code Array
       */
      emptySelect:function(groupArr){
        var that = this;
        var getIndex = [];
        if(this.server != null){
          this.server.forEach(function(value,index){
            that.server[index].state = false;
          })
        }
        that.selectArr = [];
        that.submitCode = [];
        that.payOnline = false;
        that.payArrive = false;
        groupArr.forEach(function(value, index){
          if(value.length == 0){
            getIndex.push(index);
            if(that.getSumCount().arrive[index] != ''){
              that.payOnline = true;
            }else{
              that.payArrive = true;
            }
          }
        })

        //是否有在线付款
        if(arguments[1] == null){
          that.callBackState();
          that.payStateFunction(that.payOnline);
        }else{
          that.payStateFunction(that.payOnline,arguments[1],arguments[2]);
        }

        //获取价格
        that.getChangePrice(getIndex,arguments[2]);
      },
      /**
       * 获取大类下 小类的支付情况
       * @returns {
               arrive: Array, 不为空支持在线支付
               group: Array 每个小类的code
       * }
       */
      getSumCount:function(){
        var insureArr = [];
        var arrive = [];
        var dayMoney = [];
        var allMoney = [];
        var guid = [];
        this.insure[this.$store.state.insureIndex].forEach(function(value,index,array){
          var codeArr = value.inclusions.inclusions_code.split(",");
          var newArr = [];
          codeArr.forEach(function(codeValue, codeIndex, codeArray){
            if(codeValue == "AAO" || codeValue == "FPO" || codeValue == "PER"){
              newArr.push(codeValue);
            }
          })
          insureArr.push(newArr);
          arrive.push(value.tournumber);
          dayMoney.push(value.price);
          allMoney.push(value.pricecny);
          guid.push(value.param_guid);
        })
        return {
          group:insureArr,
          arrive:arrive,
          dayMoney:dayMoney,
          allMoney:allMoney,
          guid:guid
        };
      },
      /**
       * 去掉已选中小类
       * @param code 小类的code string
       */
      deleteCode:function(code){
        var that = this;
        this.selectArr.forEach(function(value, subIndex, array){
          if(code == value){
            that.submitCode.splice(subIndex,1);
            that.selectArr.splice(subIndex,1);
          }
        })
      },
      /**
       * 去重
       * @param arr 原数组
       * @return {Array} 新数组
       */
      unique22:function(arr){
        var hash=[];
        for (var i = 0; i < arr.length; i++) {
          if(hash.indexOf(arr[i])==-1){
            hash.push(arr[i]);
          }
        }
        return hash;
      },
      /**
       * 排序前比较
       * @param property 排序的属性
       * @return {function(*, *): number}
       */
      compare:function(property){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      /**
       * @param online 是否存在在线支付
       *
       */
      payStateFunction:function(online){
        if(arguments[1] == null){
          this.callBackState();
          if(online == true){
            this.$store.state.payState = "online";
          }else{
            this.$store.state.payState = "arrive";
          }
        }else{
          this.$store.state.payState = arguments[1];
        }
      },
      /**
       *
       */
      getChangePrice:function(getIndex){
        var that = this;
        this.getSumCount().arrive.forEach(function(value,index){
          getIndex.forEach(function(getValue){
            if(index == Number(getValue) && that.$store.state.payState == "online"){
              if(that.getSumCount().arrive[index] != ''){
                that.$store.state.dayTotal = that.getSumCount().dayMoney[index];
                that.$store.state.allTotal = that.getSumCount().allMoney[index];
                that.insureGuid = that.getSumCount().guid[index];
                that.$store.state.littleOnline = index;
              }else if(that.getSumCount().arrive[index] == ''){
                that.$store.state.dayArriveTotal = that.getSumCount().dayMoney[index];
                that.$store.state.allArriveTotal = that.getSumCount().allMoney[index];
                that.insureArriveGuid = that.getSumCount().guid[index];
                that.$store.state.resultGroup = that.getSumCount().group[index];
                that.$store.state.littleArrive = index;
              }
            }
          })
        });

        if(arguments[1] == true){
          that.initRate();
        }
      },
      payMode:function(state){
        this.payIndex = true;
        if(state == 'online'){
          this.$store.state.payState = "online";
        }else if(state == 'arrive'){
          this.$store.state.payState = "arrive";
        }

        if(this.$store.state.insureRateState == true){
          this.initRate();
        }

        //this.insureSelect(this.insureIndex,state,this.$store.state.insureRateState);
        // if(this.selectIndex != null){
        //   this.selectServer(this.selectIndex,this.server[this.selectIndex].code,state,this.insureRateState)
        // }

      },
      add:function(param){
        var childNumber = Number(this.$store.state.equiChild1) + Number(this.$store.state.equiChild2) + Number(this.$store.state.equiChild3);
        if(childNumber >= 3){
          this.errorState("座椅数量不能大于3个！")
          return false;
        }else{
          switch (param) {
            case 'child1':
              this.$store.state.equiChild1++;
              break;
            case 'child2':
              this.$store.state.equiChild2++;
              break;
            case 'child3':
              this.$store.state.equiChild3++;
              break;
          }
          this.initRate();
        }
      },
      reduce:function(param){
        var childNumber = Number(this.$store.state.equiChild1) + Number(this.$store.state.equiChild2) + Number(this.$store.state.equiChild3);
        if(childNumber <= 0){
          this.errorState("座椅数量不能小于0个！")
          return false;
        }else{
          switch (param) {
            case 'child1':
              this.$store.state.equiChild1--;
              break;
            case 'child2':
              this.$store.state.equiChild2--;
              break;
            case 'child3':
              this.$store.state.equiChild3--;
              break;
          }
          this.initRate();
        }
      },
      /**
       * 额外设备接口
       */
      initRate:function(){

        this.$loadingToast.show();
        var nowGuid = (this.$store.state.payState == 'online')?this.insureGuid:this.insureArriveGuid;
        apiRequest.getrate({
          boosterseat: this.$store.state.equiChild1,
          cdpguid: "00000000-0000-0000-0000-000000000000",
          childtoddlerseat: this.$store.state.equiChild2,
          discountguid: "00000000-0000-0000-0000-000000000000",
          fulldiscountguid: "00000000-0000-0000-0000-000000000000",
          guid: nowGuid,
          infantchildseat: this.$store.state.equiChild3,
          pcguid: "00000000-0000-0000-0000-000000000000",
          portablegps: this.equiGps
        }).then(res => {
          var data= res.Result;
          if(res.ErrorCode == 0){
            this.$store.state.dayTotal = data.aftertotal;
            this.$store.state.allTotal = data.aftertotalcny;
            this.$store.state.dayRateTotal = data.online;
            this.$store.state.allRateTotal = data.onlinecny;
            this.$store.state.dayRateArriveTotal = data.offline;
            this.$store.state.allRateArriveTotal = data.offlinecny;
            this.$loadingToast.close();
          }else{
            this.errorState(res.ErrorMsg);
            this.$loadingToast.close();
          }

        })
      },
      /**
       * 选中关闭gps
       */
      gpsFunction:function(){
        this.$store.state.insureRateState = true;
        if(this.$store.state.gpsMenu == false){
          this.equiGps = 0;
          this.$store.state.gpsMenu = false;
        }else{
          this.equiGps = 1;
          this.$store.state.gpsMenu = true;
        }
        this.initRate();
      },
      /**
       * 打开关闭儿童座椅
       */
      childFunction:function(){
        this.$store.state.insureRateState = true;
        if(this.childState == false){
          this.childState = false;
          this.$store.state.equiChild1 = 0;
          this.$store.state.equiChild2 = 0;
          this.$store.state.equiChild3 = 0;
          this.initRate();
        }else{
          this.childState = true;
        }
      },
      /**
       * 返回保单
       */
      requestIns:function(){
        var that = this;
        apiRequest.getInsur({
          brands:this.paramBrans,
          country:this.paramCountry,
          state:this.paramState
        }).then(res => {
          var data= res.Result;
          data.forEach(function(val){
            that.insList.push(val);
          })
        }).catch(err => {
          console.log(err)
        });
      },
      /**
       * 回归状态
       */
      callBackState:function(){
        this.equiGps = 0;
        this.$store.state.equiChild1=0;
        this.$store.state.equiChild2=0;
        this.$store.state.equiChild3=0;
        this.$store.state.gpsMenu = false;
        this.$store.state.insureRateState = false;
      },
      successState(message) {
        this.$message({
          message: message,
          type: 'success'
        });
      },
      warnState(message) {
        this.$message({
          message: message,
          type: 'warning'
        });
      },
      errorState(message) {
        this.$message.error(message);
      },
      /**
       * 创建可排序信息
       * @param code 服务code
       * @return {*}
       */
      turnInsureName:function(code){
        switch(code){
          case "AAO":
            return {name:"额外服务",code:"AAO",order:0};
            break;
          case "FPO":
            return {name:"燃油",code:"FPO",order:1};
            break;
          case "PER":
            return {name:"高级道路救援",code:"PER",order:2};
            break;
        }
      },
      showInsure:function(){
        this.dialogInsure = true;
      },
      showBaseInsure:function(nIndex){
        var that = this;
        that.showList = [];
        if(that.$store.state.insureList.length == 1){
          that.showList.push({
            state:'on',
            price:0
          })
        }else{
          that.$store.state.insureList.forEach(function(value, index, array){
            if(nIndex == 0) {
              if(index == 0){
                that.showList.push({
                  state:'on',
                  price:0
                })
              }else{
                that.showList.push({
                  state:'',
                  price:eval(that.$store.state.insureList[index].price - that.$store.state.insureList[index-1].price),
                })
              }
            }else{
              if(nIndex == index){
                that.showList.push({
                  state:'on',
                  price:eval(that.$store.state.insureList[nIndex].price - that.$store.state.insureList[nIndex-1].price),
                })
              }else if(nIndex > index){
                that.showList.push({
                  state:'active',
                  price:0,
                })
              }else if(nIndex < index){
                that.showList.push({
                  state:'',
                  price:eval(that.$store.state.insureList[nIndex].price - that.$store.state.insureList[nIndex-1].price),
                })
              }
            }
          })
        }
      },
      showPosition:function(param){
        // switch (param) {
        //   case 'available':
        //     this.positionTab = 0;
        //     break;
        //   case 'unavailable':
        //     this.positionTab = 1;
        //     break;
        // }
        var mTop = document.getElementById(param).offsetTop;
        this.scrollTopFun(mTop,200);
      },
      scrollTopFun:function(number,time) {
        if (!time) {
          document.body.scrollTop = document.documentElement.scrollTop = number;
          return number;
        }
        const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
        let spacingInex = time / spacingTime; // 计算循环的次数
        let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
        let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
        let scrollTimer = setInterval(() => {
          if (spacingInex > 0) {
            spacingInex--;
            this.scrollTopFun(nowTop += everTop);
          } else {
            clearInterval(scrollTimer); // 清除计时器
          }
        }, spacingTime);
      }
    },
    computed: {}
  }
</script>

<style lang="less">
  .setMeal-ul-liLeft{
    padding-right: 18px;
    position: relative;
    a{
      display: block;
      width:10px;
      height:10px;
      background: url(../../../static/images/car_que.png) no-repeat right bottom;
      background-size:100% 100%;
      position: absolute;
      right:0;
      bottom:3px;
    }
  }
  .detailPage-body{
    line-height: 1.4;
  }
  .inactive-color{
    border:1px solid #000;
  }
  .modelOfCar{
    width:3.9rem;
  }
  .goQuyin img{
    margin:0;
  }
  .setMeal-ul-liRight {
    float: right;
    color: #ff9c00;
  }
  .setMeal-ul-liRight .pPrice-price,.setMeal-ul-liRight .pPrice-price i,.setMeal-ul-liRight .pPrice-data{
    color: #ff9c00;
  }
  .last-child-p span{
    color:#999;
  }
  #available{
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom:1px dashed #ccc;
    margin-bottom: 30px;
  }
  #unavailable{
    padding-bottom: 30px;
  }
  #unavailable dl{
    margin-bottom: 20px;
    line-height: 1.6em;
    dt{
      margin-bottom: 4px;
      font-size:1.1em;
    }
    dd{
      color:#6b727b;
    }
  }
  .tab-title{
    margin-bottom: 24px;
  }
  .additionalEquipment li{

  }
  .additionalEquipment li dl > span{
    display: block;
    margin-bottom: 5px;
  }
  .additionalEquipment li dl{
    overflow: hidden;
    padding:0 8px;
    margin: 0 auto;
    margin-bottom: 5px;
    width:96%;
  }
  .additionalEquipment li .el-input-number__decrease,.additionalEquipment li .el-input-number__increase{
    background: rgb(255, 204, 0);
    color:#000;
  }
  .additionalEquipment li .el-input-number{
    width:100%;
  }
  .detailPage-footer{
    z-index: 50000;
  }
  .detailPage-footer-right p{
    color:#fff;
  }


  /**/
  .dialogFoot{
    border-radius: 8px;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding:0;
      border-radius: 8px;
      .modal-body{
        padding:20px;
        &>div{
          margin-bottom: 20px;
        }
        span{
          font-size:12px;
        }
      }
    }
  }
  .modal-body-ul{
    font-size:12px;
  }
  .dialogInsureOuter span span{
    display: block;
    font-size:14px;
    margin-bottom: 4px;
  }
  .dialogInsureOuter p{
    font-size:12px;
    color:#999;
  }
  .dialogInsureOuter table{
    border-top:1px solid #000;
    border-left:1px solid #000;
  }
  .dialogInsureOuter table th{
    font-size:12px;
    border-right:1px solid #000;
    border-bottom:1px solid #000;
    font-weight: normal;
    padding:4px;
    line-height: 20px;
  }
  .dialogInsureOuter table td{
    border-right:1px solid #000;
    border-bottom:1px solid #000;
    padding:4px;
    text-align: center;
  }
  .dialogInsureOuter table td:first-child{
    width:40%;
    text-align: left;
  }
  .dialogInsureOuter .el-dialog__body{
    padding:10px;
  }
  .dialogInsureOuter .el-dialog__header{
    height:22px;
    padding:0;
  }
  .dialogInsureOuter .el-dialog__headerbtn{
    top:4px;
    right:10px;
  }
  .additionalEquipment li{

  }
  .inputNumber{
    position: relative;
    height:30px;
  }
  .inputMenu{
    display: block;
    width:28px;
    height:28px;
    line-height: 24px;
    text-align: center;
    background: #ffcc00;
    color: #000;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #DCDFE6;
    float:left;
    position: absolute;
  }
  .inputMenu.reduce{
    border-radius: 4px 0 0 4px;
    border: 1px solid #DCDFE6;
    left:0;
    top:0;
  }
  .inputMenu.add{
    border-radius: 0 4px 4px 0;
    border: 1px solid #DCDFE6;
    right:0;
    top:0;
  }
  .childNumber{
    display: block;
    height: 28px;
    line-height: 24px;
    margin:0 auto;
    width:calc(~"100% - 20px");
    border-top:1px solid #DCDFE6;
    border-bottom:1px solid #DCDFE6;
    box-sizing: border-box;
    text-align: center  ;
  }
  .detailPage-address-bottom{
    &>div{
      flex : 2;
      &:nth-child(2){
        text-align: center;
        flex : 1;
        p{
          height:auto!important;
        }
      }
      &>p:first-child{
        line-height: 1.4em;
        height:2.8em;
        overflow: hidden;
      }
      &>p:last-child{
        white-space: nowrap;
      }
    }
  }
</style>
