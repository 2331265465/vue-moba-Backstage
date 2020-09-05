import Vue from 'vue'
export default {
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token} || ''`
      }
    }
  },
  computed: {
    uploadUrl() {
      return Vue.prototype.$http.defaults.baseURL + 'upload'
    }
  }
}
