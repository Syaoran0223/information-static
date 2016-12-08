import createStore from 'store/createStore'
import { PUT } from 'utils/ajax'
import { notify_ok } from 'utils/notification'

const module_state = {
    config: {
        api: 'api/paper/input'
    }
}

const module_actions = {
    parse_edit_init_data: ({ state }, data) => {
        data.images = data.quest_image.concat(data.answer_image)
        return data
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
