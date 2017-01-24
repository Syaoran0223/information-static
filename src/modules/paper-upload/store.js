import createStore from 'store/createStore'
import router from 'router'
import moment from 'moment'
import { user } from 'config'
import { POST } from 'utils/ajax'
import { notify_ok } from 'utils/notification'
import {api_host} from 'config'

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
    init_edit({state, actions}) {
        let current_mounth = moment().format('M')
        let current_year = current_mounth < 9 ? moment().format('YYYY') - 1 : moment().format('YYYY')
        let current_section = current_mounth >= 9 || current_mounth < 3 ? 'FIRST_HALF' : 'SECOND_HALF'
        state.edit.formData = {
            year: current_year,
            section: current_section,
            province_id: {id: user.province_id, text: user.province_name},
            city_id: {id: user.city_id, text: user.city_name},
            area_id: {id: user.area_id, text: user.area_name},
            school_id: {id: user.school_id, text: user.school_name},
            grade: user.grade_id,
        }
    },
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
    },
    on_edit_submit ({ state, actions }, customFormData) {
        if (state.edit.loading) return
        state.edit.saving = true

        let data = actions.parse_edit_submit_data(customFormData)

        POST(actions.get_item_submit_url(customFormData), {
            data
        }).then((res) => {
            notify_ok({
                title: '保存成功'
            })
            setTimeout(() => {
                router.go({
                    name: 'PaperUploadList'
                })
              }, 300)
        }).catch(() => {

        }).then(() => {
            state.edit.saving = false
            state.edit.open = false
        })
    },
}

const { state, actions } = createStore(module_state, module_actions)
export { state, actions }
