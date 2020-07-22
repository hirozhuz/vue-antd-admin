<template>
    <div class="page-header">
        <!-- 面包屑 -->
        <div class="page-header__breadcrumb" v-if="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item v-if="item in breadcrumb"
                                   :key="item.path"
                >
                    {{item.name}}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <!-- 标题-->
        <div class="page-header__title-box">
            <slot v-if="$slots.title" name="title"/>
            <h2 class="page-header__title" v-else>{{title}}</h2>
        </div>
        <!-- 主体内容 -->
        <div class="page-header__content"
             v-if="$slots.default">
            <slot/>
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
        components: {
            ABreadcrumb,
            ABreadcrumbItem: ABreadcrumb.Item
        }
    }
</script>

<style lang="scss">
    .app-header {

    }
</style>