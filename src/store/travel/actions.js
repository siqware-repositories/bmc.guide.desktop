import $http from '../../boot/http_request'

const config = {
  headers: {'content-type': 'application/json-patch+json'}
};

export async function storeTravel({commit}, data) {
  try {
    const res = await $http.post('/travel', data,config);
    commit('ADD_TRAVEL', res.data);
  } catch (e) {
    return false
  }
}
export async function indexTravel({commit}) {
  try {
    const res = await $http.get('/travel');
    commit('SET_TRAVEL', res.data);
  } catch (e) {
    return false
  }
}
export async function deleteTravel({},id) {
  try {
    await $http.delete('/travel/'+id);
  } catch (e) {
    return false
  }
}
