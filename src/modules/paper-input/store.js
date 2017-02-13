import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok, notify_error } from 'utils/notification'
import {api_host} from 'config'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/input'
    }
}

const module_actions = {
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        data.options1 = [
          {
            sort: 'A',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          },
          {
            sort: 'B',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          }
        ]
        data.selected_id = 0
        return data
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (state.edit.formData.has_sub) {
            _.forEach(state.edit.formData.sub_items1, (item)=> {
                if (item.quest_type_id == '1') {
                    let correct_answer = _.chain(item.options)
                        .filter((d) => {
                            return d._selected
                        })
                        .map((d)=> {
                            return d.sort
                        })
                        .value()
                    item.correct_answer = correct_answer.join('')
                }
                if (item.quest_type_id == '2') {
                    let correct_answer = _.map(item.answer_list, (d)=> {
                        return d.content
                    })
                    item.correct_answer = correct_answer
                }
                if (item.quest_type_id == '3') {
                    item.correct_answer = item.quest_answer
                }
            })
        } else {
            if (state.edit.formData.quest_type_id == '1') {
                let correct_answer1 = _.chain(state.edit.formData.options1)
                    .filter((item)=> {
                        return item._selected
                    })
                    .map((item)=> {
                        return item.sort
                    })
                    .value()
                state.edit.formData.correct_answer1 = correct_answer1.join('')
            }
            if (state.edit.formData.quest_type_id == '2') {
                let correct_answer1 = _.map(state.edit.formData.answer_list1, (item)=> {
                    return item.content
                })
                state.edit.formData.correct_answer1 = correct_answer1
            }
        }
        return customFormData || state.edit.formData
    },
    get_table_query_url({ state }) {
        return `${ api_host }/api/paper/search`
    },
    on_edit_submit ({ state, actions }, customFormData) {
        if (state.edit.loading) return
        state.edit.saving = true

        let data = actions.parse_edit_submit_data(customFormData)
        // 验证选项个数
        if (data.has_sub) {
            for (var i=0; i<data.sub_items1.length; i++) {
                if (data.sub_items1[i].quest_type_id == '1') {
                    if (!data.sub_items1[i].options.length) {
                        notify_error({
                            title: '请输入选择题选项'
                        })
                        state.edit.saving = false
                        return
                    }
                }
            }
        } else {
            if (data.quest_type_id == '1') {
                if (!data.options1.length) {
                    notify_error({
                        title: '请输入选择题选项'
                    })
                    state.edit.saving = false
                    return
                }
            }
        }

        let api_method = state.edit.is_new ? POST : PUT
        api_method(actions.get_item_submit_url(customFormData), {
            data
        }).then((res) => {
            notify_ok({
            title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'InputList'
                })
              }, 300)
        }).catch(() => {

        }).then(() => {
            state.edit.saving = false
            state.edit.open = false
        })
    },
    parse_table_query_fetched ({ state }, data) {
        let items = _.map(data.items, (item)=> {
            if (item.qopt) {
                item.qopt = JSON.parse(item.qopt)
            } else {
                item.qopt = []
            }
            return item
        })
        return {
            items: items,
            totalCount: data.totalCount,
            totalPage: data.totalPage
        }
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
