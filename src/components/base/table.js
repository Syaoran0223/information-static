export default function configBase({ state, actions }) {

  const {
    page_index_change,
    on_item_edit_click,
    on_item_remove_click,
    open_custom_confirm
  } = actions

  return {
    name: 'Table',
    data() {
      return {
        table: state.table,
        page: state
      }
    },
    methods: {
      page_index_change,
      on_item_edit_click,
      on_item_remove_click,
      open_custom_confirm
    }
  }
}
