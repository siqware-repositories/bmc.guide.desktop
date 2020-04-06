import $http from '../../boot/http_request'

const config = {
  headers: {'content-type': 'application/json-patch+json'}
};

export async function storeRestaurant({commit}, data) {
  try {
    const res = await $http.post('/restaurant', data,config);
    commit('ADD_RESTAURANT', res.data);
  } catch (e) {
    return false
  }
}
export async function updateRestaurant({commit},data) {
  try {
    await $http.post('/restaurant-update/'+parseInt(data.get('id')),data,config);
  } catch (e) {
    return false
  }
}
export async function indexRestaurant({commit}) {
  try {
    const res = await $http.get('/restaurant');
    commit('SET_RESTAURANT', res.data);
  } catch (e) {
    return false
  }
}
export async function deleteRestaurant({},id) {
  try {
    await $http.delete('/restaurant/'+id);
  } catch (e) {
    return false
  }
}
export async function deleteGalleryDetail({},id) {
  try {
    await $http.delete('/gallery-detail/'+id);
  } catch (e) {
    return false
  }
}
