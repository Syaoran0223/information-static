import * as Consts from 'utils/consts'
import { access_menus } from 'config'
import moment from 'moment'

export const json_stringify = window.JSON.stringify
export const json_parse = window.JSON.parse

export const set_items_selected = (
  items,
  matcher
) => {
  _.forEach(_.filter(items, '_selected'), (item) => {
    _.set(item, '_selected', false)
  })

  let current
  if (matcher) {
    current = _.find(items, matcher)
  } else {
    current = _.first(items)
  }
  _.set(current, '_selected', true)
  return { items, selected: current }
}

export const import_const_items = (const_name, default_value) => {
  let const_data = _.get(Consts, const_name)
  let items = _.map(const_data, (text, id) => {
    return { id, text, _selected: false }
  })
  return set_items_selected(items, default_value)
}

export const rename_prop = (obj, oldName, newName) => {
  obj = _.cloneDeep(obj)
  if (oldName == newName) return obj
  if (obj.hasOwnProperty(oldName)) {
    obj[newName] = obj[oldName]
    delete obj[oldName]
  }
  return obj
}

export const get_const_default_for_selector = (const_name) => {
  let c = _.get(Consts, const_name)
  return { id: _.keys(c)[0], text: _.values(c)[0] }
}

export const has_permission = (id) => {
  return !!_.find(access_menus, (m) => {
    return id == m.identity
  })
}

export const get_current_year = () => {
  return moment().format('YYYY')
}


let delay = 10  //in milliseconds
let scroll_amount = 4  // in pixels
let interval


let scroller = () => {
    let old = document.body.scrollTop;//保存当前滚动条到顶端的距离
    document.body.scrollTop += scroll_amount;//让滚动条继续往下滚动
    if (document.body.scrollTop == old) {//到底部后就无法再增加scrollTop的值
        clearInterval(interval);
    }
}

export const scrollToBottom = () => {
    interval = setInterval(scroller, delay);
}