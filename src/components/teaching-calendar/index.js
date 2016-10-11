export default function () {
  return {
    props: {
      events: {
        default: []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        viewport: 'month',
        day_arr: [],

        year: 0,
        month: 0,
        date: 0,

        weeks: moment.weekdaysMin(),
        months_str: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      }
    },
    computed: {
      calendar_title () {
        return this._get_curr_moment().format('YYYY年MM月')
      }
    },
    ready () {
      this.year = moment().year()
      this.month = moment().month()
      this.date = moment().date()
      this._render()
      this.request_events()
    },
    watch: {
      year () {
        this._render()
        this.request_events()
      },
      month () {
        this._render()
        this.request_events()
      },
      date () {
        this._render()
        this.request_events()
      },
      viewport () {
        this._render()
        this.request_events()
      },
      events () {
        console.log('events change')
        this._render()
      }
    },
    methods: {
      _render () {
        let m = moment({
          year: this.year,
          month: this.month,
          date: this.date
        })
        let first_day_of_month = moment(m).startOf('month').day()
        let last_date_of_month = moment(m).endOf('month').date()
        let last_date_of_last_month = moment(m).subtract(1, 'month').endOf('month').date()
        let temp = []
        let result = []
        //row1
        if (first_day_of_month) {
          temp = _.map(_.range(first_day_of_month, 0), (n) => {
            return moment(m).subtract(1, 'month').endOf('month').subtract(n - 1, 'days')
          })
          result = temp
        }

        temp = _.map(_.range(last_date_of_month), (n) => {
          return moment(m).set('date', n + 1)
        })
        result = [...result, ...temp]

        //row6
        temp = _.map(_.range(42 - result.length), (n) => {
          return moment(m).add(1, 'month').startOf('month').add(n, 'days')
        })
        result = [...result, ...temp]

        this.day_arr = _.chunk(this._parse_day_arr(result), 7)
      },
      _parse_day_arr (day_arr) {
        return day_arr.map((m) => {
          let date = m.date()
          let day = m.day()
          let m_format = m.format('YYYY-MM-DD')
          return {
            m_format,
            date,
            day,
            today: this._check_today(m),
            is_weekend: this._check_weekend(m),
            highlight: this._check_highlight(m),
            is_first_date: this._check_first_date(m),

            events: this._match_date_events(m)
          }
        })
      },
      _check_today(m) {
        return moment().format('YYYY-MM-DD') == m.format('YYYY-MM-DD')
      },
      _check_weekend(m) {
        return m.day() == 0 || m.day() == 6
      },
      _check_highlight(m) {
        let is_weekend = this._check_weekend(m)
        let is_this_month = m.month() == this.month

        if (is_weekend) return false
        return is_this_month
      },
      _check_first_date(m) {
        if (m.date() == 1) {
          return this.months_str[m.month()]
        }
      },
      _match_date_events (m) {
        return _.filter(this.events, (e) => {
          return m.format('YYYY-MM-DD') === e.m_format
        })
      },

      _get_curr_moment() {
        return moment({
          year: this.year,
          month: this.month,
          date: this.date
        })
      },
      _get_full_date_range() {
        return {
          begin: _.chain(this.day_arr).first().first().get('m_format').value(),
          end: _.chain(this.day_arr).last().last().get('m_format').value()
        }
      },

      request_events () {
        if (this.loading) return
        this.loading = true
      },

      on_cell_click (d) {

      },

      go_prev () {
        if (this.loading) return
        let curr = this._get_curr_moment()
        curr.subtract(1, 'month')
        this.year = curr.year()
        this.month = curr.month()
        this.date = curr.date()
      },
      go_today () {
        if (this.loading) return
        let now = moment()
        this.year = now.year()
        this.month = now.month()
        this.date = now.date()
      },
      go_next () {
        if (this.loading) return
        let curr = this._get_curr_moment()
        curr.add(1, 'month')
        this.year = curr.year()
        this.month = curr.month()
        this.date = curr.date()
      },
      set_vp (v) {
        this.viewport = v
      }
    }
  }
}
