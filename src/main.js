// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
<<<<<<< HEAD
import './assets/css/common.less'
=======
import pubMethod from './assets/js/common'
import Swiper from 'swiper'
import './assets/js/TDES'
import './assets/css/common.less'
import '../node_modules/swiper/dist/css/swiper.min.css'
import './assets/css/common.less'
import './assets/css/lihailing-style.css'

// 注册全局 公共方法
window['pubMethod'] = pubMethod

Vue.prototype.Swiper = Swiper;

>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
