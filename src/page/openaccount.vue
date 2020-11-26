<template>
  <div class="wrapper">
    <mt-header fixed title="开户">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="content-box">
      <el-steps :active="0" class="steps-box" align-center>
        <el-step title="注册"></el-step>
        <el-step title="认证"></el-step>
        <el-step title="入金"></el-step>
        <el-step title="交易"></el-step>
      </el-steps>
      <ul class="list">
        <li class="animated fadeInLeft">
          <i class="iconfont icon-zengzhifuwu"></i>
          <h3>行情分发,极速稳定</h3>
          <p>专线直连交易所,毫秒级下单速度</p>
        </li>
        <li class="animated fadeInRight">
          <i class="iconfont icon-yonghu1"></i>
          <h3>客户至上,优享服务</h3>
          <p>灵活投资、实现收益最大化</p>
        </li>
        <li class="animated fadeInLeft">
          <i class="iconfont icon-jisu1"></i>
          <h3>极速开户,超高配额</h3>
          <p>0资金门槛,无需线下见证</p>
        </li>
      </ul>

    </div>
    <div class="btnbox animated fadeInUp text-center">
        <span class="btnok" @click="toLogin">
            去登录
        </span>
      <span class="btnok" @click="toRegister">
            去注册
        </span>
    </div>
    <div class="bottom-prompt">
      <h2 class="text-center">开户前请准备好</h2>
      <ul class="list list2 clearfix">
        <li>
          <i class="iconfont icon-shenfenzhengzhengjian"></i>
          <h3>身份证</h3>
          <p>有效期内的二代身份证</p>
        </li>
        <li>
          <i style="font-size:0.76rem;" class="iconfont icon-yinhangqia1"></i>
          <h3>银行卡</h3>
          <p>户名与身份证一致的银行卡</p>
        </li>
        <li>
          <i class="iconfont icon-wifi"></i>
          <h3>WIFI网络</h3>
          <p>3G/4G网络</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import { Toast } from 'mint-ui'
// import { isNull, isPhone } from '@/utils/utils'
// import * as api from '@/axios/api'

export default {
  data () {
    return {}
  },
  created () {
    this.$setgoindex()
  },
  mounted () {

  },
  methods: {
    toLogin () {
      // 登录
      this.$router.push('/loginEmail')
    },
    toRegister () {
      // 注册
      this.$router.push('/registerEmail')
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
  .wrapper {
    padding: 1rem 0rem 0.3rem;

    .content-box {
      padding-top: 0.3rem;
    }
  }

  .list {
    padding: 0.3rem 0.5rem;

    li {
      position: relative;
      padding: 0.25rem 0.1rem;
      padding-left: 1.1rem;
      padding-bottom: 0.3rem;

      h3 {
        font-size: 0.3rem;
        margin-bottom: 0.15rem;
      }

      p {
        line-height: 0.3rem;
        color: #999;
        font-size: 0.24rem;
      }
    }

    .iconfont {
      position: absolute;
      left: 0;
      font-size: 0.8rem;
      color: #ff6006;
      top: 0.22rem;
    }
  }

  .list2 {
    padding: 0.4rem 0.6rem;

    li {
      width: 48%;
      float: left;
      padding-left: 1rem;
    }

    li:nth-child(2) {
      margin-left: 2%;
    }
  }

  .bottom-prompt {
    margin-top: 0.5rem;

    h2 {
      font-size: 0.3rem;
    }
  }

  .btnbox {
    width: 100%;
  }

  .btnbox .btnok {
    width: 40%;
    /*height: 0.92rem;*/
    margin: 20px auto 0 auto;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    border-radius: 0.46rem;
    // background: #d50000;
    margin: 4.5%;
  }

</style>
