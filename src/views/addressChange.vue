
<template>
  <div class='addressChange'>

    <van-nav-bar title="编辑收货地址"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: 'addressChange',
  data () {
    return {

    }
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>