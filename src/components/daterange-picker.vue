<template>
  <div class='input-group date'
       :style='{ width: width }'
  >
    <input type='text' class='form-control'
           v-model='display'
           :disabled='disabled'
           :required='required'
           placeholder='{{placeholder}}'
    >
    <span class='input-group-addon'>
      <span class='glyphicon glyphicon-calendar'></span>
    </span>
  </div>
</template>

<script>
  import { date_format } from 'utils/filter'

  export default {
    props: {
      dateBegin: {
        twoWay: true,
        default: ''
      },
      dateEnd: {
        twoWay: true,
        default: ''
      },
      time: {type: Boolean, default: false},
      disabled: {type: Boolean, default: false},
      required: {type: Boolean, default: false},
      // config
      format: {type: String, default: 'YYYY-MM-DD'},
      width: {
        type: [Number, String],
        default: 230,
        coerce: (val) => {
          if (_.isNumber(val)) {
            return val + 'px'
          }
          return val
        }
      },
      placeholder: {type: String, default: '请选择日期范围'}
    },
    ready () {
      this.init()
    },
    computed: {
      display () {
        if (this.dateBegin && this.dateEnd)
          return `${this.dateBegin} 至 ${this.dateEnd}`
        return ''
      }
    },
    methods: {
      init () {
        this.control = $(this.$el)
          .daterangepicker(
            this.getOption(),
            this.on_change.bind(this)
          )
          .on('show.daterangepicker', this.move.bind(this))
          .on('cancel.daterangepicker', this.on_clear.bind(this))
      },
      on_change (begin, end) {
        this.dateBegin = begin.format('L')
        this.dateEnd = end.format('L')
      },
      on_clear () {
        this.dateBegin = ''
        this.dateEnd = ''
      },
      move () {
        let dp = this.control.data('daterangepicker')
        _.assign(dp, this.get_position())
        dp.move()
      },
      getOption () {
        let locale = {
          'format': 'YYYY-MM-DD',
          'separator': ' - ',
          'applyLabel': '确定',
          'cancelLabel': '清空',
          'fromLabel': '',
          'toLabel': '至',
          'customRangeLabel': '自定义',
          'weekLabel': '周',
          'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
          'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        }

        let now = moment()
        let ranges = {
          '今天': [
            date_format(now),
            date_format(now)
          ],
          '本周': [
            date_format(moment(now).startOf('week')),
            date_format(now)
          ],
          '本月': [
            date_format(moment(now).startOf('month')),
            date_format(now)
          ],
          '最近三月': [
            date_format(moment(now).startOf('month').subtract(2, 'month')),
            date_format(now)
          ]
        }

        console.log(_.get(this.value, 'dateBegin', moment().format('YYYY-MM-DD')))

        return {
          startDate: _.get(this.value, 'dateBegin', moment().format('YYYY-MM-DD')),
          endDate: _.get(this.value, 'dateEnd', moment().format('YYYY-MM-DD')),
          timePicker: this.time,
          ranges,
          locale,
          'alwaysShowCalendars': true,
          ...this.get_position()
        }
      },
      get_position () {
        let position = {
          'opens': 'left',
          'drops': 'down'
        }

        let drop_size = { w: 620, h: 340 }
        let { top, left } = $(this.$el).offset()
        if (left < drop_size.w) {
          position.opens = 'right'
        }
        if ($(window).height() - (top - $(window).scrollTop()) < drop_size.h) {
          position.drops = 'up'
        }

        return position
      }
    }
  }
</script>
