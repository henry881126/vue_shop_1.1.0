<template>
  <div class='my'>
    <van-nav-bar title="个人中心"
                 fixed
                 border
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="photo">
      <img src="../assets/img/profile/user.png"
           alt="">
      <p>{{userName}}</p>
    </div>
    <van-cell @click="order"
              title="购买记录"
              size="large"
              is-link
              value="" />
    <van-cell @click="address"
              title="收货地址"
              size="large"
              is-link
              value="" />
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      userName: 'henry'
    }
  },
  methods: {
    onClickLeft () { },
    onClickRight () { },
    order () {
      this.$router.push('/orderList')
    },
    address () {
      this.$router.push('/addressList')
    }
  },
  created () {
  }
}
</script>

<style scoped>
.photo {
  height: 30vh;
  margin-top: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.photo p {
  line-height: 2;
  font-size: 2em;
}
</style>
