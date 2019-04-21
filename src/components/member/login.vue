<template>
  <div>
    <div class="login-bpdy">
      <div id="mhz">
        <!-- header -->
        <div class="personal_header">
          <img src="../../image/goback.png" class="goBack">
          <span></span>
          <span></span>
        </div>
        <div class="personal_form">
          <!-- 手机登录 -->
          <div class="phoneLogin" v-show="!sin">
            <h2>手机登录</h2>
            <span>还没有账号？ <a href="">立即注册</a> </span>
            <div class="form-group-phone">
              <!-- 手机号 -->
              <div class="form-group">
                <div class="selectLeft">
                  <select class="form-control world" v-model="phoneQuick.couponSelected" @change="select">
                    <option v-for="(item, index) in areaCode" :key="index" :value="item.mobileCode">{{item.cnName}} (+{{item.mobileCode}})</option>
                  </select>
                </div>
                  <div class="inputRight">
                    <input type="number" class="form-control phoneNumber" v-model="phoneQuick.phone" @blur="phoneValt" placeholder="请输入手机号" >
                    <p class="ziDuan">{{phoneQuick.pValtxt}}</p>
                  </div>
              </div>
              <!-- 验证码 -->
              <div class="form-group ">
                <input type="number" name="" class="form-control MakeCodeInput" v-model="phoneQuick.pNumMcode" placeholder="请输入验证码">
                <img :src="MakeCode" alt="" onclick="this.src='https://hezidev.hongru.com.cn/Plugin/CheckCode/MakeCode.aspx?w=90&h=32&tm='+Math.random()" class="MakeCode" width="90" height="32" @click='MakeCodeTb1' ref="md1">
              </div>
              <!-- 手机验证码 -->
              <div class="form-group">
                <button name="dxyzm" id="phoneCode">获取手机验证码</button>
                <input type="text" name="" class="form-control phoneCodeIpt" v-model="phoneQuick.valt" placeholder="请输入手机验证码">
              </div>
            </div>
          </div>
          <!-- 账号密码登录 -->
          <div class="passwordLogin" v-show="sin">
            <h2>账号密码登录</h2>
            <span>还没有账号？ <a href="">立即注册</a> </span>
            <div class="form-group-phone">
              <!--邮箱 手机号 -->
              <div class="form-group ">
                <input type="text" class="form-control phoneOremail" placeholder="请输入邮箱或者手机号" v-model="accountLogin.txt">
                 <p class="ziDuan"><!-- ziduan --></p>
              </div>
              <!-- 密码 -->
              <div class="form-group ">
                <input type="password" name="" class="form-control" placeholder="请输入密码" v-model="accountLogin.pwd">
              </div>
              <!-- 手机验证码 -->
              <div class="form-group ">
                <input type="" name="" class="form-control MakeCodeInput" placeholder="请输入数字验证码" v-model="accountLogin.aNumMcode">
                <img :src="MakeCode" alt="" onclick="this.src='https://hezidev.hongru.com.cn/Plugin/CheckCode/MakeCode.aspx?w=90&h=32&tm='+Math.random()" class="MakeCode" width="90" height="32" @click='MakeCodeTb2' ref="md2">
              </div>
            </div>
          </div>
          <!-- 记住密码 -->
          <div class="form-group form-b">
            <div class="noLogin"><label for="rem"><input type="checkbox" name="30天内免登录" id="rem" v-model="isNoLogin" :checked="isNoLogin" @change="isLogin(isNoLogin)"><span>30天内免登录</span></label></div>
            <a href="" class="forget">忘记密码?</a>
          </div>
          <!-- 微信登录 -->
          <div class="weichatLogin"></div>
          
          <div class="personal_login" @click="handleLogin">登录</div>
          <div class="tab_login">
            <div class="tab_loginLeft" @click="sinTab">
              <img src="../../image/phone.png">
              <p>账号密码登录</p>
            </div>
            <div class="tab_loginRight">
              <img src="../../image/wechat.png">
              <p>微信登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiRequest from '@/api/index'

