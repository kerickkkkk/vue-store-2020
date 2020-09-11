import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// 載入 jqeury
import $ from 'jquery'

import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

// 元件全域註冊
Vue.component('Loading', Loading)

// 套件加入 Vue 的 instance
Vue.use(VueAxios, axios)

// 使得 $ 可以在 global 使用
// 因有 Lint 需要 disabled 他 不需要再 import
//  /* global $ */
window.$ = $

// event bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, a, next) => {
  if (to.meta.requiresAuth) {
    // 取得當前 token 對應 login page  token 名稱
    const checkToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

    // 檢查 checkToken 是否為空 空則導回首頁
    if (checkToken === '') {
      alert('no right return to home page')
      next({
        path: '/'
      }).catch(err => err)
    }

    // 檢查 api 是否還是有效

    const apiCheck = `${process.env.VUE_APP_APIPATH}/auth/check`
    // 設定 Bearer token
    axios.defaults.headers.common.Authorization = `Bearer ${checkToken}`
    axios.post(apiCheck, { api_token: checkToken })
      .then(res => {
        // console.log("res", res.data.success)
        // api 失效就導向首頁
        if (!res.data.success) {
          next({
            path: '/login'
          }).catch(err => err)
        } else {
          next().catch(err => err)
        }
      })
      .catch(err => err)
  } else {
    next().catch(err => err) // 一開始測試要先用放行
  }
})
