import $http from '../../boot/http_request'

export async function storeRestaurantCategory({commit}, data) {
  try {
    const res = await $http.post('/restaurant-category',data);
    commit('ADD_RESTAURANT_CATEGORY', res.data);
  } catch (e) {
    return false
  }
}
export async function indexRestaurantCategory({commit}) {
  try {
    const res = await $http.get('/restaurant-category');
    commit('SET_RESTAURANT_CATEGORY', res.data);
  } catch (e) {
    return false
  }
}
export async function deleteRestaurantCategory({},id) {
  try {
    await $http.delete('/restaurant-category/'+id);
  } catch (e) {
    return false
  }
}
