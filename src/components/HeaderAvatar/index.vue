<template>
    <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.name}}</span>
    </span>
        <a-menu style="width: 150px" slot="overlay">
            <a-menu-item>
                <a-icon type="user"/>
                <span>个人中心</span>
            </a-menu-item>
            <a-menu-item>
                <a-icon type="setting"/>
                <span>设置</span>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item>
                <router-link to="/login">
                    <a-icon type="poweroff"/>
                    <span>退出登录</span>
                </router-link>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import {
        Avatar as AAvatar,
        Dropdown as ADropdown,
        Menu as AMenu,
        Icon as AIcon
    } from 'ant-design-vue'

    export default {
        name: 'HeaderAvatar',
        computed: {
            currUser() {
                return this.$store.getters.userInfo
            }
        },
        components: {
            AAvatar,
            ADropdown,
            AIcon,
            AMenu,
            AMenuItem: AMenu.Item,
            AMenuDivider: AMenu.Divider
        }
    }
</script>

<style lang="scss">
    .avatar {
        margin: 20px 4px 20px 0;
        color: #1890ff;
        background: hsla(0, 0%, 100%, .85);
        vertical-align: middle;
    }
</style>
