<template>
  <div class='tableBar'>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/car">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'tableBar',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    ...mapMutations(['classifyStyle'])
  },
  watch: {
    '$route' (to, from) {
      var val = to.path
      // console.log(val)
      if (val === '/home') {
        this.active = 0
        this.classifyStyle(false)
      } else if (val === '/classify') {
        this.active = 1
        this.classifyStyle(true)
      } else if (val === '/car') {
        this.active = 2
        this.classifyStyle(false)
      } else if (val === '/detail') {
        this.active = 9
        this.classifyStyle(false)
      } else if (val === '/my') {
        this.active = 3
        this.classifyStyle(false)
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
