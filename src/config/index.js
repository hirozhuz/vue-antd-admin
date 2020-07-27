// 接口地址
export const BASE_URL = process.env.VUE_APP_BASE_URL

// 媒体查询枚举
export const MediaQueryEnum = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
}

// 系统免鉴权白名单
export const WHITE_LIST = ['/login', '/registration', '/404', '/401']

// 系统token key 名称
export const TOKEN_KEY = 'Admin-Token'

// token 有效期 （天）
export const TOKEN_TIME = 1

// 默认table 分页数量
export const DEFAULT_PAGES_SIZE = 20

// 未授权http响应码
export const UNAUTHORIZED_STATUS = 401

// 角色权限
export const ROLE = {
    ADMIN: ['ArticleManagement'],
    USER: []
}