import {setToken, removeToken} from '@utils/auth'
import {SET_TOKEN, SET_USER_INFO, SET_ROUTES, SET_ROLE} from './mutation-types'

import {asyncRouterMap} from '@router/routes'

import getUserInfoService from '@service/getUserInfoService'
import loginByUserNameService from '@service/loginByUserNameService'

import {ROLE} from '@config'

/**
 * 通过roles判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.name) {
        return roles.includes(route.name)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(routes, menus = []) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(menus, tmp)) {
            // 子路由权限
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, menus)
            }
            res.push(tmp)
        }
    })

    return res
}

/**
 * 登录
 * @param commit
 * @param loginInfo
 * @returns {Promise<void>}
 */
export async function loginByUserName({commit}, loginInfo) {
    // 获取账号密码信息
    // const {password} = loginInfo
    const newUserInfo = {...loginInfo}
    // 加密后密码
    // newUserInfo.password = encryption(password || '')
    // 发送登录请求
    const accessToken = await loginByUserNameService(newUserInfo)
    commit(SET_TOKEN, accessToken)
    setToken(accessToken)
}

/**
 * 获取用户信息
 * @param commit
 * @param state
 * @returns {Promise<void>}
 */
export async function getUserInfo({commit}) {
    // 获取token
    const userInfo = await getUserInfoService()


    /* ---todo demo 使用 开始 --- */
    const {role} = userInfo
    const menus = role === 'admin' ? ROLE.ADMIN : ROLE.USER
    /* ---todo demo 使用 结束--- */

    commit(SET_ROLE, menus)

    // 用户信息
    commit(SET_USER_INFO, userInfo)
}

/**
 * 登出系统
 * @param commit
 * @param state
 * @returns {Promise<void>}
 */
export async function logOut({commit}) {
    commit(SET_ROLE, [])
    commit(SET_USER_INFO, null)
    commit(SET_TOKEN, '')
    removeToken()
}

/**
 * 生成路由表
 * @param commit
 * @param state
 * @param roles
 */
export function generateRoutes({commit, state}) {
    let role = state.role || []
    let accessedRouters = []
    if (role && role.length) {
        // 遍历获取 路由
        accessedRouters = filterAsyncRouter(asyncRouterMap, role)
    }
    commit(SET_ROUTES, accessedRouters)
    return accessedRouters
}