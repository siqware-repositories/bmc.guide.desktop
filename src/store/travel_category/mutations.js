export function SET_TRAVEL_CATEGORY(state, payload) {
    state.travel_categories = payload
}
export function ADD_TRAVEL_CATEGORY(state, payload) {
  state.travel_categories.unshift(payload)
}
