import createStore from 'store/createStore'
import { PUT, POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
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
        data.options = [
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
        data.answer_list = []
        return data
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (state.edit.formData.quest_type_id == '1') {
            let correct_answer = _.chain(state.edit.formData.options)
                .filter((item)=> {
                    return item._selected
                })
                .map((item)=> {
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
                    name: 'InputList'
                })
              }, 300)
        }).catch(() => {

        }).then(() => {
            state.edit.saving = false
            state.edit.open = false
        })
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
