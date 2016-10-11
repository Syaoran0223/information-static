import TeacherStage from 'modules/teacher-stage/index.vue'
import ClassStudentStage from 'modules/class-students/stage.vue'
import GuardiansStage from 'modules/guardian/stage.vue'
import AttendanceStage from 'modules/class-students/attendance/stage.vue'
import ClassJobStage from 'modules/class-students/class-job/stage.vue'

import ClassStudentsBase from 'modules/class-students/base-list/index.vue'
import ClassPositions from 'modules/class-students/position-list/index.vue'
import ClassSubjectHeads from 'modules/class-students/subject-head-list/index.vue'
import ClassSpecsList from 'modules/class-students/spec-list/index.vue'
import ClassSpecStudent from 'modules/class-students/spce-detail/index.vue'
import ClassStudentAwards from 'modules/class-students/award/index.vue'
import ClassActivity from 'modules/class-students/activity/index.vue'
import ClassDeputies from 'modules/class-students/class-deputies/index.vue'
import ClassWeekRecord from 'modules/class-students/class-job/class-week-record/index.vue'
import ClassInfo from 'modules/class-students/class-job/class-info/index.vue'
import ClassExcellentList from 'modules/class-students/excellent-list/index.vue'
import ClassExcellent from 'modules/class-students/excellent-detail/index.vue'
import ClassDuty from 'modules/class-students/class-job/class-duty/index.vue'
import HeadTeacherMeeting from 'modules/class-students/class-job/head-teacher-meeting/index.vue'

import ClassMeeting from 'modules/class-students/class-job/class-meeting/index.vue'
import ClassPlan from 'modules/class-students/class-job/class-plan/index.vue'
import ClassSummary from 'modules/class-students/class-job/class-summary/index.vue'
import ClassPlanAdmin from 'modules/class-students/class-job/class-plan-admin/index.vue'


import DailyAttendance from 'modules/class-students/attendance/daily-attendance/index.vue'
import MorningAttendance from 'modules/class-students/attendance/morning-attendance/index.vue'
import SickCheck from 'modules/class-students/attendance/sick-check/index.vue'

import GuardianDeputies from 'modules/guardian/deputies/index.vue'
import GuardianMeetings from 'modules/guardian/meetings/index.vue'
import GuardianContacts from 'modules/guardian/contacts/index.vue'
import GuardianVisit from 'modules/guardian/guardian-visit/index.vue'


import TeachingSchedule from 'modules/teaching-schedule/index.vue'
import AskLeave from 'modules/ask-leave/index.vue'

import { parse_access_router } from './parser'

const modules = {
  '/class_students': {
    //学生管理
    name: 'classStudents',
    component: ClassStudentStage,
    subRoutes: {
      '/class_students_base': {
        name: 'classStudentsBase',
        component: ClassStudentsBase
      },
      '/positions': {
        name: 'classPositions',
        component: ClassPositions
      },
      '/subject_head': {
        name: 'classSubjectHeads',
        component: ClassSubjectHeads
      },
      '/specs': {
        name: 'classSpecsList',
        component: ClassSpecsList
      },
      '/specs/:studentId': {
        name: 'classSpecStudent',
        component: ClassSpecStudent
      },
      '/excellent': {
        name: 'classExcellentList',
        component: ClassExcellentList
      },
      '/excellent/:studentId': {
        name: 'classExcellentDetail',
        component: ClassExcellent
      },
      '/awards': {
        name: 'classStudentAwards',
        component: ClassStudentAwards
      },
      '/class_activity': {
        name: 'classActivity',
        component: ClassActivity
      },
      '/class_deputies': {
        name: 'classDeputies',
        component: ClassDeputies
      },

      '/awards_admin': {
        name: 'classStudentAwardsAdmin',
        component: ClassStudentAwards
      },
    }
  },
  '/class_job': {
    //班级工作
    name: 'classJob',
    component: ClassJobStage,
    subRoutes: {
      '/class_info': {
        name: 'classInfo',
        component: ClassInfo
      },
      '/class_plan': {
        name: "classPlan",
        component: ClassPlan
      },
      '/class_meeting': {
        name: "classMeeting",
        component: ClassMeeting
      },
      '/class_summary': {
        name: "classSummary",
        component: ClassSummary
      },

      '/class_plan_admin': {
        name: 'classPlanAdmin',
        component: ClassPlanAdmin
      },
      '/class_week_record': {
        name: 'classWeekRecord',
        component: ClassWeekRecord
      },
      'class_duty': {
        name: 'classDuty',
        component: ClassDuty
      },
      'head_teacher_meeting': {
        name: 'headTeacherMeeting',
        component: HeadTeacherMeeting
      }
    }
  },
  '/guardians': {
    name: 'guardians',
    component: GuardiansStage,
    subRoutes: {
      '/guardian_deputies': {
        name: 'guardianDeputies',
        component: GuardianDeputies
      },
      '/guardian_meetings': {
        name: 'guardianMeetings',
        component: GuardianMeetings
      },
      '/guardian_contacts': {
        name: 'guardianContacts',
        component: GuardianContacts
      },
      'guardian_visit': {
        name: 'guardianVisit',
        component: GuardianVisit
      }
    }
  },
  '/attendance': {
    //考勤管理
    name: 'attendance',
    component: AttendanceStage,
    subRoutes: {
      '/daily_attendance': {
        name: 'dailyAttendance',
        component: DailyAttendance
      },
      '/morning_attendance': {
        name: 'morningAttendance',
        component: MorningAttendance
      },
      '/absenteeism': {
        name: 'sickCheck',
        component: SickCheck
      },
      '/daily_attendance_admin': {
        name: 'dailyAttendanceAdmin',
        component: DailyAttendance
      },
      '/morning_attendance_admin': {
        name: 'morningAttendanceAdmin',
        component: MorningAttendance
      },
      '/absenteeism_admin': {
        name: 'sickCheckAdmin',
        component: SickCheck
      }
    }
  },
  //课程表
  '/teach_schedule': {
    name: 'teachingSchedule',
    component: TeachingSchedule
  },
  //请假审批
  '/ask_leave': {
    name: 'askLeave',
    component: AskLeave
  },
}

//EXPORT
const router = {
  '/teacher_stage': {
    name: 'teacherStage',
    component: TeacherStage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
