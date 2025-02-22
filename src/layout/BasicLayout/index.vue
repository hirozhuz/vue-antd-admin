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
                <sider-menu :menuData="menuRoutes"
                            :collapsed="false"
                            :collapsible="false"
                            :fixed="fixedSidebar"
                            :systemName="systemName"
                            :isMobile="isMobile"
                            @menuSelect="onMenuSelect"
                />
            </a-drawer>
            <sider-menu v-else-if="layout === 'side'"
                        :menuData="menuRoutes"
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
                    <global-header :menuData="menuRoutes"
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

    import {MediaQueryEnum} from '@config'

    import {SET_IS_MOBILE} from '@store/mutation-types'

    import {sidebarWidth, sidebarCollapsedWidth} from '@assets/styles/varibles.scss'

    export default {
        name: "BasicLayout",
        data() {
            return {
                MediaQueryEnum,
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
                return this.$store.getters.fixedHeader
            },
            fixedSidebar() {
                return this.$store.getters.fixedSidebar
            },
            layout() {
                return this.$store.getters.layout
            },
            systemName() {
                return this.$store.getters.systemName
            },
            menuRoutes() {
                return this.$store.getters.routes || []
            },
            isMobile: {
                get() {
                    return this.$store.getters.isMobile
                },
                set(val) {
                    this.$store.commit(SET_IS_MOBILE, val)
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