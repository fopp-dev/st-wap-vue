<template>
  <div class="wrapper">
    <mt-header fixed title="">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="text-center">
      <img v-if="logo!=''" class="banenr" :src="logo" alt="logo">
    </div>
    <div class="forms">
      <div class="form-view">
        <!-- <icon class="form-ic" name="phone" slot="icon"></icon> -->
        <i class="iconfont icon-yonghu"></i>
        <input type="text" placeholder="邮箱" v-model="email">
      </div>
      <!-- <div class="form-view">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="number" pattern="[0-9]*" placeholder="验证码" v-model="code">
          <span v-if="codeshow" class="getcode" @click="getcode">获取验证码</span>
          <span v-if="!codeshow" class="getcode">{{count}}s</span>
      </div> -->
      <div class="form-view">
        <!-- <icon class="form-ic" name="safe" slot="icon"></icon> -->
        <i class="iconfont icon-lr_password"></i>
        <input type="password" autocomplete="new-password" pattern="[0-9]*" placeholder="请输入密码" v-model="psd">
      </div>
    </div>
    <!-- <div class="chebox">
        <span class="checked">
            <input id="checkcode" type="checkbox" :checked="isChecked" @click="handleDisabled"/>
            <label for="checkcode"></label>一天内自动登陆
        </span>
    </div> -->
    <div class="btnbox">
        <span class="btnok" @click="gook">
            确定
            <i v-show="isloading" style="color:#fff;" class="iconfont icon-jiazaizhong"></i>
        </span>
    </div>
    <div>
      <mt-button class="text-btn fl" type="default" @click="toForget">忘记密码</mt-button>
      <mt-button class="text-btn fr" type="default" @click="toRegister">注册</mt-button>
    </div>

  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { isNull, isPhone, isEmail } from '@/utils/utils'
import * as api from '@/axios/api'

export default {
  data () {
    return {
      isloading: false,
      email: '',
      code: '',
      psd: '',
      isChecked: true, // 自动登录
      isDisabled: false,
      codeshow: true,
      count: '', // 倒计时
      clickFalg: 0, //  点击次数
      logo: '' // 设置信息
    }
  },
  created: function () {
    this.$setgoindex()
  },
  mounted: function () {
    this.getInfoSite()
    this.email = this.$store.state.userInfo.phone
  },
  methods: {
    async getInfoSite () {
      // 获取 logo
      let data = await api.getInfoSite()
      if (data.status === 0) {
        this.logo = data.data.siteLogoSm
      } else {
        Toast(data.msg)
      }
    },
    async checkPhone () {
      // 先验证是否已经注册
      let data = await api.checkPhone({ phoneNum: this.phone })
      if (data.status === 0) {
        // 如果用户已存在返回 0
        this.loginIN()
      } else {
        Toast('用户还未注册,请先注册')
        // this.$router.push('/register')
      }
    },
    gook () {
      // 登录
      if (this.clickFalg !== 0) {
        this.clickFalg = 0
        return
      }
      this.clickFalg++
      //  || !isEmail(this.email)
      if (isNull(this.email)) {
        Toast('请输入正确的邮箱')
      } else if (isNull(this.psd)) {
        Toast('请输入密码')
      } else {
        this.loginIN()
      }
    },
    async loginIN () {
      let opts = {
        email: this.email,
        userPwd: this.psd
      }
      this.isloading = true
      let data = await api.loginEmail(opts)
      this.clickFalg = 0
      if (data.status === 0) {
        this.$store.state.userInfo.phone = this.phone
        // this.$store.state.userInfo.token = data.data.cookie
        this.clickFalg = 0
        // this.clearCookie()
        // this.setCookie(data.data.key,data.data.token,0)
        this.$router.push('/home')
      } else {
        Toast(data.msg)
      }
      this.isloading = false
    },
    handleDisabled: function () {
      this.isChecked = !this.isChecked
      if (this.isChecked === true) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    toForget () {
      // 忘记密码
      this.$router.push('/forgetEmail')
    },
    toRegister () {
      // 注册
      this.$router.push('/registerEmail')
    },
    toHome () {
      this.$router.push('/home')
    },
    goBack () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  body {
    background-color: #21252a;
  }

  .wrapper {
    color: #888;
    padding: 4%;
  }

  .text-center {
    //   padding: 0.52rem;
    padding: 1.4rem 0.52rem 0.42rem;
    //   background: #ffffff8a;
    border-radius: 0.3rem;
  }

  img.banenr {
    // width: 60%;
    width: 36%;
    height: auto;
  }

  .forms {
    margin: 0.3rem 0;
    border-radius: 8px;
  }

  .form-view {
    width: 90%;
    height: 1rem;
    position: relative;
    margin: 0 auto;
    margin-bottom: 0.14rem;

    .iconfont {
      padding: 0.3rem;
      vertical-align: middle;
      position: absolute;
      font-size: 0.4rem;
    }

    .icon-lr_password {
      font-size: 0.5rem;
    }
  }

  .form-view:first-child {
    margin-top: 12px;
  }

  .form-view input {
    display: block;
    width: 100%;
    height: 1rem;
    line-height: 40px;
    text-indent: 1.2rem;
    border-radius: 0;

    &:focus {
      border: 0 solid #ccc !important;
      border-radius: 0.695rem;
      border-bottom: none;
    }
  }

  .form-ic {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 5px;
  }

  .chebox {
    width: 90%;
    float: left;
    padding-left: 4%;
  }

  .checked {
    position: relative;
    display: block;
    /* float: left; */
    margin: 0 auto;
    font-size: 0.25rem;
    padding-left: 22px;
  }

  input[type='checkbox'] {
    display: none;
  }

  label {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 12px;
    height: 12px;
    border-radius: 10px;
    border: 1px solid #d50000;
    background: white;
  }

  input[type='checkbox']:checked + label:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 3px;
    width: 3px;
    height: 8px;
    border: solid #d50000;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }

  .btnbox {
    float: left;
    width: 100%;
  }

  .btnok {
    display: block;
    width: 85%;
    /*height: 0.92rem;*/
    margin: 30px auto 0 auto;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    border-radius: 0.46rem;
    // background: #d50000;
  }

  .aggre {
    color: #ff7e00;
  }

  .getcode {
    position: absolute;
    right: 0.4rem;
    line-height: 20px;
    color: #d50000;
    border-radius: 10px;
    bottom: 0.3rem;
  }
</style>
