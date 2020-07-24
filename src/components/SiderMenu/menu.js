/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  },
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  }
 * ]
 **/

import path from 'path'

import {Menu, Icon} from 'ant-design-vue'

import {isExternal} from '@utils'

const {Item, SubMenu} = Menu


/**
 * 格式化路径
 * @param routePath
 * @returns {string|*}
 */
function resolvePath(basePath, routePath) {
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
function hasOneShowingChild(children = []) {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            return true
        }
    })

    if (showingChildren.length === 0) {
        return false
    }
    if (showingChildren.length === 1) {
        return showingChildren[0]
    }
}

export default {
    name: 'IMenu',
    props: {
        menuData: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            required: false,
            default: 'dark'
        },
        mode: {
            type: String,
            required: false,
            default: 'inline'
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            openKeys: [],
            selectedKeys: [],
            cachedOpenKeys: []
        }
    },
    computed: {
        rootSubmenuKeys: (vm) => {
            let keys = []
            vm.menuData.forEach(item => {
                keys.push(item.path)
            })
            return keys
        }
    },
    created() {
        this.updateMenu()
    },
    watch: {
        collapsed(val) {
            if (val) {
                this.cachedOpenKeys = this.openKeys
                this.openKeys = []
            } else {
                this.openKeys = this.cachedOpenKeys
            }
        },
        '$route': function () {
            this.updateMenu()
        }
    },
    methods: {
        renderIcon: function (h, icon) {
            return icon ? h(
                Icon,
                {
                    props: {type: icon}
                }) : null
        },
        renderMenuItem: function (h, menu, pIndex, index, basePath) {

            const path = resolvePath(basePath, menu.path)
            const meta = menu.meta || {}
            let dom = null
            if (isExternal(path)) {
                dom = h(
                    'a',
                    {attrs: {href: path}},
                    [
                        this.renderIcon(h, meta.icon),
                        h('span', [meta.title])
                    ]
                )
            } else {
                dom = h(
                    'router-link',
                    {
                        props: {
                            to: path
                        }
                    },
                    [
                        this.renderIcon(h, meta.icon),
                        h('span', [meta.title])
                    ]
                )
            }
            return h(
                Item,
                {
                    key: menu.path ? menu.path : 'item_' + pIndex + '_' + index
                },
                [dom]
            )
        },
        renderSubMenu: function (h, menu, pIndex, index, basePath) {
            const this2_ = this
            const meta = menu.meta || {}

            const subItem = [h('span',
                {slot: 'title'},
                [
                    this.renderIcon(h, meta.icon),
                    h('span', [meta.title])
                ]
            )]
            const itemArr = []
            const pIndex_ = pIndex + '_' + index
            const path = resolvePath(basePath, menu.path)
            menu.children.forEach(function (item, i) {
                itemArr.push(this2_.renderItem(h, item, pIndex_, i, path))
            })
            return h(
                SubMenu,
                {key: menu.path ? menu.path : 'submenu_' + pIndex + '_' + index},
                subItem.concat(itemArr)
            )
        },
        renderItem: function (h, menu, pIndex, index, basePath) {
            if (!menu.hidden) {


                return menu.children ?
                    this.renderSubMenu(h, menu, pIndex, index, basePath) :
                    this.renderMenuItem(h, menu, pIndex, index, basePath)
            }
        },
        renderMenu: function (h, menuTree) {
            var this2_ = this
            var menuArr = []
            menuTree.forEach(function (menu, i) {
                menuArr.push(this2_.renderItem(h, menu, '0', i, menu.path))
            })
            return menuArr
        },
        onOpenChange(openKeys) {
            console.log(openKeys)
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        },
        updateMenu() {
            let routes = this.$route.matched.concat()
            this.selectedKeys = [routes.pop().path]
            let openKeys = []
            routes.forEach((item) => {
                openKeys.push(item.path)
            })
            this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
        }
    },
    render(h) {
        return h(
            Menu,
            {
                props: {
                    theme: this.$props.theme,
                    mode: this.$props.mode,
                    openKeys: this.openKeys,
                    selectedKeys: this.selectedKeys
                },
                on: {
                    openChange: this.onOpenChange,
                    select: (obj) => {
                        this.selectedKeys = obj.selectedKeys
                        this.$emit('select', obj)
                    }
                }
            }, this.renderMenu(h, this.menuData)
        )
    }
}
