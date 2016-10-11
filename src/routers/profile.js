import ProfileStage from 'modules/profile/stage.vue'
import Account from 'modules/profile/account/index.vue'
import Archive from 'modules/profile/archive/index.vue'

const modules = {
  '/account': {
    name: 'account',
    component: Account
  },
  '/archive': {
    name: 'archive',
    component: Archive
  }
}

//EXPORT
const router = {
  '/profile': {
    name: 'profileStage',
    component: ProfileStage,
    subRoutes: modules
  }
}

export default router
