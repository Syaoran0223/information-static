<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">题目:</label>
      <div class="col-sm-11">
        <div class="mg-t-7" v-if="readonly">
          <p>{{{value.quest_content_html}}}</p>
        </div>
        <input-alert
            v-else
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            placehold="点击此处输入题干">
        </input-alert>
      </div>
    </div>

    <div class="form-group" v-if="!isSub && !readonly">
      <label for="" class="control-label col-sm-2">选项显示方式:</label>
      <div class="col-sm-10">
        <tag-selector const="show_types" :value.sync="value.show_type" :required="true"></tag-selector>
      </div>
    </div>

    <option-view
        v-if="show_answer"
        :readonly="readonly"
        :value.sync="options">
    </option-view>

    <div class="form-group" v-if="!isSub">
      <label for="" class="control-label col-sm-1">解答:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.jieda"
            placehold="点击此处输入解答">
        </input-alert>
      </div>
    </div>

    <div class="form-group" v-if="!isSub">
      <label for="" class="control-label col-sm-1">分析:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.fenxi"
            placehold="点击此处输入分析">
        </input-alert>
      </div>
    </div>

    <div class="form-group" v-if="!isSub">
      <label for="" class="control-label col-sm-1">点评:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.dianpin"
            placehold="点击此处输入点评">
        </input-alert>
      </div>
    </div>

    <div class="form-group" v-if="!isSub">
      <label for="" class="control-label col-sm-1">考点:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.kaodian"
            placehold="点击此处输入考点">
        </input-alert>
      </div>
    </div>
  </div>
</template>
<script>
  import InputAlert from './input-alert.vue'
  import OptionView from './option-view.vue'

  export default {
    name: 'SelectQuest',
    props: {
      value: {
        type: Object,
        twoWay: true
      },
      isSub: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        twoWay: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      show_answer: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        option_values: [
          {
            sort: 'A',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          },
          {
            sort: 'B',
            content: '',
            _id: _.uniqueId('option_'),
            _selected: false
          }
        ]
      }
    },
    components: {
      InputAlert,
      OptionView
    }
  }
</script>