import axios from './index'
import {GET_USER_INFO} from './api'
import {HTTP_ERR_SUCCESS} from '@config/api_status'
import {ERROR_DEFAULT_HTTP_REQUEST_FAIL} from '@config/error'


/**
 * 获取用户信息
 * @param payload
 * @param config
 * @returns {Promise<*>}
 */
export default async function getUserInfoService(payload = {}, config = {}) {
    const param = {...GET_USER_INFO, ...config, params: payload}
    const {data} = await axios(param)
    if (data.code === HTTP_ERR_SUCCESS) {
        return data.data
    } else {
        throw new Error(data.msg || ERROR_DEFAULT_HTTP_REQUEST_FAIL)
    }
}