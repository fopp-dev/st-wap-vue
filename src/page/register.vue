<template>
  <div class="wrapper">
    <div class="text-center">
      <img class="banenr" :src="logo" alt="logo">
    </div>
    <div class="forms">
      <div class="form-view">
        <!-- <icon class="form-ic" name="phone" slot="icon"></icon> -->
        <i class="iconfont icon-yonghu"></i>
        <input type="tel" pattern="[0-9]*" placeholder="手机号码" v-model="phone">
      </div>
      <div class="form-view" v-if="$store.state.siteInfo.smsDisplay">
        <i class="iconfont icon-yanzhengma"></i>
        <input type="number" pattern="[0-9]*" placeholder="验证码" v-model="code">
        <span v-if="codeshow" class="getcode" @click="checkCodeBox">获取验证码</span>
        <span v-if="!codeshow" class="getcode">{{count}}s</span>
      </div>
      <div class="form-view">
        <!-- <icon class="form-ic" name="safe" slot="icon"></icon> -->
        <i class="iconfont icon-lr_password"></i>
        <input type="password" placeholder="密码为6~12位，数字、字母或符号" v-model="psd">
      </div>
      <div class="form-view">
        <!-- <icon class="form-ic" name="safe" slot="icon"></icon> -->
        <i class="iconfont icon-lr_password"></i>
        <input type="password" placeholder="请再次确认密码" v-model="psd2">
      </div>
      <div class="form-view">
        <i class="iconfont icon-tuijian"></i>
        <input type="text" v-model="invitecode" placeholder="输入机构代码">
      </div>
    </div>
    <div class="chebox">
      <i @click="isAgree"
         :class="agree?'glyphicon glyphicon glyphicon-ok-sign red':'glyphicon glyphicon-ok-circle'"></i>
      我已阅读并同意
      <a @click="toagreeUrl">《注册协议》</a>
    </div>
    <div class="btnbox">
      <span class="btnok" @click="gook">确定</span>
    </div>
    <div class="back">
      已有账户？<a href="javascript:;" @click="goLogin">返回登录</a>
    </div>
    <!-- <mt-popup v-model="logindialogShow" :closeOnClickModal="false" class="mint-popup-box mint-popup-white">
        <div class="clearfix">
            <a @click="logindialogShow = false" class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
        </div>
        <iframe :src="agreeUrl" frameborder="0"></iframe>
        <div class="text-center">
            <mt-button type="primary" @click="logindialogShow">我已阅读并同意注册协议</mt-button>
        </div>
    </mt-popup> -->
    <mt-popup v-model="dialogShow" :closeOnClickModal="false" class="mint-popup-box mint-popup-white">
      <div class="clearfix">
        <a @click="dialogShow = false" class="pull-right"><i class="iconfont icon-weitongguo"></i></a>
      </div>
      <div class="">
        <div class="row check-box">
          <div class="title">
            输入图片上的验证码
          </div>
          <mt-field label="验证码" placeholder="请输入验证码" v-model="code2">
            <img @click="refreshImg" :src="adminUrl+'/code/getCode.do?time='+ imgCodeTime" height="45px" width="100px">
          </mt-field>
          <p class="red" v-if="!checkCodeState">您输入的验证码有误,请重新输入</p>
          <div class="text-center">
            <mt-button type="primary" @click="checkImg">确定</mt-button>
            <!-- <mt-button style="margin-left: 10%;width:22%" type="default" @click="dialogShow = false">返回</mt-button> -->
          </div>
        </div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { isNull, isPhone, pwdReg } from '@/utils/utils'
// import APIUrl from '@/axios/api.url'
import * as api from '@/axios/api'

