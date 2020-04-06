export function SET_RESTAURANT_CATEGORY(state, payload) {
    state.restaurant_categories = payload
}
export function ADD_RESTAURANT_CATEGORY(state, payload) {
  state.restaurant_categories.unshift(payload)
}
