
<template>
  <div class='addressList'>

    <van-nav-bar title="我的收货地址"
                 left-text="返回"
                 right-text="添加地址"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="body">
      <div class="empty"
           v-show="!adressList.length">
        暂无地址
      </div>
      <div else>
        <van-radio-group :value="radio+''">

          <div class="item"
               v-for="(item,index) in adressList"
               :key="index">
            <img src="../assets/img/profile/message.png"
                 alt="">
            <div>
              <p><em>{{item.username}}</em><span>{{item.phone}}</span></p>
              <p class="adress">{{item.areaRes+' '+item.areaDetail}}</p>
            </div>
            <div class="right">
              <van-radio @click.native="onChange(index+1)"
                         :name="index+1+''">设为默认地址 </van-radio>
              <p style="margin-top:.4em;">
                <van-button 
                size="small" 
                plain  
                round 
                type="primary"
                @click.native="edit(index)">编辑</van-button>
              </p>
            </div>
          </div>
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'addressList',
  data () {
    return {
      isEmpty: true,
      checked: true
    }
  },
  computed: {
    ...mapState(['adressList', 'radio'])
  },
  methods: {
    ...mapMutations(['changeRadio']),
    edit(index){
      this.$router.push({path:'/addAddress',
      query:{
        data:this.adressList[index],
        index:index}})
    },
    onChange (index) {
      this.changeRadio(index + '')
    },
    onClickLeft () {
      this.$router.push('/my')
    },
    onClickRight () {
      this.$router.push('/addAddress')
    }
  },
  created () {
    // this.radio=this.radio+''
  }
}
</script>

<style scoped>
.item {
  display: flex;
  min-height: 90px;
  align-items: center;
  padding: 0 1em;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin-bottom: 0.4em;
}
.item .right {
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-50%);
}
.item .right>p{
  font-size: 1.3em;
  text-align: center;
}
.item > div {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.adress {
  line-height: 1.5em;
  font-size: 1.2em;
  width: 12em;
}
.item img {
  margin-right: 1em;
}
em {
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
}
em + span {
  font-size: 1.4em;
  margin-left: 1em;
}
.body {
  padding-top: 50px;
  background-color: #eee;
  min-height: 100vh;
  padding-bottom: 50px;
}
.empty {
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
  padding-bottom: 40%;
  box-sizing: border-box;
}
</style>