<template>
  <div class='detail'>
    <van-nav-bar title="详情"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
    <div class="content">
      <van-swipe :autoplay="3000"
                 class="swiper"
                 indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in item.images"
                        :key="index">
          <img v-lazy="image"
               style="width:100%" />
        </van-swipe-item>
      </van-swipe>
      <div class="info">
        <p class="title">{{item.data.title+item.data.title}}</p>
        <div class="price">
          <span>价格：<i>￥{{item.data.price}}</i> </span>
          <span>{{item.data.cfav}}<img src="../assets/img/common/collect.svg" /></span>

        </div>
        <div class="handle">
          <p>实付款：<i style="color:red;font-style:normal;">￥{{totalPrice}}</i></p>
          <p class="checkNum">
            <span @click="add">+</span>
            <span>{{item.num}}</span>
            <span @click="reduce">-</span>
          </p>
        </div>

      </div>
      <div class="imgBox">
        <img :src="item" alt="" v-for="(item,index) in item.images" :key="index">
      </div>
      <div class="footer">
        <p class="addCar"
            @click="goCar">
           <span class="goodsNum">{{myGoods.length}}</span>
          <img src="../assets/img/common/car.svg"
               alt="">
          <span>购物车</span>
        </p>
        <p @click="addCar">
          加入购物车
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      item: {
        id: null,
        images: [],
        data: null,
        num: 1,
        totalPrice: 0,
        checked: false
      }
    }
  },
  computed: {
    ...mapState(['myGoods']),
    totalPrice () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.item.totalPrice = this.item.data.price * this.item.num
      return this.item.totalPrice
    }
  },
  methods: {
    ...mapMutations(['addNum']),
    addCar () {
      this.addNum(this.item)
      this.$toast(
        {
          type: 'success',
          forbidClick: true,
          loadingType: 'spinner',
          message: '已加入购物车',
          onClose: () => {
            // that.$router.go(-1)
          }
        }
      )
    },
    goCar () {
      this.$router.push('/car')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    add () {
      this.item.num++
    },
    reduce () {
      if (this.item.num <= 1) { return }
      this.item.num--
    }
  },
  created () {
    this.item.data = this.$store.state.goodsItem
    let data = this.$store.state.goodsItem
    for (let i = 0; i < 5; i++) {
      this.item.images.push(data.image)
    }
  }
}
</script>

<style scoped>
.imgBox img{
width: 100%;
}
.price {
  display: flex;
  font-size: 1.2em;
  box-sizing: border-box;
  padding: 0 2em;
}
.price > div {
  margin-left: 4em;
  border: 1px solid #999;
  height: 1.4em;
  line-height: 1.4em;
}
.handle {
  display: flex;
  height: 45px;
  align-items: center;
  padding-left: 2em;
  font-size: 1.2em;
}
.handle > p:nth-of-type(1) {
  margin-right: 3em;
}
.handle > p:nth-of-type(2) {
  border: 1px solid #999;
  height: 35px;

}
.handle > p span {
  display: inline-block;
  width: 1.4em;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  line-height: 35px;
}
.handle > p span:nth-of-type(2) {
  min-width: 1.6em;
  height: 100%;
}

.handle > p span:nth-of-type(1) {
  font-size: 1.4em;
  border-right: 1px solid #999;
}
.handle > p span:nth-of-type(3) {
  border-left: 1px solid #999;
  font-size: 1.4em;
}
.price i {
  font-style: normal;
  color: red;
  font-weight: bold;
  margin-right: 3em;
}
.price img {
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
  margin-left: 0.3em;
}
.title {
  font-size: 1.6em;
  text-indent: 2em;
  padding: 0.4em;
  line-height: 1.2;
}
.footer {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: red; */
  background-color: #fff;
  border-top: 1px solid #ccc;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.footer img {
  width: 2.2em;
  height: 2.2em;
}
.footer p:nth-of-type(2) {
  width: 8em;
  font-size: 1.2em;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  background-color: red;
  margin: 0 2em 0 1em;
  border-radius: 20px;
}
.addCar {
  width: 5em;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 0.9em;
  position: relative;
}
.goodsNum {
  display: inline-block;
  height: 1.4em;
  line-height: 1.4em;
  color: #fff;
  position: absolute;
  top: 0;
  right: .2em;
  min-width: 1.4em;
  background-color: red;
  border-radius: 50%;
  padding: 0.1em;
}
.swiper {
  margin-top: 50px;
}
.swiper img {
  width: 100%;
  height: 20em;
}
</style>
