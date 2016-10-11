export default function configBase({ state, actions }) {

  const {
    on_search_submit,
    on_search_reset
  } = actions

  return {
    data() {
      return {
        search: state.search,
        page: state
      }
    },
    methods: {
      on_search_submit,
      on_search_reset
    }
  }
}
