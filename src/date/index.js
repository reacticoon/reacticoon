import moment from 'moment'

import findIndex from 'lodash/findIndex'
import isNumber from 'lodash/isNumber'
import isNil from 'lodash/isNil'


// import manually the language files we need
// TODO: do this dynamically
import 'moment/locale/fr'

const keys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const MS_FORMAT = 'x'

// TODO:
const getCurrentLanguageWithoutRegionCode = () => 'en'

export const DAYS = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
}


export const DATE_FORMAT_MS = 'DD/MM/YY HH:mm:ss.SSS'

export const MINUTE_AS_MS = 60 * 1000
export const HOUR_AS_MS = 3600 * 1000
export const DAY_AS_MS = 86400 * 1000

// we have set the warning 30 minutes before the last authorized order (delay is counted)
export const DELAY_TO_WARN_CLOSING_HOUR = MINUTE_AS_MS * 30

export const fromMs = ms => moment(ms, MS_FORMAT).locale(getCurrentLanguageWithoutRegionCode())

export const parseDate = (date, format) =>
  moment(date, format).locale(getCurrentLanguageWithoutRegionCode())

export const now = () => {
  return moment()
}

export const anyToDate = date => {
  if (isNumber(date)) {
    return fromMs(date)
  }

  if (isNil(date)) {
    return moment()
  }

  return moment(date) // copy in order to not change the reference data.
}

export const getMs = date => {
  if (isNumber(date)) {
    return fromMs(date)
  }

  const copiedDate = anyToDate(date)
  return copiedDate.valueOf()
}

export const millisecondsToMinutes = timestamp => {
  return Math.round(timestamp / MINUTE_AS_MS)
}

export const millisecondsToDays = timestamp => {
  return Math.round(timestamp / DAY_AS_MS)
}

// DateParam: either a moment or an hour timestamp

/**
 * The api use the english day names as keys.
 * We use this function to get the key for the given date.
 */
export const getDayKey = dateParam => {
  const date = anyToDate(dateParam)
  const dayIndex = date.day()

  return keys[dayIndex]
}

export const getDayIndexForKey = key => {
  return findIndex(keys, k => k === key)
}

export const getI18nDayNameForKey = key => {
  const days = {
    monday: moment.weekdays(1),
    tuesday: moment.weekdays(2),
    wednesday: moment.weekdays(3),
    thursday: moment.weekdays(4),
    friday: moment.weekdays(5),
    saturday: moment.weekdays(6),
    sunday: moment.weekdays(7),
  }

  return days[key]
}

export const getI18nDayShortNameForKey = key => {
  const days = {
    monday: moment.weekdaysShort(1),
    tuesday: moment.weekdaysShort(2),
    wednesday: moment.weekdaysShort(3),
    thursday: moment.weekdaysShort(4),
    friday: moment.weekdaysShort(5),
    saturday: moment.weekdaysShort(6),
    sunday: moment.weekdaysShort(7),
  }

  return days[key]
}

/**
 * @param date1 Moment|number|MsTimestamp
 * @type {[type]}
 */
export const isSameDay = (date1Param, date2Param) => {
  if (isNil(date1Param) || isNil(date1Param)) {
    return false
  }

  const date1 = anyToDate(date1Param)
  const date2 = anyToDate(date2Param)

  return date1.isSame(date2, 'day') && date1.isSame(date2, 'month') && date1.isSame(date2, 'year')
}

export const getHourFromMs = dateParam => parseInt(getMs(dateParam) / 1000 / 3600, 10)

export const getMinuteFromMs = dateParam => parseInt(((getMs(dateParam) / 1000) % 3600) / 60, 10)

export const getMsFromHour = hour => parseInt(hour * HOUR_AS_MS, 10)

export const getMsFromMinute = minute => parseInt(minute * MINUTE_AS_MS, 10)

export const getHourAndMinuteFromMs = date => {
  return {
    hour: getHourFromMs(date),
    minute: getMinuteFromMs(date),
  }
}

