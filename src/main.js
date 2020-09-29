import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { ValidationObserver, ValidationProvider, configure, localize, extend } from 'vee-validate'
// 匯入語系檔案
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules' // 規則檔案（ex: email...）

// 載入 jqeury
import $ from 'jquery'

import 'bootstrap'
import router from './router'
import App from './App.vue'
import store from './store'

import thousandsSeparator from '@/filters/thousands-separator.js'

Vue.config.productionTip = false
// vee - validate start
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
}) // 所有驗證規則

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

localize('tw', zhTW)
// 加入至 元件
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
// vee - validate end

// // 元件全域註冊
Vue.component('Loading', Loading)

Vue.filter('thousands-separator', thousandsSeparator)

// 套件加入 Vue 的 instance
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

// 使得 $ 可以在 global 使用
// 因有 Lint 需要 disabled 他 不需要再 import
//  /* global $ */
window.$ = $
// 全局引入 swal
// window.swal = Vue.swal

// event bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, a, next) => {
  if (to.meta.requiresAuth) {
    // 取得當前 token 對應 login page  token 名稱
    const checkToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

    // 檢查 checkToken 是否為空 空則導回首頁
    if (checkToken === '') {
      next({
        path: '/'
      })
    }

    // 做在這邊會有 吃不到 loading 的問題 方法一 使用 vuex
    // 檢查 api 是否還是有效
    const apiCheck = `${process.env.VUE_APP_APIPATH}/auth/check`
    // 設定 Bearer token
    axios.defaults.headers.common.Authorization = `Bearer ${checkToken}`
    axios.post(apiCheck, { api_token: checkToken })
      .then(res => {
        // api 失效就導向首頁
        if (!res.data.success) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      })
      .catch(() => {

      })
  } else {
    next() // 一開始測試要先用放行
  }
})
