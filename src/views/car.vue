<template>
  <div class='car'>
    <van-nav-bar title="购物车"
                 left-text="返回"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft" />
    <div class="body">
      <div class="content">
        <div v-for="item in myGoodsData"
             :key="item.id"
             class="itemBox"
             @touchstart="start($event,item)"
             @touchmove="move(item)"
             @touchend="end(item)">
          <div class="left">
            <van-checkbox v-model="item.checked"
                          @click.native="check(item)"></van-checkbox>
          </div>
          <div class="right">
            <div><img :src="item.images[0]"
                   alt=""></div>
            <div class="info">
              <p class="title">{{item.data.title+item.data.title}}</p>
              <div>
                <p style="font-size:1.2em;color:red;">￥{{item.data.price}}</p>
                <p class="handle">
                  <span @click="add(item)">+</span>
                  <span>{{item.num}}</span>
                  <span @click="reduce(item)">-</span>
                </p>
              </div>
            </div>
          </div>
          <div class="delete"  :ref="item.id" >
            <div class="deleteContent">
             删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar :price="totalPrice"
                    button-text="提交订单"
                    @submit="onSubmit">
      <van-checkbox v-model="checked"
                    @click.native="checkAll">全选</van-checkbox>
      <span slot="tip">
        提示：长按可删除选中商品
      </span>
    </van-submit-bar>
  </div>
</template>

<script>
import BScroll from '../../static/bscroll.min'
import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'car',
  data () {
    return {
      checked: false,
      timeEvn: null,
      myGoodsData: []
    }
  },
  mounted () {
    // probe 侦测
    // 0和1都是不实时侦测位置
    // 2在手指滚动过程侦测，手指离开后的惯性滚动不侦测
    // 3只要滚动，都侦测

    // eslint-disable-next-line no-undef
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

    })
  },
  watch: {
    myGoodsData () {
      for (let i = 0; i < this.myGoodsData.length; i++) {
        if (!this.myGoodsData[i].checked) {
          this.checked = false
          return
        }
      }
      this.checked = true
    }
  },
  beforeMount () {
    let data = this.myGoodsData
    for (let i = 0; i < data.length; i++) {
      if (!data[i].checked) {
        this.checked = false
        return
      }
    }
    this.checked = true
  },
  computed: {
    ...mapState(['myGoods']),
    totalPrice () {
      let total = 0
      this.myGoodsData.forEach((item, index) => {
        if (item.checked) {
          total += item.num * item.data.price
        }
      })
      return total * 100
    }
  },
  methods: {
    ...mapMutations(['clearCar', 'updatedMyGoods']),
    start ($event, item) {
      console.log(item)
      let className = $event.target.className
      if (className === 'deleteContent') {
        for (let i = 0; i < this.myGoodsData.length; i++) {
          if (this.myGoodsData[i].id === item.id) {
            this.$refs[item.id][0].style.display = 'none'
            this.myGoodsData.splice(i, 1)
            this.updatedMyGoods(this.myGoodsData)
            break
          }
        }
      } else {
        console.log(this.$refs[item.id])
        this.$refs[item.id][0].style.display = 'none'
      }

      this.timeEvn = setTimeout(() => {
        item.showDel = true
        this.$refs[item.id][0].style.display = 'block'
      }, 600)
    },
    move (item) {
      clearTimeout(this.timeEvn)
    },
    end (item) {
      clearTimeout(this.timeEvn)
    },
    checkAll () {
      this.checked = !this.checked
      if (this.checked) {
        this.myGoodsData.forEach((item, index) => {
          item.checked = true
        })
      } else {
        this.myGoodsData.forEach((item, index) => {
          item.checked = false
        })
      }
    },
    check (item) {
      item.checked = !item.checked
      let data = this.myGoodsData
      for (let i = 0; i < data.length; i++) {
        if (!data[i].checked) {
          this.checked = false
          return
        }
      }
      this.checked = true
    },
    add (item) {
      item.num++
    },
    reduce (item) {
      if (item.num <= 1) { return }
      item.num--
    },
    onSubmit () {
      // 判断是否有选择的商品
      let subFlag = false
      this.myGoodsData.forEach((item, index) => {
        if (item.checked) {
          subFlag = true
        }
      })
      if (!subFlag) {
        Toast.fail('请选择商品')
        return
      }
      let noCheck = []
      let check = []
      this.myGoodsData.forEach((item, index) => {
        if (!item.checked) {
          noCheck.push(item)
        } else {
          check.push(item)
        }
      })
      this.myGoodsData = noCheck
      let goodsObj = {
        noCheck: noCheck,
        check: check
      }
      this.clearCar(goodsObj)
      this.updatedMyGoods(this.myGoodsData)
      this.$toast(
        {
          type: 'success',
          forbidClick: true,
          loadingType: 'spinner',
          message: '支付成功',
          onClose: () => {

            // that.$router.go(-1)
          }
        }
      )
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  created () {
    this.myGoodsData = JSON.parse(JSON.stringify(this.myGoods))
    console.log(this.myGoodsData)
    for (let i = 0; i < this.myGoodsData.length; i++) {
      let timestamp = Math.random().toString(36).substring(2) + i
      // console.log(this.myGoods[i])
      this.myGoodsData[i].id = timestamp
    }
  }
}
</script>

<style scoped>
.delete{
  position: relative;
  display: none;
}
.deleteContent{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  background-color: red;
  height: 100%;
  width: 4em;
  line-height: 100%;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
}
.itemBox{
  position: relative;
}
.body {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 85px;
  left: 0;
  overflow: hidden;
}
.content > div {
  display: flex;
  justify-content: "space-between";
  margin-bottom: 1em;
}
.right {
  display: flex;
  flex: 1;
}
.left {
  width: 5em;
}
.handle {
  border: 1px solid #ccc;
}
.handle span {
  display: inline-block;
  min-width: 1.4em;
  text-align: center;
  font-size: 1.2em;
}
.handle span:nth-of-type(2) {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.title {
  font-size: 1em;
  padding: 0 0.5em;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.2em 0;
}
.info > div {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  padding-top: 50px;
}
</style>
