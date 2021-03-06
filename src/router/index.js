import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 订单路由鉴权
function beforeEnter (to, from, next) {
    if (to.query.guid == undefined || to.query.guid == '') {
        next({path: '/'})
      }else{
          next()
      }
}

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
    // {
    //   path: "/choiceCity",
    //   name: "choiceCity",
    //   component: () => import("@/components/common/choiceCity")
    // },

    // 支付
    {
      path: "/onlinePay",
      name: "onlinePay",
      component: () => import("@/components/onlinePay/index"),
      beforeEnter
    },

    // 选择地标
    // {
    //   path: "/choiceLandMark",
    //   name: "choiceLandMark",
    //   component: () => import("@/components/common/choiceLandMark")
    // },

    // 列表页
    {
      path: "/list",
      name: "list",
      component: () => import("@/components/list/list"),
      beforeEnter
    },

    // 详情页
    {
      path: "/details",
      name: "carDetails",
      component: () => import("@/components/details/details"),
      beforeEnter
    },
    // 提交订单
    {
      path: "/orderCompletion",
      name: "orderCompletion",
      component: () => import("@/components/fillInOrder/orderCompletion"),
      beforeEnter
    },
    // 订单信息
    {
      path: "/orderInfo",
      name: "orderInfo",
      component: () => import("@/components/orderInfo/orderInfo"),
      beforeEnter
    },
    // 发送确认单
    {
      path: "/sendOut",
      name: "sendOut",
      component: () => import("@/components/orderInfo/sendOut"),
      beforeEnter
    },
    // 取消预定
    {
      path: "/cancelReserve",
      name: "cancelReserve",
      component: () => import("@/components/orderInfo/cancelReserve"),
      beforeEnter
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
