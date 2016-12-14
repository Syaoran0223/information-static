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

        this.editor = CKEDITOR.replace(el, {
          language: 'zh-cn',
          toolbar: toolbar_base,

          //
          extraPlugins: 'autogrow',
          removePlugins: 'elementspath',
          autoGrow_maxHeight: 800,
          autoGrow_onStartup: true,
          filebrowserUploadUrl: `${api_host}/teacher/upload/ckeditor?module=teacher&dirname=ckeditor`
        })

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
