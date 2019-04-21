import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerConfig = {
    mode: 'history',
    routes: [
        {
        path: '/',
        name: 'index',
        component: () => import('@/components/index')
        },
        {
          path: '/orderCompletion',
          name: 'orderCompletion',
          component: () => import('@/components/orderCompletion')
  },
        {
        path: '/login',
        name: 'login',
        component: () => import('@/components/member/login')
        }
    ]
}

if (process.env.NODE_ENV == 'production') {
    routerConfig.base = '/hertz_phone/'
}

export default new Router(routerConfig)
