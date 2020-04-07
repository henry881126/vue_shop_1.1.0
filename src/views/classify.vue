<template>
  <div class='classify'>
    <van-nav-bar title="分类"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
    <div class="body">
      <div class="leftContent">
        <div class="left"
             ref="left">
          <div :class="{'active':active==index}"
               v-for="(item,index) in leftNav"
               :key="index"
               @click="checkItem($event,index)">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="rightContent">
        <div class="right">
          <div v-for="(item,index) in goods" :key="index" @click="goDetail(item)">
            <img :src="item.image" alt="" srcset="">
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '../../static/bscroll.min'
export default {
  name: 'classify',
  data () {
    return {
      active: 0,
      leftNav: [
      ],
      scrollLeft: null,
      scrollRight: null,
      goods: []
    }
  },
  mounted () {
    this.leftScroll()
    this.rightScroll()
  },
  methods: {
    checkItem (e, val) {
      this.active = val
      this.getMsg()
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    leftScroll () {
      // probe 侦测
      // 0和1都是不实时侦测位置
      // 2在手指滚动过程侦测，手指离开后的惯性滚动不侦测
      // 3只要滚动，都侦测
      // eslint-disable-next-line no-undef
      this.scrollLeft = new BScroll('.leftContent', {
        probeType: 3, // 是否实时侦测页面的滚动，
        // 可取值0,1都是不侦测实时位置
        // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动不侦测
        // 3:只要是滚动都侦测
        click: true, // 默认content元素的click无效，默认false，设true生效
        // 一般设为true
        pullUpLoad: true// 拉倒底部触发
      })
      this.scrollLeft.on('scroll', (position) => {
        // 滚上去的高度大于二分之一屏，点击头部，可以滚动到中间
        // that.y=Math.abs(position.y)

      })
    },
    rightScroll () {
      // probe 侦测
      // 0和1都是不实时侦测位置
      // 2在手指滚动过程侦测，手指离开后的惯性滚动不侦测
      // 3只要滚动，都侦测
      // eslint-disable-next-line no-undef
      this.scrollRight = new BScroll('.rightContent', {
        probeType: 3, // 是否实时侦测页面的滚动，
        // 可取值0,1都是不侦测实时位置
        // 2：在手指滚动的过程中侦测，手指离开后的惯性滚动不侦测
        // 3:只要是滚动都侦测
        click: true, // 默认content元素的click无效，默认false，设true生效
        // 一般设为true
        pullUpLoad: true// 拉倒底部触发
      })
    },
    goDetail (item) {
      this.$store.state.goodsItem = item
      this.$router.push({name: 'detail'})
    },
    getMsg () {
      this.goods.splice(0)
      this.$axios.get('/home/data')
        .then((res) => {
          let data = res.data.data
          data.forEach((item, index) => {
            this.goods.push(item)
          })
        })
    }
  },
  created () {
    // this.half=Math.floor(window.screen.height/2)
    this.$axios.get('/classify')
      .then((res) => {
        this.leftNav = res.data.data
      })
    this.getMsg()
  }

}
</script>

<style scoped>
.body {
  position: absolute;
  top: 52px;
  right: 0;
  bottom: 50px;
  left: 0;
}
.rightContent{
  /* float: right; */
  width: 100%;
  padding-left: 9em;
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  bottom: 0;
  overflow: hidden;
}
.right{
  display: flex;
  flex-wrap: wrap;
}
.right>div{
  width: 50%;
  text-align: center;
  margin-bottom: 1em;
}
.right>div>p{
  text-align: left;
  padding: 0 1em;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.leftContent {
  position: absolute;
  top: 0px;
  bottom: 0;
  overflow: hidden;
  z-index: 999;
}
.left {
  border-right: 1px solid #ccc;
}
.left > div {
  height: 3em;
  line-height: 3em;
  text-align: center;
  width: 7em;
  font-size: 1.2em;
  position: relative;
}
.left > div::after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #999;
}

.left > div.active {
  color: blue;
  font-weight: 600;
}
.left > div.active::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 60%;
  background-color: blue;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>
