<template>
  <div class='orderList'>
    <van-nav-bar title="购买记录"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
    <van-tabs v-model="active"
              swipeable>
      <van-tab v-for="(item,index) in tabName"
               :title="item"
               :key="index">
        内容 {{ item }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'orderList',
  data () {
    return {
      active: 0,
      tabName: ['全部', '待付款', '待发货', '待收货']
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  created () {
  }
}
</script>

<style scoped>
.orderList {
  padding-top: 40px;
}
</style>
