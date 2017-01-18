import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host} from 'config'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/answer/check'
    },
    edit: {
        answer_saving: false
    }
}

const module_actions = {
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        data.is_error = false
        if (data.has_sub) {
            data.sub_items2 = _.cloneDeep(data.sub_items1)
        } else {
            if (data.quest_type_id == '1') {
                let options = _.cloneDeep(data.options1)
                data.options2 = _.map(options, (d)=> {
                    d._selected = false
                    return d
                })
            } else if (data.quest_type_id == '2') {
                let answer_list = _.cloneDeep(data.answer_list1)
                data.answer_list2 = _.map(answer_list, (d)=> {
                    d.content = ''
                    return d
                })
            }else if (data.quest_type_id == '3') {
                data.quest_answer = data.correct_answer1
            }
        }
        return data
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (state.edit.formData.has_sub) {
            _.forEach(state.edit.formData.sub_items2, (item)=> {
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
                let query = _.chain(state.edit.formData.options2)
                    .filter((item)=> {
                        return item._selected
                    })
                let correct_answer2 = query.map((item)=> {
                        return item.sort
                    })
                    .value()
                state.edit.formData.correct_answer2 = correct_answer2.join('')
            }
            if (state.edit.formData.quest_type_id == '2') {
                let correct_answer2 = _.map(state.edit.formData.answer_list2, (item)=> {
                    return item.content
                })
                state.edit.formData.correct_answer2 = correct_answer2
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

        let api_method = state.edit.is_new ? POST : PUT
        api_method(actions.get_item_submit_url(customFormData), {
            data
        }).then((res) => {
            notify_ok({
            title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'CheckList'
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
    },
    on_answer_right({ state, actions }) {
        let api = `${ api_host }/api/paper/answer/check/right/${ state.edit.params.id }`
        if (state.edit.answer_saving) return
        state.edit.answer_saving = true
        PUT(api).then((res) => {
            notify_ok({
                title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'CheckList'
                })
              }, 300)
        }).catch(() => {

        }).then(() => {
            state.edit.answer_saving = false
        })
      }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
