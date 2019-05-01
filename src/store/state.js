/**
 * 参数储存 参数前添加注释 标明用途
 * @example // 地表列表数据
 * @example landMarkList = []
 */

// 公共参数
const common = {
  /**
   * 取车指引
   */
  takeTransLat:0,
  takeTransLng:0,
  retTransLat:0,
  retTransLng:0,
  /**
   * 公共车辆信息
   */
  //品牌logo
  detailBrands:"",
  //取车地址
  picAddress:"",
  //取车日期
  pickupDate:"",
  //取车时间
  pickupTime:"",
  //取车周几
  pickupdayofweek:"",
  //还车地址
  reAddress:"",
  //还车日期
  reDate:"",
  //还车时间
  reTime:"",
  //还车周几
  returndayofweek:"",
  //车辆图片地址
  image_path:"",
  //车辆简介
  short_description:"",
  //乘客数量
  num_adult_passengers:"",
  //大行李数量
  num_large_suitcase:"",
  //小行李数量
  num_small_suitcase:"",
  //自动挡手动挡
  transmission_type:"",
  //租借天数
  dayspan:"",
  //取还车指引信息
  /**
   * carDetails:{
   *    pickuplocation_details:{
   *            lat：
   *            lng:
   *            address:
   *            open_time:
   *            tel:
   *            brands:
   *    },
   *    returnlocation_details:{
   *            lat：
   *            lng:
   *            address:
   *            open_time:
   *            tel:
   *            brands:
   *    }
   * }
   */
  carDetails:{},
  /**
   * 公共底部 提交订单
   */
    unitMoney:"",
    //大类索引
    insureIndex: 0,
    //大类信息
    insureList: [],
    //小类在线支付索引
    littleOnline: 0,
    //小类到店支付索引
    littleArrive: 0,
    //支付状态 在线支付：online  到店支付：arrive
    payState: "online",
    //额外服务是否存在状态
    insureRateState: "",
    //{没有}额外服务 --- 在线{支付} --- 外币
    dayTotal: "",
    //{没有}额外服务 --- 在线{支付} --- 人民币
    allTotal: "",
    //{没有}额外服务 --- 到店{支付} --- 外币
    dayArriveTotal: "",
    //{没有}额外服务 --- 到店{支付} --- 人民币
    allArriveTotal: "",
    //{有}额外服务 --- 到店{需付} --- 外币
    dayRateArriveTotal: "",
    //{有}额外服务 --- 到店{支付} --- 人民币
    allRateArriveTotal: "",
    //{有}额外服务 --- 总价 --- 外币
    dayRateTotal: "",
    //{有}额外服务 --- 总价 --- 人民币
    allRateTotal: "",
    //保险描述
    resultGroup: [],
    //gps存在状态 存在:true 不存在:false
    gpsMenu: false,
    //婴儿座椅数量
    equiChild1: 0,
    //幼儿座椅数量
    equiChild2: 0,
    //儿童座椅数量
    equiChild3: 0,
    /**
     * 修改车辆信息
     */
    // 是否显示地图
    isShowMap: false,
    // 是否显示只显示地图
    isClearMap: false,
    // 地图坐标点显示
    mapData: [],
    // 是否已登陆
    isLogin: false,
    // 用户id
    userid: 123123,
    // 默认头像
    userAvatar: require("../assets/images/default_ava.png"),
    // 是否为 普通用户 or 代理商
    isGeneralUser: true,
    // 是否从首页进入选择城市
    isGoHome: true
};

// 首页参数
const index = {
    // 日历 数据
    calendar: {},
    // 取车 城市
    takeCarCity: "",
    // 取车 国家
    takeCarCountry: "",
    // 取车 品牌
    takeCarBrand: "",
    // 取车 guid
    takeCarGuid: "",
    // 取车 城市id
    takeCarCityId: "",
    // 取车 地点
    takeCarLand: "",
    // 取车 地点坐标
    takeCarCoor: "",
    // 取车 年份
    takeCarYear: "",
    // 取车 月份
    takeCarMonth: "",
    // 取车 月份 中文
    takeCarMonthCn: "",
    // 取车 日
    takeCarDay: "",
    // 取车 月总天数
    takeCarDays: "",
    // 取车 星期
    takeCarweek: "",
    // 取车 星期 中文
    takeCarweekCn: "",
    // 取车 时钟
    takeCarHour: "",
    // 取车 分钟
    takeCarMin: "",
    // 取车 上下午
    takeCarPeriod: "",
    // 还车 城市
    retCarCity: "",
    // 还车 国家
    retCarCountry: "",
    // 还车 品牌
    retCarBrand: "",
    // 还车 guid
    retCarGuid: "",
    // 还车 城市id
    retCarCityId: "",
    // 还车 地点
    retCarLand: "",
    // 还车 地点坐标
    retCarCoor: "",
    // 还车 年份
    retCarYear: "",
    // 还车 月份
    retCarMonth: "",
    // 还车 月份 中文
    retCarMonthCn: "",
    // 还车 日
    retCarDay: "",
    // 还车 星期
    retCarweek: "",
    // 还车 星期 中文
    retCarweekCn: "",
    // 还车 时钟
    retCarHour: "",
    // 还车 分钟
    retCarMin: "",
    // 还车 上下午
    retCarPeriod: "",
    // 租期
    timeSpans: "",
    // 是否是选择 取车的信息
    isTakeCar: true,
    // 是否显示选择城市
    isShowChoiceCity: false,
    // 是否显示选择地标
    isShowChoiceLand: false,
    // 选择的城市id
    choiceCityId: '',
    // 日历请求完成
    isCalendarLoaded: false,
    // 地标搜索是否在搜索中
    isSearching: false,
    // 地标搜索框需显示的值
    showInputValue: "",
    // 地图搜索取车地点code
    returnlocation: "",
    // 地图搜索还车地点code
    pickuplocation: ""
};

const state = {
    ...common,
    ...index
};

export default state;
