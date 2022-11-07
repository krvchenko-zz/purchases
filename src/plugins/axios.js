/* eslint-disable */
import axios from 'axios'
// import store from '~/store'
// import router from '~/router'

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://5.23.54.183:105'

// Request interceptor
axios.interceptors.request.use((request) => {
  // const token = store.getters['auth/token']
  // if (token) {
  //   request.headers.common['Authorization'] = `Bearer ${token}`
  // }

  // const locale = store.getters['lang/locale']
  // if (locale) {
  //   request.headers.common['Accept-Language'] = locale
  // }

  return request
})

// Response interceptor
axios.interceptors.response.use((response) => response, error => {
  const { status } = error.response

  if (status >= 500) {
    console.log(500)
  }

  // if (status === 401 && store.getters['auth/check']) {
  //   store.commit('auth/LOGOUT')

  //   router.push({ name: 'login' })
  // }

  return Promise.reject(error)
})
