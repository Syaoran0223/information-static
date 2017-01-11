import { class_selector_items } from 'config'

export const subject = {
  'GS001': '语文',
  'GS002': '数学',
  'GS003': '英语',
  'GS004': '科学',
  'GS005': '体育',
  'GS006': '音乐',
  'GS007': '美术',
  'GS008': '校本课',
  'GS017': '思品',
  'GS009': '品德与生活',
  'GS010': '品德与社会',
  'GS011': '综合实践',
  'GS012': '写字',
  'GS013': '信息',
  'GS014': '少先队活动课',
  'GS015': '心理',
  'GS016': '其他'
}

export const gender = {
  'MALE': '男',
  'FEMALE': '女'
}

export const position_type = {
  DEPUTY: '班委会',
  PIONEER: '少先队'
}

export const award_type = {
  AWARD: '奖励',
  PUNISH: '惩罚'
}

export const teacher_type = {
  'TEACHER': '教师',
  'WORKER': '教工',
  'DRIVER': '司机'
}

export const status = {
  'ENABLED': '正常',
  'DISABLED': '禁用'
}

export const spec_type = {
  1: '单亲',
  2: '离异',
  3: '留守',
  4: '行为偏差',
  5: '学困生',
  6: '心理问题',
  7: '疾病',
  8: '其他'
}

export const grade = {
  '1': '一年级',
  '2': '二年级',
  '3': '三年级',
  '4': '四年级',
  '5': '五年级',
  '6': '六年级',
  '7': '初一',
  '8': '初二',
  '9': '初三',
  '10': '高一',
  '11': '高二',
  '12': '高三'
}

//TODO use section
export const term = {
  'LAST': '上学期',
  'NEXT': '下学期'
}

export const repair_status = {
  DEFAULT: '未解决',
  SOLVED: '已解决',
  PROCESSING: '处理中',
  CANCELED: "已取消"
}

export const shopping_status = {
  DEFAULT: '待审核',
  REJECT: '不同意',
  ACCEPT: '同意',
  CANCELED: "已取消"
}

export const repair_type = {
  MEDIA: '电教设备',
  OTHER: '其它'
}

export const guardian_deputy_type = {
  '主任': '主任',
  '成员': '成员'
}

export const checkList = [
  { name: "脸", part: "FACE", level: "GOOD"},
  { name: "手", part: "HAND", level: "GOOD"},
  { name: "头发", part: "HAIR", level: "GOOD"},
  { name: "衣服", part: "CLOTH", level: "GOOD"}
]

export const place_type = {
  CLASS: '教室',
  OTHER: '其他'
}

export const section = {
  FIRST_HALF: "上学期",
  SECOND_HALF: "下学期"
}

export const commons_review_status = {
  DEFAULT: "待审核",
  CANCELED: "已取消",
  ACCEPTED: "通过",
  REJECTED: "不通过"
}

export const roll_call_type = {
  LATE: '迟到',
  ABSENCE: '缺席'
}

export const section_type = {
  MORNING: '上午',
  AFTERNOON: '下午'
}

export const quarter_name = {
  1: '第一节',
  2: '第二节',
  3: '第三节',
  4: '第四节'
}

export const class_reserve_status = {
  DEFAULT: "已申请",
  CANCELED: "已取消"
}

export const attendance_type = [
  {title: '迟到', id: 'LATE', type: 'rollcall'},
  {title: '缺勤', id: 'ABSENCE', type: 'rollcall'},
  {title: '病假', id: 'SICK', type:'askleave'},
  {title: '事假', id: 'PERSONAL', type: 'askleave'}
]

export const ask_leave_type = {
  SICK: '病假',
  PERSONAL: '事假'
}

export const class_time = {
  'MORNING-1': '上午 第1节',
  'MORNING-2': '上午 第2节',
  'MORNING-3': '上午 第3节',
  'MORNING-4': '上午 第4节',
  'AFTERNOON-1': '下午 第1节',
  'AFTERNOON-2': '下午 第2节',
  'AFTERNOON-3': '下午 第3节',
  'AFTERNOON-4': '下午 第4节',
}

export const inspection_poosition_type = {
  'CLASS': "班级",
  'PLACE': "位置"
}

export const permission_type = {
  'API':'接口',
  'MOD':'模块',
  'MENU':'菜单',
  'RESOURCE':'资源',
  'GROUP':'组'
}
export const permission_status = {
  'ENABLED':'启用',
  'DISABLED':'禁用',
  'ALLOW_ALL':'允许所有用户',
  'ALLOW_LOGIN':'允许登录用户'
}

