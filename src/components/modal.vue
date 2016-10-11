<template>

  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog" :style="{ width: width }">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>

</template>
<script type="text/babel">
  export default {
    props: {
      open: {
        twoWay: true,
        required: true,
        type: Boolean
      },
      width: {
        type: [Number, String],
        default: 600,
        coerce: (val) => {
          if (_.isNumber(val)) {
            return val + 'px'
          }
          return val
        }
      },
      zIndex: {
        type: [Number, String],
        default: 'auto'
      }
    },
    watch: {
      'open': 'on_open_change'
    },
    ready () {
      $.fn.modal.Constructor.prototype.enforceFocus = _.noop;

      this.control = $(this.$el).modal({
        backdrop: 'static',
        show: false
      })

      this.control
        .on('show.bs.modal', () => {
          this.$emit('open')
          this.set_zIndex()
        })
        .on('hidden.bs.modal', () => {
          if(this.open) {
            this.open = false
          }
          this.$emit('closed')

          this.fix_body_class()
        })
    },
    methods: {
      on_open_change (open) {
        this.control.modal(open ? 'show' : 'hide')
      },

      set_zIndex() {
        let base
        if (this.zIndex == 'auto') {
          let display_modals = $('.modal:visible').length
          base = 1050 + (display_modals * 10)
        } else if (_.isNumber(this.zIndex)) {
          base = this.zIndex
        }

        $(this.$el).css({ zIndex: base })
        setTimeout(() => {
          $('.modal-backdrop').not('.modal-stack')
              .css({ zIndex: base - 1 })
              .addClass('modal-stack')
        }, 0)
      },

      fix_body_class () {
        let display_modals = $('.modal:visible').length
        if (display_modals) {
          $('body').addClass('modal-open')
        }
      }
    }
  }
</script>
