<template>
    <layout-sider :class="layoutSideClassName"
                  :width="sidebarWidth"
                  :collapsible="collapsible"
                  v-model="collapsed"
                  :collapsedWidth="sidebarCollapsedWidth"
                  :trigger="null">
        <div :class="['logo', theme]">
            <router-link to="/dashboard/workplace">
                <!-- todo 设置LOGO -->
                <!--        <img src="static/img/vue-antd-logo.png">-->
                <h1 v-if="!collapsed">{{systemName}}</h1>
            </router-link>
        </div>
        <i-menu :theme="theme"
                :collapsed="collapsed"
                :menuData="menuData"
                @select="onSelect"/>
    </layout-sider>
</template>

<script>
    import {Layout} from 'ant-design-vue'
    import IMenu from './menu'
    import {sidebarWidth, sidebarCollapsedWidth} from '@assets/styles/varibles.scss'

    export default {
        name: 'SiderMenu',
        props: {
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
            menuData: {
                type: Array,
                required: true
            },
            theme: {
                type: String,
                required: false,
                default: 'dark'
            },
            fixed: {
                type: Boolean,
                default: false
            },
            isMobile: {
                type: Boolean,
                default: false
            },
            systemName: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sidebarWidth,
                sidebarCollapsedWidth
            }
        },
        computed: {
            layoutSideClassName() {
                const {theme, isMobile, fixed} = this
                return [
                    theme,
                    'gongbao-sider',
                    isMobile ? null : 'shadow',
                    fixed ? 'gongbao-sider--fixed' : null
                ]
            }
        },
        methods: {
            onSelect(obj) {
                this.$emit('menuSelect', obj)
            }
        },
        components: {
            IMenu,
            LayoutSider: Layout.Sider
        },
    }
</script>

<style lang="scss">
    @import "@assets/styles/varibles.scss";

    .gongbao-sider {
        z-index: 10;

        &.shadow {
            box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
        }

        &.light {
            background-color: #fff;
        }

        &.dark {
            background-color: #001529;
        }

        &--fixed {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

            .ant-menu-root {
                height: calc(100% - #{$navbar-height});
                overflow-y: auto;
            }
        }

        .logo {
            height: 64px;
            position: relative;
            line-height: 64px;
            padding-left: 24px;
            -webkit-transition: all .3s;
            transition: all .3s;
            overflow: hidden;

            &.light {
                background-color: #fff;

                h1 {
                    color: #1890ff;
                }
            }

            &.dark {
                background-color: #002140;

                h1 {
                    color: #fff;
                }
            }

            h1 {
                color: #fff;
                font-size: 20px;
                margin: 0 0 0 12px;
                font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
                font-weight: 600;
                display: inline-block;
                height: 32px;
                line-height: 32px;
                vertical-align: middle;
            }

            img {
                width: 32px;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
</style>
