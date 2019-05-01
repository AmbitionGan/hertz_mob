<template>
  <div class="index-list-body">
    <div class="list">
      <div class="personal_header">
        <img src="../../../static/images/goBack-white.png" class="goBack">
        <div class="detailPage-address-bottom index-list-body-bottom">
          <div>
            <p>洛杉矶机场</p>
            <p>10月31日 周三 <br> 10:00 AM</p>
          </div>
          <div>
            <p class="number-day">7天</p>

            <p>
              <img src="../../../static/images/jiantou.png" alt="" class="jiantou">
            </p>
          </div>
          <div>
            <p>洛杉矶机场</p>
            <p>11月07日 周六 <br>4:00 PM</p>
          </div>
          <p class="change-city">
            <img src="../../../static/images/change.png" alt="">
          </p>
        </div>
      </div>
      <div class="index-list-sort">
        <div class="index-list-sort-left">
          <p>综合排序</p>
          <p @click="sortMenu(sort)">{{sortName}}</p>
        </div>
        <div class="index-list-sort-right">
          <select @change="printTest" id="moneyChange">
            <option value="0">日租金</option>
            <option value="1">总租金</option>
          </select>
          <p class="index-list-sort-right-p" @click="dialogShow">
            <span>筛选</span>
            <img src="../../../static/images/sx.png">
          </p>
        </div>
      </div>
      <div class="index-listPage">
        <div class="listPage-model" v-for="(items,index) in vehicleList" :key="index" v-show="items.state">
          <div :class="(items.toggleState == false)?'listPage-model-top':'listPage-model-top on'"
               @click="showCarInfo(index)">
            <div class="listPage-model-left">
              <img :src="items.image_path">
              <p>【{{showVehClass(Number(items.vehclass))}}{{showVehType(Number(items.vehiclecategory))}}】</p>
            </div>
            <div class="listPage-model-right">
              <p class="listPage-model-title">{{items.short_description}}&nbsp;&nbsp;<span
                class="spancolor-hui">或同级</span></p>
              <p class="listPage-model-tips">
                <span>{{items.num_adult_passengers}}乘客</span>
                <span>{{items.num_large_suitcase}}大{{items.num_small_suitcase}}小行李</span>
                <span>{{(items.transmission_type == "automatic")?'自动挡':'手动挡'}}</span>
              </p>
              <p class="splitine"></p>
              <div class="listPage-model-price">
                <span class="spanfirst">约 RMB&nbsp;&nbsp;{{(changeOption == 0)?items.pricecnyday.toFixed(0):items.pricecny.toFixed(0)}}元 起</span>
                <span class="listPageFr"><span class="origin">USD <span class="fot-38 origin">{{(changeOption == 0)?items.priceday.toFixed(2):items.price.toFixed(2)}}</span> </span>起</span>
              </div>
            </div>
          </div>
          <!-- 隐藏的车辆信息 -->
          <div class="vehicleInformation" v-if="items.toggleState">
            <div class="vehicleList" v-for="val in items.stroe_list" v-show="val.state">
              <div class="vehicleInformatio-left">
                <img :src="showLogoSrc(val.brands)">
                <p class="Stores">门店 1</p>
                <p>{{val.pickuplocation_details.description_location_name}}</p>
              </div>
              <div class="vehicleInformatio-right">
                <div class="vehicleInformatio-right-box">
                  <span class="category">取</span>
                  <div class="introduction">
                    <p>工作时间：{{val.pickuplocation_details.open_time}}</p>
                    <p class="distance">{{val.pickuplocation_details.mark_air}}</p>
                  </div>
                </div>
                <div class="vehicleInformatio-right-box">
                  <span class="category">还</span>
                  <div class="introduction">
                    <p>工作时间：{{val.returnlocation_details.open_time}}</p>
                    <p class="distance">{{val.returnlocation_details.mark_air}}</p>
                  </div>
                </div>
                <div class="listPage-model-price">
                <span class="listPageFr"><span class="origin">USD <span
                  class="fot-38 origin">{{(changeOption == 0)?val.priceday.toFixed(2):val.price.toFixed(2)}}</span> </span>起</span>
                  <span class="renminbi spanfirst">约 RMB{{(changeOption == 0)?val.pricecnyday.toFixed(0):val.pricecny.toFixed(0)}}元 起</span>
                </div>
                <a href="javascript:void(0)" @click="openDetail(val.param_guid)">查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- =============================筛选模态框========================= -->
    <div class="modal fade" id="sieveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         v-show="dialogState">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="dialogClose">
                    <span aria-hidden="true">
                        <img src="../../../static/images//close.png" alt="" class="close-menu">
                    </span>
            </button>
          </div>
          <div class="modal-body">
            <!-- 车型 -->
            <div class="sievelistAll">
              <p class="sieveTitle">车型</p>
              <ul class="sieveList">
                <li @click="screenSelect(0,items.value,$event)" v-for="items in screenVehicle"
                    :class="(items.state == true)?'on':''">{{items.name}}
                </li>
              </ul>
            </div>
            <!-- 车辆拍档 -->
            <div class="sievelistAll">
              <p class="sieveTitle">车辆排挡</p>
              <ul class="sieveList">
                <li @click="screenSelect(1,items.value,$event)" v-for="items in screenTransmissio"
                    :class="(items.state == true)?'on':''">{{items.name}}
                </li>
              </ul>
            </div>
            <!-- 车辆座位 -->
            <div class="sievelistAll">
              <p class="sieveTitle">车辆座位</p>
              <ul class="sieveList">
                <li @click="screenSelect(2,items.value,$event)" v-for="items in screenNum_adult"
                    :class="(items.state == true)?'on':''">{{items.name}}
                </li>
              </ul>
            </div>
            <!-- 租车品牌 -->
            <div class="sievelistAll">
              <p class="sieveTitle">租车品牌</p>
              <ul class="sieveList">
                <li @click="screenSelect(3,items.value,$event)" v-for="(items,index) in screenBrands"
                    :class="(items.state == true)?'on':''">
                  <span v-if="index == 0">{{items.name}}</span>
                  <span v-else><img :src="items.logo" /></span>
                </li>
              </ul>
            </div>
            <!-- 重置 取消 -->
            <div class="sieveSetting">
              <p class="sieveSetting-reset">重置</p>
              <p class="sieveSetting-determine" @click="sureSubmit">确定</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import apiRequest from '@/api/index'

  export default {
    name: 'list',
    data() {
      return {
        initState: true,
        allVehicleList: [],
        vehicleList: [],
        carInfoShow: false,
        sort: 0,
        sortName: "价格由低-高",
        screenVehicle: [],
        screenTransmissio: [],
        screenNum_adult: [],
        screenBrands: [],
        dialogState: false,
        selectObj: {
          screenVehicle: [0],
          screenBrands: [0],
          screenTransmissio: "0",
          screenNum_adult: "0"
        },
        extendSelect: [],
        //日租，整租
        changeOption: 0
      }
    },
    mounted() {
      var param = new this.urlSearch();
      apiRequest.vehicle({
        pickuplocation: param.pl,
        pickupdatetime: decodeURIComponent(param.pd),
        returnlocation: param.rl,
        returndatetime: decodeURIComponent(param.rd),
        country: param.country,
        brand: param.brand,
        guid: param.guid
      }).then(res => {
        var data = res.Result;
        for (var i = 0; i < data.length; i++) {
          data[i].toggleState = false;
          this.vehicleList.push(data[i]);
          for (var j = 0; j < this.vehicleList[i].stroe_list.length; j++) {
            this.vehicleList[i].stroe_list[j].state = true;
          }
          this.vehicleList[i].state = true;
        }
      })
        .catch(err => {
          console.log(err)
        });
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
      //显示车辆隐藏信息
      showCarInfo: function (index) {
        if (this.vehicleList[index].toggleState == true) {
          this.vehicleList[index].toggleState = false;
        } else {
          for (var i = 0; i < this.vehicleList.length; i++) {
            this.vehicleList[i].toggleState = false;
          }
          this.vehicleList[index].toggleState = true;
        }
      },
      showLogoSrc: function (param) {
        return pubMethod.getBrandLogo(param).images
      },
      showVehType: function (id) {
        return pubMethod.getVehType(id);
      },
      showVehClass: function (id) {
        return pubMethod.getVehClass(id);
      },
      sortMenu: function (sort) {
        if (sort == 0) {
          this.sort = 1;
          this.vehicleList = this.arrItemSort(this.vehicleList, 'priceday', 1);
          this.sortName = "价格由高-低"
        } else {
          this.sort = 0;
          this.vehicleList = this.arrItemSort(this.vehicleList, 'priceday', 0);
          this.sortName = "价格由低-高"
        }
      },
      /**
       * js数组排序 支持数字和字符串
       * @param params
       * @param arrObj   obj     必填  数组对象
       * @param keyName  string  必填  要排序的属性名称
       * @param type     int     选填  默认type:0 正顺  type:1反顺
       */
      arrItemSort: function (arrObj, keyName, type) {
        //这里如果 直接等于arrObj，相当于只是对对象的引用，改变排序会同时影响原有对象的排序，而通过arrObj.slice(0)，
        //表示把对象复制给另一个对象，两者间互不影响
        var tempArrObj = arrObj.slice(0);
        var compare = function (keyName, type) {
          return function (obj1, obj2) {
            var val1 = obj1[keyName];
            var val2 = obj2[keyName];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1);
              val2 = Number(val2);
            }
            //如果值为空的，放在最后
            if (val1 == null && val2 == null) {
              return 0;
            } else if (val1 == null && val2 != null) {
              return (type == 1 ? -1 : 1);
            } else if (val2 == null && val1 != null) {
              return (type == 1 ? 1 : -1);
            }
            //排序
            if (val1 < val2) {
              return (type == 1 ? 1 : -1);
            } else if (val1 > val2) {
              return (type == 1 ? -1 : 1);
              ;
            } else {
              return 0;
            }
          }
        }
        return tempArrObj.sort(compare(keyName, type));
      },
      /**
       * 数组去重
       * @param array
       */
      uniq: function (array) {
        var temp = [];
        var index = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
          for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
              i++;
              j = i;
            }
          }
          temp.push(array[i]);
          index.push(i);
        }
        return temp;
      },
      dialogClose: function () {
        this.dialogState = false;
      },
      dialogShow: function () {
        this.dialogState = true;
        this.selectObj.screenVehicle = [];
        this.selectObj.screenBrands = [];
        this.screenVehicle = [];
        this.screenBrands = [];
        var arr = [];
        arr[0] = [];
        arr[1] = [];
        arr[2] = [];
        arr[3] = [];
        for (var i = 0; i < this.vehicleList.length; i++) {
          if (this.vehicleList[i].transmission_type == "automatic") {
            arr[0].push("自动挡AT");
          } else {
            arr[0].push("手动挡MT");
          }
          if (Number(this.vehicleList[i].num_adult_passengers) >= 6) {
            arr[1].push("6座及以上");
          } else {
            arr[1].push("5座及以下");
          }
          for (var j = 0; j < this.vehicleList[i].stroe_list.length; j++) {
            arr[2].push(pubMethod.getBrandLogo(this.vehicleList[i].stroe_list[j].brands).name);
          }

          arr[3].push(pubMethod.getVehiclecategory(this.vehicleList[i].vehiclecategory));

          for (var m = 0; m < this.vehicleList[i].stroe_list.length; m++) {
            this.vehicleList[i].stroe_list[m].state = false;
          }

        }
        //遍历车辆排挡
        var oldCreenTransmissio = this.uniq(arr[0]);
        var newCreenTransmissio = [];
        newCreenTransmissio.push({
          name: "不限",
          value: 0,
          state: false
        });
        for (var i = 0; i < oldCreenTransmissio.length; i++) {
          var arr0obj = {
            name: oldCreenTransmissio[i],
            value: i + 1,
            state: false
          }
          newCreenTransmissio.push(arr0obj);
        }
        this.screenTransmissio = newCreenTransmissio;
        //遍历车辆座位
        var oldNum_adult = this.uniq(arr[1]);
        var newNum_adult = [];
        newNum_adult.push({
          name: "不限",
          value: 0,
          state: false
        });
        for (var i = 0; i < oldNum_adult.length; i++) {
          var arr0obj = {
            name: oldNum_adult[i],
            value: i + 1,
            state: false
          }
          newNum_adult.push(arr0obj);
        }
        this.screenNum_adult = newNum_adult;
        //遍历租车品牌
        var oldBrands = this.uniq(arr[2]);
        var newBrands = [];
        newBrands.push({
          name: "不限",
          value: 0,
          order: 0,
          state: false
        });
        for (var i = 0; i < oldBrands.length; i++) {
          var brandsValue;
          switch (oldBrands[i]) {
            case "Hertz":
              brandsValue = 1;
              break;
            case "Dollar":
              brandsValue = 2;
              break;
            case "Thrifty":
              brandsValue = 3;
              break;
            case "Firefly":
              brandsValue = 4;
              break;
            case "Ace":
              brandsValue = 5;
              break;
          }
          var arr0obj = {
            name: oldBrands[i],
            logo: this.turnLogo(oldBrands[i]),
            value: brandsValue,
            order: brandsValue,
            state: false
          }
          newBrands.push(arr0obj);
        }
        newBrands = this.arrItemSort(newBrands, "order", 0)
        this.screenBrands = newBrands;
        //遍历车型
        var turnVehicle = this.arrItemSort(arr[3], "order", 0);
        var turnVehicleName = [];
        for (var i = 0; i < turnVehicle.length; i++) {
          turnVehicleName.push(turnVehicle[i].name);
        }
        var oldVehicle = this.uniq(turnVehicleName);
        var newVehicle = [];
        newVehicle.push({
          name: "不限",
          value: 0,
          state: false
        });
        for (var i = 0; i < oldVehicle.length; i++) {
          var arr0obj = {
            name: oldVehicle[i],
            value: i + 1,
            state: false
          }
          newVehicle.push(arr0obj);
        }
        this.screenVehicle = newVehicle;

        if (this.initState == true) {
          this.screenVehicle[0].state = true;
          this.screenTransmissio[0].state = true;
          this.screenNum_adult[0].state = true;
          this.screenBrands[0].state = true;
          this.selectObj = {
            screenVehicle: [],
            screenTransmissio: 0,
            screenNum_adult: 0,
            screenBrands: [],
          }
          this.initState = false;
        } else {
          this.selectObj = this.extendSelect;
          if (!this.selectObj.screenVehicle || this.selectObj.screenVehicle.length == 0) {
            this.screenVehicle[0].state = true;
          } else {
            for (var i = 0; i < this.selectObj.screenVehicle.length; i++) {
              this.screenVehicle[Number(this.selectObj.screenVehicle[i])].state = true;
            }
          }
          this.screenTransmissio[Number(this.selectObj.screenTransmissio)].state = true;
          this.screenNum_adult[Number(this.selectObj.screenNum_adult)].state = true;
          if (!this.selectObj.screenBrands || this.selectObj.screenBrands.length == 0) {
            this.screenBrands[0].state = true;
          } else {
            for (var i = 0; i < this.selectObj.screenBrands.length; i++) {
              for (var j = 0; j < this.screenBrands.length; j++) {
                if (this.selectObj.screenBrands[i] == this.screenBrands[j].name) {
                  this.screenBrands[j].state = true;
                }
              }
            }
          }
        }


      },
      screenSelect: function (type, index, $event) {
        switch (type) {
          case 0:
            //车型集合不限按钮处理
            if (index == 0) {
              for (var i = 0; i < this.screenVehicle.length; i++) {
                this.screenVehicle[i].state = false;
                this.screenVehicle[0].state = true;
              }
              delete this.selectObj.screenVehicle;
            } else {
              this.screenVehicle[0].state = false;
              //判断车型集合是否不存在 不存在创建集合
              if (!this.selectObj.screenVehicle) {
                this.selectObj.screenVehicle = [];
              }
              //车型集合选中状态  false时 让其选中
              if (this.screenVehicle[index].state == false) {
                this.screenVehicle[index].state = true;
                this.selectObj.screenVehicle.push(this.screenVehicle[index].value);
              } else {
                for (var i = 0; i < this.selectObj.screenVehicle.length; i++) {
                  if (this.selectObj.screenVehicle[i] == this.screenVehicle[index].value) {
                    this.screenVehicle[index].state = false;
                    this.selectObj.screenVehicle.splice(i, 1);
                  }
                }
              }
            }
            break;
          case 1:
            //车辆排挡处理
            for (var i = 0; i < this.screenTransmissio.length; i++) {
              this.screenTransmissio[i].state = false;
              this.screenTransmissio[index].state = true;
              this.selectObj.screenTransmissio = this.screenTransmissio[index].value;
            }
            break;
          case 2:
            //车辆座位处理
            for (var i = 0; i < this.screenNum_adult.length; i++) {
              this.screenNum_adult[i].state = false;
              this.screenNum_adult[index].state = true;
              this.selectObj.screenNum_adult = this.screenNum_adult[index].value;
            }
            break;
          case 3:
            //租车品牌不限处理
            if (index == 0) {
              for (var i = 0; i < this.screenBrands.length; i++) {
                this.screenBrands[i].state = false;
                this.screenBrands[0].state = true;
              }
              delete this.selectObj.screenBrands;
            } else {
              this.screenBrands[0].state = false;
              //判断租车品牌集合是否不存在 不存在创建集合
              if (!this.selectObj.screenBrands) {
                this.selectObj.screenBrands = [];
              }
              //租车品牌集合选中状态  false时 让其选中
              if (this.screenBrands[index].state == false) {
                this.screenBrands[index].state = true;
                this.selectObj.screenBrands.push(this.screenBrands[index].name);
              } else {
                this.screenBrands[index].state = false;
                for (var i = 0; i < this.selectObj.screenBrands.length; i++) {
                  if (this.screenBrands[index].name == this.selectObj.screenBrands[i]) {
                    this.selectObj.screenBrands.splice(i, 1)
                  }
                }
              }
            }
            break;
        }
      },
      sureSubmit: function () {
        this.dialogState = false;
        for (var i = 0; i < this.vehicleList.length; i++) {
          this.vehicleList[i].state = false;
          //筛选车型
          if (this.selectObj.screenVehicle) {
            if (this.selectObj.screenVehicle.length == 0) {
              this.vehicleList[i].state = true;
            } else {
              for (var j = 0; j < this.selectObj.screenVehicle.length; j++) {
                if (Number(this.vehicleList[i].vehiclecategory) == Number(this.selectObj.screenVehicle[j])) {
                  this.vehicleList[i].state = true;
                }
              }
            }
          } else {
            this.vehicleList[i].state = true;
          }

          //继续处理排挡
          if (this.selectObj.screenTransmissio && this.vehicleList[i].state == true) {
            var stm = this.selectObj.screenTransmissio;
            switch (stm) {
              case 0:
                this.vehicleList[i].state = true;
                break;
              case 1:
                if (this.vehicleList[i].transmission_type != "automatic") {
                  this.vehicleList[i].state = false;
                }
                break;
              case 2:
                if (this.vehicleList[i].transmission_type == "automatic") {
                  this.vehicleList[i].state = false;
                }
                break;
            }
          }

          //继续处理座位
          if (this.selectObj.screenNum_adult && this.vehicleList[i].state == true) {
            var stm = this.selectObj.screenNum_adult;
            switch (stm) {
              case 0:
                this.vehicleList[i].state = true;
                break;
              case 1:
                if (this.vehicleList[i].num_adult_passengers >= 6) {
                  this.vehicleList[i].state = false;
                }
                break;
              case 2:
                if (this.vehicleList[i].num_adult_passengers < 6) {
                  this.vehicleList[i].state = false;
                }
                break;
            }
          }

          //继续处理品牌
          var count = 0;
          if (this.selectObj.screenBrands && this.vehicleList[i].state == true) {
            if (this.selectObj.screenBrands.length == 0) {
              for (let n = 0; n < this.vehicleList[i].stroe_list.length; n++) {
                this.vehicleList[i].stroe_list[n].state = true;
              }
            } else {
              for (let j = 0; j < this.selectObj.screenBrands.length; j++) {
                for (let n = 0; n < this.vehicleList[i].stroe_list.length; n++) {
                  let getName = pubMethod.getBrandLogo(this.vehicleList[i].stroe_list[n].brands).name;
                  if (this.selectObj.screenBrands[j] == getName) {
                    count++;
                    this.vehicleList[i].stroe_list[n].state = true;
                  }
                }
                if (count > 0) {
                  this.vehicleList[i].state = true;
                } else {
                  this.vehicleList[i].state = false;
                }
              }
            }
          } else {
            for (let n = 0; n < this.vehicleList[i].stroe_list.length; n++) {
              this.vehicleList[i].stroe_list[n].state = true;
            }
          }
          this.extendSelect = this.shallowCopy(this.selectObj);
        }
      },
      /**
       * 浅拷贝数组 @obj Array
       */
      shallowCopy: function (obj) {
        // 只拷贝对象
        if (typeof obj !== 'object') return;
        // 根据obj的类型判断是新建一个数组还是一个对象
        var newObj = obj instanceof Array ? [] : {};
        // 遍历obj,并且判断是obj的属性才拷贝
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
          }
        }
        return newObj;
      },
      printTest: function () {
        var oSelect = document.getElementById('moneyChange');
        this.changeOption = oSelect.value;
      },
      openDetail:function(guid){
        window.location.href= './details/?guid='+guid
      },
      turnLogo:function(name){
        console.log(name);
        console.log(pubMethod.getBrandName(name));
        return pubMethod.getBrandName(name).images;
      }
    },
    computed: {}
  }
</script>

<style scope lang="less">
  .listPageFr {
    float: right;
    line-height: 0.4rem;
  }

  .spanfirst {
    line-height: 0.5rem;
    font-size: 12px;
    float: left;
  }

  #sieveModal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
  }

  .modal-dialog {
    background: #fff;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
  }

  .modal-header {
    padding: 15px;
    overflow: hidden;
  }

  .modal-header button {
    background: none;
    float: right;
  }

  .sieveList li.on {
    background: #ffc300;
  }
  .sieveList li{
    position: relative;
  }
  .sieveList li>span{
    display: block;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
  }
  .sieveList li>span img{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top:0;
    width:auto;
    height:100%;
    display: block;
  }
</style>
