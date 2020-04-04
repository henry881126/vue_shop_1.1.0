import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  myGoods: JSON.parse(localStorage.getItem('myGoods')) || [],
  isShow: false,
  goodsItem: JSON.parse(localStorage.getItem('goodsItem')) || {},
  classify: false,
  payGoods: JSON.parse(localStorage.getItem('payGoods')) || [],// 已支付的数据
  adressList: JSON.parse(localStorage.getItem('adressList')) || [],
  radio: JSON.parse(localStorage.getItem('radio')) || '1'
}

const mutations = {
  changeRadio (state, payload) {
    state.radio = payload
    localStorage.setItem('radio', payload)
  },
  editAdress (state, payload) {
    console.log(payload)
    state.adressList[payload.index] = payload.data
  },
  delItem(state,payload){
    state.adressList.splice(payload,1)
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
    console.log(payload)

    state.myGoods = payload.noCheck
    state.payGoods.push(...payload.check)
    console.log(state.myGoods)
    console.log('---')
    console.log(state.payGoods)
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
