/**
 * Created by hiro on 2020/07/23.
 * axios 数据拦截
 */

import axios from 'axios'
import {UNAUTHORIZED_STATUS} from '@config'
// import {throwHTTPError} from '@utils/throwHTTPError'
import {getToken} from '@utils/auth'
import store from '@store'


axios.interceptors.request.use(function (config) {
    // 获取token
    const TOKEN = getToken()
    if (TOKEN) {
        config.headers.common['Authorization'] = TOKEN
    }
    window.NProgress.start() // 进度条开始
    return config
})
// 劫持响应数据
axios.interceptors.response.use(function (response) {
    window.NProgress.done()
    // 对响应数据做点什么
    return response
}, function (error) {
    window.NProgress.done()

    // 如果响应状态为未授权 则 提示异常后跳转至 首页
    if (error.response.status === UNAUTHORIZED_STATUS) {
        store.dispatch('logOut').then(() => {
            window.location.reload()
        })
    }
    //  处理错误信息
    // let errMsg = throwHTTPError(error)
    // 对响应错误做点什么
    return Promise.reject(error)
})


export default axios