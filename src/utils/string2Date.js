/**
 * 解决Ie 下 不支持日期字符串转换为日期对象
 * @param str
 * @returns {Date}
 */
export default function string2Date(str) {
    if (typeof str === 'string') {
        return new Date(Date.parse(str.replace(/-/g, '/')))
    } else {
        return new Date(str)
    }

}
