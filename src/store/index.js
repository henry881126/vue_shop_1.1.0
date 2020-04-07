import Vue from 'vue'
import Vuex from 'vuex'

let myGoods = localStorage.getItem('myGoods') || '[]'
let goodsItem = localStorage.getItem('goodsItem') || '{}'
let payGoods = localStorage.getItem('payGoods') || '[]'
let radio = localStorage.getItem('radio') || '1'
let adressList = localStorage.getItem('adressList') || '[]'
if ((adressList + '') == 'undefined') {
  adressList = '[]'
  
}
Vue.use(Vuex)

const state = {
  myGoods: JSON.parse(myGoods) || [],
  isShow: false,
  goodsItem: JSON.parse(goodsItem) || {},
  classify: false,
  payGoods: JSON.parse(payGoods) || [],
  adressList: JSON.parse(adressList) || [],
  radio: JSON.parse(radio) || '1'
}

const mutations = {
  changeRadio (state, payload) {
    state.radio = payload
    localStorage.setItem('radio', payload)
  },
  editAdress (state, payload) {
    state.adressList[payload.index] = payload.data
  },
  delItem (state, payload) {
    state.adressList.splice(payload, 1)
    localStorage.setItem('adressList', JSON.stringify(state.addAdressList))
  },
  addAdressList (state, payload) {
    state.adressList.push(payload)
    let data = JSON.stringify(state.adressList)
    localStorage.setItem('adressList', data)
  },
  classifyStyle (state, payload) {
    state.classify = payload
  },
  setGoodsItem (state, payload) {
    state.goodsItem = payload
    localStorage.setItem('goodsItem', JSON.stringify(payload))
  },
  addNum (state, payload) {
    state.myGoods.push(payload)
    let data = JSON.stringify(state.myGoods)
    localStorage.setItem('myGoods', data)
  },
  updatedMyGoods (state, payload) {
    state.myGoods = payload
    localStorage.setItem('myGoods', JSON.stringify(state.myGoods))
  },
  clearCar (state, payload) {

    state.myGoods = payload.noCheck
    state.payGoods.push(...payload.check)
    localStorage.setItem('myGoods', JSON.stringify(payload.noCheck))
    localStorage.setItem('payGoods', JSON.stringify(payload.check))
  }

}

const actions = {
  getSingleEvent ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {

    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions

})