const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/ //手机号码
const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ //
export default {
  name: 'login',
  data () {
    return {
      sin: false, // 控制哪种登陆显示 true账号密码登陆  false手机快捷登陆
      areaCode: [], // 国际区号
      isNoLogin: false, //是否30天登陆 1：是，2：否
      isNoLoginCode: "1", //是否30天登陆 1：是，2：否
      MakeCode: "https://hezidev.hongru.com.cn/Plugin/CheckCode/MakeCode.aspx",
      phoneQuick: {
        phone: '', // 手机号
        pNumMcode: '', // 数字验证码
        valt: '', // 手机验证码
        pValtxt: '', // 手机格式验证提示
        couponSelected: '' // 默认选中 区号
      },
      accountLogin: {
        txt: '', // 账号or邮箱
        pwd: '', //密码
        aNumMcode: '' //验证码
      }
    }
  },
  created: function () {
    let _this = this
    apiRequest.getAreaCode()
      .then(data => {
        _this.areaCode = data.Result
        _this.phoneQuick.couponSelected = data.Result[0].mobileCode
      })
      .catch(err => {console.log(err)});
  },
  methods: {
    sinTab: function () {
      this.sin = !this.sin
    },
    MakeCodeTb1(){
      this.MakeCode = this.$refs.md1.src
    },
    MakeCodeTb2(ss){
      this.MakeCode = this.$refs.md2.src
    },
    // 手机快捷登陆blur
    phoneValt: function () {
      let phQck = this.phoneQuick
      if(!phonereg.test(phQck.phone)){
        phQck.pValtxt = "请输入有效的手机号码"
      }else{
        phQck.pValtxt = ''
      }
    },
    isLogin: function (n) {
      n?this.isNoLoginCode = "1":this.isNoLoginCode = "2"
    },
    // 选择国际区号
    select: function () {
      console.log(this.phoneQuick.couponSelected)
    },
    // 登录
    handleLogin: function () {
      this.Validation()
    },
    // 登录验证
    Validation: function() {
      let _this = this
      // 快捷登陆
      if(!_this.sin){
        let formData = _this.phoneQuick
        let param = {} //参数对象

        if(!phonereg.test(formData.phone)){
          alert("请输入有效的手机号码")
        }else if(!formData.pNumMcode){
          alert("请输入验证码")
        }else if(!formData.valt){
          alert("请输入手机验证码")
        }else{
          param = {
            phone: formData.phone,
            areaCode: formData.couponSelected,
            imgCode: formData.pNumMcode,
            smsCode: formData.valt,
            isNoLogin: _this.isNoLoginCode
          }
          console.log(param)
        }
      }
      //账号密码登录
      else{
        let formData = _this.accountLogin
        let param = {} //参数对象

        if(!formData.txt){
          alert("请输入账号")
        }else if(!formData.pwd){
          alert("请输入账号")
        }else if(!formData.aNumMcode){
          alert("请输入验证码")
        }else{
          param = {
            account: formData.txt,
            userPwd: formData.pwd,
            imgCode: formData.aNumMcode,
            isNoLogin: _this.isNoLoginCode
          }
          console.log(param)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  body{
    background-color: #fff !important;
  }
  .passwordLogin{
    display: block;
    h2{
      font-size: .6rem;
      margin-bottom: .3rem
    }
  }
  .noLogin {
    input,
    span{
      display: inline-block;
      vertical-align: middle;
    }
    span{padding-left: 5px;}
  }
  .form-group{
    position: relative;
    margin-bottom: 15px;
  }
  .form-control{
    display: block;
    width: 100%;
    height: 34px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  .MakeCodeInput{
    width: 73%;
    display: inline-block;
    vertical-align: middle;
  }
  .MakeCode{
    display: inline-block;
    vertical-align: middle;
  }
  .personal_login{
    box-shadow: 0 0 10px 3px rgba(0,0,0,.2)
  }
  #phoneCode{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 35%;
    float: right;
    border: none;
    background: 0 0;
    font-size: 14px;
    color: #333;
    background: none;
    padding: .15rem 0 .15rem .1rem;
  }
</style>
