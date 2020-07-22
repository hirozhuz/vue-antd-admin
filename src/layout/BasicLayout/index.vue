<template>
    <container-query :query="MediaQueryEnum"
                     @change="handleMediaQueryChange"
    >
        <layout class="gongbao-layout">

            <a-drawer v-if="isMobile"
                      :visible="!collapsed"
                      placement="left"
                      :closable="false"
                      :bodyStyle="sideDrawerStyle"
                      :getContainer="null"
                      @close="handleDrawerClose">
                <!--                 :theme="theme"-->
                <sider-menu :menuData="menuData"
                            :collapsed="false"
                            :collapsible="false"
                            :fixed="fixedSidebar"
                            :systemName="systemName"
                            :isMobile="isMobile"
                            @menuSelect="onMenuSelect"
                />
            </a-drawer>
            <sider-menu v-else-if="layout === 'side'"
                        :menuData="menuData"
                        :fixed="fixedSidebar"
                        :collapsed="collapsed"
                        :collapsible="true"
                        :systemName="systemName"
                        :isMobile="isMobile"
            />
            <layout class="gongbao-layout__main" :style="mainStyle">
                <!-- 头部 -->
                <template>
                    <layout-header v-if="fixedHeader"/>
                    <global-header :menuData="menuData"
                                   :collapsed="collapsed"
                                   :style="headerStyle"
                                   :class="headerClassName"
                                   @toggleCollapse="toggleCollapse"
                    />
                </template>
                <!-- 内容区域 -->
                <layout-content class="gongbao-layout__content">
                    <router-view/>
                </layout-content>
                <!-- 底部页脚 -->
                <layout-footer>
                </layout-footer>
            </layout>
        </layout>
    </container-query>
</template>

