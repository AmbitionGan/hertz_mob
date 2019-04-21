import Http from './service'

/**
 * @desc 所有请求地址请写在 apiUrl 变量内
 * @desc 每个地址前请备注用途
 */
const apiUrl = {
    // 日历接口
    calendar: '/calendar/',
    // 获取地标
    landmark: '/landmark/',
    // 获取国际区号
    areacode: '/areacode/',
    // 账号密码登陆
    passwordlanding: '/member/login/passwordlanding/',
    // 手机快捷登陆
    quicklanding: '/member/login/quicklanding/'
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
    // 获取地标
    getLandMark (params) {
        return Http.get(apiUrl.landmark, params);
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
    }
}

export default indexApi