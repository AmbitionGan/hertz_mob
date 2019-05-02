import Http from './service'

/**
 * @desc 所有请求地址请写在 apiUrl 变量内
 * @desc 每个地址前请备注用途
 */

const apiUrl = {
    // 获取支付
    getPay: '/pay/cn/bank/',
    // 获取订单详情
    orderDeatil: '/order/detail/',
    // 获取订单车辆信息
    orderDeatilCar: '/order/detail/vehicle/',
    // 获取服务器时间
    serverDate: "/server/date/",
}

/**
 * @desc 所有请求方法请写在 payApi 变量内
 * @desc 每个方法前请备注用途
 * @param {Object} params 请求参数
 */
const payApi = {
    // 获取支付
    getPay (params) {
        return Http.post(apiUrl.getPay, params)
    },
    
    // 获取订单详情
    getOrderDeatil (params) {
        return Http.get(apiUrl.orderDeatil, params);
    },

    // 获取订单车辆信息
    getOrderDeatilCar (params) {
        return Http.get(apiUrl.orderDeatilCar, params);
    },

    // 获取服务器时间
    getServerDate (params) {
        return Http.get(apiUrl.serverDate, params);
    },
}

export default payApi
