/**
 * 获取实际数据类型
 * @param val
 * @returns {*}
 */
export function typeOf(val) {
    let types = {
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object RegExp]': 'regExp',
        '[object Date]': 'date',
        '[object Boolean]': 'boolean',
        '[object Function]': 'function',
        '[object Math]': 'math'
    }

    let type = types[Object.prototype.toString.call(val)]
    // 如果数据类型为number 则判断其是不是NaN
    if (type === 'number') {
        type = isNaN(val) ? 'NaN' : type
    }
    return type
}

/**
 * 判断是否是某种数据类型
 * @param type
 */
export function isType(type) {
    return function (value) {
        return typeOf(value) === type
    }
}

/**
 * 判断数据类型是否为array
 * @param val
 * @returns {*}
 */
export function isArray(val) {
    return isType('array')(val)
}

/**
 * 判断数据类型是否为undefined
 * @param val
 * @returns {*}
 */
export function isUndefined(val) {
    return isType('undefined')(val)
}

/**
 * 判断对象是否为空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj = {}) {
    for (let key in obj) {
        return false
    }

    return true
}

/**
 * 判断是否为外部链接
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 替换字符串中的字段.
 * @param {String} str 模版字符串
 * @param {Object} o json data
 * @param {RegExp} [regexp] 匹配字符串的正则表达式
 * @param {function} mathFunc 替代匹配
 * @return {String}
 * @author zhuz
 */
export function substitute(str, o, regexp, mathFunc) {

    // 如果 regexp 不存在 但 mathFunc 存在时
    if (Object.prototype.toString.call(regexp) === "[object Function]") {
        mathFunc = regexp;
        regexp = null;
    }

    return str.replace(regexp || /\\?\{{([^{}]+)\}}/g, function (match, name) {
        if (mathFunc) {
            return mathFunc(o, match, name);
        } else {
            return (o[name] === undefined || o[name] === null) ? '' : o[name];
        }
    })
}


/**
 * 获取当前月的第一天
 * @returns {number}
 */
export function getCurrentMonthFirst() {
    let date = new Date()
    date.setDate(1)
    return date.getTime()
}

/**
 * 获取2个时间之间的天数
 * @param dateString1
 * @param dateString2
 * @returns {number}
 */
export function getDaysBetween(dateString1, dateString2) {
    const startDate = Date.parse(dateString1)
    const endDate = Date.parse(dateString2)
    const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
    // alert(days);
    return days
}

/**
 * 获取当前月的最后一天
 * @returns {number}
 */
export function getCurrentMonthLast() {
    let date = new Date()
    let currentMonth = date.getMonth()
    let nextMonth = ++currentMonth
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
    let oneDay = 1000 * 60 * 60 * 24
    return new Date(nextMonthFirstDay - oneDay).getTime()
}

/**
 * 获取指定日期 周一 至 周日的所有日期
 * @param target
 * @returns {Date[]}
 */
export function getWeek(target) {
    const now = new Date(target)
    const now_day = now.getDay()
    const now_time = now.getTime()
    const result = [1, 2, 3, 4, 5, 6, 7]
    return result.map(i => (new Date(now_time + 24 * 60 * 60 * 1000 * (i - now_day))))
}

/**
 * 排序方法
 * @param name
 * @param direction
 * @returns {Function}
 */
export function sortBy(name, direction) {

    "use strict";

    return function (o, p) {
        let a, b, d;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];

            if (a === b) {
                d = 0;
            } else if (typeof a === typeof b) {
                d = a < b ? -1 : 1;
            } else {
                d = typeof a < typeof b ? -1 : 1
            }
            return direction ? d : -d
        } else {
            throw ("error")
        }
    }
}


/**
 * 千分位转换
 * @param num
 * @returns {*}
 */
export function thousandBit(num) {
    const reg = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g
    if (!isNaN(num)) {
        let value = num + ''
        return value.replace(reg, '$&,')
    }
    return num
}