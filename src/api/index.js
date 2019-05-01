import Http from './service'

/**
 * @desc 所有请求地址请写在 apiUrl 变量内
 * @desc 每个地址前请备注用途
 */
const apiUrl = {
    // 日历接口
    calendar: '/calendar/',
    // 未来日历
    futureCalendar: '/calendar/date/',
    // 租期
    timeSpans: '/calendar/timespans/',
    // 地图搜索
    mapSearch: '/googlemap/',
    // 获取地图搜索地标附近门店
    mapSearchStore: '/network/',
    // 获取热门国家和洲
    landmark: '/landmark/',
    // 获取支付
    getPay: '/pay/cn/bank/',
    // 获取国际区号
    areacode: '/areacode/',
    // 账号密码登陆
    passwordlanding: '/member/login/passwordlanding/',
    // 手机快捷登陆
    quicklanding: '/member/login/quicklanding/',
    //获取车辆信息
    vehicleUrl:'/vehicle/',
    //获取保险信息
    vehicleDetails:'/vehicle/details/',
    //获取保险信息
    getInsurance:'/auxiliary/insurance/',
    //
    getResClause:'/clause/',
    //
    getRate:'/vehicle/rate/'
}

/**
 * @desc 所有请求方法请写在 indexApi 变量内
 * @desc 每个方法前请备注用途
 * @param {Object} params 请求参数
 */
const indexApi = {
    // 获取日历
    getCalendar (params) {
        return Http.get(apiUrl.calendar, params);
    },
    // 获取未来日历
    getFutureCalendar (params) {
        return Http.get(apiUrl.futureCalendar, params);
    },
    // 获取租期
    getTimeSpans (params) {
        return Http.get(apiUrl.timeSpans, params);
    },
    // 地图搜索
    getMapSearch (params) {
        return Http.get(apiUrl.mapSearch, params);
    },
    // 获取地图搜索地标附近门店
    getMapSearchStore (params) {
        return Http.get(apiUrl.mapSearchStore, params);
    },
    // 获取热门国家和洲
    getLandMark (params) {
        return Http.get(apiUrl.landmark, params);
    },
    // 获取支付
    getPay (params) {
        return Http.post(apiUrl.getPay, params)
    },
    // 获取区号
    getAreaCode (params) {
        return Http.get(apiUrl.areacode, params);
    },
    // 账号密码登陆
    postPwdLanding (params) {
       return Http.post(apiUrl.areacode, params);
    },
    // 手机快捷登陆
    postQuickLanding (params) {
        return Http.post(apiUrl.areacode, params);
    },
    // 获取车辆信息
    vehicle (params) {
      return Http.get(apiUrl.vehicleUrl, params);
    },
    //获取车辆详情
    getVehicleDetails(params){
      return Http.get(apiUrl.vehicleDetails, params);
    },
    //获取保险信息
    getInsur(params){
      return Http.post(apiUrl.getInsurance, params);
    },
    //获取认证
    resClause(params){
      return Http.get(apiUrl.getResClause, params);
    },
    //获取保险额外设备价钱
    getrate(params){
      return Http.post(apiUrl.getRate, params);
    }

}

export default indexApi
