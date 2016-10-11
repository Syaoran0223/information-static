<template>
  <slot v-if="display"></slot>
</template>
<script type="text/babel">
  import { access_menus } from 'config'

  export default {
    props: {
      id: {
        required: true
      }
    },
    data () {
      return {
        debug: DEBUG
      }
    },
    computed: {
      display () {
        return !!_.find(access_menus, (m) => {
          return this.id == m.identity
        })
      }
    },
    methods: {
    }
  }
</script>
