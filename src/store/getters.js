/**
 * 计算方法储存 共用方法存储 方法前添加注释 标明用途
 * @example // 筛选地标列表
 * @example filterLandMarkList () {
 * @example }
 */

// 公共方法
const common = {

}

// 首页方法
const index = {
    // 第一次进入获取日期
    getTakeCarDate (state) {
        state.calendar.forEach(ele => {
            if (ele.istaday) {
                [state.takeCarYear, state.takeCarMonth, state.takeCarDay] = pubMethod.formatDateString(ele.daystring)
                state.takeCarMonthCn = ele.month_cn
                state.takeCarDays = ele.month_days
                state.takeCarweekCn = ele.week_cn
                state.takeCarHour = '10'
                state.takeCarMin = '00'
                state.takeCarPeriod = 'AM'
                state.timeSpans = '7'
            }
        })
    },
    // 第一次进入设置默认取车日期 今天 后 两周后
    setDefaulttakeCarDate (state) {
        if (Number(state.todayDay) + 14 - state.todayDays > 0) {
            if (Number(state.todayMonth) + 1 > 12) {  // 超过12个月
                state.takeCarYear = Number(state.todayYear) + 1
                state.takeCarMonth = state.todayMonth - 12 < 10 ? '0' + (state.todayMonth - 12) : state.todayMonth - 12
            }else{
                state.takeCarYear = state.todayYear
                state.takeCarMonth = Number(state.todayMonth) + 1 < 10 ? '0' + (Number(state.todayMonth) + 1) : Number(state.todayMonth) + 1
            }
            state.takeCarDay = Number(state.todayDay) + 14 - state.todayDays < 10 ? '0' + (Number(state.todayDay) + 14 - state.todayDays) : Number(state.todayDay) + 14 - state.todayDays
            state.takeCarMonthCn = pubMethod.monthNumberChangeCn(state.takeCarMonth)
            state.takeCarDays = pubMethod.retMonthDays(state.takeCarYear, state.takeCarMonth)
        }else{
            state.takeCarYear = state.todayYear
            state.takeCarMonth = state.todayMonth
            state.takeCarMonthCn = state.todayMonthCn
            state.takeCarDays = state.todayDays
            state.takeCarDay = Number(state.todayDay) + 14
        }
        state.takeCarweekCn = state.todayWeekCn
        state.takeCarHour = '10'
        state.takeCarMin = '00'
        state.takeCarPeriod = 'AM'
        state.timeSpans = '7'
    },
    // 第一次进入设置默认取车日期
    setDefaultRetCarDate (state) {
        if (Number(state.takeCarDay) + 7 - state.takeCarDays > 0) {
            if (Number(state.takeCarMonth) + 1 > 12) {  // 超过12个月
                state.retCarYear = Number(state.takeCarYear) + 1
                state.retCarMonth = state.takeCarMonth - 12
            }else{
                state.retCarYear = state.takeCarYear
                state.retCarMonth = Number(state.takeCarMonth) + 1
            }
            state.retCarDay = Number(state.takeCarDay) + 7 - state.takeCarDays
            state.retCarMonthCn = pubMethod.monthNumberChangeCn(state.retCarMonth)
        }else{
            state.retCarYear = state.takeCarYear
            state.retCarMonth = state.takeCarMonth
            state.retCarDay = Number(state.takeCarDay) + 7
            state.retCarMonthCn = state.takeCarMonthCn
        }
        state.retCarweekCn = state.takeCarweekCn
        state.retCarHour = '10'
        state.retCarMin = '00'
        state.retCarPeriod = 'AM'
    }
}

const getters = {
    ...common,
    ...index
}

export default getters
