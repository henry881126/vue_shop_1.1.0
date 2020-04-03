<template>
  <div id="app">
    <keep-alive exclude="detail,car">
      <router-view />
    </keep-alive>
    <tabBar></tabBar>
    <div v-show="this.$store.state.isShow"
         class="loading"
         :class="{'fenlei':this.$store.state.classify}">
      <van-loading vertical
                   color="#1989fa">加载中...</van-loading>
    </div>

  </div>
</template>

<script>
import tabBar from './components/tableBar'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    tabBar
  },
  created () {
  }
}
</script>

<style>
@import './assets/css//base.css';
.fenlei{
  padding-left: 28%;
}
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 95%;
  /* background-color: rgba(0,0,0,0.3); */
}
</style>
