// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
//
// import BasicLayout from '@layout/BasicLayout'
//
// Vue.use(VueRouter)
//
// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/dashboard',
//         redirect: '/dashboard/index',
//         component: BasicLayout,
//         children: [
//             {
//                 path: 'index',
//                 component: () => import('@/views/ArticleManagement'),
//                 name: 'Dashboard',
//                 meta: {
//                     title: '测试标题',
//                     icon: 'documentation'
//                 }
//             }
//         ]
//     }
// ]
//
// const router = new VueRouter({
//     routes
// })
//




import Vue from 'vue'
import Router from 'vue-router'
import {constantRouterMap} from './routes'

Vue.use(Router)

let debug = process.env.NODE_ENV !== 'production'

export default new Router({
    routes: constantRouterMap,
    strict: debug,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    base  : process.env.VUE_APP_ROUTER_BASE || '/',
    mode  : process.env.VUE_APP_ROUTER_MODE || 'hash'
})


