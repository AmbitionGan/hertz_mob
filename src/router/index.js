import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

<<<<<<< HEAD
export default new Router({
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
  ]
})
=======
const routerConfig = {
    mode: 'history',
    routes: [
        {
        path: '/',
        name: 'index',
        component: () => import('@/components/index')
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
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
