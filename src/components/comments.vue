<template>
  <div class="panel panel-default">

    <div class="panel-heading">
      <div class="panel-title">留言</div>
    </div>

    <div class="panel-body">
      <div v-for="item in items" track-by="id"
        class="media">
        <div class="media-heading">
          <b>{{item.teacherRealName}}</b>
          <span class="text-muted small" style="margin-left: .5em;">{{item.createTime}}</span>
        </div>
        {{item.content}}
      </div>

      <textarea class="form-control" style="height: 80px; margin: 1em 0;"
          v-model="content"
          required
      ></textarea>
      <button class="btn btn-success" @click="submit"
        :disabled="loading || saving || !content.length">
        <span v-if="saving">保存中</span>
        <span v-else>发布</span>
      </button>

    </div>
  </div>
</template>
<script type="text/babel">
  import { api_host } from 'config'
  import { GET, POST } from 'utils/ajax'

  export default {
    props: {
      id: {
        required: true
      }
    },
    data () {
      return {
        items: [],
        loading: false,
        saving: false,
        content: ''
      }
    },
    watch: {
      id () {
        this.items = []
        this.request()
      }
    },
    methods: {
      request () {
        let data = {
          uuid: this.id,
          pageSize: 100
        }
        this.loading = true
        GET(`${api_host}/teacher/replies`, {
          data
        }).then((res) => {
          this.loading = false
          this.items = res.items
        })
      },

      submit () {
        this.saving = true
        POST(`${api_host}/teacher/replies`, {
          data: {
            content: this.content,
            uuid: this.id
          }
        }).then(() => {
          this.saving = false
          this.content = ''
          this.request()
        })
      }
    }
  }
</script>
