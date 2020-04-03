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
               :key="index"
               bind:change="change">

        <div class="item" v-for="(item,index) in allGoodsData"
             :key="index">
          <div class="left">
            <img :src="item.data.image"
                 alt="">
          </div>
          <div class="right">
            <p>{{item.data.title+item.data.title}}</p>
            <p>{{item.data.price+'元'}}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'orderList',
  data () {
    return {
      active: 0,
      tabName: ['全部', '待付款', '待发货', '待收货'],
      allGoodsData: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    change(){
      console.log(9)
    }
  },
  computed: {
    ...mapState(['myGoods', 'payGoods']),
  },
  created () {
    console.log(this.myGoods)
    console.log(this.payGoods)
    this.allGoodsData = this.myGoods.concat(this.payGoods)
    console.log(this.allGoodsData)
  }
}
</script>

<style scoped>
.orderList {
  padding-top: 40px;
}
.item{
  height: 120px;
  display: flex;
  padding: 0 1.4em;
  box-sizing: border-box;
  align-items: center;
  font-size: 1.2em;
  font-weight: 600;
}
.item .right{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  box-sizing: border-box;
  
  /* align-items: space-between; */
}
.item .right p:nth-of-type(1){
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
