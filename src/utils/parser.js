export const parse_tree_data = (data) => {
  _.forEach(data, (d) => {
    d._depth_arr = _.range(d.depth)
    if (d.parentId) {
      let parent = _.find(data, {id: d.parentId})
      if (parent.children) {
        parent.children.push(_.pick(d, 'id'))
      } else {
        parent.children = [_.pick(d, 'id')]
      }
    }
  })
  _.forEach(data, (d) => {
    d._has_children = !!_.size(d.children)
  })
  return data
}

export const parse_upload_data = (data) => {
  let attachment = []
  _.each(data, (f)=> {
    if (f.status == 'success' || f.status == 'complete') {
      f.id = f.url
      f.status = 'complete'
      attachment.push(f)
    }
  })
  return attachment
}
