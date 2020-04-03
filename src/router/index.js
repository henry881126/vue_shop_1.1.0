import Vue from 'vue'
import Router from 'vue-router'

let home = () => import('@/views/home.vue')
let classify = () => import('@/views/classify.vue')
let car = () => import('@/views/car.vue')
let my = () => import('@/views/my.vue')
let detail = () => import('@/views/detail.vue')
let orderList = () => import('@/views/orderList.vue')
let addAddress = () => import('@/views/addAddress.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/car',
      name: 'car',
      component: car
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }, {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    }, {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    }
  ]
})