<script>
    import {ContainerQuery} from 'vue-container-query'
    import {Layout, Drawer as ADrawer} from 'ant-design-vue'
    import SiderMenu from '@components/SiderMenu'
    import GlobalHeader from '@components/GlobalHeader'
    import HeaderNotice from '@components/HeaderNotice'

    import {MediaQueryEnum} from '@config'

    import {sidebarWidth, sidebarCollapsedWidth} from '@assets/styles/varibles.scss'


    const MENU_DATA = [
        {
            "path": "/dashboard",
            "name": "dashboard",
            "component": {
                "name": "RouteView",
                "computed": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-02b43ddf",
                "beforeCreate": [null, null],
                "__file": "src/layouts/RouteView.vue",
                "beforeDestroy": [null],
                "_Ctor": {}
            },
            "icon": "dashboard",
            "children": [{"path": "/dashboard/workplace", "name": "工作台", "icon": "none"}, {
                "path": "/dashboard/analysis",
                "name": "分析页",
                "icon": "none"
            }]
        }, {
            "path": "/form",
            "name": "表单页",
            "component": {
                "name": "PageView",
                "components": {
                    "PageLayout": {
                        "name": "PageLayout",
                        "components": {
                            "PageHeader": {
                                "name": "PageHeader",
                                "props": {
                                    "title": {"required": false},
                                    "breadcrumb": {"required": false},
                                    "logo": {"required": false},
                                    "avatar": {"required": false}
                                },
                                "computed": {},
                                "staticRenderFns": [],
                                "_compiled": true,
                                "_scopeId": "data-v-6740ec88",
                                "beforeCreate": [null, null],
                                "__file": "src/components/page/PageHeader.vue",
                                "beforeDestroy": [null]
                            }
                        },
                        "props": ["desc", "logo", "title", "avatar", "linkList", "extraImage"],
                        "computed": {},
                        "methods": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-72f5ea18",
                        "beforeCreate": [null, null],
                        "__file": "src/layouts/PageLayout.vue",
                        "beforeDestroy": [null]
                    },
                    "PageHeader": {
                        "name": "PageHeader",
                        "props": {
                            "title": {"required": false},
                            "breadcrumb": {"required": false},
                            "logo": {"required": false},
                            "avatar": {"required": false}
                        },
                        "computed": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-6740ec88",
                        "beforeCreate": [null, null],
                        "__file": "src/components/page/PageHeader.vue",
                        "beforeDestroy": [null]
                    }
                },
                "computed": {},
                "methods": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-07175cda",
                "beforeCreate": [null, null],
                "__file": "src/layouts/PageView.vue",
                "beforeDestroy": [null]
            },
            "icon": "form",
            "children": [{"path": "/form/basic", "name": "基础表单", "icon": "none"}, {
                "path": "/form/step",
                "name": "分步表单",
                "icon": "none"
            }, {"path": "/form/advanced", "name": "高级表单", "icon": "none"}]
        }, {
            "path": "/list",
            "name": "列表页",
            "component": {
                "name": "PageView",
                "components": {
                    "PageLayout": {
                        "name": "PageLayout",
                        "components": {
                            "PageHeader": {
                                "name": "PageHeader",
                                "props": {
                                    "title": {"required": false},
                                    "breadcrumb": {"required": false},
                                    "logo": {"required": false},
                                    "avatar": {"required": false}
                                },
                                "computed": {},
                                "staticRenderFns": [],
                                "_compiled": true,
                                "_scopeId": "data-v-6740ec88",
                                "beforeCreate": [null, null],
                                "__file": "src/components/page/PageHeader.vue",
                                "beforeDestroy": [null]
                            }
                        },
                        "props": ["desc", "logo", "title", "avatar", "linkList", "extraImage"],
                        "computed": {},
                        "methods": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-72f5ea18",
                        "beforeCreate": [null, null],
                        "__file": "src/layouts/PageLayout.vue",
                        "beforeDestroy": [null]
                    },
                    "PageHeader": {
                        "name": "PageHeader",
                        "props": {
                            "title": {"required": false},
                            "breadcrumb": {"required": false},
                            "logo": {"required": false},
                            "avatar": {"required": false}
                        },
                        "computed": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-6740ec88",
                        "beforeCreate": [null, null],
                        "__file": "src/components/page/PageHeader.vue",
                        "beforeDestroy": [null]
                    }
                },
                "computed": {},
                "methods": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-07175cda",
                "beforeCreate": [null, null],
                "__file": "src/layouts/PageView.vue",
                "beforeDestroy": [null]
            },
            "icon": "table",
            "children": [{"path": "/list/query", "name": "查询表格", "icon": "none"}, {
                "path": "/list/primary",
                "name": "标准列表",
                "icon": "none"
            }, {"path": "/list/card", "name": "卡片列表", "icon": "none"}, {
                "path": "/list/search",
                "name": "搜索列表",
                "icon": "none",
                "children": [{
                    "path": "/list/search/article",
                    "name": "文章",
                    "icon": "none"
                }, {"path": "/list/search/application", "name": "应用", "icon": "none"}, {
                    "path": "/list/search/project",
                    "name": "项目",
                    "icon": "none"
                }]
            }]
        }, {
            "path": "/detail",
            "name": "详情页",
            "icon": "profile",
            "component": {
                "name": "RouteView",
                "computed": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-02b43ddf",
                "beforeCreate": [null, null],
                "__file": "src/layouts/RouteView.vue",
                "beforeDestroy": [null],
                "_Ctor": {}
            },
            "children": [{"path": "/detail/basic", "name": "基础详情页", "icon": "none"}, {
                "path": "/detail/advanced",
                "name": "高级详情页",
                "icon": "none"
            }]
        }, {
            "path": "/result",
            "name": "结果页",
            "icon": "check-circle-o",
            "component": {
                "name": "PageView",
                "components": {
                    "PageLayout": {
                        "name": "PageLayout",
                        "components": {
                            "PageHeader": {
                                "name": "PageHeader",
                                "props": {
                                    "title": {"required": false},
                                    "breadcrumb": {"required": false},
                                    "logo": {"required": false},
                                    "avatar": {"required": false}
                                },
                                "computed": {},
                                "staticRenderFns": [],
                                "_compiled": true,
                                "_scopeId": "data-v-6740ec88",
                                "beforeCreate": [null, null],
                                "__file": "src/components/page/PageHeader.vue",
                                "beforeDestroy": [null]
                            }
                        },
                        "props": ["desc", "logo", "title", "avatar", "linkList", "extraImage"],
                        "computed": {},
                        "methods": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-72f5ea18",
                        "beforeCreate": [null, null],
                        "__file": "src/layouts/PageLayout.vue",
                        "beforeDestroy": [null]
                    },
                    "PageHeader": {
                        "name": "PageHeader",
                        "props": {
                            "title": {"required": false},
                            "breadcrumb": {"required": false},
                            "logo": {"required": false},
                            "avatar": {"required": false}
                        },
                        "computed": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-6740ec88",
                        "beforeCreate": [null, null],
                        "__file": "src/components/page/PageHeader.vue",
                        "beforeDestroy": [null]
                    }
                },
                "computed": {},
                "methods": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-07175cda",
                "beforeCreate": [null, null],
                "__file": "src/layouts/PageView.vue",
                "beforeDestroy": [null]
            },
            "children": [{"path": "/result/success", "name": "成功", "icon": "none"}, {
                "path": "/result/error",
                "name": "失败",
                "icon": "none"
            }]
        }, {
            "path": "/exception",
            "name": "异常页",
            "icon": "warning",
            "component": {
                "name": "RouteView",
                "computed": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-02b43ddf",
                "beforeCreate": [null, null],
                "__file": "src/layouts/RouteView.vue",
                "beforeDestroy": [null],
                "_Ctor": {}
            },
            "children": [{"path": "/exception/404", "name": "404", "icon": "none"}, {
                "path": "/exception/403",
                "name": "403",
                "icon": "none"
            }, {"path": "/exception/500", "name": "500", "icon": "none"}]
        }, {
            "path": "/components",
            "redirect": "/components/taskcard",
            "name": "小组件",
            "icon": "appstore-o",
            "component": {
                "name": "PageView",
                "components": {
                    "PageLayout": {
                        "name": "PageLayout",
                        "components": {
                            "PageHeader": {
                                "name": "PageHeader",
                                "props": {
                                    "title": {"required": false},
                                    "breadcrumb": {"required": false},
                                    "logo": {"required": false},
                                    "avatar": {"required": false}
                                },
                                "computed": {},
                                "staticRenderFns": [],
                                "_compiled": true,
                                "_scopeId": "data-v-6740ec88",
                                "beforeCreate": [null, null],
                                "__file": "src/components/page/PageHeader.vue",
                                "beforeDestroy": [null]
                            }
                        },
                        "props": ["desc", "logo", "title", "avatar", "linkList", "extraImage"],
                        "computed": {},
                        "methods": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-72f5ea18",
                        "beforeCreate": [null, null],
                        "__file": "src/layouts/PageLayout.vue",
                        "beforeDestroy": [null]
                    },
                    "PageHeader": {
                        "name": "PageHeader",
                        "props": {
                            "title": {"required": false},
                            "breadcrumb": {"required": false},
                            "logo": {"required": false},
                            "avatar": {"required": false}
                        },
                        "computed": {},
                        "staticRenderFns": [],
                        "_compiled": true,
                        "_scopeId": "data-v-6740ec88",
                        "beforeCreate": [null, null],
                        "__file": "src/components/page/PageHeader.vue",
                        "beforeDestroy": [null]
                    }
                },
                "computed": {},
                "methods": {},
                "staticRenderFns": [],
                "_compiled": true,
                "_scopeId": "data-v-07175cda",
                "beforeCreate": [null, null],
                "__file": "src/layouts/PageView.vue",
                "beforeDestroy": [null]
            },
            "children": [{"path": "/components/taskcard", "name": "任务卡片", "icon": "none"}, {
                "path": "/components/palette",
                "name": "颜色复选框",
                "icon": "none"
            }]
        }]

    export default {
        name: "BasicLayout",
        data() {
            return {
                MediaQueryEnum,
                menuData: MENU_DATA,
                collapsed: false,
                // 媒体查询
                mediaQuery: {},
                sideDrawerStyle: {
                    padding: 0,
                    height: '100%'
                }
            }
        },
        computed: {
            fixedHeader() {
                return this.$store.getters['setting/fixedHeader']
            },
            fixedSidebar() {
                return this.$store.getters['setting/fixedSidebar']
            },
            layout() {
                return this.$store.getters['setting/layout']
            },
            systemName() {
                return this.$store.getters['setting/systemName']
            },
            isMobile: {
                get() {
                    return this.$store.getters['setting/isMobile']
                },
                set(val) {
                    this.$store.commit('setting/setIsMobile', val)
                }
            },
            headerStyle() {
                const {fixedHeader, layout, isMobile, collapsed} = this
                const isTop = layout === 'topmenu'

                const needSettingWidth = fixedHeader && !isTop && !isMobile
                const siderWidth = collapsed ? sidebarCollapsedWidth : sidebarWidth

                const width = needSettingWidth ? `calc(100% - ${siderWidth})` : '100%'
                const right = fixedHeader ? 0 : undefined

                return {
                    zIndex: 9,
                    width,
                    right
                }
            },
            mainStyle() {
                const {fixedSidebar, isMobile, collapsed} = this
                const needSettingPadding = fixedSidebar && !isMobile
                const siderWidth = collapsed ? sidebarCollapsedWidth : sidebarWidth

                const paddingLeft = needSettingPadding ? siderWidth : undefined
                return {
                    paddingLeft
                }
            },
            headerClassName() {
                const {fixedHeader} = this
                return {
                    'gongbao-fixed-header': fixedHeader
                }
            }
        },
        methods: {
            /**
             * 切换展开/关闭状态
             */
            toggleCollapse() {
                this.collapsed = !this.collapsed
            },
            /**
             * 响应媒体查询变更事件
             * @param val
             */
            handleMediaQueryChange(val) {
                this.query = val
                if (this.isMobile && !val['screen-xs']) {
                    this.isMobile = false
                    return
                }
                if (!this.isMobile && val['screen-xs']) {
                    this.isMobile = true
                    this.collapsed = true
                    console.log('collapsed')
                    // this.settings.contentWidth = false
                    // this.settings.fixSiderbar = false
                }
            },
            handleDrawerClose() {
                this.collapsed = true
            },
            onMenuSelect() {
                this.toggleCollapse()
            },
        },
        components: {
            ContainerQuery,
            Layout,
            LayoutContent: Layout.Content,
            LayoutFooter: Layout.Footer,
            LayoutHeader: Layout.Header,
            SiderMenu,
            GlobalHeader,
            HeaderNotice,
            ADrawer,
        }
    }
</script>

<style lang="scss">
    .gongbao-fixed-header {
        position: fixed;
        top: 0;
        transition: width 0.2s;
    }

    .gongbao-layout__main {
        transition: width, padding .2s;
    }
</style>