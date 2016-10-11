import ResearchStage from 'modules/research-stage/index.vue'
import TeachPlanning from 'modules/teach-planning/index.vue'
import TeachPlanningManage from 'modules/teach-planning-manage/index.vue'
import TeachProgressPlanning from 'modules/teach-progress-planning/index.vue'
import TeachProgressPlanningManage from 'modules/teach-progress-planning-manage/index.vue'
import ResearchPlanning from 'modules/research-planning/index.vue'
import TeachingScheduleSetting from 'modules/teaching-schedule-setting/index.vue'

import { parse_access_router } from './parser'

const modules = {
  //教学计划
  '/teach_planning': {
    name: 'teachPlanning',
    component: TeachPlanning
  },
  //教学总结
  '/teach_progress_planning': {
    name: 'teachProgressPlanning',
    component: TeachProgressPlanning
  },
  //教研组工作计划
  '/research-planning': {
    name: 'researchPlanning',
    component: ResearchPlanning
  },
  //课程表
  '/teach_schedule_setting': {
    name: 'teachingScheduleSetting',
    component: TeachingScheduleSetting
  },
  // 教学计划管理
  '/teach_planning_manage': {
    name: 'teachPlanningManage',
    component: TeachPlanningManage
  },
  //教学进度表管理
  '/teach_progress_planning_manage': {
    name: 'teachProgressPlanningManage',
    component: TeachProgressPlanningManage
  },
}

//EXPORT
const router = {
  '/research': {
    name: 'researchStage',
    component: ResearchStage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
