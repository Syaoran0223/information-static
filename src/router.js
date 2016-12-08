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

import WaitDeal from 'modules/wait-deal/index.vue'
import PaperDeal from 'modules/paper-deal/index.vue'
import DealList from 'modules/deal-list/index.vue'

import WaitInput from 'modules/wait-input/index.vue'
import InputList from 'modules/input-list/index.vue'
import PaperInput from 'modules/paper-input/index.vue'

import UserManage from 'modules/user-manage/index.vue'
import UserInfo from 'modules/user-manage/user-info/index.vue'
import MessageList from 'modules/user-manage/message-list/index.vue'
import ScoreList from 'modules/user-manage/score-list/index.vue'

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
  '/paper-confirm/:paper_id': {
    name: 'PaperConfirm',
    component: PaperConfirm
  },
  '/confirm-list': {
    name: 'ConfirmList',
    component: ConfirmList
  },
  'wait-deal': {
    name: 'WaitDeal',
    component:WaitDeal
  },
  'paper-deal/:paper_id': {
    name: 'PaperDeal',
    component: PaperDeal
  },
  'deal-list': {
    name: 'DealList',
    component: DealList
  },
  'wait-input': {
    name: 'WaitInput',
    component: WaitInput
  },
  'input-list': {
    name: 'InputList',
    component: InputList
  },
  'paper-input/:quest_id': {
    name: 'PaperInput',
    component: PaperInput
  },

  '/play': {
    name: 'play',
    component: Playground
  },
  '/user-manage': {
    name: 'UserManage',
    component: UserManage,
    subRoutes: {
      '/user_info': {
        name: 'UserInfo',
        component: UserInfo
      },
      '/score_list': {
        name: 'ScoreList',
        component: ScoreList
      },
      '/message_list': {
        name: 'MessageList',
        component: MessageList
      }
    }
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
