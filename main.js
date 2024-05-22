// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  if (options.url.indexOf('/my/') !== -1) {
    options.header = {
      Authorization: store.state.m_user.token,
    }
  }
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  // store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
import App from './App.vue'
import store from './store/store.js'
import { $http} from '@escook/request-miniprogram'
  uni.$http = $http
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'
  $http.beforeRequest = function(options) {
    uni.showLoading({
      title: '数据加载中...',
    })
    if (options.url.indexOf('/my/') !== -1) {
      // 为请求头添加身份认证字段
      options.header = {
        Authorization: store.state.m_user.token,
      }
    }
  }
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif