import DepartmentStage from 'modules/department-stage/index.vue'

import LogisticsPlanning from 'modules/logistics-planning/index.vue'
import SchoolTeachPlanning from 'modules/school-teach-planning/index.vue'
import MoralPlanning from 'modules/moral-planning/index.vue'

import { parse_access_router } from './parser'

const modules = {
  //后勤组工作计划
  '/logistics-planning': {
    name: 'logisticsPlanning',
    component: LogisticsPlanning
  },
  //教导处工作计划
  '/school-teach-planning': {
    name: 'schoolTeachPlanning',
    component: SchoolTeachPlanning
  },
  //德育处工作计划
  '/moral-planning': {
    name: 'moralPlanning',
    component: MoralPlanning
  }
}

//EXPORT
const router = {
  '/department': {
    name: 'departmentStage',
    component: DepartmentStage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
