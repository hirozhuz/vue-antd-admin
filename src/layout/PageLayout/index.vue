<template>
    <div class="page-layout">
        <!-- header -->
        <page-header class="page-layout__header"
                     :title="headerTitle"
        >
            <slot v-if="$slots.title" name="title" slot="title"/>
            <slot v-if="$slots.headerContent" name="headerContent"/>
        </page-header>
        <!-- content -->
        <div class="page-layout__content">
            <div class="page-layout__inner">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeader from '@components/PageHeader'

    export default {
        name: "PageLayout",
        props: {
            header: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            },
            full: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            route() {
                return this.$route
            },
            headerTitle() {
                const {title, route} = this
                const {meta} = route
                const {title: metaTitle} = meta || {}
                return title || metaTitle || ''
            }
        },
        components: {
            PageHeader
        }
    }
</script>

<style lang="scss">
    @import "@assets/styles/varibles.scss";

    .page-layout {
        position: relative;

        &__content {
            box-sizing: border-box;
            padding: $padding;
        }

        &__inner {
            background: $component-background;
        }
    }
</style>
