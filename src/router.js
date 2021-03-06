import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { parse_access_router, gam_default_index } from 'routers/parser'

import Playground from 'modules/playground.vue'
import Home from 'modules/home/index.vue'

import PaperUpload from 'modules/paper-upload/index.vue'
import PaperUploadList from 'modules/paper-upload-list/index.vue'
import PaperIsFast from 'modules/paper-is-fast/index.vue'
import PaperIntoFast from 'modules/paper-into-fast/index.vue'

import WaitConfirm from 'modules/wait-confirm/index.vue'
import PaperConfirm from 'modules/paper-confirm/index.vue'
import ConfirmList from 'modules/confirm-list/index.vue'

import WaitDeal from 'modules/wait-deal/index.vue'
import PaperDeal from 'modules/paper-deal/index.vue'
import DealList from 'modules/deal-list/index.vue'

import WaitInput from 'modules/wait-input/index.vue'
import InputList from 'modules/input-list/index.vue'
import PaperInput from 'modules/paper-input/index.vue'

import WaitAnswer from 'modules/wait-answer/index.vue'
import PaperAnswer from 'modules/paper-answer/index.vue'
import AnswerList from 'modules/answer-list/index.vue'

import WaitCheck from 'modules/wait-check/index.vue'
import QuestCheck from 'modules/quest-check/index.vue'
import CheckList from 'modules/check-list/index.vue'

import WaitJudge from 'modules/wait-judge/index.vue'
import QuestJudge from 'modules/quest-judge/index.vue'
import JudgeList from 'modules/judge-list/index.vue'

import WaitVerify from 'modules/wait-verify/index.vue'
import QuestVerify from 'modules/quest-verify/index.vue'
import VerifyList from 'modules/verify-list/index.vue'

import UserManage from 'modules/user-manage/index.vue'
import UserInfo from 'modules/user-manage/user-info/index.vue'
import UserWork from 'modules/user-manage/user-work/index.vue'
import MessageList from 'modules/user-manage/message-list/index.vue'
import ScoreList from 'modules/user-manage/score-list/index.vue'
import PaperCheck from 'modules/paper-check/index.vue'

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
  '/paper-into-fast': {
    name: 'PaperIntoFast',
    component: PaperIntoFast
  },
  '/paper-is-fast': {
    name: 'PaperIsFast',
    component: PaperIsFast
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
  'wait-answer': {
    name: 'WaitAnswer',
    component: WaitAnswer
  },
  'paper-check': {
    name: 'PaperCheck',
    component: PaperCheck
  },
  'paper-answer/:quest_id': {
    name: 'PaperAnswer',
    component: PaperAnswer
  },
  'answer-list': {
    name: 'AnswerList',
    component: AnswerList
  },
  'wait-check': {
    name: 'WaitCheck',
    component: WaitCheck
  },
  'quest-check/:quest_id': {
    name: 'QuestCheck',
    component: QuestCheck
  },
  'check-list': {
    name: 'CheckList',
    component: CheckList
  },
  'wait-judge': {
    name: 'WaitJudge',
    component: WaitJudge
  },
  'quest-judge/:quest_id': {
    name: 'QuestJudge',
    component: QuestJudge
  },
  'judge-list': {
    name: 'JudgeList',
    component: JudgeList
  },
  'wait-verify': {
    name: 'WaitVerify',
    component: WaitVerify
  },
  'quest-verify/:quest_id': {
    name: 'QuestVerify',
    component: QuestVerify
  },
  'verify-list': {
    name: 'VerifyList',
    component: VerifyList
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
      '/user_work': {
        name: 'UserWork',
        component: UserWork
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
