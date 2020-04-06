import $http from '../../boot/http_request'

const config = {
  headers: {'content-type': 'multipart/form-data'}
};

export async function uploadImage({commit}, data) {
  try {
    const res = await $http.post('/file-upload', data,config);
    return res.data
  } catch (e) {
    return false
  }
}
