// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import pubMethod from "./assets/js/common";
import Swiper from "swiper";
import regLoadingToast from "./toast/loading";
import regToast from "./toast/toast";
import "./assets/js/TDES";
import "./assets/css/common.less";
import "../node_modules/swiper/dist/css/swiper.min.css";
import "./assets/css/lihailing-style.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 注册全局 公共方法
window["pubMethod"] = pubMethod;

Vue.prototype.Swiper = Swiper;

Vue.config.productionTip = false;
Vue.use(regLoadingToast);
Vue.use(regToast);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
