<template>
  <div class='orderList'>
    <van-nav-bar title="购买记录"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
    <van-tabs swipeable
    class="tabFixed"
              :active="active">
      <van-tab title="全部">
        <div class="item"
             v-for="(item,index) in allGoodsData"
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
      <van-tab title="待付款">
        <div class="item"
             v-for="(item,index) in noPay"
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
      <van-tab title="待发货">
        <div class="item"
             v-for="(item,index) in havePay"
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
      <van-tab title="待收货">
        <div class="empty">暂 <br>无<br>数<br>据</div>
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

      waitGet:[]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onChange () {
    }
  },
  computed: {
    ...mapState(['myGoods', 'payGoods']),
    allGoodsData(){
      return this.myGoods.concat(this.payGoods)
    },
    havePay(){
      return this.payGoods
    },
    noPay(){
      return this.myGoods
    }
  },
  created () {

  }
}
</script>

<style scoped>
.empty{
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  line-height: 1.5;
}
.orderList {
  padding-top: 40px;
}
.item {
  height: 120px;
  display: flex;
  padding: 0 1.4em;
  box-sizing: border-box;
  align-items: center;
  font-size: 1.2em;
  font-weight: 600;
}
.item .right {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  box-sizing: border-box;

  /* align-items: space-between; */
}
.item .right p:nth-of-type(1) {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
