import SchoolStage from 'modules/school-stage/index.vue'
import Repairs from 'modules/repairs/index.vue'
import Shopping from 'modules/shopping/index.vue'
import AskCar from 'modules/ask-car/index.vue'
import AskClassroom from 'modules/ask-classroom/index.vue'
import AskClassroomQuery from 'modules/ask-classroom-query/index.vue'
import InspectionPlanning from 'modules/inspection-planning/index.vue'
import Inspection from 'modules/inspection/index.vue'
import InspectionReport from 'modules/inspection-report/index.vue'
import Places from 'modules/places/index.vue'
import WorkdaySetting from 'modules/workday-setting/index.vue'
import LogisticsPlanning from 'modules/logistics-planning/index.vue'
import SchoolTeachPlanning from 'modules/school-teach-planning/index.vue'
import MoralPlanning from 'modules/moral-planning/index.vue'

import { parse_access_router } from './parser'

const modules = {
  //保修
  '/repairs': {
    name: 'repairs',
    component: Repairs
  },
  '/repairs_review': {
    name: 'repairsReview',
    component: Repairs
  },
  //申购
  '/shopping': {
    name: 'shopping',
    component: Shopping
  },
  '/shopping_review': {
    name: 'shoppingReview',
    component: Shopping
  },
  //教师预定
  '/ask_classroom': {
    name: 'askClassroom',
    component: AskClassroom
  },
  '/ask_classroom/query': {
    name: 'askClassroomQuery',
    component: AskClassroomQuery
  },
  //车辆
  '/ask_car': {
    name: 'askCar',
    component: AskCar
  },
  '/ask_car_review': {
    name: 'askCarReview',
    component: AskCar
  },
  //巡课
  '/inspection_planning': {
    name: 'inspectionPlanning',
    component: InspectionPlanning
  },
  //巡课记录
  'inspection': {
    name: 'inspection',
    component: Inspection
  },
  //巡课报告
  'inspection-report': {
    name: 'inspectionReport',
    component: InspectionReport
  },
  '/places': {
    name: 'places',
    component: Places
  }
}

//EXPORT
const router = {
  '/school': {
    name: 'schoolStage',
    component: SchoolStage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
