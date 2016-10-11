const state = {
  config: {
    api: '',
    router: ''
  },

  //TODO 配置搜索行为是否触发 router_go

  params: {},
  query: {},
  table: {
    loading: false,
    empty: false,
    items: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    totalPage: 0,
    selectable: {
      checkAll: false
    },
    removeConfirm: {
      open: false,
      saving: false,
      params: null
    }
  },
  search: {
    formData: {}
  },
  edit: {
    open: false,
    loading: false,
    saving: false,
    formData: {},
    params: {},
    is_new: false
  }
}

export default state
