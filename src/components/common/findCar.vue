<!-- 地标搜索 日历 -->
<template>
  <div class="findCar" :class="{ loaded: $store.state.isCalendarLoaded }">
    <!-- 地标选择 -->
    <div class="landMark clear">
      <!-- <div class="takeCarCity left">
          <label>取车城市</label>
          <span
              class="ellipsis"
              @click="$router.push({path: '/choiceCity', query:{'isTakeCar': 1}})"
          >{{$store.state.takeCarCity === "" ? '请输入取车城市' : $store.state.takeCarCity }}</span>
      </div>-->
      <div class="takeCarland right">
        <label>取车地点</label>
        <span class="ellipsis" @click="goLandMark('take')">{{
          $store.state.takeCarLand === ""
            ? "请输入取车地点"
            : $store.state.takeCarLand
        }}</span>
      </div>
      <!-- <div class="retCarCity left">
          <label>还车城市</label>
          <span
              class="ellipsis"
              @click="$router.push({path: '/choiceCity', query:{'isTakeCar': 0}})"
          >{{$store.state.retCarCity === "" ? '请输入还车城市' : $store.state.retCarCity }}</span>
      </div>-->
      <div class="retCarland right">
        <label>还车地点</label>
        <span class="ellipsis" @click="goLandMark('ret')">{{
          $store.state.retCarLand === ""
            ? "请输入还车地点"
            : $store.state.retCarLand
        }}</span>
      </div>
    </div>
    <!-- 日历选择 -->
    <div class="calendar clear">
      <div class="takeCarDate left clear" @click="choiceDate('take')">
        <span class="day left">{{ $store.state.takeCarDay }}</span>
        <div class="right clear">
          <i class="month left">{{ $store.state.takeCarMonthCn }}</i>
          <i class="week left">{{ $store.state.takeCarweekCn }}</i>
          <p class="time">
            {{
              $store.state.takeCarHour +
                ":" +
                $store.state.takeCarMin +
                " " +
                $store.state.takeCarPeriod
            }}
          </p>
        </div>
      </div>
      <div class="timeSpans left">
        <span>{{ $store.state.timeSpans }}天</span>
      </div>
      <div class="retCarDate right" @click="choiceDate('ret')">
        <span class="day left">{{ $store.state.retCarDay }}</span>
        <div class="right clear">
          <i class="month left">{{ $store.state.retCarMonthCn }}</i>
          <i class="week left">{{ $store.state.retCarweekCn }}</i>
          <p class="time">
            {{
              $store.state.retCarHour +
                ":" +
                $store.state.retCarMin +
                " " +
                $store.state.retCarPeriod
            }}
          </p>
        </div>
      </div>
    </div>
    <!-- 搜索按钮 -->
    <button class="searchBtn" @click="goList()">搜 索</button>
    <!-- 日历弹窗 -->
    <div class="calendarLayer" v-show="isShowClrLayer" @click="cancelChoiceDate()">
      <div class="calendarLayerBox" @click="$event.stopPropagation()" :class="{ loading: isLoadingCalendar }">
        <div class="changeData">
          <span class="prev" @click="changeCalendar('prev')" :class="{ disable: isDisablePrevBtn }"></span>
          <div class="center clear" style="margin:0 auto;">
            <div class="year left">
              <span>{{ calendarLayerYear }}年</span>
              <!-- <ul>
    <li>{{2019}}</li>
    <li>{{2018}}</li>
              </ul>-->
            </div>
            <div class="month right">
              <span>{{ Number(calendarLayerMonth) }}月</span>
              <!-- <ul>
    <li>{{1}}</li>
    <li>{{2}}</li>
              </ul>-->
            </div>
          </div>
          <span class="next" @click="changeCalendar('next')"></span>
        </div>
        <div class="dayList">
          <ol class="clear">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ol>
          <ul class="clear">
            <li v-for="(item, index) in calendarData" :key="index" :class="{
                disable: isSwitchDate(item.daystring, 'disable'),
                over: isSwitchDate(item.daystring, 'over'),
                takeCar: isSwitchDate(item.daystring, 'takeCar'),
                retCar: isSwitchDate(item.daystring, 'retCar'),
                nonMonth: isSwitchDate(item.daystring, 'nonMonth'),
                today: item.istaday
              }" @click="choiceDetailDate($event, index)">
              <span>{{ item.day }}</span>
            </li>
          </ul>
          <div class="btns">
            <button class="cancel" @click="cancelChoiceDate()">取消</button>
            <button @click="determineChoice()">确认</button>
          </div>
        </div>
        <div class="loadingBox" @click="
            () => {
              return false;
            }
          ">
          <div>
            <img src="@/assets/images/loading.gif" alt />
            <p>正在加载中...</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 时间弹窗 -->
    <div class="timeLayer" v-show="isShowTimeLayer" @click="
        isShowTimeLayer = false;
        if (!isShowTakeCarClr) {
          getTimeSpans();
        }
      ">
      <div class="timeLayerBox" @click="$event.stopPropagation()">
        <div class="timeShow">
          <div class="center">
            <span class="hover left" :class="{ active: isChooseHour }"
              @click="chooseHourOrMin('hour')">{{ temporaryStorageTime[0] }}</span>
            <i class="left">:</i>
            <span class="min left" :class="{ active: !isChooseHour }"
              @click="chooseHourOrMin('min')">{{ temporaryStorageTime[1] }}</span>
          </div>
          <div class="chooseIsAm">
            <span :class="{ active: temporaryStorageTime[2] === 'AM' }" @click="choosePeriod('AM')">AM</span>
            <span :class="{ active: temporaryStorageTime[2] === 'PM' }" @click="choosePeriod('PM')">PM</span>
          </div>
        </div>
        <div class="timeChoose">
          <div class="timeDisc">
            <ul>
              <li v-for="(item, index) in timeLayerShowData" :key="index" :class="{ active: index == timeActiveIndex }">
                {{ item }}
              </li>
            </ul>
            <div class="pointer">
              <span></span>
              <i></i>
            </div>
            <div class="moveShadow"></div>
          </div>
          <div class="btns">
            <button class="cancel" @click="cancelChooseTime()">取消</button>
            <button @click="determineChooseTime()">确认</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择城市弹窗 -->
    <choiceCity v-show="$store.state.isShowChoiceCity" ref="choiceCity" @initChoiceLand="initChoiceLand"/>
    <!-- 选择地标弹窗 -->
    <choiceLandMark v-show="$store.state.isShowChoiceLand" ref="choiceLand"/>
  </div>
