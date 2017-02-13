<template>
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">题目:</label>
      <div class="col-sm-11">
        <template v-if="show_wrong">
          <input-alert
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            :show_wrong="true"
            placehold="点击此处输入题干">
          </input-alert>
        </template>
        <template v-else>
          <div class="mg-t-7" v-if="readonly">
            <p>{{{value.quest_content_html}}}</p>
          </div>
          <input-tag
              v-else
              :value.sync="value.quest_content_html"
              :origin_value.sync="value.quest_content"
              placehold="点击此处输入题干">
          </input-tag>
        </template>
      </div>
    </div>

    <blank-answer
      :value.sync="answer_list">
    </blank-answer>
    

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
  import BlankAnswer from './blank-answer.vue'

  export default {
    name: 'BlankQuest',
    props: {
      value: {
        type: Object,
        twoWay: true
      },
      isSub: {
        type: Boolean,
        default: false
      },
      answer_list: {
        twoWay: true,
        type: Array
      },
      readonly: {
        type: Boolean,
        default: false
      },
      show_wrong: {
        type: Boolean,
        default: false  
      }
    },
    components: {
      InputAlert,
      BlankAnswer
    }
  }
</script>