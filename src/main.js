
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
// vant
// eslint-disable-next-line import/no-duplicates
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
Vue.use(Vant)
// 请求
import axios from 'axios'

// axios请求拦截
axios.interceptors.request.use(function (config) {
  store.state.isShow = true
  return config
})
axios.interceptors.response.use(function (config) {
  store.state.isShow = false
  return config
})
Vue.prototype.$axios = axios

require('./mock.js')
// 处理点击事件
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.config.productionTip = false
// 使用懒加载
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require('@/assets/img/common/placeholder.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
