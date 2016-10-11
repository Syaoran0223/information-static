<template>

  <div class="tag-selector">
        <span v-if="showAll"
              class="tag-selector-item"
              :class="{ 'active': is_all_selected }"
              @click="on_click_all"
        >全部
        </span>
    <template v-for="tag in items">
        <span class="tag-selector-item"
              :class="{ 'active': tag._selected && should_active_item }"
              @click="on_click(tag)"
        >
             {{tag.text}}
        </span>
    </template>
  </div>

</template>

<script type="text/babel">
  import * as constTypes from 'utils/consts'
  import { set_items_selected } from 'utils/index'

  export default {
    props: {
      // data
      const: {
        type: String
      },
      value: {
        twoWay: true
      },
      valuePick: {
        type: String,
        default: 'id'
      },

      //option
      radio: {
        default: true
      },
      showAll: {
        default: false
      }
    },
    ready () {
      if (this.const) {
        this.remote = null
        this.items = _.map(constTypes[this.const], (text, id) => {
          return { id, text, _selected: false }
        })
        set_items_selected(this.items, { id: this.value })
      }
    },
    data () {
      return {
        items: [],
        loading: false
      }
    },
    watch: {
      items () {
        if (_.size(this.items) < 2) {
          this.showAll = false
        }
      },
      value () {
        set_items_selected(this.items, { id: this.value })
      }
    },
    computed: {
      selected () {
        return _.chain(this.items)
          .filter('_selected')
          .value()
      },
      is_all_selected () {
        if (this.loading) {
          return false
        }

        let is_both_selected = _.every(this.items, '_selected')
        let is_null_selected = _.every(this.items, { _selected: false })

        if (is_both_selected) {
          if (this.items.length == 1) return false
          return true
        }
        if (is_null_selected) {
          return true
        }
      },
      should_active_item () {
        if (this.showAll) {
          return !this.is_all_selected
        } else {
          return true
        }
      }
    },

    methods: {
      on_click (tag) {
        this.set_selected(false)
        tag._selected = true
        this.change()
      },
      on_click_all () {
        this.set_selected(true)
        this.change()
      },
      set_selected (selected) {
        _.forEach(this.items, (item) => {
          item._selected = selected
        })
      },
      change () {
        let result = this.selected[0]
        if (this.is_all_selected) {
          this.value = null
          return
        }
        if (this.valuePick) {
          this.value = _.get(result, this.valuePick, result)
          return
        }
        this.value = result
      }
    }
  }
</script>
