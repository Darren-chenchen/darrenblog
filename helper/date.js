/**
 * Created by tianyang on 2017/12/19.
 */

/**
 * 获取当前月第一天
 * @returns {*}
 */
export function getCurrentMonthFirst() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 获取当前月最后一天
 * @returns {*}
 */
export function getCurrentMonthLast() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth() + 1, 1), 'yyyy-MM-dd HH:mm:ss')
}


/**
 * 获取当年第一天
 * @returns {*}
 */
export function getCurrentYearFirst() {
  let date = new Date()
  return format(new Date(date.getFullYear(), 0, 1), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 获取当年最后一天
 * @returns {*}
 */
export function getCurrentYearLast() {
  let date = new Date()
  return format(new Date(date.getFullYear() + 1, 0, 1), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 获取本周第一天
 * @returns {*}
 */
export function getCurrentWeekFirst() {
  let now = new Date()
  let nowTime = now.getTime()
  let day = now.getDay()
  let oneDayLong = 24 * 60 * 60 * 1000
  let MondayTime = nowTime - (day - 1) * oneDayLong
  let monday = new Date(MondayTime)
  return format(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()), 'yyyy-MM-dd HH:mm:ss')
}


/**
 * 获取本周最后一天
 * @returns {*}
 */
export function getCurrentWeekLast() {
  let now = new Date()
  let nowTime = now.getTime()
  let day = now.getDay()
  let oneDayLong = 24 * 60 * 60 * 1000
  let SundayTime = nowTime + (7 - day) * oneDayLong
  let sunday = new Date(SundayTime)
  return format(new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + 1), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 获取一周前的日期（包括今天）
 * @returns {*}
 */
export function getOneWeekAgo() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 今日0点
 * @returns {*}
 */
export function getToday() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 明日0点
 * @returns {*}
 */
export function getTomorrow() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), 'yyyy-MM-dd HH:mm:ss')
}


export function getTodayStr() {
  let date = new Date()
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'MM/dd')
}


/**
 * 获取指定月份第一天
 * @param m
 * @returns {*}
 */
export function getMonthFirst(m) {
  let y = 2017
  let date = new Date(y, m - 1, 1)
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'yyyy-MM-dd HH:mm:ss')
}

/**
 * 获取指定月份最后一天
 * @param m
 * @returns {*}
 */
export function getMonthLast(m) {
  let y = 2017
  let date = new Date(y, m, 0)
  return format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), 'yyyy-MM-dd HH:mm:ss')
}


/**
 * 是否为今日
 * @param dateStr 格式: yyyy-mm-dd
 * @returns {boolean}
 */
export function isToday(dateStr) {
  let day = new Date(Date.parse(dateStr))
  let today = new Date()
  let day1 = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  let today1 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return day1.getTime() === today1.getTime()
}


/**
 * 是否为本月
 * @param dateStr 格式: yyyy-mm-dd
 * @returns {boolean}
 */
export function isTomonth(dateStr) {
  let day = new Date(Date.parse(dateStr))
  let today = new Date()
  let day1 = new Date(day.getFullYear(), day.getMonth())
  let today1 = new Date(today.getFullYear(), today.getMonth())
  return day1.getTime() === today1.getTime()
}


/**
 * 是否比在今日后
 * @param dateStr  格式: yyyy-mm-dd
 */
export function isBiggerThanToday(dateStr) {
  let day = new Date(Date.parse(dateStr))
  let today = new Date()
  let day1 = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  let today1 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return day1 > today1
}


/**
 * 是否比在本月后
 * @param dateStr 格式: yyyy-mm-dd
 */
export function isBiggerThanTomonth(dateStr) {
  let day = new Date(Date.parse(dateStr))
  let month = new Date(day.getFullYear(), day.getMonth())
  let today = new Date()
  let tomonth = new Date(today.getFullYear(), today.getMonth())
  return month > tomonth
}

export function format(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

