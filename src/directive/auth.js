/**
 * 鉴权指令
 * @param Vue
 * @param options
 */
function install(Vue, options = {}) {

    Vue.directive(options.name || "auth", {
        // 指令定义对象的钩子函数inserted
        // inserted(el, binding) {
        inserted() {
            // todo 执行鉴权操作
        },
        update(){
            // todo 执行鉴权操作
        }
    })
}

export default {install}
