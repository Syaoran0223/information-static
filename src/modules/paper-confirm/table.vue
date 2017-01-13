<template>
  <data-grid
    :data="table"
    @page-index-change="page_index_change"
  >

    <div class="">
      <div class="panel panel-default" v-for="item in table.items">
        <div class="panel-body">
          <div class="mt-7">试卷: {{item.name}}</div>
          <div class="mt-7">
            <span class="text-muted">{{item.exam_date | date_format}}</span>
            <span class="label label-primary">{{item.state | get_const_value 'paper_state'}}</span>
          </div>
          <div class="mt-7">
            <file-upload
              :items.sync="item.attachments"
              :readonly="true"
            ></file-upload>
          </div>
        </div>
      </div>
    </div>

  </data-grid>
</template>
<script type="text/babel">
  import { state, actions } from './store'
  import configBaseComponent from 'components/base/table'
  export default {
    extends: configBaseComponent({ state, actions })
  }
</script>
<style>
  .mt-7 {
    margin-top: 7px;
  }
</style>