export const toStartOfDay = dateParam => {
  const date = anyToDate(dateParam)
  return moment(date)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
}

/**
 * @param date Moment|number|MsTimestamp
 */
export const isToday = dateParam => {
  let date = anyToDate(dateParam)
  return isSameDay(date, moment())
}

//
// Format
//

// const formatTwoDigits = (number) => (
//   number > 9 ? `${number}` : `0${number}`
// )

export const formatHour = (dateParam, separator = 'h', shouldUseUtc = false) => {
  let date = anyToDate(dateParam)

  if (shouldUseUtc) {
    date = date.utcOffset(0)
  }

  // if (isNumber(date)) {
  //   return `${formatTwoDigits(getHourFromMs(date))}:${formatTwoDigits(getMinuteFromMs(date))}`
  // }

  return `${date.format('HH')}${separator}${date.format('mm')}`
}

export const formatDate = (dateParam, format = 'DD-MM-YYYY HH:mm') => {
  const date = anyToDate(dateParam)

  return date.format(format)
}

export const todayWithHour = hourTimestamp =>
  moment()
    .startOf('day')
    .add(hourTimestamp, 'ms')

export const diff = (dateParam1, dateParam2, format = 'days') => {
  const d1 = anyToDate(dateParam1)
  const d2 = anyToDate(dateParam2)

  return d2.diff(d1, format)
}

/**
 * get number of weekdays between two timestamp
 */
export const nbWeekdaysBetween = (d1, d2, isoWeekday) => {
  d1 = moment(d1)
  d2 = moment(d2)

  var daysToAdd = (7 + isoWeekday - d1.isoWeekday()) % 7

  var nextDay = d1.clone().add(daysToAdd, 'days')
  if (nextDay.isAfter(d2)) {
    return 0
  }

  var weeksBetween = d2.diff(nextDay, 'weeks')

  return weeksBetween + 1
}

export const getTimestampForHourWithDate = dateParam => {
  const date = anyToDate(dateParam)
  return (date.hour() * 3600 + date.minute() * 60) * 1000
}

/**
 * moment.js .day() use sunday as first day.
 * We use monday as first day on the API.
 * Use this function to convert.
 *
 * @link http://momentjs.com/docs/#/get-set/iso-weekday/
 */
export const getPmtDayIndex = dateParam => {
  const date = anyToDate(dateParam)

  // In moment: 7 is Monday or Sunday, depending of the iso weekday
  // If the locale assigns Monday as the first day of the week, moment().weekday(0) will be Monday. If Sunday is the first day of the week, moment().weekday(0) will be Sunday.

  /**
   * isoWeekday: Gets or sets the ISO day of the week with 1 being Monday and 7 being Sunday.
   * day: This method can be used to set the day of the week, with Sunday as 0 and Saturday as 6.
   */
  const day = date.day()

  const daysMomentToPmt = {
    '0': DAYS.SUNDAY,
    '1': DAYS.MONDAY,
    '2': DAYS.TUESDAY,
    '3': DAYS.WEDNESDAY,
    '4': DAYS.THURSDAY,
    '5': DAYS.FRIDAY,
    '6': DAYS.SATURDAY,
  }

  return daysMomentToPmt[day]
}

/**
 * Convert timestamp to hour minute string format HH:mm
 */
export const timestampToHourMinuteAsString = timestamp => {
  let hours = Math.floor(timestamp / 1000 / 60 / 60)
  let minutes = Math.floor(timestamp / 1000 / 60) - hours * 60

  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${minutes}`
}

/**
 * Convert hour minute string format HH:mm to timestamp
 */
export const hourMinuteAsStringToTimestamp = str => {
  let [hours, minutes] = str.split(':')

  hours = parseInt(hours, 10) * 60 * 60 * 1000
  minutes = parseInt(minutes, 10) * 60 * 1000

  return hours + minutes
}


// https://danielcompton.net/2017/07/06/detect-user-timezone-javascript
// -> does not work on IE
export const getBrowserTimeZone = () =>
Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : null