import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host, qtypes} from 'config'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/answer'
    }
}

const module_actions = {
    parse_edit_init_data: ({ state, actions }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        if (!actions.is_selector(data.quest_type_id)) {
            data.quest_answer = data.correct_answer1
        }
        return data
    },
    is_selector({ state }, quest_type_id) {
        let quest_type = _.find(qtypes, (d)=> {
          return d.id==quest_type_id
        })
        if (!quest_type) {
            return false
        }
        return quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
    },
    parse_edit_submit_data ({ state, actions }, customFormData) {
        if (state.edit.formData.has_sub) {
            _.forEach(state.edit.formData.sub_items1, (item)=> {
                if (actions.is_selector(item.quest_type_id)) {
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
                else {
                    item.correct_answer = item.quest_answer
                }
            })
        } else {
            if (actions.is_selector(state.edit.formData.quest_type_id)) {
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
