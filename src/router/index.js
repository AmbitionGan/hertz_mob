import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routerConfig = {
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/components/index")
    },
    {
      path: "/orderCompletion",
      name: "orderCompletion",
      component: () => import("@/components/orderCompletion")
    },
    // 订单信息
    {
      path: "/orderInfo",
      name: "orderInfo",
      component: () => import("@/components/orderInfo")
    },
    // 发送确认单
    {
      path: "/sendOut",
      name: "sendOut",
      component: () => import("@/components/sendOut")
    },
    // 取消预定
    {
      path: "/cancelReserve",
      name: "cancelReserve",
      component: () => import("@/components/cancelReserve")
    },
    // 条款页面
    {
      path: "/clause",
      name: "clause",
      component: () => import("@/components/clause")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/member/login")
    }
  ]
};

if (process.env.NODE_ENV == "production") {
  routerConfig.base = "/hertz_phone/";
}

export default new Router(routerConfig);
