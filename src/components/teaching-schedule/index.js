export default function () {
  return {
    props: {
      schedules: {
        type: Array
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        items: [],
        week_days: moment.weekdaysMin()
      }
    },
    watch: {
      schedules () {
        this.render()
      }
    },
    ready () {
      this.render()
    },
    methods: {
      render () {
        this.items = this.parse(this.schedules)
      },
      parse(schedule_data=[]) {
        let week_start = moment(this.date).startOf('week')
        let first_day = moment.localeData().firstDayOfWeek()
        let week_data = _.map(_.range(first_day, first_day + 5), (day) => {
          return {
            day,
            title: this.week_days[day],
            m_format: moment(week_start).add(day-1, 'd').format('YYYY-MM-DD'),
            data: this.gem_day_cell(day, schedule_data)
          }
        })

        return week_data
      },
      gem_day_cell(day, schedule_data) {
        let days = []
        days = _.concat(days, _.map(_.range(1, 4), (quarter) => {
          return {
            section: 'MORNING',
            quarter,
            scheduleData: this.get_match_schedule({
              items: schedule_data,
              day,
              section: 'MORNING',
              quarter
            })
          }
        }))
        days = _.concat(days, _.map(_.range(1, 4), (quarter) => {
          return {
            section: 'AFTERNOON',
            quarter,
            scheduleData: this.get_match_schedule({
              items: schedule_data,
              day,
              section: 'AFTERNOON',
              quarter
            })
          }
        }))
        console.debug('match schedule_data', _.filter(days, 'scheduleData'))
        return days
      },
      get_match_schedule ({ items, day, section, quarter }) {
        return _.find(items, (item) => {
          return item.weekDay == day
            && item.section == section
            && item.quarter == quarter
        })
      }
    }
  }
}
