import {BASE_URL} from '@config'

/**
 * 登陆
 * @type {{}}
 */
export const LOGIN_BY_USER_NAME = {
    url: `${BASE_URL}/login`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000
}

/**
 * 获取评论列表
 * @type {{headers: {"Content-Type": string}, method: string, url: string, timeout: number}}
 */
export const GET_USER_INFO = {
    url: `${BASE_URL}/user/get`,
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000
}