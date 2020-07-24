<template>
    <page-layout>
        <a-card :bordered="false">
            <div class="about">
                <h1>This is an about page</h1>
            </div>
        </a-card>

    </page-layout>
</template>
<script>
    import {Card as ACard} from 'ant-design-vue'
    import PageLayout from '@layout/PageLayout'

    export default {
        name: "Test",
        components: {
            PageLayout,
            ACard
        }

    }
</script>
<style lang="scss">

</style>