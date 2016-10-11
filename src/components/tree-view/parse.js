export const parse_tree_data = (data, option={}) => {
  let defaults = {
    expand_level: 1,
    step_fn: null
  }
  _.defaults(option, defaults)

  _.forEach(data, (d) => {
    d._depth_arr = _.range(d.depth)
    d._selected = false

    if (d.parentId) {
      let parent = _.find(data, {id: d.parentId})
      if (parent.children) {
        parent.children.push(_.get(d, 'id'))
      } else {
        parent.children = [_.get(d, 'id')]
      }
    }
    _.forEach(data, (d) => {
      d._has_children = !!_.size(d.children)
    })

    d._visible = false
    d._expand = false
    if (d.depth <= option.expand_level) {
      d._visible = true
    }
    if (d.depth < option.expand_level) {
      d._expand = true
    }

    if (_.isFunction(option.step_fn)) {
      option.step_fn(d)
    }
  })
  return data
}

export function append_child_items (items, { children, contentId }) {
  children = _.map(children, (v) => {
    return _.assign({
      _depthArr: _.range(v.depth-1),
      _selected: false,

      _has_child: parseInt(v.childrenCount, 10) >= 1,
      _has_questions: v.questionCount >= 1,
      _visible: true,
      _expand: false,

      _child_loaded: false
    }, v)
  })

  let parent_index = _.findIndex(items, (v) => v.id == contentId)
  items.splice.apply(items, [parent_index+1, 0].concat(children))
}
