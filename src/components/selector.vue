<template>
  <select :style="{ width: width }"
          :disabled="disabled"
          :required="required"
          :multiple="multiple"
          data-uuid="{{uuid}}"
    >

    <template v-if="items">
      <option v-for="item in items" value="{{item.id}}">{{item.text}}</option>
    </template>

  </select>
</template>

<script type="text/babel">
  import { api_host } from 'config'
  import * as ConstTypes from 'utils/consts'

  export default {
    props: {
      initItems: {
        default: null
      },
      value: {
        twoWay: true,
        default: null
      },
      remote: {
        type: String
      },
      remoteParams: {
        type: Object
      },
      const: {
        type: String
      },
      remoteLabel: {
        type: [String, Function],
        default: 'title'
      },
      valuePick: {
        type: String,
        default: 'id'
      },
      selectDefault: {
        default: false
      },

      // style
      width: {
        type: [Number, String],
        default: 150,
        coerce: (val) => {
          if (_.isNumber(val)) {
            return val + 'px'
          }
          return val
        }
      },
      placeholder: {type: String, default: '请选择'},
      disabled: {type: Boolean, default: false},
      required: {type: Boolean, default: false},

      multiple: {type: Boolean, default: false},
      taggable: {type: Boolean, default: false},
      maxSelection: {type: Number, default: 0}
    },
    ready () {
      this.uuid = _.uniqueId('s_')

      if (this.const) {
        this.remote = null

        let src = ConstTypes[this.const]
        if (_.isArray(src)) {
          this.items = _.cloneDeep(src)
        } else {
          this.items = _.chain(ConstTypes[this.const])
            .keys()
            .map((key) => {
              return {id: key, text: ConstTypes[this.const][key]}
            })
            .value()
        }

        if (this.selectDefault) this.set_default_select()
      }

      if (this.taggable) {
        this.valuePick = null
      }

      if (this.initItems) {
        this.items = _.cloneDeep(this.initItems)
      }

      Vue.nextTick(this.init_control.bind(this))
    },
    data () {
      return {
        uuid: null,
        items: null,
        changing: false
      }
    },
    watch: {
      'value': function(val) {
        console.debug('watch: selector value', this.uuid, val)
        if(!this.changing) {
          this.init_remote_default_values()
          Vue.nextTick(() => { this.set_control_val(val) })
        }
      },
      'initItems': function (items) {
        this.items = _.cloneDeep(items)
        this.init_control()
      }
    },
    methods: {
      init_control () {
        this.changing = false

        if(this.control) {
          this.control.select2('destroy').off('change.selector')
        }

        this.init_remote_default_values()

        this.control = $(this.$el).select2(this.get_options())
        this.control.on('change.selector', this.on_change.bind(this))
        this.set_control_val(this.value)
      },
      init_remote_default_values() {
        if (!this.remote) return
        if (!this.value) return
        $(this.$el).empty()
        let options
        if (this.multiple) {
          options = _.map(this.value, v => {
            if (!v.text) return
            return $(`<option value="${v.id}">${v.text}</option>`)
          })
        } else {
          options = `<option value="${this.value.id}">${this.value.text}</option>`
        }
        $(this.$el).append(options)
      },
      set_control_val(new_val) {
        let val = new_val
        if (_.isArray(this.value)) {
          val = _.map(this.value, v => _.get(v, 'id', v))
        } else {
          val = _.get(this.value, 'id', this.value)
        }
//        console.debug('set_control_val', val)
        this.control.val(val).trigger('change')
      },
      on_change () {

        /**
         * changing 状态锁
         * 防止在 change 事件中设置新值时, 触发 watch 事件
         */

        if(!this.changing) {
          this.changing = true

          var selected = this.control.select2('data')
          console.debug('selector change', this.uuid, selected)

          _.forEach(selected, item => {
            item.text = _.trim(item.text)
          })

          let val = null

          if (this.multiple) {
            val = _.map(selected, item => {
              let data = _.pick(item, 'id', 'text', '_is_new', 'item')
              if (this.valuePick) {
                data = _.get(data, this.valuePick)
              }
              return data
            })
          } else {
            val = _.pick(selected[0], 'id', 'text', '_is_new', 'item')
            if (this.valuePick) {
              val = _.get(val, this.valuePick)
            }
          }

          this.value = val
          this.$emit('change', val)

          this.$nextTick(() => {this.changing = false})
        }
      },
      get_options () {
        var options = {
          placeholder: this.placeholder,
          tags: this.taggable,
          maximumSelectionLength: this.maxSelection,
          minimumResultsForSearch: 10,
          theme: 'bootstrap'
        }

        if (this.taggable) {
          options.createTag = (params) => {
            let term = _.trim(params.term)
            if (term === '') return null
            return {
              id: term,
              text: term,
              _is_new: true
            }
          }
        }

        if (this.remote) {
          _.assign(options, {
            ajax: {
              url: this.get_remote_api(this.remote),
              dataType: 'json',
              data: (params) => {
                return {
                  ...this.remoteParams,
                  title: params.term
                }
              },
              processResults: ({ data }) => {
                return {results: _.map(data, item => {
                  let text
                  if (_.isFunction(this.remoteLabel)) {
                    text = this.remoteLabel(item)
                  } else {
                    text = _.get(item, this.remoteLabel)
                  }
                  return {
                    item,
                    id: item.id,
                    text
                  }
                })}
              },
              delay: 200
            }
          })
        }

        return options
      },
      get_remote_api (name) {
        return `${ api_host }/${ name }`
      },
      set_default_select () {
        let val =  _.first(this.items)
        if (this.valuePick) {
          val = _.get(val, this.valuePick)
        }
        Vue.nextTick(() => {
          this.value = val
        })
      }
    }
  }
</script>
