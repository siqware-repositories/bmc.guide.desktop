export function SET_RESTAURANT(state, payload) {
    state.restaurants = payload
}
export function ADD_RESTAURANT(state, payload) {
  state.restaurants.unshift(payload)
}
