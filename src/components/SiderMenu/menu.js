import {Menu, Icon} from 'ant-design-vue'

import {resolvePath, hasOneShowingChild} from '@utils/menu'

import {isExternal} from '@utils'

const {Item, SubMenu} = Menu


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
        renderMenuItem: function (h, menu, pIndex, index, basePath, parent) {

            const path = resolvePath(basePath, menu.path)
            const meta = menu.meta || {}
            let dom = null
            const icon = meta.icon || (parent && parent.meta && parent.meta.icon)
            // 判断是否为外部链接
            // 如果为外部链接则直接渲染为a标签
            if (isExternal(path)) {
                dom = h(
                    'a',
                    {attrs: {href: path}},
                    [
                        this.renderIcon(h, icon),
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
                        this.renderIcon(h, icon),
                        h('span', [meta.title])
                    ]
                )
            }
            return h(
                Item,
                {
                    key: path ? path : 'item_' + pIndex + '_' + index
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
                {key: path ? path : 'submenu_' + pIndex + '_' + index},
                subItem.concat(itemArr)
            )
        },
        renderItem: function (h, menu, pIndex, index, basePath) {
            // 如果menu
            if (!menu.hidden) {
                if (menu.children && menu.children.length) {
                    const {child, length} = hasOneShowingChild(menu.children)
                    if (length !== 0) {
                        return length === 1 ?
                            this.renderMenuItem(h, child, pIndex, index, basePath, menu) :
                            this.renderSubMenu(h, menu, pIndex, index, basePath)
                    }
                } else {
                    return this.renderMenuItem(h, menu, pIndex, index, basePath)
                }
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
            this.collapsed || this.mode === 'horizontal' ?
                this.cachedOpenKeys = openKeys :
                this.openKeys = openKeys
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
