<template>
  <div>
    <!-- <mt-header fixed  title="期货">
        <router-link to="/list" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header> -->
    <ul class="table-list">
      <li class="title">
        <div>
          <ul class='clearfix'>
            <li class="li-title">名称</li>
            <li class="li-base">最新</li>
            <!-- <li class="li-base">基币</li> -->
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
          <ul class="clearfix" :class="item.floatPoint<0?'green':item.floatPoint==0?'':'red'" @click='toDetail(item)'>
            <li class="li-title">
              <p class="name">
                <!-- <i :class="item.transState == 1?'iconfont icon-jiaoyi':'iconfont icon-jinzhi'"></i> -->
                {{item.futuresName}}
              </p>
              <p class="code" style="padding-left: 0px">
                <span class="futures-code" style="float: left;">{{item.futuresCode}}</span>
              </p>
            </li>
            <li class="li-base now-price-li">
              <p class="now">{{item.nowPrice?Number(item.nowPrice).toFixed(2):'-'}}</p>
               <!-- {{item.coinCode}} -->
              <!-- <p class="exchange"> ≈ {{(item.nowPrice * item.coinRate).toFixed(2)}}CNY</p> -->
            </li>
            <!-- <li class="li-base no-bold">
                <span>{{item.coinCode}}</span>
            </li> -->
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
    <!-- <div class="footer-btn">
        <p class="red">*注：
            <span><i class="iconfont icon-jiaoyi red"></i>表示该期货可交易</span>
            <span class="pull-right"><i class="iconfont icon-jinzhi yellow"></i>表示该期货不可交易</span>
        </p>
    </div> -->
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
      timer: ''
    }
  },
  watch: {
    selectedNumber (val) {
      if (val === '4') {
        this.getListMarket()
        this.timer = setInterval(this.refreshList, 5000)
      } else {
        clearInterval(this.timer)
      }
    }
  },
  computed: {},
  created () {
    sessionStorage.setItem('qihuo2.0', '')
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
  },
  methods: {
    async getListMarket () {
      // 获取期货列表
      let result = await api.getFutures()
      if (result.status === 0) {
        this.list = result.data
      } else {
        Toast(result.msg)
      }
    },
    async refreshList () {
      if (this.loading) {
        return
      }
      let opt = {
        pageNum: 1,
        pageSize: this.currentNum
      }
      let data = await api.getFutures(opt)
      this.list = data.data
    },
    async loadMore () {
      if (this.list.length < 100) {
        return
      }
      this.loading = true
      // clearInterval(this.timer)
      // 加载下一页
      this.pageNum++
      this.currentNum = this.pageNum * this.pageSize
      await this.getFutures()
      this.loading = false
    },
    async toDetail (val) {
      // 先查询该期货是否可买

      // 可买
      if (val.transState === 1) {
        // this.$router.push({
        //   path: '/futuresBuy',
        //   query: {
        //     info: val
        //   }
        // })
        this.$router.push({
          path: '/listdetail',
          query: {
            code: val.futuresGid,
            qhinfo: val
            // name: val.name
          }
        })
      } else {
        Toast('该期货暂不能交易!')
      }
    },
    toSearch () {
      this.$router.push('/indexsearchlist')
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper {
    padding-bottom: 1.6rem;
  }

  .table-list-body {
    padding-top: 0.62rem;
    margin-top: 26px;
  }

  .table-list {
    ul {
      .li-title {
        width: 56%;

        .name {
          .iconfont {
            background: none;
            color: #d50000;

            &.icon-jinzhi {
              color: #ff9800
            }
          }
        }
      }
    }

    .li-base {
      width: 44%;
      text-align: center;
      text-align: right;
      padding-right: 0.4rem;

      &.no-bold {
        span {
          font-weight: 400;
        }
      }
    }
  }

  .footer-btn {
    position: fixed;
    z-index: 1;
    width: 100%;
    padding-right: 0;
    bottom: 0.94rem;
    padding: 0.2rem;
    // height: 1.1rem;
    // line-height: .1rem;
    box-shadow: 0px 0px 4px rgba(6, 0, 1, 0.2);

    .iconfont {
      margin: 0 0.1rem;
      font-size: 0.28rem;

      &.yellow {
        color: #ff9800;
      }
    }
  }

  .now-price-li {
    .now {
      font-size: 0.28rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
    }

    .exchange {
      font-size: 0.22rem;
      line-height: 0.2rem;
      // color: #ddd;
    }
  }
</style>
