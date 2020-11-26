<template>
  <div>
    <div class="account-box">
      <!-- <div class="header">
          <i style="color:#ff7602" class="iconfont icon-zhishuyidong"></i>大盘指数
          <a class="pull-right" @click="toIndexList()">更多<i class="iconfont icon-you"></i></a>
      </div> -->
      <div class="content">
        <div class="box page-part">
          <div class="box-contain clearfix">
            <div :class="i.floatPoint<0?'tab greenBg':'tab redBg'" v-for="(i,index) in market" v-if="index < 3"
                 :key="i.key">
              <p :index='index' class="name">{{i.indexName}}</p>
              <p :class="changeTextClass[index] == true?'price heartBeat':'price'">
                {{Number(i.currentPoint).toFixed(2)}}</p>
              <div class="status">
                <span :class="i.floatPoint<0?'pifting green':'pifting red'">{{Number(i.floatPoint).toFixed(2)}}</span>
                <span :class="i.floatRate<0?'Percentage green':'Percentage red'">{{i.floatRate}}%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="account-box">
      <div class="header">
        <i style="color:#ff7602" class="iconfont icon-zhishuyidong"></i>沪深
        <a class="pull-right" @click="toStock()">更多<i class="iconfont icon-you"></i></a>
      </div>
      <div class="content">
        <div class="box page-part">
          <div class="box-contain clearfix">
            <div :class="i.floatPoint<0?'tab greenBg':'tab redBg'" v-for="(i,index) in stockList" v-if="index < 6"
                 :key="i.key">
              <p :index='index' class="name">{{i.name}}</p>
              <p :class="changeTextClass[index] == true?'price heartBeat':'price'">{{Number(i.nowPrice).toFixed(2)}}</p>
              <div class="status">
                <span :class="i.hcrate<0?'pifting green':'pifting red'">{{Number(i.hcrate).toFixed(2)}}</span>
                <span :class="i.hcrate<0?'Percentage green':'Percentage red'">{{i.hcrate}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.$store.state.settingForm.kcStockDisplay" class="account-box">
      <div class="header">
        <i style="color:#a65b66" class="iconfont icon-chicangzhong"></i>科创板
        <a class="pull-right" @click="toStockList()">更多<i class="iconfont icon-you"></i></a>
      </div>
      <div class="content">
        <div class="box page-part">
          <div class="box-contain clearfix">
            <div :class="i.floatPoint<0?'tab ':'tab '" v-for="(i,index) in stockKechuangList" v-if="index < 6"
                 :key="i.key">
              <p :index='index' class="name">{{i.name}}</p>
              <p :class="changeTextClass[index] == true?'price heartBeat':'price'">{{Number(i.nowPrice).toFixed(2)}}</p>
              <div class="status">
                <span :class="i.hcrate<0?'pifting green':'pifting red'">{{Number(i.hcrate).toFixed(2)}}</span>
                <span :class="i.hcrate<0?'Percentage green':'Percentage red'">{{i.hcrate}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.$store.state.settingForm.futuresDisplay" class="account-box">
      <div class="header">
        <i style="color:#4e6c99" class="iconfont icon-qihuo"></i>期货
        <a class="pull-right" @click="toFuturesList()">更多<i class="iconfont icon-you"></i></a>
      </div>
      <div class="content">
        <div class="box page-part">
          <div class="box-contain clearfix">
            <div :class="i.floatPoint<0?'tab greenBg':'tab redBg'" v-for="(i,index) in futuresList" v-if="index < 3"
                 :key="i.key">
              <p :index='index' class="name">{{i.futuresName}}</p>
              <p><span class="futures-code">{{i.futuresCode}}</span></p>
              <p :class="changeTextClass[index] == true?'price heartBeat':'price'">{{Number(i.nowPrice).toFixed(2)}}</p>
              <!-- <div class="status">
                <span :class="i.floatPoint<0?'pifting green':'pifting red'">{{Number(i.nowPrice).toFixed(2)}}</span>
                <span :class="i.floatRate<0?'Percentage green':'Percentage red'">{{i.coinCode}}%</span>
              </div> -->
            </div>
            <!-- <div class="more" @click="toIndexList">
                <i class="iconfont icon-you"></i>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'

export default {
  components: {},
  props: {
    changeNavOptions: {
      type: Function,
      default: function () {}
    }
  },
  data () {
    return {
      market: [],
      changeTextClass: {},
      pageNum: 1,
      pageSize: 15,
      stockList: [],
      futuresList: [],
      stockKechuangList: []
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getProductSetting()
  },
  mounted () {
    this.getMarket()
    // this.getStock()
    this.getFutures()
    this.getKechuangStock()
  },
  methods: {
    async getProductSetting () {
      let data = await api.getProductSetting()
      if (data.status === 0) {
        this.$store.state.settingForm = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    async getMarket () {
      // 获取大盘指数
      let result = await api.getIndexMarket()
      if (result.status === 0) {
        this.market = result.data
      } else {
        Toast(result.msg)
      }
    },
    async getStock () {
      let opt = {
        pageNum: this.pageNum,
        pageSize: 15
      }
      let data = await api.getStock(opt)
      if (data.status === 0) {
        this.stockList = data.data.list
      } else {
        Toast(data.msg)
      }
    },
    async getKechuangStock () {
      let opt = {
        stockPlate: '科创',
        pageNum: this.pageNum,
        pageSize: 15
      }
      let data = await api.getStock(opt)
      if (data.status === 0) {
        this.stockKechuangList = data.data.list
      } else {
        Toast(data.msg)
      }
    },
    async getFutures () {
      // 获取期货列表
      let opt = {
        homeShow: 1,
        pageNum: this.pageNum,
        pageSize: 15
      }
      let data = await api.getHomeFutures(opt)
      if (data.status === 0) {
        this.futuresList = data.data
      } else {
        Toast(data.msg)
      }
    },
    toStockList () {
      this.$router.push({
        path: '/list',
        query: {
          index: '3'
        }
      })
      // this.changeNavOptions('3')
    },
    toFuturesList () {
      this.$router.push({
        path: '/list',
        query: {
          index: '4'
        }
      })
      // this.changeNavOptions('4')
    },
    toIndexList () {
      this.$router.push({
        path: '/list',
        query: {
          index: '1'
        }
      })
      // this.changeNavOptions('1')
    }
  }
}
</script>
<style lang="less" scoped>
  @fontColor: #cfd0d1;

  .account-box {
    margin-bottom: 0.12rem;
    padding: 0 0.2rem;

    .header {
      font-size: 0.22rem;
      line-height: 0.7rem;

      > .iconfont {
        color: #f5ca07;
      }

      .iconfont {
        font-size: 0.24rem;
        vertical-align: middle;
        margin: 0 0.05rem;
      }
    }

    .content {
      padding: 0.18rem 0.2rem 0.18rem;

      li {
        width: 50%;
        float: left;
        padding: 0.2rem 0.2rem 0.04rem 0.56rem;
        line-height: 0.36rem;
        position: relative;

        &:nth-child(2) {
          .iconfont {
            color: #2f97fc;
          }
        }

        &:nth-child(3) {
          .iconfont {
            color: #17b780;
          }
        }

        &:nth-child(3) {
          .iconfont {
            color: #ff7602;
          }
        }

        .iconfont {
          position: absolute;
          top: 0.38rem;
          left: 0;
          font-size: 0.42rem;
          color: #fd4256;

        }

        .name {
          color: #888;
          font-size: 0.22rem;
        }

        .number {
          font-size: 0.27rem;
        }

        .yellow {
          color: #fff;
        }
      }
    }
  }

  .page-part {
    margin-bottom: 0px;
    // border-bottom: 0.027rem solid #202020;
    .box-title {
      border-bottom: 0.027rem solid #202020;
      background-color: #1f523c;
      animation: obgFadeOut .8s ease forwards;
    }
  }

  .futures-code {
    color: #ff9800;
    border: 0.01rem solid #ff9800;
    padding: 0.01rem 0.06rem;
    font-size: 0.22rem;
    margin-bottom: 0.1rem;
  }

  /*大盘指数*/
  .box-contain {
    //   background-color: #282c32;
    min-height: 1.3rem;

    .more {
      position: absolute;
      right: 0;
      padding-top: 0.5rem;
      padding-right: 0.2rem;
      cursor: pointer;
    }

    .tab {
      float: left;
      width: 31%;
      margin: 0.05rem 1%;
      margin-top: 0;
      text-align: center;
      padding: 0.1rem 0;
      background: none !important;

      p {
        margin-top: 0.1rem;
      }

      .name {
        font-size: .22rem;
      }

      .price {
        font-size: 0.34rem;
      }

      .status {
        margin-top: 0.1rem;
        font-size: .22rem;
      }
    }
  }
</style>
