export default function configBase({ state, actions }) {

  const { on_edit_submit } = actions

  return {
    data() {
      return {
        edit: state.edit,
        page: state
      }
    },
    methods: {
      on_edit_submit (e) {
        on_edit_submit()
      }
    }
  }
}
