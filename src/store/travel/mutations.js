export function SET_TRAVEL(state, payload) {
    state.travels = payload
}
export function ADD_TRAVEL(state, payload) {
  state.travels.unshift(payload)
}
