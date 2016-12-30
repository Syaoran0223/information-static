import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host} from 'config'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/answer'
    }
}

const module_actions = {
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        // 选择题
        if (data.quest_type_id == '1') {
            data.options = _.map(data.options, (d)=> {
                d.sort = d.qsn
                d._selected = d.qok
                d.content = d.qopt
                return d
            })
        } else if(data.quest_type_id == '2') {
            data.answer_list = _.map(data.correct_answer, (d)=> {
                return {
                    _id: _.uniqueId('b_answer_'),
                    content: d
                }
            })
        } else if (data.quest_type_id == '3') {
            data.quest_answer = data.correct_answer
        } else if (data.quest_type_id == '4') {
            data.sub_items = _.map(data.sub_items, (d)=> {
                let data = {
                    sort: d.quest_no,
                    quest_type_id: d.qtype_id,
                    quest_content_html: d.quest_content_html,
                    quest_content: d.quest_content,
                    id: d.id
                }
                if (d.qtype_id == 1) {
                    data.options = d.options
                } else if (d.qtype_id == 2) {
                    let answer_list = _.map(d.answer_list, (item)=> {
                        return {
                            _id: _.uniqueId('b_answer_'),
                            content: item
                        }
                    })
                    data.answer_list = answer_list
                } else if (d.qtype_id == 3) {
                    data.quest_answer = d.correct_answer
                }
                return data
            })
        }
        data.selected_id = 0
        return data
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (state.edit.formData.quest_type_id == '1') {
            let query = _.chain(state.edit.formData.options)
                .filter((item)=> {
                    return item._selected
                })
            let correct_answer = query.map((item)=> {
                    return item.sort
                })
                .value()
            state.edit.formData.correct_answer = correct_answer.join('')
        }
        if (state.edit.formData.quest_type_id == '2') {
            let correct_answer = _.map(state.edit.formData.answer_list, (item)=> {
                return item.content
            })
            state.edit.formData.correct_answer = correct_answer
        }
        if (state.edit.formData.quest_type_id == '4') {
            _.forEach(state.edit.formData.sub_items, (item)=> {
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
                    name: 'AnswerList'
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
