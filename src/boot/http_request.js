import { LocalStorage } from 'quasar'
import axios from 'axios'
let $http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});
let token = LocalStorage.getItem("userInfo");
if (token) {
    $http.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
}
export default $http;
