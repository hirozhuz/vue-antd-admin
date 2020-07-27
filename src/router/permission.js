import store from '@store'
import router from './index'
import {WHITE_LIST} from '@config'
import {getToken} from '@utils/auth'
import {notification} from 'ant-design-vue'

// 权限判断
function hasPermission(role, permissionRoles) {
    if (!role) return true
    return permissionRoles.indexOf(role) > -1
}

router.beforeEach(async (to, from, next) => {
    window.NProgress.start() // 进度条开始
    // 是否在免鉴权列表内
    // 是否已登陆
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
            window.NProgress.done()
        } else {
            // 是否已获取到用户权限列表
            if (!store.getters.userInfo) {
                // 如果没有 则 进去权限获取请求
                try {
                    // dispatch 权限
                    await store.dispatch('getUserInfo')
                    // dispatah 路由
                    let routes = await store.dispatch('generateRoutes')
                    // 添加404
                    routes = [...routes, {path: '*', redirect: '/404', hidden: true}]
                    // 向路由表中 添加动态路由
                    router.addRoutes(routes)
                    // 跳转至目标
                    next({...to, replace: true})
                } catch (e) {
                    store.dispatch('logOut').then(() => {
                        // 提示异常
                        notification.error({
                            message: '错误',
                            description: '请求用户信息失败，请重试'
                        })
                        next({path: '/'})
                        // window.location.reload()
                    })
                    throw new Error(e)
                }
            } else {
                // 判断是否有权限进入
                if (hasPermission(to.name, store.getters.role)) {
                    next()
                } else {
                    // 否则提示401
                    next({path: '/401', replace: true})
                }
            }
        }
    } else {
        if (WHITE_LIST.indexOf(to.path) !== -1) {
            next()
        } else {
            // 跳转至登录页
            next(`/login?redirect=${to.path}`)
            window.NProgress.done()
        }
    }

})

router.afterEach(() => {
    window.NProgress.done()
})
