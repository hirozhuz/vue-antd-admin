<template>
    <div class="page-header">
        <!-- 面包屑 -->
        <div class="page-header__breadcrumb" v-if="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <router-link to="/">首页</router-link>
                </a-breadcrumb-item>
                <template v-for="item in breadcrumb"
                >
                    <a-breadcrumb-item :key="item.path"
                                       v-if="showBreadcrumbItem(item)"
                    >
                        {{item.meta.title}}
                    </a-breadcrumb-item>
                </template>
            </a-breadcrumb>
        </div>
        <!-- 标题-->
        <div class="page-header__title-box">
            <slot v-if="$slots.title" name="title"/>
            <h2 class="page-header__title" v-else>{{title}}</h2>
            <div class="page-header__action" v-if="$slots.action">
                <slot name="action"/>
            </div>
        </div>
        <div class="page-header__main" v-if="$slots.default">
            <!-- 主体内容 -->
            <div class="page-header__content">
                <slot/>
            </div>
        </div>

    </div>
</template>

<script>
    import {Breadcrumb as ABreadcrumb} from 'ant-design-vue'

    export default {
        name: 'PageHeader',
        props: {
            title: {
                type: String,
                default: ''
            },
            breadcrumb: {
                type: Array,
                default: null
            }
        },
        data() {
            return {}
        },
        methods: {
            showBreadcrumbItem(item) {
                return item.meta && item.meta.title
            }
        },
        components: {
            ABreadcrumb,
            ABreadcrumbItem: ABreadcrumb.Item
        }
    }
</script>

<style lang="scss">
    @import "@assets/styles/varibles.scss";

    .page-header {
        padding: $padding;
        background: $component-background;

        &__title-box,
        &__main {
            margin-top: $padding;
        }

        &__title-box {
            line-height: 1;

            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }

        &__title {
            float: left;
            font-size: $font-size*2;
            margin: 0;
        }

        &__action {
            float: right;
            margin-left: $padding;
        }


    }
</style>