/**
 * 参数储存 参数前添加注释 标明用途
 * @example // 地表列表数据
 * @example landMarkList = []
 */

// 公共参数
const common = {
<<<<<<< HEAD
    // 是否登陆
    isLogined: false,
    // 是否是代理商登陆
    isagent: false
=======

>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
}

// 首页参数
const index = {
<<<<<<< HEAD

}

const state = {
    common,
    index
=======
    // 日历 数据
    calendar: {},
    // 取车 城市
    takeCarCity: '',
    // 取车 地点
    takeCarLand: '',
    // 取车 年份
    takeCarYear: '',
    // 取车 月份
    takeCarMonth: '',
    // 取车 月份 中文
    takeCarMonthCn: '',
    // 取车 日
    takeCarDay: '',
    // 取车 月总天数
    takeCarDays: '',
    // 取车 星期
    takeCarweek: '',
    // 取车 星期 中文
    takeCarweekCn: '',
    // 取车 时钟
    takeCarHour: '',
    // 取车 分钟
    takeCarMin: '',
    // 取车 上下午
    takeCarPeriod: '',
    // 还车 城市
    retCarCity: '',
    // 还车 地点
    retCarLand: '',
    // 还车 年份
    retCarYear: '',
    // 还车 月份
    retCarMonth: '',
    // 还车 月份 中文
    retCarMonthCn: '',
    // 还车 日
    retCarDay: '',
    // 还车 星期
    retCarweek: '',
    // 还车 星期 中文
    retCarweekCn: '',
    // 还车 时钟
    retCarHour: '',
    // 还车 分钟
    retCarMin: '',
    // 还车 上下午
    retCarPeriod: '',
    // 租期
    timeSpans: '',
    // 日历请求完成
    isCalendarLoaded: false
}

const state = {
    ...common,
    ...index
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
}

export default state