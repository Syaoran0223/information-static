<template>
  <div>

    <input type="text" class="select2-hidden-accessible"
           v-model="value"
           :required="required">
    <textarea>{{{value}}}</textarea>

  </div>
</template>
<script type="text/babel">
  import { api_host } from 'config'

  const toolbar_base = [
    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
    { name: 'clipboard', items: [ 'PasteText', 'PasteFromWord' ] },
    { name: 'insert', items: [ 'NumberedList', 'BulletedList', 'Image', 'Table', 'HorizontalRule' ] },
    { name: 'tools', items: [ 'Maximize' ] },
    { name: 'document', items: [ 'Source' ] },
  ]

  export default {
    props: {
      value: {
        required: true,
        twoWay: true
      },
      origin_value: {
        required: true,
        twoWay: true,
        default: ''
      },
      required: {}
    },
    data () {
      return {
        changing: false
      }
    },
    ready () {
      this.init()
    },
    watch: {
      value: function () {
        if (this.changing) return
        this.set_value()
      }
    },
    methods: {
      init () {
        let el = $(this.$el).find('textarea')[0]
        try {
            CKEDITOR.instances[el].destroy(true);
        } catch (e) { }
        this.editor = CKEDITOR.replace(el)

        this.editor.on('key', () => {
          setTimeout(this.on_change.bind(this), 0)
        })
        this.editor.on('change', this.on_change.bind(this))
      },

      set_value () {
        this.editor.setData(this.value)
      },

      on_change () {
        if (this.changing) return
        this.changing = true

        this.value = this.editor.getData()
        this.origin_value = this.editor.document.getBody().getText()

        Vue.nextTick(() => {this.changing = false})
      }
    }
  }
</script>
