/**
 * url query string stringify
 */
export const query_serializer = (data) => {
  var result = {}
  _.each(data, (val, key) => {
    if (_.isObject(val)) {

      _.each(val, (sub_val, sub_key) => {
        result[`__${ key }__${ sub_key }`] = sub_val
      })

    } else {
      result[key] = val
    }
  })
  return result
}

/**
 * parse query string into object
 */
export const query_parser = (data) => {
  var obj_key_reg = /^__(.+)__(.+)$/
  var result = {}
  _.each(data, (val, key) => {
    if (obj_key_reg.test(key)) {

      var match = key.match(obj_key_reg)
      if (!result[match[1]]) {
        result[match[1]] = {}
      }
      result[match[1]][match[2]] = val

    } else {
      result[key] = val
    }
  })
  return result
}
