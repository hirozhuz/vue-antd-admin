import {constantRouterMap} from '@router/routes'
import {
    SET_ROUTES,
    SET_ROLE,
    SET_TOKEN,
    SET_USER_INFO,
    SET_IS_MOBILE, SET_THEME,
    SET_LAYOUT,
    SET_MULTIPAGE,
    SET_FIXED_HEADER,
    SET_FIXED_SIDEBAR
} from './mutation-types'

export default {
    [SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [SET_TOKEN](state, token) {
        state.token = token
    },
    [SET_ROUTES](state, routes) {
        state.addRouters = routes
        state.routes = constantRouterMap.concat(routes)
    },
    [SET_ROLE](state, role) {
        state.role = role
    },
    [SET_IS_MOBILE](state, isMobile) {
        state.isMobile = isMobile
    },
    [SET_THEME](state, theme) {
        state.theme = theme
    },
    [SET_LAYOUT](state, layout) {
        state.layout = layout
    },
    [SET_MULTIPAGE](state, multipage) {
        state.multipage = multipage
    },
    [SET_FIXED_HEADER](state, fixedHeader) {
        state.fixedHeader = fixedHeader
    },
    [SET_FIXED_SIDEBAR](state, fixedSidebar) {
        state.fixedSidebar = fixedSidebar
    }

}