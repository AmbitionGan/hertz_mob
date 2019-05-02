import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routerConfig = {
  mode: "history",
  routes: [
    // 首页
    {
      path: "/",
      name: "index",
      component: () => import("@/components/index")
    },

    // 选择城市
    {
      path: "/choiceCity",
      name: "choiceCity",
      component: () => import("@/components/common/choiceCity")
    },

    // 支付
    {
      path: "/onlinePay",
      name: "onlinePay",
      component: () => import("@/components/onlinePay/index")
    },

    // 选择地标
    {
      path: "/choiceLandMark",
      name: "choiceLandMark",
      component: () => import("@/components/common/choiceLandMark")
    },

    // 列表页
    {
      path: "/list",
      name: "list",
      component: () => import("@/components/list/list")
    },

    // 详情页
    {
      path: "/details",
      name: "carDetails",
      component: () => import("@/components/details/details")
    },
    {
      path: "/orderCompletion",
      name: "orderCompletion",
      component: () => import("@/components/fillInOrder/orderCompletion")
    },
    // 订单信息
    {
      path: "/orderInfo",
      name: "orderInfo",
      component: () => import("@/components/orderInfo/orderInfo")
    },
    // 发送确认单
    {
      path: "/sendOut",
      name: "sendOut",
      component: () => import("@/components/orderInfo/sendOut")
    },
    // 取消预定
    {
      path: "/cancelReserve",
      name: "cancelReserve",
      component: () => import("@/components/orderInfo/cancelReserve")
    },
    // 条款页面
    {
      path: "/clause",
      name: "clause",
      component: () => import("@/components/common/clause")
    }
  ]
};

if (process.env.NODE_ENV == "production") {
  routerConfig.base = "/hertz_phone/";
}

export default new Router(routerConfig);
