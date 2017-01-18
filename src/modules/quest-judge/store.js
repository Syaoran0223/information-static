import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host} from 'config'
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
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
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
