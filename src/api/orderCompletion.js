import Http from "./service";
function encryption(obj) {
//   for (var key in obj) {
//     if (obj[key]) {
//       obj[key] = TDES.encrypt(obj[key]);
//     }
//   }
  return obj
}

/**
 * @desc 所有请求地址请写在 apiUrl 变量内
 * @desc 每个地址前请备注用途
 */
const apiUrl = {
  // 常用驾驶人列表
  driver: "/driver/",
  // 国际区号列表
  areacode: "/areacode/",
  // 添加常用驾驶人
  add: "/driver/add/",
  // 查询订单详细信息
  orderDetail: "/order/detail/?guid=",
  // 获取服务器时间
  serverDate: "/server/date/",
  // 获取优惠券信息
  getCoupon: "/coupon/",
  // 提交订单
  submitOrder: "/order/submit/",
  // 删除订单
  delOrder: "/order/delete/",
  // 取消订单
  cancelOrder: "/order/cancel/",
  // 获取价格信息
  rate: "/vehicle/rate/",
  // 获取保险信息
  vehDetails: "/vehicle/details/",
  // 输入优惠券代码是否有效
  couponInput: "/coupon/input/",
  // 电子邮件发送
  sendEmail: "/order/send/email/",
  // 手机短信发送
  sendSms: "/order/send/sms/",
  //查看航空公司列表
  getAirLine: "/airline/",
  // 查询订单车辆信息
  getCardetails: "/order/detail/vehicle/?guid="
};

/**
 * @desc 所有请求方法请写在 indexApi 变量内
 * @desc 每个方法前请备注用途
 * @param {Object} params 请求参数
 */
const indexApi = {
  // 获取常用驾驶人列表
  getDriverList() {
    return Http.get(apiUrl.driver);
  },
  // 获取国际区号列表
  getAreacode() {
    return Http.get(apiUrl.areacode);
  },
  // 添加常用驾驶人列表
  addDriver(params) {
    return Http.post(apiUrl.add, encryption(params));
  },
  // 查询订单详细信息
  orderDetail(params) {
    return Http.get(apiUrl.orderDetail + params);
  },
  // 获取服务器时间
  serverDate() {
    return Http.get(apiUrl.serverDate);
  },
  // 获取优惠券信息
  getCoupon(params) {
    return Http.post(apiUrl.getCoupon, encryption(params));
  },
  // 提交订单
  submitOrder(params) {
    return Http.post(apiUrl.submitOrder, encryption(params));
  },
  // 取消订单
  cancelOrder(params) {
    return Http.post(apiUrl.cancelOrder, encryption(params));
  },
  // 删除订单
  delOrder(params) {
    return Http.post(apiUrl.delOrder, encryption(params));
  },
  // 获取价格信息
  getrate(params) {
    return Http.post(apiUrl.rate, params);
  },
  // 获取保险信息
  getvehDetails(params) {
    return Http.get(apiUrl.vehDetails, params);
  },
  // 输入优惠券代码是否有效
  couponInput(params) {
    return Http.post(apiUrl.couponInput, encryption(params));
  },
  //电子邮件发送
  sendEmail(params) {
    return Http.post(apiUrl.sendEmail, encryption(params));
  },
  // 手机短信发送
  sendSms(params) {
    return Http.post(apiUrl.sendSms, encryption(params));
  },
  //查看航空公司列表
  getAirLine() {
    return Http.get(apiUrl.getAirLine);
  },
  // 查询订单车辆信息
  getCardetails(params) {
    return Http.get(apiUrl.getCardetails + params);
  }
};

export default indexApi;
