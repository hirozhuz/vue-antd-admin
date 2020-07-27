import BasicLayout from '@layout/BasicLayout'

/**
 * 初始路由表
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/',
        redirect: '/article',
        hidden: true,
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('@views/Login')
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
    path: '/article',
    redirect: '/article/index',
    component: BasicLayout,
    children: [
        {
            path: 'index',
            component: () => import('@/views/ArticleManagement'),
            name: 'ArticleManagement',
            meta: {
                title: '文章',
                icon: 'form'
            }
        }
    ]
}]