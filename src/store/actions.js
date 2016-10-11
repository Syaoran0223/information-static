import { api_host } from 'config'
import { GET, POST, PUT, DELETE } from 'utils/ajax'
import router from 'router'
import { query_parser, query_serializer } from 'utils/querystring'
import { notify_ok, notify_error } from 'utils/notification'

export const on_route_data = ({ state, actions }, to) => {
  actions.set_page_query(to)
  actions.on_page_route(to)
  Vue.nextTick(() => {
    actions.table_query({ state, actions })
  })
}

export const on_page_route = ({ state }, to) => {
}

export const set_page_query = ({ state }, { params, query }) => {
  const { table, search, ...page_query } = state.query = query_parser(query)
  state.params = params
  state.query = page_query
  _.merge(state.table, table)
  _.merge(state.search, search)
}


//TABLE
export const table_query = ({ state, actions }) => {
  state.table.loading = true
  state.table.items = []
  GET(actions.get_table_query_url(), {
    data: actions.get_table_query_params()
  }).then(res => {
    state.table.loading = false
    _.assign(state.table, actions.parse_table_query_fetched(res))
    state.table.empty = !state.table.items.length
  })
}

export const get_table_query_url = ({ state }) => {
  return `${ api_host }/${ state.config.api }`
}
export const get_table_query_params = ({ state, actions }) => {
  return {
    pageIndex: state.table.pageIndex,
    ...actions.get_search_submit_data()
  }
}

export const parse_table_query_fetched = ({ state }, data) => {
  return {
    items: data.items || data,
    totalCount: data.totalCount,
    totalPage: data.totalPage
  }
}

export const page_index_change = ({ state, actions }, index) => {
  state.table.pageIndex = index
  actions.table_query({ state, actions })
  $('html,body').scrollTop(0)
  // actions.router_go({ state })
}

export const router_go = ({ state }) => {
  let query = _.assign(state.query, {
    table: _.pick(state.table, ['pageIndex']),
    search: state.search.formData
  })
  router.go({
    name: state.config.router,
    query: query_serializer(query)
  })
}

//EDIT
export const on_item_add_click = ({ state, actions }, params) => {
  if (params instanceof  Event) {
    console.warn('on_item_add_click got event')
    params = {}
  }
  state.edit.is_new = true
  state.edit.open = true
  state.edit.formData = actions.parse_add_init_data(params)
  state.edit.params = { ...params }
}

export const parse_add_init_data = ({ state }, data) => {
  return data
}

export const on_item_edit_click = ({ state, actions },
      target,
      params,
      formData
  ) => {
  state.edit.is_new = false
  state.edit.open = true
  state.edit.loading = true
  state.edit.params = { ...target, ...params }

  if (formData) {
    state.edit.loading = false
    state.edit.formData = formData
    return
  }

  state.edit.formData = {}
  GET(actions.get_item_edit_url(), {
    data: actions.get_item_edit_params()
  }).then((data) => {
    state.edit.loading = false
    state.edit.formData = actions.parse_edit_init_data(data)
    actions.after_edit_data_init()
  })
}

export const get_item_edit_url = ({ state }) => {
  return `${ api_host }/${ state.config.api }/${ state.edit.params.id }`
}

export const get_item_edit_params = ({ state }) => {

}

export const parse_edit_init_data = ({ state }, data) => {
  return data
}

export const after_edit_data_init = ({ state }) => {

}

export const on_edit_submit = ({ state, actions }, customFormData) => {
  if (state.edit.loading) return
  state.edit.saving = true

  let data = actions.parse_edit_submit_data(customFormData)

  let api_method = state.edit.is_new ? POST : PUT
  api_method(actions.get_item_submit_url(customFormData), {
    data
  }).then((res) => {
    notify_ok({
      title: '保存成功'
    })
    actions.after_edit_done({ state, actions })
  }).catch(() => {

  }).then(() => {
    state.edit.saving = false
    state.edit.open = false
    state.edit.formData = {}
  })
}

export const get_item_submit_url = ({ state }, customFormData) => {
  if (state.edit.is_new) {
    return `${ api_host }/${ state.config.api }`
  }
  return `${ api_host }/${ state.config.api }/${ state.edit.params.id }`
}

export const parse_edit_submit_data = ({ state }, customFormData) => {
  return customFormData || state.edit.formData
}

export const after_edit_done = ({state, actions}) => {
  actions.table_query({state, actions})
}

//REMOVE
export const on_item_remove_click = ({ state }, target) => {
  state.table.removeConfirm.open = true
  state.table.removeConfirm.params = target
}

export const on_item_remove = ({ state, actions }) => {
  if (state.table.removeConfirm.saving) {
    return
  }
  state.table.removeConfirm.saving = true
  DELETE(actions.get_item_remove_url()).then((res) => {
    notify_ok({
      title: '操作成功'
    })
    actions.after_delete_done({state, actions})
  }).catch((res) => {
    notify_error({
      title: res.error
    })
  }).then(() => {
    state.table.removeConfirm.open = false
    state.table.removeConfirm.saving = false
  })
}

export const after_delete_done = ({state, actions}) => {
  actions.table_query({state, actions})
}

export const get_item_remove_url = ({ state }) => {
  return `${ api_host }/${ state.config.api }/${ state.table.removeConfirm.params.id }`
}

//SEARCH
export const on_search_submit = ({ state, actions }) => {
  state.table.pageIndex = 0
  actions.table_query({ state, actions })
}
export const get_search_submit_data = ({ state }) => {
  return state.search.formData
}
export const on_search_reset = ({ state, actions }) => {
  state.search.formData = {}
  state.table.pageIndex = 0
  actions.table_query({ state, actions })
}
