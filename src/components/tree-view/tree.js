export default {
  props: {
    items: {
      twoWay: true,
      required: true,
      type: Array
    }
  },
  methods: {
    //目录节点选中
    on_select_item (item) {
      _.each(this.items, (v) => { v._selected = false })
      item._selected = true

      console.debug('TREE_VIEW_SELECT_CHANGE', _.cloneDeep(item))
      this.$emit('change', _.cloneDeep(item))
    },

    set_children_selected (item) {
      let sub_item = _.filter(this.items, { parentId: item.id })
      _.each(sub_item, (s) => {
        s._selected = item._selected
        if (s._has_children) {
          this.set_children_selected(s)
        }
      })
    },
    set_parent_selected (item) {
      if (item.parentId) {
        let parent = _.find(this.items, { id:item.parentId })
        if (parent) {
          parent._selected = true
          this.set_parent_selected(parent)
        }
      }
    },

    //目录展开点击
    on_click_item_expander (item) {
      this.set_item_expand_state(item)
    },

    //子树展开处理
    //1. 未展开且子树未载入 --> 展开并触发载入
    //2.
    //3. 未/展开切换
    set_item_expand_state (item) {
      if (!item._expand) {
        this.item_expand(item)
        this.load_child_if_need(item)
      } else {
        this.item_collapse(item)
      }
    },
    //触发子树载入请求
    load_child_if_need (item) {
      if (item._child_loaded || !item._has_children) return
      item._child_loaded = true
      this.$emit('child-request', _.cloneDeep(item))
    },

    //展开节点
    item_expand (item, is_subItem=false) {
      //默认不展开子树
      if (!is_subItem) {
        item._expand = true
      }

      let sub_item = _.filter(this.items, { parentId: item.id })
      _.each(sub_item, (s) => {
        //子树显示状态根据节点本身状态来判断
        s._visible = item._expand
        if (s._has_children) {
          this.item_expand(s, true)
        }
      })
    },
    item_collapse (item, is_subItem=false) {
      if (!is_subItem) {
        item._expand = false
      }

      let sub_item = _.filter(this.items, { parentId: item.id })
      _.each(sub_item, (s) => {
        s._visible = false
        if (s._has_children) {
          this.item_collapse(s, true)
        }
      })
    }
  }
}
