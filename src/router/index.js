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
            path: '/choiceCity',
            name: 'choiceCity',
            component: () => import('@/components/common/choiceCity')
        },
        {
            path: '/onlinePay',
            name: 'onlinePay',
            component: () => import('@/components/onlinePay/index')
        },
        {
            path: '/choiceLandMark',
            name: 'choiceLandMark',
            component: () => import('@/components/common/choiceLandMark')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('@/components/list/list')
        },
        {
          path: '/details',
          name: 'carDetails',
          component: () => import('@/components/details/details')
        }
    ]
}

if (process.env.NODE_ENV == 'production') {
    routerConfig.base = '/hertz_phone/'
}

export default new Router(routerConfig)
