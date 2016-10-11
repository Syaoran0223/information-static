import default_state from './state'
import * as default_actions from './actions'

const createStore =  (
  state={},
  actions={}
) => {
  state = _.merge({}, default_state, state)
  actions = {...default_actions, ...actions}

  _.forEach(actions, (action, key) => {
    actions[key] = bound_action(state, action, actions)
  })

  return { state, actions }
}

function bound_action(state, action, actions) {
  return function boundAction(...args) {
    return action.call(this, {state, actions}, ...args)
  }
}

export default createStore
