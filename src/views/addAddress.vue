<template>
  <div class='addAddress'>
    <van-nav-bar title="添加收货地址"
                 left-text="返回"
                 right-text="保存"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="body">
      <van-cell-group>
        <van-field :value="username"
                   required
                   label="用户名"
                   icon="question-o"
                   :clickable="true"
                   placeholder="请输入用户名"
                   :error-message="nameErrorMsg"
                   @blur="nameBlur" />

        <van-field :value="phone"
                   label="手机号"
                   type="number"
                   :required='true'
                   placeholder="请输入手机号"
                   :error-message="phoneErrorMsg"
                   @blur="phoneBlur" />
        <van-field :value="areaRes"
                   label="所在区域"
                   :required='true'
                   :readonly="true"
                   @click.native="showArea"
                   is-link />
        <van-field :value="areaDetail"
                   label=""
                   type="textarea"
                   placeholder="请输入详细地址"
                   @input.native="changeArea"
                   autosize />
        <div v-if="this.index!=null"
             class="delete">
          <van-button @click.native="deleteItem"
                      type="warning">删 &nbsp;&nbsp;&nbsp;&nbsp;除</van-button>
        </div>
      </van-cell-group>
      <div class="area"
           v-show="showAreaFlag">
        <van-area :area-list="areaList"
                  columns-num="3"
                  title="标题"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="confirm"
                  @cancel="cancel" />
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { mapMutations } from 'vuex'
import areaList from '../assets/js/area'
export default {
  name: 'addAddress',
  data () {
    return {
      showAreaFlag: false,
      areaRes: '',
      username: '',
      nameErrorMsg: '',
      phone: '',
      phoneErrorMsg: '',
      areaDetail: '',
      index: null
    }
  },
  computed: {
    areaList () {
      return areaList
    }
  },
  methods: {
    ...mapMutations(['addAdressList', 'editAdress', 'delItem']),
    deleteItem () {
      this.delItem(this.index)
      this.$router.push('/addressList')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

      if (!this.username) {
        Dialog.alert({
          title: '提示',
          message: '姓名不能为空'
        }).then(() => {
          // on close
        });
      } else if (!this.phone) {
        Dialog.alert({
          title: '提示',
          message: '电话不能为空'
        }).then(() => {
          // on close
        });
      } else if (!this.areaRes) {
        Dialog.alert({
          title: '提示',
          message: '请选择所在区域'
        }).then(() => {
          // on close
        });
      } else if (!this.areaDetail) {
        Dialog.alert({
          title: '提示',
          message: '请填写详细地址'
        }).then(() => {
          // on close
        });
      } else {
        let obj = {
          username: this.username,
          phone: this.phone,
          areaRes: this.areaRes,
          areaDetail: this.areaDetail,
          checked: false
        }
        console.log(this.index+'')
        
        if (this.index+'' != 'null') {
          let data = {
            data: obj,
            index: this.index
          }
          this.editAdress(data)
        } else {
console.log(999)
          this.addAdressList(obj)
        }
        this.$router.push('/addressList')
      }
    },
    changeArea (ev) {
      this.areaDetail = ev.target.value
    },
    showArea () {
      this.showAreaFlag = true
    },
    phoneBlur (ev) {
      let s = ev.target.value
      let flag = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(s)

      if (!flag) {
        this.phoneErrorMsg = "请输入正确手机号"
        this.phone = ''
      } else {
        this.phone = s
        this.phoneErrorMsg = ""
      }
    },

    nameBlur (ev) {
      let s = ev.target.value
      if (!s) {
        this.nameErrorMsg = "请输入姓名"
      } else {
        this.username = s
        this.nameErrorMsg = ""
      }
    },

    confirm (ev) {
      console.log(ev)
      let s = ''
      let res = new Set()
      ev.forEach((item, index) => {
        res.add(item.name)
      })
      this.areaRes = [...res].join('')
      this.showAreaFlag = false
    },
    cancel () {
      this.showAreaFlag = false
    }
  },
  created () {
    let data = this.$route.query.data
    let index = this.$route.query.index
    console.log(data)
    if (data) {

      this.username = data.username
      this.phone = data.phone
      this.areaRes = data.areaRes
      this.areaDetail = data.areaDetail
      this.index = index
    }
  }
}
</script>

<style scoped>
.delete {
  text-align: center;
}
.body {
  background: red;
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 50px;
  left: 0;
}
.area {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>