<!-- 地标搜索 日历 -->
<template>
    <div class="findCar" :class="{'loaded': $store.state.isCalendarLoaded}">
        <!-- 地标选择 -->
        <div class="landMark clear">
            <div class="takeCarCity left">
                <label>取车城市</label>
                <span>请输入取车城市</span>
            </div>
            <div class="takeCarland right">
                <label>取车地点</label>
                <span>请输入取车地点</span>
            </div>
            <div class="retCarCity left">
                <label>还车城市</label>
                <span>请输入还车城市</span>
            </div>
            <div class="retCarland right">
                <label>还车地点</label>
                <span>请输入还车地点</span>
            </div>
        </div>
        <!-- 日历选择 -->
        <div class="calendar clear">
            <div class="takeCarDate left clear" @click="choiceDate('take')">
                <span class="day left">{{$store.state.takeCarDay}}</span>
                <div class="right clear">
                    <i class="month left">{{$store.state.takeCarMonthCn}}</i>
                    <i class="week left">{{$store.state.takeCarweekCn}}</i>
                    <p class="time">{{$store.state.takeCarHour + ':' + $store.state.takeCarMin + ' ' + $store.state.takeCarPeriod}}</p>
                </div>
            </div>
            <div class="timeSpans left">
                <span>{{$store.state.timeSpans}}天</span>
            </div>
            <div class="retCarDate right" @click="choiceDate('ret')">
                <span class="day left">{{$store.state.retCarDay}}</span>
                <div class="right clear">
                    <i class="month left">{{$store.state.retCarMonthCn}}</i>
                    <i class="week left">{{$store.state.retCarweekCn}}</i>
                    <p class="time">{{$store.state.retCarHour + ':' + $store.state.retCarMin + ' ' + $store.state.retCarPeriod}}</p>
                </div>
            </div>
        </div>
        <!-- 搜索按钮 -->
        <button class="searchBtn">搜 索</button>
        <!-- 日历弹窗 -->
        <div class="calendarLayer" v-show="isShowClrLayer">
            <div class="calendarLayerBox">
                <div class="changeData clear">
                    <span class="prev left"><</span>
                    <div class="year left">
                        <span>{{2019}}年</span>
                        <ul>
                            <li>{{2019}}</li>
                            <li>{{2018}}</li>
                        </ul>
                    </div>
                    <div class="month right">
                        <span>{{1}}月</span>
                        <ul>
                            <li>{{1}}</li>
                            <li>{{2}}</li>
                        </ul>
                    </div>
                    <span class="next right">></span>
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
                        <li v-for="(item, index) in calendarData" 
                            :key="index" 
                            :class="{'disable': !item.enabled, 'over': isSwitchDate(item.daystring, 'over'), 'takeCar': isSwitchDate(item.daystring, 'takeCar'), 'retCar': isSwitchDate(item.daystring, 'retCar')}">
                            <span>{{item.day}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import indexApi from '../../api/index'

export default {
    name: 'findCar',
    data() {
        return {
            // 日历数据
            calendarData: {},
            // 是否显示日历数据
            isShowClrLayer: false,
        }
    },
    mounted () {
        this.$store.dispatch('getCalendar', null)
    },
    methods: {
        /**
         * 点击日历或者还车日历
         * @param {string} style 取车还是还车
         */
        choiceDate (style) {
            alert(style)
            switch (style) {
                case 'take':
                    this.getCalendar({
                        years: this.$store.state.takeCarYear + '-' + this.$store.state.takeCarMonth
                    })
                    break;
                case 'ret':
                    this.getCalendar({
                        years: this.$store.state.retCarYear + '-' + this.$store.state.retCarMonth
                    })
                    break;
                default:
                    break;
            }
            this.isShowClrLayer = true;
        },

        /**
         * 获取日历数据
         * @param {Object} params 请求参数
         */
        async getCalendar (params) {
            let data = await indexApi.getCalendar(params)
            this.calendarData = data.Result
        },

        /**
         * 判断日期类型 取车日期 租车期限内的日期 还车日期
         * @param {String} dayString 当前日期的字符串 “2019-04-21”
         * @param {String} style 日期类型
         */
        isSwitchDate (dayString, style) {
            let curGetTime = pubMethod.getTime(dayString)
            let takeGetTime = pubMethod.getTime(this.$store.state.takeCarYear + '-' + this.$store.state.takeCarMonth + '-' + this.$store.state.takeCarDay)
            let retGetTime = pubMethod.getTime(this.$store.state.retCarYear + '-' + this.$store.state.retCarMonth + '-' + this.$store.state.retCarDay)
            let returnBoolean = false
            switch (style) {
                case 'over':
                    takeGetTime < curGetTime && curGetTime < retGetTime ? returnBoolean = true : returnBoolean = false;
                    break;
                case 'takeCar':
                    curGetTime === takeGetTime ?  returnBoolean = true : returnBoolean = false;
                    break;
                case 'retCar':
                    curGetTime === retGetTime ?  returnBoolean = true : returnBoolean = false;
                    break;
                    
            }
            return returnBoolean
        }
    }
};
</script>

<style lang='less' scoped>
@color_3B444F: #3B444F;
@color_BCBCBB: #BCBCBB;
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
    padding: .4rem;
    height: 5.5rem;
    background: #fff;
    /* 取还车地点 */
    .landMark {
        > div {
            .pb(.2rem);
            .mb(.3rem);
            border-bottom: 1px solid #cecece;
        }
        .takeCarCity,.retCarCity {
            width: 2.2rem;
        }
        .takeCarland,.retCarland {
            width: 4.2rem;
        }
        label {
            .ft(.18rem);
            .mb(.1rem);
            display: inline-block;
            color: @color_BCBCBB;
        }
        span {
            display: block;
            color: @color_3B444F;
            font-weight: bold;
            width: 100%;
            .ft(.3rem);
        }
    }
    /* 日期 */
    .calendar {
        text-align: center;
        .mb(.4rem);
        > .takeCarDate, > .retCarDate {
            text-align: left;
            padding-bottom: .1rem;
            border-bottom: 1px solid #cecece;
            .right {
                .mt(.06rem);
            }
        }
        .timeSpans {
            .ft(.26rem);
            .mt(.08rem);
            padding-bottom: .16rem;
            width: 1rem;
            background: url(../../assets/images/timespans_bg.jpg) no-repeat center bottom;
            background-size: contain;
            text-align: center;
            float: none;
            display: inline-block;
            span {
                min-width: .42rem;
                min-height: .34rem;
                color: #FF9C00; 
                background: #FF9C00;
                letter-spacing: 2px;
            }
        }
        .day {
            .ft(.8rem);
            .mr(.15rem);
            color: @color_3B444F;
            min-width: .94rem;
            min-height: .8rem;
            background: @color_3B444F;
            text-align: center;
            line-height: 1;
        }
        .right {
            .ft(.28rem);
            .month {
                color: @color_3B444F;
                min-width: .68rem;
                min-height: .28rem;
                .pr(.1rem);
                .mr(.1rem);
                .mb(.15rem);
                border-right: 1px solid  @color_BCBCBB;
                background: @color_3B444F
            }
            .week {
                color: @color_3B444F;
                min-width: 0.68rem;
                min-height: .28rem;
                background: @color_3B444F
            }
            .time {
                clear: both;
                .ft(.24rem);
                color: @color_BCBCBB;
                background: @color_BCBCBB;
                min-height: .24rem;
            }
        }
    }
    &.loaded {
        .month,.week,.time,.day,.timeSpans span {
            background: none!important;
            transition: all 0.1s;
        }
    }
    /* 搜索按钮 */
    .searchBtn {
        display: block;
        width: 100%;
        height: .84rem;
        line-height: .84rem;
        background: linear-gradient(0deg,rgba(255,186,0,1),rgba(255,204,0,1));
        box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
        color: @color_3B444F;
        border-radius: .08rem;
        .ft(.3rem);
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
                // background: #
            }
            .dayList {
                background: #fff;
                li {
                    width: .5rem;
                    height: calc(.5rem - 4px);
                    border-radius: 50%;
                    text-align: center;
                    line-height: calc(.5rem - 4px);
                    float: left;
                    border: 2px solid transparent;
                    span {
                        color: #58595B!important;
                    }
                    &.disable {
                        span {
                            color: #CCCFD3!important;
                        }
                    }
                    &.over {
                        span {
                            color: #FFCC00!important;
                        }
                    }
                    &.today{
                        border: 2px solid #FFCC00;
                    }
                    &.takeCar,&.retCar{
                       background: #FFCC00;
                    }
                }
                
            }
        }
               
    }
}

</style>
