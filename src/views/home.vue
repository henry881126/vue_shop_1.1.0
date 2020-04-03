<template>
  <div class="home">
    <van-nav-bar title="首页"
                 fixed
                 border />
    <div class="classify1"
         @click="changeClassify"
         v-if="showClass">
      <div data-type='pop'
           :class="{'active':curType=='pop'}">流行</div>
      <div data-type='new'
           :class="{'active':curType=='new'}">新品</div>
      <div data-type='sell'
           :class="{'active':curType=='sell'}">热卖</div>
    </div>
    <div class="body"
         ref="scroll">
      <div class="content">
        <van-swipe :autoplay="3000"
                   class="swiper"
                   indicator-color="#fff">
          <van-swipe-item v-for="(image, index) in images"
                          :key="index">
            <img v-lazy="image" style="width:100%"/>
          </van-swipe-item>
        </van-swipe>
        <div class="tuijian">
          <div v-for="(item,index) in tuijian"
               :key="index">
            <img :src="item.image"
                 alt=""><span>{{item.title}}</span>
          </div>
        </div>
        <div class="classify"
             @click="changeClassify"
             v-show="!showClass">
          <div data-type='pop'
               :class="{'active':curType=='pop'}">流行</div>
          <div data-type='new'
               :class="{'active':curType=='new'}">新品</div>
          <div data-type='sell'
               :class="{'active':curType=='sell'}">热卖</div>
        </div>
        <div class="goods">
          <div class="item"
               v-for="(item,index) in goods[curType].list"
               :key="index"
               @click="goDetail(item)">
            <img :src="item.image"
                 @load="imageLoad"
                 alt="">
            <p>{{item.title}}</p>
            <p class="info">
              <span class="price">￥{{item.price}}</span>
              <span class="cfav">
                {{item.cfav}} <img src="../assets/img/common/collect.svg" />
              </span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="backTop" v-show="showBackTop" @click="backTop">
      <img src="../assets/img/common/top.png" alt="" >
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {mapState, mapMutations} from 'vuex'
import BScroll from '../../static/bscroll.min'
export default {
  name: 'home',
  data () {
    return {
      showBackTop: false,
      showClass: false,
      goods: {
        pop: { page: 0, list: [], position: 0 },
        new: { page: 0, list: [], position: 0 },
        sell: { page: 0, list: [], position: 0 }
      },
      curType: 'pop',
      images: [
      ],
      tuijian: [],
      scroll: null
    }
  },
  mounted () {
    // alert(8)
    let that = this
    // probe 侦测
    // 0和1都是不实时侦测位置
    // 2在手指滚动过程侦测，手指离开后的惯性滚动不侦测
    // 3只要滚动，都侦测
    this.scroll = new BScroll('.body', {
      probeType: 3, // 是否实时侦测页面的滚动，
      // 可取值0,1都是不侦测实时位置
      // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动不侦测
      // 3:只要是滚动都侦测
      click: true, // 默认content元素的click无效，默认false，设true生效
      // 一般设为true
      pullUpLoad: true// 拉倒底部触发
    })
    // 对应new BScroll参数probeType 值为2或3的回调函数
    this.scroll.on('scroll', (position) => {
      if (position.y <= -425) {
        this.showClass = true
      } else {
        this.showClass = false
      }
      if (position.y <= -800) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
      this.goods[this.curType].position = position.y
    })
    // 同上，对应pullUpLoad为true的回调
    this.scroll.on('pullingUp', () => {
      async function aa () {
        await that.getGoods(that.curType)
        that.scroll.finishPullUp()
      }
      aa()
    })
    // 指定滚动到具体位置
    // bs.scrollTo(x,y,time)
    // let btn = document.querySelector('button')
    // btn.addEventListener('click', function () {
    //   bs.scrollTo(0, 0, 500)
    // })
  },
  methods: {
    ...mapMutations(['setGoodsItem']),
    goDetail (item) {
      item.id = Math.random().toString(36).substring(2)
      this.setGoodsItem(item)
      this.$router.push({name: 'detail'})
    },
    backTop () {
      this.scroll.scrollTo(0, 0, 600)
    },
    imageLoad () {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    changeClassify (event) {
      this.curType = event.target.dataset.type
      // this.scroll&&this.scroll.scrollTo(0,this.goods[this.curType].position,0)
    },
    onChange (index) {
      // eslint-disable-next-line no-undef
      Toast('当前 Swipe 索引：' + index)
    },
    getGoods (type) {
      let page = ++this.goods[type].page
      this.$axios.get('/home/data?type=' + type + '&page=' + page)
        .then((res) => {
          let data = res.data.data
          data.forEach((item, index) => {
            this.goods[type].list.push(item)
          })
        })
    }
  },
  created () {
    this.$axios.get('/home/lunbotu')
      .then((res) => {
        this.images = res.data.data
      })
    this.$axios.get('/home/tuijian')
      .then((res) => {
        this.tuijian = res.data.data
        // this.images = res.data.data
      })
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
    this.imageLoad()
  }
}
</script>

<style scoped>
.backTop{
  position: fixed;
  bottom: 3em;
  right: 1em;
  z-index: 9999;
  transform: scale(0.6);
}
.cfav {
  display: flex;
  width: 2em;
  align-items: center;
}
.price {
  color: red;
}
.info {
  display: flex;
  justify-content: space-between;
  height: 1.5em;
  line-height: 1.5em;
}
.body {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
.item img {
  width: 70%;
  height: 70%;
}

.item p:nth-of-type(1) {
  min-height: 2em;
  padding: 0 2em;
  text-align: left;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.1;
}
.item p:nth-of-type(2) {
  padding: 0 4em;
}
.item {
  width: 49%;
  text-align: center;
}
.goods {
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.active::after {
  content: "";
  display: block;
  width: 30%;
  background-color: blue;
  height: 4px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.classify {
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.classify > div {
  line-height: 40px;
  height: 100%;
  width: 33.3%;
  text-align: center;
}
.classify1 {
  height: 40px;
  position: fixed;
  z-index: 9;
  background-color: #fff;
  top: 44px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.classify1 > div {
  line-height: 40px;
  height: 100%;
  width: 33.3%;
  text-align: center;
}
.tuijian {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 1em;
}
.tuijian > div {
  display: flex;
  flex-direction: column;
  width: 25%;
  text-align: center;
  justify-content: center;
}
.tuijian > div img {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: 0 auto;
}
.tuijian > div span {
  display: block;
  text-align: center;
  line-height: 2em;
  margin-bottom: 0.8em;
}
.swiper {
  height: 170px;
  margin-top: 44px;
}
.swiper image {
  width: 100%;
}
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.center {
  text-align: center;
}
</style>
