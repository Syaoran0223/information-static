import createStore from 'store/createStore'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/preprocess/view'
    },
    questions: []
}

const module_actions = {
    after_edit_data_init( {state} ) {
        if (!_.isEmpty(state.questions)) {
            state.questions = []
        }
        if (_.isEmpty(state.edit.formData.quest_list)) {
          state.questions.push({
            id: _.uniqueId(),
            formData: {
              id: null,
              quest_no: 0,
              quest_type_id: 1,
              option_count: 0,
              has_sub: '0',
              quest_image: [],
              answer_image: []
            },
            saving: false,
            uploadState: 'done'
          })
        } else {
            _.forEach(state.edit.formData.quest_list, (item) => {
                item.has_sub = String(item.has_sub)
                let data = {
                    id: _.uniqueId(),
                    formData: item,
                    saving: false,
                    uploadState: 'done'
                }
                state.questions.push(data)
            })
        }
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
