export default function configBase({ state, actions }) {

  const {
    on_route_data,
    table_query,
    on_item_add_click,
    on_item_remove,
    on_custom_confirm
  } = actions

  return {
    name: 'Index',
    route: {
      data({ to }) {
        this.on_route_data(to)
      }
    },
    data() {
      return {
        state
      }
    },
    methods: {
      on_route_data,
      table_query,
      on_item_add_click,
      on_item_remove,
      on_custom_confirm
    }
  }
}
