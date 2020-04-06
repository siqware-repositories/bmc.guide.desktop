import $http from '../../boot/http_request'

export async function storeTravelCategory({commit}, data) {
  try {
    const res = await $http.post('/travel-category',data);
    commit('ADD_TRAVEL_CATEGORY', res.data);
  } catch (e) {
    return false
  }
}
export async function indexTravelCategory({commit}) {
  try {
    const res = await $http.get('/travel-category');
    commit('SET_TRAVEL_CATEGORY', res.data);
  } catch (e) {
    return false
  }
}
export async function deleteTravelCategory({},id) {
  try {
    await $http.delete('/travel-category/'+id);
  } catch (e) {
    return false
  }
}
