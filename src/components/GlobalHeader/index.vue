<template>
    <layout-header :class="[theme, 'gongbao-header']">
        <div :class="['gongbao-header--wide', layout]">
            <router-link v-if="isMobile || layout === 'head'"
                         to="/"
                         :class="['logo', isMobile ? null : 'pc', theme]">
                <!--                <img width="32" src="static/img/vue-antd-logo.png"/>-->
                <h1 v-if="!isMobile">{{systemName}}</h1>
            </router-link>
            <a-divider v-if="isMobile"
                       type="vertical"/>
            <!-- 展开/关闭按钮 -->
            <a-icon v-if="layout === 'side'"
                    class="gongbao-header__trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="toggleCollapse"/>
            <div v-if="layout === 'head'"
                 class="gongbao-header__menu">
                <i-menu class="gongbao-header__menu"
                        :theme="theme"
                        mode="horizontal"
                        :menuData="menuData"
                        @select="onSelect"/>
            </div>
            <div :class="['gongbao-header__right', theme]">
                <!--                <header-search class="header-item"/>-->
                <a-tooltip class="gongbao-header__item" title="帮助文档" placement="bottom">
                    <a>
                        <a-icon type="question-circle-o"/>
                    </a>
                </a-tooltip>
                <header-notice class="gongbao-header__item"/>
                <header-avatar class="gongbao-header__item"/>
            </div>
        </div>
    </layout-header>
</template>

<script>
    import {
        Layout,
        Divider as ADivider,
        Icon as AIcon,
        Tooltip as ATooltip
    } from 'ant-design-vue'
    import HeaderNotice from '@components/HeaderNotice'
    import HeaderAvatar from '@components/HeaderAvatar'
    import IMenu from '@components/SiderMenu'


    export default {
        name: 'GlobalHeader',
        props: ['collapsed', 'menuData'],
        computed: {
            isMobile() {
                return this.$store.getters.isMobile
            },
            layout() {
                return this.$store.getters.layout
            },
            theme() {
                return this.layout === 'side' ? 'light' : this.$store.getters.theme
            },
            systemName() {
                return this.$store.getters.systemName
            },
        },
        methods: {
            toggleCollapse() {
                this.$emit('toggleCollapse')
            },
            onSelect(obj) {
                this.$emit('menuSelect', obj)
            }
        },
        components: {
            IMenu,
            HeaderAvatar,
            HeaderNotice,
            ADivider,
            AIcon,
            ATooltip,
            LayoutHeader: Layout.Header
        },
    }
</script>

<style lang="scss">
    @import "@assets/styles/varibles.scss";

    .gongbao-header {
        padding: 0 12px 0 0;
        /*-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, .08);*/
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        position: relative;

        &.light {
            background: #fff;
        }

        &.dark {
            background: #001529;
        }


        &__trigger {
            font-size: 20px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color .3s;

            &:hover {
                color: #1890ff;
            }
        }

        &--wide {
            &.head {
                max-width: 1400px;
                margin: auto;
            }

            &.side {
            }

            .logo {
                height: 64px;
                line-height: 58px;
                vertical-align: top;
                display: inline-block;
                padding: 0 12px 0 24px;
                cursor: pointer;
                font-size: 20px;

                &.pc {
                    padding: 0 12px 0 0;
                }

                img {
                    display: inline-block;
                    vertical-align: middle;
                }

                h1 {
                    display: inline-block;
                    font-size: 16px;
                }

                &.dark h1 {
                    color: #fff;
                }
            }

            .gongbao-header__menu {
                display: inline-block;
            }

            .gongbao-header__right {
                float: right;

                &.dark {
                    color: #fff;

                    i {
                        color: #fff;
                    }
                }
            }
        }

        &__item {
            padding: 0 12px;
            display: inline-block;
            height: 100%;
            cursor: pointer;
            vertical-align: middle;

            i {
                font-size: 16px;
                color: rgba(0, 0, 0, .65);
            }
        }

        &__menu {
            height: $navbar-height;
            line-height: $navbar-height;
        }
    }
</style>
