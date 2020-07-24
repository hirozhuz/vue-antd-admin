import axios from './index'
import {LOGIN_BY_USER_NAME} from './api'
import {HTTP_ERR_SUCCESS} from '@config/api_status'
import {ERROR_DEFAULT_HTTP_REQUEST_FAIL} from '@config/error'


/**
 * 发送评论
 * @param payload
 * @param config
 * @returns {Promise<*>}
 */
export default async function loginByUserNameService(payload = {}, config = {}) {
    const param = {...LOGIN_BY_USER_NAME, ...config, data: payload}
    const {data} = await axios(param)
    if (data.code === HTTP_ERR_SUCCESS) {
        return data.data
    } else {
        throw new Error(data.msg || ERROR_DEFAULT_HTTP_REQUEST_FAIL)
    }
}