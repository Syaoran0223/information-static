import TeachingStage from 'modules/teaching-stage/index.vue'

import ScheduleChange from 'modules/schedule-change/index.vue'
import ScheduleChangeReview from 'modules/schedule-change-review/index.vue'
import WorkdaySetting from 'modules/workday-setting/index.vue'
import ClassAward from 'modules/class-award/index.vue'
import MorningStatistic from 'modules/morning-statistic/index.vue'

import { parse_access_router } from './parser'

const modules = {
  //调课
  '/schedule-change': {
    name: 'scheduleChange',
    component: ScheduleChange
  },
  //调课审批
  '/schedule-change-review': {
    name: 'scheduleReview',
    component: ScheduleChangeReview
  },
  //晨检报表
  '/morning-statistic': {
    name: 'morningStatistic',
    component: MorningStatistic
  },
  //班级奖惩
  '/class-award': {
    name: 'classAward',
    component: ClassAward
  },
  //节假日
  '/workday-setting': {
    name: 'workdaySetting',
    component: WorkdaySetting
  }
}

//EXPORT
const router = {
  '/teaching': {
    name: 'teachingStage',
    component: TeachingStage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
