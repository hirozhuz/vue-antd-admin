import BasicLayout from '@layout/BasicLayout'

/**
 * 初始路由表
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/',
        redirect: '/dashboard',
        hidden: true,
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('@views/Login')
    },
    {
        path: '/abc',
        redirect: '/abc/index',
        component: BasicLayout,
        meta:{
            title:'首页'
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Test'),
                name: 'Abc',
                meta: {
                    title: '测试标题1',
                    icon: 'documentation'
                }
            },
            {
                path: 'two',
                name: 'Two',
                component: () => import('@/views/Test'),
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/Test'),
                        name: 'Def',
                        meta: {
                            title: '测试标题2',
                            icon: 'documentation'
                        }
                    }
                ]
            },
        ]
    },
    {
        path: '/404',
        component: () => import('@views/404'),
        hidden: true
    }
]
/**
 * 异步加载路由表
 * @type {{path: string, name: string, component: (function(): (Promise<*>|*)), meta: {roles: *[]}}[]}
 */
export const asyncRouterMap = [{
    path: '/dashboard',
    redirect: '/dashboard/index',
    component: BasicLayout,
    children: [
        {
            path: 'index',
            component: () => import('@/views/Test'),
            name: 'Dashboard',
            meta: {
                title: '测试标题',
                icon: 'documentation'
            }
        }
    ]
}]