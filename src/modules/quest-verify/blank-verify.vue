<template>
  <form class="form-horizontal">
  <div>
    <div class="form-group">
      <label for="" class="control-label col-sm-1">题目:</label>
      <div class="col-sm-11">
        <input-alert
            :value.sync="value.quest_content_html"
            :origin_value.sync="value.quest_content"
            placehold="点击此处输入题干">
        </input-alert>
      </div>
    </div>

    <div class="form-group" v-if="!isSub">
      <label for="" class="control-label col-sm-1">答案:</label>
      <div class="col-sm-11">
        <div v-for="data in value.answer_list" class="row">
          <div class="mg-t-7">
            <p>{{{data.content}}}</p>
          </div>
        </div>
      </div>
    </div>

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
  </form>
</template>
<script>
  export default {
    name: 'BlankVerify',
    props: {
      value: {
        type: Object,
        twoWay: true
      },
      isSub: {
        type: Boolean,
        default: false
      }
    }
  }
</script>