</template>

<script>
  import indexApi from "../../api/index";
  import {
    common
  } from "@/assets/mixin/common";
  import choiceCity from './choiceCity'
  import choiceLandMark from './choiceLandMark'

  export default {
    name: "findCar",
    mixins: [common],
    components: {
        choiceCity,
        choiceLandMark
    },
    data() {
      return {
        // 日历数据
        calendarData: {},

        // 日历弹窗 年
        calendarLayerYear: "----",

        // 日历弹窗 月
        calendarLayerMonth: "-",

        // 是否显示日历弹窗
        isShowClrLayer: false,

        // 是否禁用日历弹窗上个月的切换按钮
        isDisablePrevBtn: false,

        // 弹窗日历是否正在加载
        isLoadingCalendar: false,

        // 弹窗日历显示为取车还是还车
        isShowTakeCarClr: true,

        // 暂存点击日历弹窗之前选择的日期
        temporaryStorageDate: [],

        // 选择 时钟 or 分钟
        isChooseHour: true,

        // 选择 上午 or 下午
        isChooseAm: true,

        // 时钟数据
        hourData: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

        // 分钟数据
        minData: ["00", "05", 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],

        // 时间弹窗应该显示的数据
        timeLayerShowData: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

        // 是否显示时间弹窗
        isShowTimeLayer: false,

        // 暂存时间弹窗之前的时间
        temporaryStorageTime: [],

        // 选中的时间下标
        timeActiveIndex: 0,
      };
    },
    mounted() {
      this.$store.dispatch("getCalendar", null);

      // 阻止弹窗内滑动冒泡
      pubMethod.stopMovePreventDefault([
        document.querySelector(".timeLayer"),
        document.querySelector(".calendarLayer")
      ]);
    },
    methods: {
      /**
       * 点击日历
       * @param {string} style 取车还是还车
       */
      choiceDate(style) {
        if (this.$store.state.isCalendarLoaded) {
          switch (style) {
            case "take":
              this.calendarLayerYear = this.$store.state.takeCarYear;
              this.calendarLayerMonth = this.$store.state.takeCarMonth;
              this.isShowTakeCarClr = true;
              // 暂存点击日历弹窗之前选择的日期
              this.temporaryStorageDate = [
                this.$store.state.takeCarYear,
                this.$store.state.takeCarMonth,
                this.$store.state.takeCarDay,
                this.$store.state.takeCarMonthCn,
                this.$store.state.takeCarDays,
                this.$store.state.takeCarweekCn
              ];
              this.getCalendar({
                years: this.$store.state.takeCarYear +
                  "-" +
                  this.$store.state.takeCarMonth
              });
              break;
            case "ret":
              this.calendarLayerYear = this.$store.state.retCarYear;
              this.calendarLayerMonth = this.$store.state.retCarMonth;
              this.isShowTakeCarClr = false;
              // 暂存点击日历弹窗之前选择的日期
              this.temporaryStorageDate = [
                this.$store.state.retCarYear,
                this.$store.state.retCarMonth,
                this.$store.state.retCarDay,
                this.$store.state.retCarMonthCn,
                this.$store.state.retCarDays,
                this.$store.state.retCarweekCn
              ];
              this.getCalendar({
                years: this.$store.state.retCarYear +
                  "-" +
                  this.$store.state.retCarMonth
              });
              break;
            default:
              break;
          }
          this.isShowClrLayer = true;
        }
      },

      /**
       * 获取日历数据
       * @param {Object} params 请求参数
       */
      getCalendar(params) {
        this.isLoadingCalendar = true;
        indexApi
          .getCalendar(params)
          .then(res => {
            this.isLoadingCalendar = false;
            this.calendarData = res.Result;
            // 今天年份和月份
            var todayGetTime = pubMethod.getTime(
              this.$store.state.todayYear + "-" + this.$store.state.todayMonth
            );
            // 现在的年份和月份
            var curdayGetTime = pubMethod.getTime(
              this.calendarLayerYear +
              "-" +
              (this.calendarLayerMonth < 10 ?
                "0" + this.calendarLayerMonth :
                this.calendarLayerMonth)
            );
            // 上个月的年份和月份
            var tmpPrevYear = this.calendarLayerYear;
            var tmpPrevMonth = this.calendarLayerMonth;
            if (this.calendarLayerMonth - 1 < 1) {
              tmpPrevYear--;
              tmpPrevMonth = 12;
            }
            var tmpPrevGetTime = pubMethod.getTime(
              tmpPrevYear +
              "-" +
              (tmpPrevMonth < 10 ? "0" + tmpPrevMonth : tmpPrevMonth)
            );
            // 判断是否禁用日历弹窗切换上个月
            if (tmpPrevGetTime <= todayGetTime) {
              // 禁用
              this.isDisablePrevBtn = true;
            } else {
              // 不禁用
              this.isDisablePrevBtn = false;
            }
          })
          .catch(err => {
            this.isLoadingCalendar = false;
          });
      },

      /**
       * 判断日期类型 取车日期 租车期限内的日期 还车日期
       * @param {String} dayString 当前日期的字符串 “2019-04-21”
       * @param {String} style 日期类型
       */
      isSwitchDate(dayString, style) {
        let curGetTime = pubMethod.getTime(dayString);
        let todayGetTime = pubMethod.getTime(
          this.$store.state.todayYear +
          "-" +
          this.$store.state.todayMonth +
          "-" +
          this.$store.state.todayDay
        );
        let takeGetTime = pubMethod.getTime(
          this.$store.state.takeCarYear +
          "-" +
          this.$store.state.takeCarMonth +
          "-" +
          this.$store.state.takeCarDay
        );
        let retGetTime = pubMethod.getTime(
          this.$store.state.retCarYear +
          "-" +
          this.$store.state.retCarMonth +
          "-" +
          this.$store.state.retCarDay
        );
        let returnBoolean = false;
        switch (style) {
          case "disable":
            if (this.isShowTakeCarClr) {
              curGetTime < todayGetTime ?
                (returnBoolean = true) :
                (returnBoolean = false);
            } else {
              curGetTime <= takeGetTime ?
                (returnBoolean = true) :
                (returnBoolean = false);
            }
            break;
          case "over":
            if (!this.isShowTakeCarClr) {
              takeGetTime < curGetTime && curGetTime < retGetTime ?
                (returnBoolean = true) :
                (returnBoolean = false);
            }
            break;
          case "takeCar":
            curGetTime === takeGetTime ?
              (returnBoolean = true) :
              (returnBoolean = false);
            break;
          case "retCar":
            if (!this.isShowTakeCarClr) {
              curGetTime === retGetTime ?
                (returnBoolean = true) :
                (returnBoolean = false);
            }
            break;
          case "nonMonth":
            this.calendarLayerMonth != pubMethod.formatDateString(dayString)[1] ?
              (returnBoolean = true) :
              (returnBoolean = false);
            break;
          default:
            break;
        }
        return returnBoolean;
      },

      /**
       * 切换弹窗日历
       * @param {String} style 切换方式
       */
      changeCalendar(style) {
        if (style == "prev") {
          // 切换上个月
          if (this.isDisablePrevBtn) {
            return;
          }
          this.calendarLayerMonth--;
          if (this.calendarLayerMonth < 1) {
            this.calendarLayerYear--;
            this.calendarLayerMonth = 12;
          }
        } else {
          // 切换下个月
          this.calendarLayerMonth++;
          if (this.calendarLayerMonth > 12) {
            this.calendarLayerYear++;
            this.calendarLayerMonth = 1;
          }
        }
        this.getCalendar({
          years: this.calendarLayerYear + "-" + this.calendarLayerMonth
        });
      },

      /**
       * 选择具体的日期
       * @param {ElementObject} event 元素节点
       * @param {Number} index 下标
       */
      choiceDetailDate(event, index) {
        // 当前点击的日期
        let curClickDate = this.calendarData[index];

        // 当前点击的日期字符串
        let formatDateString = pubMethod.formatDateString(curClickDate.daystring);

        if (this.isShowTakeCarClr) {
          // 取车状态下日历
          if (
            event.target.parentNode.className.indexOf("disable") < 0 &&
            event.target.parentNode.className.indexOf("nonMonth") < 0
          ) {
            // 如果点击的是可选时间
            this.$store.state.takeCarYear = formatDateString[0];
            this.$store.state.takeCarMonth = formatDateString[1];
            this.$store.state.takeCarDay = formatDateString[2];
            this.$store.state.takeCarMonthCn = curClickDate.month_cn;
            this.$store.state.takeCarDays = curClickDate.month_days;
            this.$store.state.takeCarweekCn = curClickDate.week_cn;
          }
        } else {
          // 还车状态下日历
          if (
            event.target.parentNode.className.indexOf("disable") < 0 &&
            event.target.parentNode.className.indexOf("nonMonth") < 0
          ) {
            // 如果点击的是可选时间
            this.$store.state.retCarYear = formatDateString[0];
            this.$store.state.retCarMonth = formatDateString[1];
            this.$store.state.retCarDay = formatDateString[2];
            this.$store.state.retCarMonthCn = curClickDate.month_cn;
            this.$store.state.retCarDays = curClickDate.month_days;
            this.$store.state.retCarweekCn = curClickDate.week_cn;
          }
        }
      },

      /**
       * 确认选择日期
       */
      determineChoice() {
        if (this.isShowTakeCarClr) {
          // 在选取取车日历的情况下 设置默认的还车日期
          this.$store.getters.setDefaultRetCarDate;

          // 暂存取车时间
          this.temporaryStorageTime = [
            this.$store.state.takeCarHour,
            this.$store.state.takeCarMin,
            this.$store.state.takeCarPeriod
          ];
        } else {
          // 暂存还车时间
          this.temporaryStorageTime = [
            this.$store.state.retCarHour,
            this.$store.state.retCarMin,
            this.$store.state.retCarPeriod
          ];
        }
        this.isShowClrLayer = false;
        this.temporaryStorageDate = [];
        this.isShowTimeLayer = true;
        this.showTimeLayerInit();
      },

      /**
       * 取消选择日期
       */
      cancelChoiceDate() {
        this.isShowClrLayer = false;
        if (this.temporaryStorageDate.length > 0) {
          if (this.isShowTakeCarClr) {
            // 取车状态下恢复暂存值
            [
              this.$store.state.takeCarYear,
              this.$store.state.takeCarMonth,
              this.$store.state.takeCarDay,
              this.$store.state.takeCarMonthCn,
              this.$store.state.takeCarDays,
              this.$store.state.takeCarweekCn
            ] = this.temporaryStorageDate;
          } else {
            // 还车状态下恢复暂存值
            [
              this.$store.state.retCarYear,
              this.$store.state.retCarMonth,
              this.$store.state.retCarDay,
              this.$store.state.retCarMonthCn,
              this.$store.state.retCarDays,
              this.$store.state.retCarweekCn
            ] = this.temporaryStorageDate;
          }
          this.temporaryStorageDate = [];
        }
      },

      /**
       * 获取租期
       */
      getTimeSpans() {
        // 参数格式为 2019-05-11 10:00
        let s =
          this.$store.state.takeCarYear +
          "-" +
          this.$store.state.takeCarMonth +
          "-" +
          this.$store.state.takeCarDay +
          " " +
          this.$store.state.takeCarHour +
          ":" +
          this.$store.state.takeCarMin;
        let e =
          this.$store.state.retCarYear +
          "-" +
          this.$store.state.retCarMonth +
          "-" +
          this.$store.state.retCarDay +
          " " +
          this.$store.state.retCarHour +
          ":" +
          this.$store.state.retCarMin;
        indexApi
          .getTimeSpans({
            s: s,
            e: e
          })
          .then(res => {
            if (!res.ErrorCode) {
              this.$store.state.timeSpans = data.Result;            
            } else {
              this.messageLayer(res.ErrorMsg, 0);
            }
          })
          .catch(err => {
            this.messageLayer("请求失败，请重试", 0);
          });
      },

      /**
       * 显示时间弹窗并初始化
       */
      showTimeLayerInit() {
        let movePointer = document.querySelector(".pointer");

        if (this.isChooseHour) {
          // 时钟
          if (this.temporaryStorageTime[0] > 6) {
            movePointer.style.transform =
              "rotate(" + (this.temporaryStorageTime[0] - 12) * 30 + "deg)";
          } else {
            movePointer.style.transform =
              "rotate(" + this.temporaryStorageTime[0] * 30 + "deg)";
          }
          this.timeActiveIndex =
            this.temporaryStorageTime[0] == 12 ?
            (this.timeActiveIndex = 0) :
            (this.timeActiveIndex = this.temporaryStorageTime[0]);
        } else {
          // 分钟
          if (this.temporaryStorageTime[1] / 5 > 6) {
            movePointer.style.transform =
              "rotate(" + (this.temporaryStorageTime[1] / 5 - 12) * 30 + "deg)";
          } else {
            movePointer.style.transform =
              "rotate(" + (this.temporaryStorageTime[1] / 5) * 30 + "deg)";
          }
          this.timeActiveIndex = this.temporaryStorageTime[1] / 5;
        }
        this.pointerMove();
      },

      /**
       * 选择 时钟 或者 分钟
       * @param {String} style 小时或者分钟
       */
      chooseHourOrMin(style) {
        switch (style) {
          case "hour":
            this.isChooseHour = true;
            this.timeLayerShowData = this.hourData;
            this.showTimeLayerInit();
            break;
          case "min":
            this.isChooseHour = false;
            this.timeLayerShowData = this.minData;
            this.showTimeLayerInit();
            break;
          default:
            break;
        }
      },
      /**
       * 选择上午 or 下午
       * @param {String} value 设置AM or PM
       */
      choosePeriod(value) {
        this.$set(this.temporaryStorageTime, 2, value);
      },

      /**
       * 移动指针
       */
      pointerMove() {
        let timeLayerBox,
          movePointer,
          originX,
          originY,
          moveAreaOffsetX,
          moveAreaOffsetY;
        let moveArea = document.querySelector(".moveShadow");
        moveArea.ontouchstart = e => {
          e.preventDefault();
          timeLayerBox = document.querySelector(".timeLayerBox");
          moveArea = document.querySelector(".moveShadow");
          movePointer = document.querySelector(".pointer");
          originX = moveArea.offsetWidth / 2;
          originY = moveArea.offsetHeight / 2;
          moveAreaOffsetX =
            moveArea.parentNode.offsetLeft +
            timeLayerBox.offsetLeft -
            timeLayerBox.offsetWidth / 2;
          moveAreaOffsetY =
            moveArea.parentNode.offsetTop +
            timeLayerBox.offsetTop -
            timeLayerBox.offsetHeight / 2;
          this.moveTouch(
            movePointer,
            e,
            originX,
            originY,
            moveAreaOffsetX,
            moveAreaOffsetY
          );
        };
        moveArea.ontouchmove = e => {
          e.preventDefault();
          this.moveTouch(
            movePointer,
            e,
            originX,
            originY,
            moveAreaOffsetX,
            moveAreaOffsetY
          );
        };
        moveArea.ontouchend = e => {
          e.preventDefault();
          // let moveX = e.changedTouches[0].clientX - moveAreaOffsetX
          // let moveY = e.changedTouches[0].clientY - moveAreaOffsetY
          // if (moveX < 0) {
          //     moveX = 0
          // }
          // if (moveY < 0) {
          //     moveY = 0
          // }
          // movePointer.style.transform = 'rotate(' + stopDegIndex * 30 + 'deg)'
          this.moveTouch(
            movePointer,
            e,
            originX,
            originY,
            moveAreaOffsetX,
            moveAreaOffsetY,
            "end"
          );
        };
      },

      /**
       * 根据移动获取坐标并计算角度
       * @param {Element} movePointer 指针元素
       * @param {event} e 元素event对象
       * @param {Number} originX 中心点的X坐标
       * @param {Number} originY 中心点的Y坐标
       * @param {Number} moveAreaOffsetX 可转动区域的偏移量X
       * @param {Number} moveAreaOffsetY 可转动区域的偏移量Y
       */
      moveTouch(
        movePointer,
        e,
        originX,
        originY,
        moveAreaOffsetX,
        moveAreaOffsetY,
        style
      ) {
        let moveTouch = style === "end" ? e.changedTouches[0] : e.touches[0];
        let moveX = moveTouch.clientX - moveAreaOffsetX;
        let moveY = moveTouch.clientY - moveAreaOffsetY;
        if (moveX < 0) {
          moveX = 0;
        }
        if (moveY < 0) {
          moveY = 0;
        }
        movePointer.style.transform =
          "rotate(" +
          this.pointConversion(moveX - originX, originY - moveY).toFixed(0) +
          "deg)";
        let stopDegIndex = Math.round(
          this.pointConversion(moveX - originX, originY - moveY).toFixed(0) / 30
        );
        let realIndex = stopDegIndex < 0 ? stopDegIndex + 12 : stopDegIndex;
        this.timeActiveIndex = realIndex;
        if (this.isChooseHour) {
          // 时钟状态下
          this.$set(this.temporaryStorageTime, 0, this.hourData[realIndex]);
        } else {
          // 分钟状态下
          this.$set(this.temporaryStorageTime, 1, this.minData[realIndex]);
        }
        if (style === "end") {
          movePointer.style.transform = "rotate(" + stopDegIndex * 30 + "deg)";
        }
      },

      /**
       * 根据坐标算出角度
       * Math.atan2(172,100)*(180/Math.PI)
       * @param {Number} x 坐标x
       * @param {Number} y 坐标y
       */
      pointConversion(x, y) {
        return Math.atan2(x, y) * (180 / Math.PI);
      },
      /**
       * 取消选择时间
       */
      cancelChooseTime() {
        this.isChooseHour = true;
        this.timeActiveIndex = 0;
        this.timeLayerShowData = this.hourData;
        this.temporaryStorageTime = [];
        this.isShowTimeLayer = false;
        this.getTimeSpans();
      },
      /**
       * 去地标搜索
       * @param {String} style 取还车
       */
      goLandMark(style) {
          this.$store.state.isTakeCar = style === 'take' ? true : false
          this.$refs.choiceCity.init()
          this.$store.state.isShowChoiceCity = true
        // if (this.$route.path !== '/') {
        //     this.$store.state.isGoHome = false
        //     this.$store.state.redirectPath = this.$route.path
        //     this.$store.state.redirectQuery = this.$route.query
        // }
        // this.$router.push({
        //   path: "/choiceCity",
        //   query: {
        //     isTakeCar: style === "take" ? 1 : 0
        //   }
        // });
      },

      /**
       * 初始化取还车地标
       */
      initChoiceLand () {
        this.$store.state.isShowChoiceCity = false
        this.$store.state.isShowChoiceLand = true
        this.$refs.choiceLand.init()
      },

      /**
       * 验证条件 进入列表页
       */
      goList() {
        if (this.$store.state.takeCarLand == "") {
          this.messageLayer("请输入取车地点");
          return;
        }
        if (this.$store.state.retCarLand == "") {
          this.messageLayer("请输入还车地点");
          return;
        }

        // 地图搜索 取车code
        let pl = this.$store.state.pickuplocation;
        // 地图搜索 还车code
        let rl = this.$store.state.returnlocation;
        // 取车时间
        let pd =
          this.$store.state.takeCarYear +
          "-" +
          this.$store.state.takeCarMonth +
          "-" +
          this.$store.state.takeCarDay +
          " " +
          this.$store.state.takeCarHour +
          ":" +
          this.$store.state.takeCarMin +
          this.$store.state.takeCarPeriod;
        // 还车时间
        let rd =
          this.$store.state.retCarYear +
          "-" +
          this.$store.state.retCarMonth +
          "-" +
          this.$store.state.retCarDay +
          " " +
          this.$store.state.retCarHour +
          ":" +
          this.$store.state.retCarMin +
          this.$store.state.retCarPeriod;
        // 取还车国家
        let country =
          this.$store.state.takeCarCountry +
          "," +
          this.$store.state.retCarCountry;
        // 取还车品牌
        let brand =
          this.$store.state.takeCarBrand + "," + this.$store.state.retCarBrand;
        // 取还车guid
        let guid =
          this.$store.state.takeCarGuid + "," + this.$store.state.retCarGuid;
        // 取车信息
        let take = encodeURIComponent(this.$store.state.takeCarLand) + ',' + this.$store.state.takeCarCoor;
        // 还车信息
        let ret = encodeURIComponent(this.$store.state.retCarLand) + ',' + this.$store.state.retCarCoor;
        // 租期
        let lease = this.$store.state.timeSpans;

        let query = {
          pl,
          rl,
          pd,
          rd,
          country,
          brand,
          guid,
          take,
          ret,
          lease
        };
        this.$router.push({
          path: "/list",
          query
        });
      },
      /**
       * 确认选择时间
       */
      determineChooseTime() {
        if (this.isShowTakeCarClr) {
          // 暂存取车时间
          [
            this.$store.state.takeCarHour,
            this.$store.state.takeCarMin,
            this.$store.state.takeCarPeriod
          ] = this.temporaryStorageTime;
        } else {
          // 暂存还车时间
          [
            this.$store.state.retCarHour,
            this.$store.state.retCarMin,
            this.$store.state.retCarPeriod
          ] = this.temporaryStorageTime;
          this.getTimeSpans();
        }
        this.isChooseHour = true;
        this.timeActiveIndex = 0;
        this.timeLayerShowData = this.hourData;
        this.temporaryStorageTime = [];
        this.isShowTimeLayer = false;
      }
    }
  };

