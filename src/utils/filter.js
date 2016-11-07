import * as Consts from 'utils/consts'
import moment from 'moment'

export const get_const_value = (key, const_key) => {
  return _.get(Consts, `${const_key}.${key}`, key)
}

export const get_class_name = (id) => {
  let clazz = _.find(Consts.class_items, (c) => {
    return c.id == id
  })
  return clazz ? clazz.text : ''
}

export const date_format = (
  val,
  format_string='YYYY-MM-DD',
  src_format='YYYY-MM-DD HH:mm:ss'
) => {
  return moment(val, src_format).format(format_string)
}

export const date_format_cn = (
  val
) => {
  return date_format(val, 'YYYY年M月D日')
}

export const deal_exception_days = (val) => {
  return _.chain(val)
          .values()
          .uniq()
          .filter((d)=> {
            return d != ''
          })
          .value()
}

export const text2html = (val='') => {
  return val
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r\n?|\n/g, '<br>')
    .replace(/\s/g, '&nbsp;')
}

export const percent = (val) => {
  let percent = val * 100
  percent = (percent.toFixed(2))
  return percent + '%'
}

export const get_content_summary = (content, length=16) => {
  if (content.length <= length) {
    return content
  }
  return content.slice(0, length) + '...'
}

export const school_year = (val) => {
  return _.chain(Consts['school_years'])
            .get(val, val)
            .value()
}

export const parse_teachers = (teachers) => {
  let data = _.map(teachers, (t)=> {
    return t.teacherRealName
  })
  return data.join(',')
}

export const parse_timeout = (timeout) => {
  if (timeout <= 0) {
    return '00:00:00'
  }
  let d = moment.duration(Number(timeout), 's')
  let hour = d.hours()
  hour = hour < 10 ? '0' + String(hour) : String(hour)
  let minute = d.minutes()
  minute = minute < 10 ? '0' + String(minute) : String(minute)
  let second = d.seconds()
  second = second < 10 ? '0' + String(second) : String(second)
  return hour + ':' + minute + ':' + second
}
