import { access_menus } from 'config'
let access_menus_keys = _.chain(access_menus)
  // .filter({ type: 'MENU' })
  .map('identity')
  .value()

const step_over = (routes, step) => {
  _.forEach(routes, (node, key) => {
    step(key, node, routes)
    if (node.subRoutes) {
      step_over(node.subRoutes, step)
    }
  })
}

export const parse_access_router = (module) => {
  let access_routes = _.cloneDeep(module)
  step_over(access_routes, (key, node, parent) => {
    if (!_.includes(access_menus_keys, node.name)) {
      console.debug(`access router: remove`, key)
      delete parent[key]
    }
  })
  return access_routes
}

export const gam_default_index = (module) => {
  module = _.cloneDeep(module)
  let redirects = {}

  let paths = get_path(module)
  console.debug(paths)

  step_over(module, (key, node) => {
    if (_.size(node.subRoutes)) {
      let target_key = _.chain(node.subRoutes)
        .keys()
        .first()
        .value()
      let from = find_full_path(paths, key)
      let to = find_full_path(paths, target_key)
      redirects[from] = to
    }
  })
  console.debug(redirects)
  return redirects
}

const get_path = (node) => {
  let result = []
  let step = (node, path='') => {
    result.push(path)
    _.forEach(node, (route, key) => {
      if (route.subRoutes) {
        step(route.subRoutes, path+key)
      } else {
        result.push(path+key)
      }
    })
  }
  step(node)
  return result
}
const find_full_path = (paths, key) => {
  let result = key
  _.forEach(paths, (path) => {
    if (path.indexOf(key) !== -1) {
      result = path
      return false
    }
  })
  return result
}