export const todo_type = {
  PAPER_UPLOAD: '试卷上传',
  PAPER_CONFIRM: '试卷审核',
  PAPER_DEAL: '试卷预处理',
  QUESTION_IN: '录题',
  QUESTION_ANSWER: '作答'
}

export const todo_type_route_map = {
  PAPER_UPLOAD: '',
  PAPER_CONFIRM: '',
  PAPER_DEAL: '',
  QUESTION_IN: '',
  QUESTION_ANSWER: ''
}

//==Profiles
export const cert_type = {
  'IDENTITY': '身份证',
  'PASSPORT': '护照',
  'OFFICIAL': '军官证',
  'OTHER': '其他'
}

export const marry_type = {
  MARRIED: '已婚',
  UNMARRIED: '未婚',
  DIVORCE: '离婚'
}

export const schooling_type = {
  MIDDLE: '初中',
  HIGH: '高中',
  MIDDLE_MAJOR: '中专',
  MIDDLE_TEACH: '中师',
  HIGH_MAJOR: '大专',
  BACHELOR: '本科',
  MASTER: '研究生',
  DOCTOR: '博士'
}

export const class_items = class_selector_items

export const school_years = {
  '2010': '2010-2011学年',
  '2011': '2011-2012学年',
  '2012': '2012-2013学年',
  '2013': '2013-2014学年',
  '2014': '2014-2015学年',
  '2015': '2015-2016学年',
  '2016': '2016-2017学年',
  '2017': '2017-2018学年',
  '2018': '2018-2019学年',
  '2019': '2019-2020学年',
  '2020': '2020-2021学年',
  '2021': '2021-2022学年',
  '2022': '2022-2023学年',
  '2023': '2023-2024学年',
  '2024': '2024-2025学年',
  '2025': '2025-2026学年'
}

export const formation = {
  CAUSE_OF_PEOPLE: '全民事业',
  EXTERNAL_TEACHER: '外聘教师'
}

export const academic_level = {
  '三级': '三级',
  '二级': '二级',
  '一级': '一级',
  '高级': '高级'
}

export const pt_level = {
  AREA: '区',
  CITY: '市',
  PROV: '省',
  NATION: '国家'
}

export const manage_status = {
  '1': '已提交',
  '0': '未提交'
}

export const weeks = {
  '1': '第 1 周',
  '2': '第 2 周',
  '3': '第 3 周',
  '4': '第 4 周',
  '5': '第 5 周',
  '6': '第 6 周',
  '7': '第 7 周',
  '8': '第 8 周',
  '9': '第 9 周',
  '10': '第 10 周',
  '11': '第 11 周',
  '12': '第 12 周',
  '13': '第 13 周',
  '14': '第 14 周',
  '15': '第 15 周',
  '16': '第 16 周',
  '17': '第 17 周',
  '18': '第 18 周',
  '19': '第 19 周',
  '20': '第 20 周',
  '21': '第 21 周',
  '22': '第 22 周',
  '23': '第 23 周',
  '24': '第 24 周',
  '25': '第 25 周'
}

export const excellent_type = {
  AREA_GG: '区骨干',
  CITY_GG: '市骨干',
  PROVINCE_GG: '省骨干',
  AREA_MS: '区名师',
  CITY_LEADER: '市学科带头人',
  PROVINCE_LEADER: '省学科带头人'
}

export const paper_type = {
  PAPER_UNIT: '单元考',
  PAPER_MIDLE_TERM: '半期考',
  PAPER_LAST: '期末考',
  PAPER_QULITY: '质检',
  PAPER_MODEL: '模拟考',
  PAPER_MIDLE: '中考',
  PAPER_HIGH: '高考'
}

export const paper_state = {
  '-99': '已删除',
  '-1': '审核不通过',
  '-2': '审核超时',
  '0': '待审核',
  '1': '正在审核',
  '2': '已采纳',
  '5': '审核通过',
  '3': '正在处理',
  '4': '预处理完成'
}

export const question_state = {
  '-99': '已删除',
  '0': '未处理',
  '1': '正在录题',
  '2': '审核不通过',
  '3': '完成录题',
  '4': '正在解答',
  '5': '完成解答',
  '6': '正在检查',
  '7': '待裁定',
  '8': '正在裁定',
  '9': '待校对',
  '10': '正在校对',
  '99': '结束录题'
}

export const has_sub = {
  '0' : '非大小题',
  '1' : '大小题'
}

export const quest_types = {
  '1': '选择题',
  '2': '填空题',
  '3': '解答题',
  '4': '大小题'
}

export const sub_quest_types = {
  '1': '选择题',
  '2': '填空题',
  '3': '解答题'
}

export const show_types = {
  'A': '一行显示',
  'B': '两行显示',
  'C': '多行显示'
}