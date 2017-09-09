import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host, qtypes} from 'config'
import router from 'router'

const module_state = {
    config: {
        api: 'api/quest/judge'
    },
    edit: {
        accept_1: false,
        accept_2: false
    }
}

const module_actions = {
    is_selector({ state }, quest_type_id) {
        let quest_type = _.find(qtypes, (d)=> {
          return d.id==quest_type_id
        })
        if (!quest_type) {
            return false
        }
        return quest_type.text == '选择题' || quest_type.text == '单选题' || quest_type.text == '多选题' || quest_type.text == '不定项选择题' || quest_type.text == '双选题'
    },
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        return data
    },
    parse_edit_submit_data ({ state, actions }, customFormData) {
        if (state.edit.formData.has_sub) {
            _.forEach(state.edit.formData.sub_items2, (item)=> {
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
                } else {
                    item.correct_answer = item.quest_answer
                }
            })
        } else {
            if (actions.is_selector(state.edit.formData.quest_type_id)) {
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
        }
        return customFormData || state.edit.formData
    },
    get_table_query_url({ state }) {
        return `${ api_host }/api/paper/search`
    },
    accept ({ state, actions }, type) {
        let key = 'accept_' + String(type)
        if (_.get(state.edit, key)) return
        _.set(state.edit, key, true)
        POST(`${api_host}/api/quest/judge/accept/${ state.edit.params.id }`, {
            data: {type: type}
        }).then((res)=> {
            notify_ok({
            title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'JudgeList'
                })
            }, 300)
        }).catch(()=> {

        }).then(()=> {
            _.set(state.edit, key, false)
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
