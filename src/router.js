import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { parse_access_router, gam_default_index } from 'routers/parser'

import Playground from 'modules/playground.vue'
import Home from 'modules/home/index.vue'

import PaperUpload from 'modules/paper-upload/index.vue'
import PaperUploadList from 'modules/paper-upload-list/index.vue'

import WaitConfirm from 'modules/wait-confirm/index.vue'
import PaperConfirm from 'modules/paper-confirm/index.vue'
import ConfirmList from 'modules/confirm-list/index.vue'

const router = new VueRouter({
  linkActiveClass: 'active'
})

let map = {
  '/home': {
    name: 'home',
    component: Home
  },
  '/paper-upload': {
    name: 'PaperUpload',
    component: PaperUpload
  },
  '/paper-upload-list': {
    name: 'PaperUploadList',
    component: PaperUploadList
  },
  '/wait-confirm': {
    name: 'WaitConfirm',
    component: WaitConfirm
  },
  '/paper-confirm': {
    name: 'PaperConfirm',
    component: PaperConfirm
  },
  '/confirm-list': {
    name: 'ConfirmList',
    component: ConfirmList
  },
  '/play': {
    name: 'play',
    component: Playground
  }
}
console.debug(map)
router.map(map)

router.redirect({
  ...gam_default_index(map),
  '*': '/home'
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

export default router
