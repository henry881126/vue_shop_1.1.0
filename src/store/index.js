import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  myGoods: JSON.parse(localStorage.getItem('myGoods')) || [],
  isShow: false,
  goodsItem: JSON.parse(localStorage.getItem('goodsItem')) || {},
  classify: false,
  payGoods: JSON.parse(localStorage.getItem('payGoods')) || []// 已支付的数据
}

const mutations = {
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
