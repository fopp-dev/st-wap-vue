<template>
  <div>
    <!-- <mt-header  title="">
        <router-link to="/list" slot="left"></router-link>
        <mt-button slot="left" icon="search" @click="toSearch"></mt-button>
    </mt-header> -->
    <mt-search
      style="height:auto;"
      fixed
      @click.enter.native="toSearch"
      placeholder="可输入股票代码或简拼"
    >
    </mt-search>
    <ul class="table-list">
      <li class="title">
        <div>
          <ul class='clearfix'>
            <li class="li-title">股票</li>
            <li class="li-base">最新</li>
            <li class="li-base">涨跌幅</li>
            <li class="li-base">涨跌</li>
          </ul>
        </div>
      </li>
    </ul>

    <ul class="table-list table-list-body"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li class="list-body" v-for="item in list" :key="item.key">
        <div>
          <ul class="clearfix"
              :class="item.nowPrice-item.preclose_px<0?'green':item.nowPrice-item.preclose_px==0?'':'red'"
              @click='toDetail(item)'>
            <li class="li-title">
              <p class="name">
                <!-- <i class="iconfont icon-r red"></i> -->
                {{item.name}}
              </p>
              <p class="code" style="padding-left: 0px">
                <i v-if="item.stock_plate != '科创'"
                   :class="item.stock_type == 'sz'?'iconfont shen-mark hushen-mark':'iconfont hushen-mark'">{{item.stock_type
                  == 'sz'?'深':'沪'}}</i>
                <i v-else class="iconfont kechuang-mark">科创</i>
                {{item.code}}
              </p>
            </li>
            <li class="li-base">
              <span>{{item.nowPrice?Number(item.nowPrice).toFixed(2):'-'}}</span>
            </li>
            <li class="li-base">
              <span v-if="item.nowPrice == 0">-</span>
              <span v-else>{{item.nowPrice-item.preclose_px>0 ?'+':''}} {{item.hcrate?item.hcrate:'0'}}%</span>
            </li>
            <li class="li-base no-bold">
              <span v-if="item.nowPrice == 0">-</span>
              <span
                v-else>{{item.nowPrice-item.preclose_px>0 ?'+':''}}{{(item.nowPrice-item.preclose_px).toFixed(2)}}</span>
            </li>
          </ul>
        </div>

      </li>
    </ul>
    <div v-if="list.length<=0" class="load-all text-center">
      <mt-spinner type="fading-circle"></mt-spinner>
    </div>
    <div v-show="loading" class="load-all text-center">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </div>
    <div v-show="!loading && list.length>0" class="load-all text-center">
      已全部加载
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../../components/foot/foot'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {
    foot
  },
  props: {
    selectedNumber: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 15,
      currentNum: 15,
      list: [],
      timer: '',
      market: [],
      changeTextClass: {},
      total: 0
    }
  },
  watch: {
    selectedNumber (val) {
      if (val === '2') {
        this.getStock()
        this.timer = setInterval(this.refreshList, 5000)
      } else {
        clearInterval(this.timer)
      }
    }
  },
  computed: {},
  created () {
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
  },
  methods: {
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
        stockPlate: '',
        pageNum: this.pageNum,
        pageSize: 15
      }
      let data = await api.getStock(opt)
      if (data.status === 0) {
        data.data.list.forEach(element => {
          this.list.push(element)
        })
        this.total = data.data.total
      } else {
        Toast(data.msg)
      }
    },
    async refreshList () {
      if (this.loading) {
        return
      }
      let opt = {
        stockPlate: '',
        pageNum: 1,
        pageSize: this.currentNum
      }
      let data = await api.getStock(opt)
      this.list = data.data.list
      // 刷新大盘指数
      // let result = await api.getIndexMarket()
      // this.changeTextClass = {}
      // if(result.status == 0){
      //     // this.market = result.data.market
      //     result.data.forEach((element,i) => {
      //     this.changeTextClass[i] = ''
      //     if(element.currentPoint != this.market[i].currentPoint){
      //         this.changeTextClass[i] = true // 设置对应的动画过滤
      //         this.market[i].currentPoint = element.currentPoint
      //         this.market[i].floatPoint = element.floatPoint
      //         this.market[i].floatRate = element.floatRate
      //     }
      //     });
      // }else{
      //     Toast(result.msg)
      // }
    },
    async loadMore () {
      if (this.list.length < 10 || this.pageNum * this.pageSize >= this.total) {
        return
      }
      this.loading = true
      // clearInterval(this.timer)
      // 加载下一页
      this.pageNum++
      this.currentNum = this.pageNum * this.pageSize
      await this.getStock()
      this.loading = false
    },
    toDetail (val) {
      // 详情
      this.$router.push({
        path: '/listdetail',
        query: {
          code: val.code
          // name: val.name
        }
      })
    },
    toSearch () {
      this.$router.push('/searchlist')
    },
    toIndexList () {
      this.$router.push('/indexlist')
    }
  }
}
</script>
<style lang="less" scoped>
  @fontColor: #cfd0d1;

  .table-list-body {
    // padding-top:0.62rem;
    // margin-top: 40px;
  }

  .table-list {
    .li-title {
      width: 34%;
    }

    .li-base {
      width: 22%;
      text-align: center;

      &.no-bold {
        span {
          font-weight: 400;
        }
      }
    }
  }

  .table-list .title {
    position: static;
  }

  .page-part {
    margin-top: 40px;
    margin-bottom: 0px;
    border-bottom: 0.027rem solid #202020;

    .box-title {
      border-bottom: 0.027rem solid #202020;
      background-color: #1f523c;
      animation: obgFadeOut .8s ease forwards;
    }
  }

  @keyframes obgFadeOut {
    to {
      background: rgba(0, 0, 0, 0)
    }
  }

  .box-title {
    background-color: #5c1d29;
  }

  /*大盘指数*/
  .box-contain {
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
      margin: 0.05rem 0.5%;
      margin-top: 0;
      text-align: center;
      padding: 0.1rem 0;
      background: none !important;

      p {
        margin-top: 0.1rem;
      }

      .name {
        color: @fontColor;
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
