import axios from 'axios'
// import {UNAUTHORIZED_STATUS} from '@config/api_status'


/**
 * 请求前拦截
 */
axios.interceptors.request.use(function (config) {
    return config
})

// 劫持响应数据
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {

    // 如果响应状态为未授权 则 提示异常后跳转至 首页
    // if (error.response.status === UNAUTHORIZED_STATUS) {
    //     // 零时处理
    //     if (window.top !== window) {
    //         window.parent.location.reload()
    //     }
    // }
    return error
})


export default axios