export default {
  data () {
    return {
      phone: '',
      code: '',
      code2: '',
      psd: '',
      psd2: '',
      invitecode: '',
      codeshow: true,
      count: '', // 倒计时
      clickFalg: 0, //  点击次数
      imgCode: '',
      adminUrl: '',
      dialogShow: false, // 显示弹窗
      ischeckImg: false,
      checkCodeState: true,
      dialogImgShow: false, // 图片显示
      logo: '',
      agree: false,
      logindialogShow: false, // 注册协议
      agreeUrl: '', // 注册协议地址
      siteInfo: {},
      imgCodeTime: 0
    }
  },
  mounted: function () {
    if (this.$route.query.code) {
      this.invitecode = this.$route.query.code
    }
    this.getInfoSite()
  },
  methods: {
    async getInfoSite () {
      // 获取 logo
      let data = await api.getInfoSite()
      if (data.status === 0) {
        this.logo = data.data.siteLogoSm
        this.agreeUrl = data.data.regAgree
        this.siteInfo = data.data
        if(this.siteInfo.smsDisplay === false){
            this.code = '6666'
        }
        this.$store.state.siteInfo = this.siteInfo
        this.invitecode = this.siteInfo.agentCode
      } else {
        Toast(data.msg)
      }
    },
    checkCodeBox () {
      if (isNull(this.phone) || !isPhone(this.phone)) {
        Toast('请输入正确的手机号')
      } else {
        this.checkPhone()
      }
    },
    async checkCode () {
      let data = await api.checkCode({ code: this.code2 })
      this.ischeckImg = data
    },
    async checkImg () {
      if (!this.code2) {
        Toast('您输入的验证码有误,请重新输入')
        this.checkCodeState = false
        return
      }
      // await this.checkCode()
      let data = await api.checkCode({ code: this.code2 })
      if (data === 'true' || data === true) {
        this.getcode()
        this.dialogShow = false
        this.checkCodeState = true
      } else {
        Toast('您输入的验证码有误,请重新输入')
        this.checkCodeState = false
        this.adminUrl = process.env.API_HOST + '1'
        this.adminUrl = process.env.API_HOST
        if (this.adminUrl === undefined) {
          this.adminUrl = ''
        }
      }
    },
    async getcode () {
      // if(!this.checkCode()){
      //     // 验证图形码是否正确
      //     Toast('请输入正确图形验证码')
      //     return
      // }
      // 获取验证码
      if (this.clickFalg !== 0) {
        this.clickFalg = 0
        return
      }
      this.clickFalg++
      //   var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      let reg = /^[0-9]{11}$/ // 手机号码验证
      if (isNull(this.phone)) {
        Toast('手机号不可为空')
      } else {
        if (!reg.test(this.phone)) {
          Toast('请输入正确的手机号码')
        } else {
          //   var sign  = this.$md5(this.phone+'W&WzL42v').toUpperCase()
          let result = await api.getCode({ phoneNum: this.phone })
          if (result.status === 0) {
            const TIME_COUNT = 60
            if (!this.timer) {
              this.count = TIME_COUNT
              this.codeshow = false
              this.clickFalg = 0
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.codeshow = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            } else {
              Toast(result.msg)
            }
          } else {
            Toast(result.msg)
          }
        }
      }
    },
    async checkPhone () {
      // 先验证是否已经注册
      let data = await api.checkPhone({ phoneNum: this.phone })
      if (data.status === 0) {
        // 如果用户已存在返回 0
        Toast('用户已注册,请登录')
        this.$router.push('/login')
      } else {
        this.dialogShow = false
        this.adminUrl = process.env.API_HOST
        if (this.adminUrl === undefined) {
          this.adminUrl = ''
        }
        // this.gook()
        this.getcode()
      }
    },
    async gook () {
      // 注册
      if (!this.agree) {
        Toast('需同意注册协议才能注册!')
      } else if (isNull(this.phone) || !isPhone(this.phone)) {
        Toast('请输入正确的手机号码')
      } else if (isNull(this.psd)) {
        Toast('请输入密码')
      } else if (isNull(this.psd2)) {
        Toast('请确认密码')
      } else if (isNull(this.code)) {
        Toast('请输入验证码')
      } else if (this.psd !== this.psd2) {
        Toast('两次输入的密码不一致')
        this.password = 0
        this.password2 = 0
      } else if (!pwdReg(this.psd)) {
        Toast('密码为6~12位，数字、字母或符号')
      } else if (isNull(this.invitecode)) {
        Toast('请输入机构代码')
      } else {
        let opts = {
          // agentCode:'4023', // SR330001
          phone: this.phone,
          yzmCode: this.code,
          userPwd: this.psd,
          agentCode: this.invitecode
        }
        let data = await api.register(opts)
        if (data.status === 0) {
          Toast('注册成功，请登录')
          this.$router.push('/login')
        } else {
          Toast(data.msg)
        }
      }
    },
    goLogin: function () {
      this.$router.push('/login')
    },
    refreshImg () {
      this.adminUrl = ''
      this.imgCodeTime = Date.now()
      this.dialogImgShow = false
      let this_ = this
      setTimeout(function () {
        this_.adminUrl = process.env.API_HOST
        if (this_.adminUrl === undefined) {
          this_.adminUrl = ''
        }
        this_.dialogImgShow = true
      }, 500)
    },
    isAgree () {
      let i = false
      let j = true
      this.agree = this.agree ? i : j
    },
    toagreeUrl () {
      this.$router.push('/agree')
    }
  }
}
</script>
<style lang="less" scoped>
  body {
    background-color: #fff;
  }

  .wrapper {
    color: #888;
    padding: 4%;
  }

  .mint-field .mint-cell-value {
    padding-left: 0;
  }

  .mint-popup-box {
    // width: 100%;
    // height: 100%;
    // background:#fff;
    .title {
      font-size: 0.43rem;
      margin-bottom: 0.34rem;
      // margin-top: 1.40rem;
      padding: 0.1rem 0.4rem;
      color: #333;
    }

    .mint-cell {
      background: none;
      color: #000;
      width: 100%;
    }

    /deep/ .mint-cell-text {
      color: #000;
    }

    .mint-cell-wrapper {
      border: 0.02rem solid #ddd;
    }

    .mint-button {
      margin-top: 0.2rem;
      width: 60%;
    }

    .check-box {
      .text-center {
        padding-top: 0.2rem;
      }

      p {
        padding: 0.2rem 0.4rem;
      }

    }
  }

  .check-box-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .check-box {
      width: 60%;
      height: 2rem;
      background: #fff;
      position: absolute;
      top: 20%;
      left: 0;
      right: 0;
      margin: 0 auto;
      border-radius: 0.2rem;
      padding: 0.2rem;

      .mint-cell {
        background: none;
      }
    }
  }

  .text-center {
    width: 100%;
    padding: 0.52rem;
  }

  img.banenr {
    width: 60%;
    width: 36%;
    height: auto;
  }

  .forms {
    // width: 92%;
    margin: 0.3rem 0;
    // height: 110px;
    // float: left;
    border-radius: 8px;
    // background: #ffffff;
    /* box-shadow: 1px 1px 10px #cfcfcf; */
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

    .icon-tuijian {
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
    border-radius: 0;
    line-height: 40px;
    text-indent: 1.2rem;

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

  .getcode {
    position: absolute;
    right: 0.2rem;
    line-height: 0.9rem;
    color: #d50000;
    border-radius: 10px;
    padding: 0 0.2rem;
    top: 0.05rem;
  }

  .chebox {
    width: 80%;
    float: left;
    padding-left: 11%;
    line-height: 0.8rem;
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
    border: 1px solid #ff9600;
    background: white;
  }

  input[type='checkbox']:checked + label:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 3px;
    width: 3px;
    height: 8px;
    border: solid #ff9600;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .btnbox {
    /* float: left; */
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
    background: #d50000;
  }

  .aggre {
    color: #ff7e00;
  }

  .back {
    font-size: 0.25rem;
    margin-top: 0.3rem;
    text-align: center;
    color: #666;
  }

  .back a {
    border-bottom: 1px solid #888;
    padding-bottom: 0.06rem;

  }
</style>
