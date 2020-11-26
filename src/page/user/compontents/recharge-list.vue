<template>
  <div>
    <div v-if="list.length<=0" class="empty text-center">
      暂无充值信息!
    </div>
    <div v-else>
      <ul
        class="table-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li class="list-body" v-for="(item) in list" :key="item.key">
          <div class="order-info-box">
            <div class="order-title">
                    <span class="main">
                        <i v-if="item.payChannel == 0 || item.payChannel == '支付宝'" style="color:#1296db;"
                           class="iconfont icon-zhifubao"></i>
                        <i v-if="item.payChannel == '微信' " style="color:#1296db;" class="iconfont icon-weixin"></i>
                        <i v-if="item.payChannel == 1 || item.payChannel == '对公转账'" style="color:#1296db;"
                           class="iconfont icon-yinlian"></i>
                        {{item.payChannel == 0?'支付宝充值':item.payChannel == 1?'对公转账':item.payChannel}}
                    </span>
              <span class="payNumber">{{item.payAmt}}</span>
              <span
                :class="item.orderStatus == 1?'green pull-right':item.orderStatus == 2?'red pull-right':'red pull-right'">
                        <!-- 1 => 成功 2 失败 3取消 4 等待 -->
                        {{item.orderStatus == 1?'充值成功':item.orderStatus == 2?'充值失败':item.orderStatus == 3?'取消充值':'审核中'}}
                        <i v-if="item.orderStatus == 1" class="iconfont icon-tongguo4 animated bounceIn"></i>
                        <i v-if="item.orderStatus==0" class="iconfont icon-dengdai animated bounceInDown"></i>
                        <i v-if="item.orderStatus == 2" class="iconfont icon-failure animated bounceInDown"></i>
                        <i v-if="item.orderStatus == 3"
                           class="iconfont icon-iconfontweitongguo animated bounceInDown"></i>
                    </span>
              <!-- <span class="secondary ">123456789</span> -->
            </div>
            <div class="order-info">
              <!-- <p class="clearfix">
                <span class="col-xs-5">{{item.orderDesc}}</span>
              </p> -->
              <p class="clearfix">
                <span class="col-xs-12">订单号:<b>{{item.orderSn}}</b></span>
              </p>
              <p class="clearfix">
                        <span class="secondary col-xs-6">时间:
                            <b v-if="item.addTime">{{new Date(item.addTime) | timeFormat}}</b>
                            <b v-else></b>
                        </span>
              </p>
              
               <p class="clearfix" v-if="item.vouImage!=null">
                打款凭证:<img :src="item.vouImage" style="width: 150px;height: 100px;">
              </p>

              <p class="clearfix" v-if="item.orderDesc!=''">
                <span class="col-xs-12">备注:<b>{{item.orderDesc}}</b></span>
              </p>
            </div>

          </div>
          <!-- <div class="capital">
              <div class="pro">
                  {{item.payChannel}} <span class="pull-right">金额:{{item.payAmt}}</span>
              </div>
              <div class=" clearfix">
                  <div class="col-xs-4"></div>
                  <div class="col-xs-8">
                      <span class="pull-right">
                          {{new Date(item.addTime) | timeFormat}}
                      </span>
                  </div>
              </div>
          </div> -->
        </li>
      </ul>
      <div v-show="loading" class="load-all text-center">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </div>
      <div v-show="!loading" class="load-all text-center">
        已全部加载
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {},
  props: {},
  data () {
    return {
      loading: false,
      list: [],
      pageNum: 1,
      pageSize: 15,
      total: 0
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.getListDetail()
  },
  methods: {
    async getListDetail () {
      let opt = {
        payChannel: '', // 支付方式
        orderStatus: '', // 订单状态
        pageNum: this.pageNum,
        pageSize: 15
      }
      let data = await api.rechargeList(opt)
      if (data.status === 0) {
        data.data.list.forEach(element => {
          this.list.push(element)
        })
        this.total = data.data.total
      } else {
        Toast(data.msg)
      }
    },
    async loadMore () {
      if (this.list.length < 10 || this.total <= this.pageNum * this.pageNum) {
        return
      }
      this.loading = true
      // 加载下一页
      this.pageNum++
      await this.getListDetail()
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper {
    padding-top: 0.9rem;
  }

  .table-list {
    padding: 0.2rem 0;

    .list-body {
      padding: 0.1rem 0.2rem;

      .capital:nth-child(1) {
        border-top: 0.01rem solid #3f444a;
      }

      .capital {
        padding: 0.2rem;
        // border-radius: 0.2rem;
        border-bottom: 0.01rem solid #3f444a;

        div {
          line-height: 0.4rem;
        }

        .col-xs-4 {
          padding-left: 0;
          padding-right: 0;
        }

        .pro {
          color: #999;
        }
      }
    }
  }

  .payNumber {
    font-size: 0.3rem;
  }
</style>
