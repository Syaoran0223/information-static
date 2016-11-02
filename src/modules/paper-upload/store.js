import createStore from 'store/createStore'
import router from 'router'

const module_state = {
    config: {
        api: 'api/paper/upload'
    },
    edit: {
        is_new: true,
        uploadState: 'done'
    }
}

const module_actions = {
    after_edit_done ({state, actions}) {
        router.go({
            name: 'PaperUploadList'
        })
    },
    parse_edit_submit_data ({ state }, customFormData) {
        if (!!state.edit.formData.attachments) {
            state.edit.formData.attachments = _.chain(state.edit.formData.attachments)
                .filter((img)=> {
                  return img.status == 'success'
                })
                .map((img)=> {
                  img.id = _.uniqueId('upfile_')
                  return img
                })
                .value()
        }
        return customFormData || state.edit.formData
    }
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
