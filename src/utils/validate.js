// 验证必填项函数,
export const validateRequireFunc = (fieldName = '', errorCallback) => {

    return (rule, value, callback) => {
        // 错误信息
        let errorMsg = `请输入${fieldName}`
        if (value === '') {
            // 执行错误回调方法
            errorCallback && errorCallback(errorMsg)
            callback(new Error(errorMsg))
        } else {
            callback()
        }
    }
}
// 验证邮箱
export const validateEmailFunc = (rule, value, callback) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!value || reg.test(value)) {
        callback()
    } else {
        // 错误信息
        const errorMsg = `请输入正确的邮箱地址`
        callback(new Error(errorMsg))
    }
}
