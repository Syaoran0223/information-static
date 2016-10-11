import UserManage from 'modules/user-manage/index.vue'
import TeacherManage from 'modules/user-manage/teacher-manage/index.vue'
import StudentManage from 'modules/user-manage/student-manage/index.vue'
import ClassManage from 'modules/user-manage/class-manage/index.vue'
import TermManage from 'modules/user-manage/term-manage/index.vue'
import GuardianManage from 'modules/user-manage/guardian-manage/index.vue'
import Permissions from 'modules/user-manage/permissions/index.vue'
import Roles from 'modules/user-manage/roles/index.vue'

import { parse_access_router } from './parser'

const modules = {
  '/teacher_manage': {
    name: 'teacherManage',
    component: TeacherManage
  },
  '/student_manage': {
    name: 'studentManage',
    component: StudentManage
  },
  '/class_manage': {
    name: 'classManage',
    component: ClassManage
  },
  '/term_manage': {
    name: 'termManage',
    component: TermManage
  },
  '/guardian_manage': {
    name: 'guardianManage',
    component: GuardianManage
  },
  '/permissions': {
    name: 'permissions',
    component: Permissions
  },
  '/roles': {
    name: 'roles',
    component: Roles
  }
}

//EXPORT
const router = {
  '/user_manage': {
    name: 'userManage',
    component: UserManage,
    subRoutes: parse_access_router(modules)
  }
}

export default router
