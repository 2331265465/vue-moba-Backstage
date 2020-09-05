import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:7001/admin/api/'
})

http.interceptors.request.use( (config) =>{
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

http.interceptors.response.use((res) => {
  return res;
}, (err) => {
  console.log(err.response)
  if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message)
    if (err.response.status === 401) {
      router.replace('/login')
    }
  }
  return Promise.reject(err);
});

export default http