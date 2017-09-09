<template>
  <form class="form-horizontal">
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">母题:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            placehold="点击此处输入题干">
        </input-alert>
      </div>
    </div>

    <hr>
      <div class="panel panel-default" v-for="data in value.sub_items">
        <sub-quest-item
          :value.sync="data"
          :subject="value.exam.subject"
          :readonly="true"
          :sub_items.sync="value.sub_items">
        </sub-quest-item>
      </div>
    <hr>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">解答:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.jieda"
            placehold="点击此处输入解答">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">分析:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.fenxi"
            placehold="点击此处输入分析">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">点评:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.dianpin"
            placehold="点击此处输入点评">
        </input-alert>
      </div>
    </div>

    <div class="form-group">
      <label for="" class="control-label col-sm-1">考点:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.kaodian"
            placehold="点击此处输入考点">
        </input-alert>
      </div>
    </div>
  </div>
  </form>
</template>
<script>
  import SelectVerify from './select-verify.vue'
  import BlankVerify from './blank-verify.vue'
  import UnderstandVerify from './understand-verify.vue'

  export default {
    name: 'SubVerify',
    props: {
      value: {
        type: Object,
        twoWay: true
      }
    },
    components: {
      SelectVerify,
      BlankVerify,
      UnderstandVerify
    }
  }
</script>