</script>

<style lang='less' scoped>
  @color_3B444F: #3b444f;
  @color_BCBCBB: #bcbcbb;
  .mr (@value) {
    margin-right: @value;
  }
  .ml (@value) {
    margin-left: @value;
  }
  .mt (@value) {
    margin-top: @value;
  }
  .mb (@value) {
    margin-bottom: @value;
  }
  .pt (@value) {
    padding-top: @value;
  }
  .pr (@value) {
    padding-right: @value;
  }
  .pb (@value) {
    padding-bottom: @value;
  }
  .ft (@value) {
    font-size: @value;
  }

  .findCar {
    padding: 0.4rem;
    height: 5.5rem;
    background: #fff;
    /* 取还车地点 */
    .landMark {
      > div {
        .pb(0.2rem);
        .mb(0.3rem);
        border-bottom: 1px solid #cecece;
      }
      .takeCarCity,
      .retCarCity {
        width: 2.2rem;
      }
      .takeCarland,
      .retCarland {
        width: 100%;
      }
      label {
        .ft(0.18rem);
        .mb(0.1rem);
        display: inline-block;
        color: @color_BCBCBB;
      }
      span {
        display: block;
        color: @color_3B444F;
        font-weight: bold;
        width: 100%;
        .ft(0.3rem);
      }
    }
    /* 日期 */
    .calendar {
      text-align: center;
      .mb(0.4rem);
      > .takeCarDate,
      > .retCarDate {
        text-align: left;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #cecece;
        .right {
          .mt(0.06rem);
        }
      }
      .timeSpans {
        .ft(0.26rem);
        .mt(0.08rem);
        padding-bottom: 0.16rem;
        width: 1rem;
        background: url(../../assets/images/timespans_bg.jpg) no-repeat
        center bottom;
        background-size: contain;
        text-align: center;
        float: none;
        display: inline-block;
        span {
          min-width: 0.42rem;
          min-height: 0.34rem;
          color: #ff9c00;
          background: #ff9c00;
          letter-spacing: 2px;
        }
      }
      .day {
        .ft(0.8rem);
        .mr(0.15rem);
        color: @color_3B444F;
        min-width: 0.94rem;
        min-height: 0.8rem;
        background: @color_3B444F;
        text-align: center;
        line-height: 1;
      }
      .right {
        .ft(0.28rem);
        .month {
          color: @color_3B444F;
          min-width: 0.68rem;
          min-height: 0.28rem;
          .pr(0.1rem);
          .mr(0.1rem);
          .mb(0.15rem);
          border-right: 1px solid @color_BCBCBB;
          background: @color_3B444F;
        }
        .week {
          color: @color_3B444F;
          min-width: 0.68rem;
          min-height: 0.28rem;
          background: @color_3B444F;
        }
        .time {
          clear: both;
          .ft(0.24rem);
          color: @color_BCBCBB;
          background: @color_BCBCBB;
          min-height: 0.24rem;
        }
      }
    }
    &.loaded {
      .month,
      .week,
      .time,
      .day,
      .timeSpans span {
        background: none !important;
        transition: all 0.1s;
      }
    }
    /* 搜索按钮 */
    .searchBtn {
      display: block;
      width: 100%;
      height: 0.84rem;
      line-height: 0.84rem;
      background: linear-gradient(
        0deg,
        rgba(255, 186, 0, 1),
        rgba(255, 204, 0, 1)
      );
      box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
      color: @color_3B444F;
      border-radius: 0.08rem;
      .ft(0.3rem);
    }
    /* 日历弹窗 */
    .calendarLayer {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 11;
      .calendarLayerBox {
        position: fixed;
        top: 2.2rem;
        left: 50%;
        transform: translateX(-50%);
        .changeData {
          width: 5.96rem;
          height: 1.85rem;
          background: #57585a;
          position: relative;
          padding: 0.32rem 0;
          .center {
            width: 4.55rem;
            margin: 0 auto;
            .month,
            .year {
              position: relative;
              span {
                line-height: 1.27rem;
                padding: 0 0.25rem;
              }
              ul {
                position: absolute;
                left: 0;
                top: 1.27rem;
                width: 100%;
                max-height: 8rem;
                overflow-y: auto;
                background: #fff;
                border-top: 3px solid #e7e7e7;
                padding: 0.15rem 0.3rem;
                display: none;
                .ft(0.32rem);
                li {
                  color: #58595b;
                  font-weight: bold;
                  padding: 0.15rem 0;
                }
              }
              &.on {
                background: #fff;
                span {
                  color: #58595b;
                }
                ul {
                  display: block;
                }
              }
            }
          }
          span {
            .ft(0.64rem);
            color: #fff;
          }
          .prev {
            background: url("../../assets/images/prev.png") no-repeat
            center center;
            &.disable {
              background-image: url("../../assets/images/prev_disable.png");
            }
          }
          .next {
            background: url("../../assets/images/next.png") no-repeat
            center center;
            &.disable {
              background-image: url("../../assets/images/next_disable.png");
            }
          }
          .prev,
          .next {
            width: 0.15rem;
            height: 0.22rem;
            padding: 0.3rem;
            background-size: 0.15rem 0.22rem;
          }
          > span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          .prev {
            left: 0.32rem;
          }
          .next {
            right: 0.32rem;
          }
        }
        .dayList {
          min-height: 4.96rem;
          padding: 0.2rem 0.3rem;
          background: #fff;
          ul {
            min-height: 5.09rem;
            > li {
              .mb(0.26rem);
            }
          }
          li {
            width: 0.76rem;
            height: 0.76rem;
            border-radius: 50%;
            text-align: center;
            line-height: 0.76rem;
            float: left;
            border: 2px solid transparent;
            .ft(0.32rem);
            span {
              display: block;
              line-height: calc(0.76rem - 4px);
              font-weight: bold;
              color: #58595b !important;
            }
            &.disable {
              span {
                color: #cccfd3 !important;
              }
            }
            &.over {
              span {
                color: #ffcc00 !important;
              }
            }
            &.today {
              border: 2px solid #ffcc00;
            }
            &.takeCar,
            &.retCar {
              background: #ffcc00;
              visibility: visible !important;
              span {
                color: #58595b !important;
              }
            }
            &.nonMonth {
              visibility: hidden;
            }
          }
        }
        .loadingBox {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: none;
          > div {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 8;
            .ft(0.28rem);
            img {
              width: 0.56rem;
              height: 0.56rem;
            }
            p {
              .mt(0.2rem);
            }
          }
        }
        &.loading {
          .loadingBox {
            display: block;
          }
        }
      }
    }
    /* 时间弹窗 */
    .timeLayer {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 11;
      .timeLayerBox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .timeShow {
          width: 5.97rem;
          height: 1.85rem;
          background: #57585a;
          text-align: center;
          position: relative;
          .center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 3.5rem;
            font-size: 1.38rem;
            color: #b8b8b8;
            text-align: center;
            span {
              &.active {
                color: #fff;
              }
            }
            .hover {
              width: 1.54rem;
              text-align: right;
            }
            .min {
              width: 1.54rem;
              text-align: left;
            }
          }
          .chooseIsAm {
            position: absolute;
            right: 0.57rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.32rem;
            color: #b8b8b8;
            width: 0.46rem;
            span {
              display: inline-block;
              margin-bottom: 0.4rem;
              &:last-child {
                margin-bottom: 0;
              }
              &.active {
                color: #fff;
              }
            }
          }
        }
      }
      .timeChoose {
        width: 5.97rem;
        height: 7.23rem;
        padding: 0.72rem 0.5rem 0.48rem;
        background: #fff;
        .timeDisc {
          width: 4.98rem;
          height: 4.98rem;
          border-radius: 50%;
          background: #f3f3f4;
          margin: 0 auto;
          position: relative;
          ul {
            display: block;
            position: relative;
            height: 100%;
            li {
              position: absolute;
              width: 0.86rem;
              height: 0.86rem;
              text-align: center;
              line-height: 0.86rem;
              font-size: 0.38rem;
              color: #58595b;
              font-weight: bold;
              z-index: 2;
              &:nth-of-type(1) {
                left: 2.07rem;
                top: 0.09rem;
              }
              &:nth-of-type(2) {
                left: 3.04rem;
                top: 0.36rem;
              }
              &:nth-of-type(3) {
                left: 3.79rem;
                top: 1.1rem;
              }
              &:nth-of-type(4) {
                left: 4.05rem;
                top: 2.1rem;
              }
              &:nth-of-type(5) {
                left: 3.79rem;
                top: 3.09rem;
              }
              &:nth-of-type(6) {
                left: 3.05rem;
                top: 3.8rem;
              }
              &:nth-of-type(7) {
                left: 2.08rem;
                top: 4.07rem;
              }
              &:nth-of-type(8) {
                left: 1.08rem;
                top: 3.8rem;
              }
              &:nth-of-type(9) {
                left: 0.31rem;
                top: 3.09rem;
              }
              &:nth-of-type(10) {
                left: 0.07rem;
                top: 2.1rem;
              }
              &:nth-of-type(11) {
                left: 0.31rem;
                top: 1.1rem;
              }
              &:nth-of-type(12) {
                left: 1.08rem;
                top: 0.37rem;
              }
              &.active {
                color: #fff;
                border: none;
              }
            }
          }
          .pointer {
            width: 0.86rem;
            height: 2.49rem;
            position: absolute;
            left: 50%;
            top: 0;
            margin-left: -0.43rem;
            transform-origin: center bottom;
            transform: rotate(30deg);
            z-index: 1;
            &::after {
              content: "";
              width: 0.14rem;
              height: 0.14rem;
              position: absolute;
              left: 50%;
              bottom: -0.07rem;
              transform: translateX(-50%);
              border-radius: 50%;
              background: #58595b;
            }
            span {
              position: absolute;
              width: 2px;
              height: 80%;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              background: #58595b;
            }
            i {
              position: absolute;
              top: 3px;
              left: 50%;
              margin-left: -0.43rem;
              width: 0.86rem;
              height: 0.86rem;
              color: #fff;
              border-radius: 50%;
              background: #3b444f;
            }
          }
          .moveShadow {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
          }
        }
        .btns {
          margin-top: 0.7rem;
          padding: 0;
        }
      }
    }
    /* 确认 取消 按钮 */
    .btns {
      padding: 0 0.25rem;
      text-align: right;
      button {
        font-size: 0.32rem;
        color: #000000;
        background: none;
        &.cancel {
            width: auto;
            float: none;
          color: #b8b8b8;
          margin-right: 0.3rem;
        }
      }
    }
  }
</style>
