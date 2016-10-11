import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { parse_access_router, gam_default_index } from 'routers/parser'

import Playground from 'modules/playground.vue'
import Home from 'modules/home/index.vue'

const router = new VueRouter({
  linkActiveClass: 'active'
})

let map = {
  '/home': {
    name: 'home',
    component: Home
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
