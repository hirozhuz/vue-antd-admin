import path from 'path'
import {isExternal} from '@utils'

/**
 * 格式化路径
 * @param routePath
 * @returns {string|*}
 */
export function resolvePath(basePath, routePath) {
    if (isExternal(routePath)) {
        return routePath
    }
    return path.resolve(basePath, routePath)
}

/**
 * 判断是否只有一个需要显示的子节点
 * @param children
 * @returns {*}
 */
export function hasOneShowingChild(children = []) {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            return true
        }
    })


    const length = showingChildren.length
    let child = null
    let isOneShowingChild = false

    if (showingChildren.length === 0) {
        child = null
        isOneShowingChild = false
    }

    if (showingChildren.length === 1) {
        child = showingChildren[0]
        isOneShowingChild = true
    }

    return {
        isOneShowingChild,
        child,
        length
    }
}