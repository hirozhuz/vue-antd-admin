import './assets/styles/index.scss'

import 'babel-polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Auth from './directive/auth'

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// 注册 鉴权指令
Vue.use(Auth)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
