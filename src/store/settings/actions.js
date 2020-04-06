import $http from '../../boot/http_request'

export async function indexMainLocation({commit}) {
  try {
    const res = await $http.get('/settings-main-location');
    commit('SET_SETTINGS_LOCATION', res.data);
  } catch (e) {
    return false
  }
}
export async function updateMainLocation({},data) {
  try {
    await $http.put('/settings-main-location/'+data.id,data);
  } catch (e) {
    return false
  }
}
