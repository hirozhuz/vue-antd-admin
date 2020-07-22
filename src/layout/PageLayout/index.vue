<template>
    <div class="page-layout">
        <!-- header -->
        <page-header class="page-layout__header">
            <slot v-if="$slots.title" name="title" slot="title"/>
            <slot v-if="$slots.headerContent" name="headerContent"/>
        </page-header>
        <!-- content -->
        <div class="page-layout__content">
            <slot/>
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
            }
        },
        components: {
            PageHeader
        }
    }
</script>

<style lang="scss">

</style>
