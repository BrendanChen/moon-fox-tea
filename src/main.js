import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { currency } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'

const app = createApp(App)
app.config.globalProperties.$filters = {
  currency,
}

// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(VueAxios, axios)
app.use(router)
app.component('LoadingComponent', Loading)
app.mount('#app')
