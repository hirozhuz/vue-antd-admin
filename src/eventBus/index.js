/**
 * 全局事件总线
 * 跨层通讯使用，需注意事件绑定，切勿重复事件绑定造成意外影响
 */
import Vue from 'vue'
// 全局事件总线
const eventBus = new Vue()

export default eventBus
