<template>
    <div class="login-page">
        <div class="container">
            <div class="login-page__header">
                <h1 class="login-page__title">Basic Data Platform</h1>
            </div>
            <div class="login-page__content">
                <a-form :form="form"
                        ref="form"
                        @submit="handleSubmit"
                >
                    <a-alert class="login-page__error-box"
                            v-if="errorMessage"
                             type="error"
                             showIcon
                             :message="errorMessage" />

                    <a-form-item>
                        <a-input size="large"
                                 placeholder="请输入账号"
                                 v-decorator="['name',{
                                   rules:[{
                                     required:true,
                                     message:'请输入账号'
                                   }],
                                   validateTrigger:'blur'
                                 }]"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-input-password size="large"
                                          placeholder="请输入密码"
                                          v-decorator="['password',{
                                               rules:[{
                                                 required:true,
                                                 message:'请输入密码'
                                               }],
                                               validateTrigger:'blur'
                                             }]"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button class="login-page__submit-button"
                                  size="large"
                                  type="primary"
                                  htmlType="submit"
                                  :loading="loading"
                                  :disabled="loading"
                        >登陆
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div class="login-page__footer">
                <p class="copyright">Copyright © 2020. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Form as AForm,
        Input as AInput,
        Button as AButton,
        Alert as AAlert
    } from 'ant-design-vue'



    import {ERROR_DEFAULT_HTTP_REQUEST_FAIL} from '@config/error'

    export default {
        name: 'Login',
        data() {
            return {
                form: this.$form.createForm(this),
                loading: false,
                errorMessage: ''
            }
        },
        computed: {
            // 跳转路径
            redirect() {
                const route = this.$route
                return route.query && route.query.redirect ? route.query.redirect : '/'
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                const {form: {validateFields}, redirect} = this
                this.loading = true
                validateFields(async (err, values) => {
                    if (!err) {
                        try {
                            await this.$store.dispatch('loginByUserName', values)
                            this.$router.replace({path: redirect})
                        } catch (e) {
                            this.errorMessage = e.message || ERROR_DEFAULT_HTTP_REQUEST_FAIL
                        } finally {
                            this.loading = false
                        }
                    }
                })
            }
        },
        components: {
            AForm,
            AInput,
            AButton,
            AAlert,
            AInputPassword: AInput.Password,
            AFormItem: AForm.Item
        }
    }
</script>

<style lang="scss">
    @import "@assets/styles/varibles.scss";
    .login-page {
        height: 100%;

        .container {
            width: 100%;
            min-height: 100%;
            background: #f0f2f5 url(~@assets/images/background.svg) no-repeat 50%;
            background-size: 100%;
            padding: 110px 0 144px;
            position: relative;
        }

        &__header,
        &__footer {
            text-align: center;
        }

        &__header {
            margin-bottom: 100px;
        }

        &__content {
            width: 368px;
            margin: 0 auto;
        }


        &__error-box{
            margin-bottom: $padding;
        }

        &__submit-button {
            width: 100%;
        }


        &__footer {
            margin: 48px 0 24px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>