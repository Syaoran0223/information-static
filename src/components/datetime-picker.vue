<template>
    <div class="input-group date"
         :style="{ width: width }"
        >
        <input type="text" class="form-control"
               v-model="value"
               :disabled="disabled"
               :required="required"
               placeholder="{{placeholder}}"
        >
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                twoWay: true,
                required: true
            },
            disabled: {type: Boolean, default: false},
            required: {type: Boolean, default: false},
            // config
            format: {type: String, default: 'YYYY-MM-DD'},
            viewMode: {type: String, default: 'days'},
            width: {
              type: [Number, String],
              default: 200,
              coerce: (val) => {
                if (_.isNumber(val)) {
                  return val + 'px'
                }
                return val
              }
            },
            placeholder: {type: String, default: '请选择'}
        },
        ready () {
            this.init()
        },
        methods: {
            init () {
                this.control = $(this.$el)
                    .datetimepicker(this.getOption())
                    .on('dp.change', function() {
                        $(this.$el).find('input').trigger('input')
                    }.bind(this))
            },
            getOption () {
                return {
                    locale: "zh-cn",
                    format: this.format,
                    viewMode: this.viewMode
                }
            }
        }
    }
</script>
