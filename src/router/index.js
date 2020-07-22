import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import BasicLayout from '@layout/BasicLayout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        redirect: '/dashboard/index',
        component: BasicLayout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/About'),
                name: 'Dashboard',
                meta: {
                    title: 'Documentation',
                    icon: 'documentation'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
