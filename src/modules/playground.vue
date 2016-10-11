<template>

  <div class="panel panel-default">
    <div class="panel-body">
      <file-upload></file-upload>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-body">

      <ckeditor
        :value.sync="ck_val"
        :require="true"
      ></ckeditor>

    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h5>fxModal</h5>
    </div>
    <div class="panel-body">
      <button class="btn btn-link" @click="fx_open=true">Open</button>
      <modal
        :open.sync="fx_open"
      >
        <div class="modal-body">
          <button class="btn btn-link" @click="fx2_open=true">Open</button>
          <div style="height: 500px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at aut deleniti dicta dolor dolore ducimus eius eum fugit hic ipsam iusto molestias optio provident quidem, repellat tenetur vero voluptatibus!</div>
          <div style="height: 500px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at aut deleniti dicta dolor dolore ducimus eius eum fugit hic ipsam iusto molestias optio provident quidem, repellat tenetur vero voluptatibus!</div>
          <div style="height: 500px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad at aut deleniti dicta dolor dolore ducimus eius eum fugit hic ipsam iusto molestias optio provident quidem, repellat tenetur vero voluptatibus!</div>
          <daterange-picker
            :value.sync="date_r"
          ></daterange-picker>
          <button class="btn btn-link" @click="fx2_open=true">Open</button>
        </div>
      </modal>

      <modal
        :open.sync="fx2_open"
      >
        <div class="modal-body">
          <div style="height: 300px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum et excepturi neque pariatur quae quibusdam repellat repudiandae. Animi architecto, consectetur dolorum id inventore ipsa iusto officiis quaerat rem soluta voluptas.</div>
        </div>
      </modal>
    </div>
  </div>

  <div class="panel panel-default">
    <div class="panel-heading">
      <h5>Selector</h5>
    </div>
    <div class="panel-body">
      <div class="col-sm-4">
        <div>
          Filter
          <tag-selector
            const="award_type"
            :value.sync="ts_f_value"
            :show-all="true"
          ></tag-selector>
          {{ts_f_value}}
        </div>
        <div>
          Selector
          <tag-selector
            const="award_type"
            :value.sync="ts_value"
          ></tag-selector>
          {{ts_value}}
        </div>
      </div>

      <div class="col-sm-4">
        <div>
          Const
          <selector
            const="subject"
            :value.sync="sel_value"
          ></selector>
          {{sel_value}}
        </div>
        <div>
          <selector
            const="subject"
            :value.sync="sel_values"
            :multiple="true"
          ></selector>
          <span v-for="v in sel_values">{{v}}</span>
        </div>
        <div>
          Remote
          <selector
            remote="teacher/teachers/suggest"
            :value.sync="sel_value_r"
          ></selector>
          {{sel_value_r}}
        </div>
        <div>
          <selector
            remote="teacher/teachers/suggest"
            :value.sync="sel_value_rs"
            :multiple="true"
          ></selector>
          {{sel_value_rs}}
        </div>
        <div>
          <selector
            const="class_items"
            :select-default="true"
          ></selector>
        </div>
      </div>

      <div class="col-sm-4">

        <datetime-picker
          :value.sync="date1"
          format="YYYY-MM-DD HH:mm"
        ></datetime-picker>

        <daterange-picker
          :value.sync="date_r"
        ></daterange-picker>
      </div>

      <div class="col-sm-6">
        <daterange-picker
          :value.sync="date_r"
        ></daterange-picker>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        ck_val: '',

        fx_open: false,
        fx2_open: false,

        date1: '2015-12-1',
        date_r: {
          dateBegin: '2016-8-12',
          dateEnd: '2016-9-1'
        },
        ts_f_value: null,
        ts_value: 'AWARD',
        sel_value: 'GS002',
        sel_values: ['GS002', 'GS003'],
        sel_value_r: null,//{id:143,text:'Default'},
        sel_value_rs: null
      }
    },
    ready() {
      setTimeout(() => {
        this.sel_value_r = {id:143,text:'Default'}
        this.sel_value_rs = [{id:18,text:'Default'}, {id:12,text:'Default 2'}]

        this.ck_val = 'abc123'
      }, 1000)
    }
  }
</script>
