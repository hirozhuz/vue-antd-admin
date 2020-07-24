/**
 * 获取第几周
 */

function isDate(date) {
    if (date === null || date === undefined) return false
    if (isNaN(new Date(date).getTime())) return false
    if (Array.isArray(date)) return false // deal with `new Date([ new Date() ]) -> new Date()`
    return true
}


export default function getWeekNumber(src) {
    if (!isDate(src)) return null
    const date = new Date(src.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    const year = date.getFullYear()
    // January 4 is always in week 1.
    const week1 = new Date(year, 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    const weekNumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)

    return {
        year,
        week: weekNumber
    }
}
