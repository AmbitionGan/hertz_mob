import Http from './service'

/**
 * @desc 所有请求地址请写在 apiUrl 变量内
 * @desc 每个地址前请备注用途
 */
const apiUrl = {
    // 获取地标
    landmark: '/landmark/',
    areacode: '/areacode/'
}

/**
 * @desc 所有请求方法请写在 indexApi 变量内
 * @desc 每个方法前请备注用途
 * @param {Object} params 请求参数
 */
const indexApi = {
    // 获取地标
    getLandMark (params) {
        return Http.get(apiUrl.landmark, params);
    },
    getAreaCode (params) {
        return Http.get(apiUrl.areacode, params);
    },
}

export default indexApi