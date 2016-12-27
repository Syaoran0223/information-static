Vue.config.debug = DEBUG

import * as filters from 'utils/filter'
_.forEach(filters, (filter, key) => {
  Vue.filter(key, filter)
})

function register_component(components) {
  components.keys().forEach((key) => {
    let name = key.replace('./', '').replace('.vue', '')
    Vue.component(name, components(key))
  })
}
register_component(require.context('./layouts', false, /\.vue$/))
register_component(require.context('./components', false, /\.vue$/))
register_component(require.context('./components/question', false, /\.vue$/))

require('bootstrap/dist/js/bootstrap')
require('bootstrap-notify')
require('select2')
require('eonasdan-bootstrap-datetimepicker')
require('bootstrap-daterangepicker')
require('webuploader')

require('select2/dist/css/select2.css')
require('select2-bootstrap-theme/dist/select2-bootstrap.css')
require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css')
require('bootstrap-daterangepicker/daterangepicker.css')
require('assets/scss/app.scss')

moment.locale('zh-cn')

import AppLayout from 'layouts/app-layout.vue'
import router from './router'
router.start(AppLayout, '#app')
