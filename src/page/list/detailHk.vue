<template>
  <div class="wrapper">
    <div class="header">
      <mt-header :title="detail.name+' ('+detail.code+')'">
        <router-link to="/list" slot="left">
          <mt-button icon="back">行情</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="page-part detail-part ">
      <!-- 明细 -->
      <div class="clearfix">
        <div class="pull-left col-xs-7">
          <p :class="detail.nowPrice - detail.preclose_px <0?'price green':'price red'">{{detail.nowPrice}}</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'gain green':'gain red'">{{detail.hcrate}}%</p>
        </div>
        <div class="pull-right col-xs-5">
          <ul class="price-detail text-center">
            <li>
              <p class="title">昨收</p>
              <p :class="detail.nowPrice - detail.preclose_px <0?'number green':'number red'">{{detail.preclose_px}}</p>
            </li>
            <li>
              <p class="title">今开</p>
              <p :class="detail.nowPrice - detail.preclose_px <0?'number green':'number red'">{{detail.open_px}}</p>
            </li>
            <li>
              <p class="title">最高</p>
              <p :class="detail.nowPrice - detail.preclose_px <0?'number green':'number red'">{{detail.today_max}}</p>
            </li>
            <li>
              <p class="title">最低</p>
              <p :class="detail.nowPrice - detail.preclose_px <0?'number green':'number red'">{{detail.today_min}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="row detail-list">
        <div class="col-xs-4">
          <p class="title">成交量</p>
          <p class="number">{{(Number(detail.business_amount)/100/10000).toFixed(2)}}万</p>
        </div>
        <div class="col-xs-6">
          <p class="title">成交额</p>
          <p class="number">{{(Number(detail.business_balance)/100000000).toFixed(2)}}亿</p>
        </div>
      </div>
    </div>
    <div class="page-part box-part">
      <!-- 图 -->
      <imgBox :code="$route.query.code" :imgList='detail' />
    </div>
    <div class="page-part">
      <ul class="stock-price clearfix">
        <!-- <li class="text-center pull-left" v-for="item in buyList" :key="item.key">
            <p>买①</p>
            <p class="red">{{item.price}}</p>
            <p>{{item.price2}}</p>
        </li> -->
        <li class="text-center pull-left">
          <p>买①</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.buy1}}</p>
          <p>{{(Number(detail.buy1_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>买②</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.buy2}}</p>
          <p>{{(Number(detail.buy2_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>买③</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.buy3}}</p>
          <p>{{(Number(detail.buy3_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>买④</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.buy4}}</p>
          <p>{{(Number(detail.buy4_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>买⑤</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.buy5}}</p>
          <p>{{(Number(detail.buy5_num)/100).toFixed(2)}}</p>
        </li>
      </ul>
    </div>
    <div class="page-part">
      <ul class="stock-price clearfix">
        <li class="text-center pull-left">
          <p>卖①</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.sell1}}</p>
          <p>{{(Number(detail.sell1_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>卖②</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.sell2}}</p>
          <p>{{(Number(detail.sell2_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>卖③</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.sell3}}</p>
          <p>{{(Number(detail.sell3_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>卖④</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.sell4}}</p>
          <p>{{(Number(detail.sell4_num)/100).toFixed(2)}}</p>
        </li>
        <li class="text-center pull-left">
          <p>卖⑤</p>
          <p :class="detail.nowPrice - detail.preclose_px <0?'green':'red'">{{detail.sell5}}</p>
          <p>{{(Number(detail.sell5_num)/100).toFixed(2)}}</p>
        </li>
      </ul>
    </div>
    <div class="agree-footer text-center">
      <div v-if="$store.state.userInfo.email" class="btn-box clearfix">
        <a v-if="!isOptionOpt" class="pull-left bottom-btn" href="javascript:;" @click="addOptions">添加自选</a>
        <a v-if="isOptionOpt" class="pull-left bottom-btn" href="javascript:;" @click="deteleOptions">删除自选</a>
        <a class="pull-left bottom-btn on" href="javascript:;" @click="toBuy">马上下单</a>
        <!-- <mt-button :class="agree?'btn btn-red':'btn btn-default'" size="small" @click="toBuy()">确定</mt-button> -->
        <!-- <mt-button class="btn btn-cancel" size="small" @click="toBuy">取消</mt-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import imgBox from './compontent/img'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {
    imgBox
  },
  props: {},
  data () {
    return {
      detail: {
        'name': '',
        'code': '0',
        'spell': '',
        'gid': '',
        'nowPrice': '0',
        'hcrate': 0,
        'today_max': '0',
        'today_min': '0',
        'business_balance': '0',
        'business_amount': '0',
        'preclose_px': '0',
        'open_px': '0',
        'buy1': '0',
        'buy2': '0',
        'buy3': '0',
        'buy4': '0',
        'buy5': '0',
        'sell1': '0',
        'sell2': '0',
        'sell3': '0',
        'sell4': '0',
        'sell5': '0',
        'buy1_num': '0',
        'buy2_num': '0',
        'buy3_num': '0',
        'buy4_num': '0',
        'buy5_num': '0',
        'sell1_num': '0',
        'sell2_num': '0',
        'sell3_num': '0',
        'sell4_num': '0',
        'sell5_num': '0'
      }, // 详情
      buyList: [
        { price: 0, price2: 0 },
        { price: 0, price2: 0 },
        { price: 0, price2: 0 },
        { price: 0, price2: 0 },
        { price: 0, price2: 0 }
      ],
      isOptionOpt: false, // 是否已经添加自选
      timer: null,
      qhinfo: {},
      zsinfo: {},
      loading: false
    }
  },
  watch: {},
  computed: {},
  created () {
    this.timer = setInterval(this.refreshList, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.getDetail()
    if (this.$store.state.userInfo.phone) {
      // 判断是否登录
      this.getOpation()
    } else {
      // 获取用户信息
      this.getUserInfo()
    }
    this.qhinfo = this.$route.query.qhinfo
    this.zsinfo = this.$route.query.zsinfo
  },
  methods: {
    async getUserInfo () {
      // 获取用户信息
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.$store.state.userInfo = data.data
        this.getOpation()
      } else {
        Toast(data.msg)
      }
      this.$store.state.user = this.user
    },
    async refreshList () {
      if (this.loading) {
        return
      }
      this.getDetail()
    },
    async getOpation () {
      let opts = {
        code: this.$route.query.code
      }
      let data = await api.isOption(opts)
      if (data.status === 0) {
        // 0 --> 未添加
        this.isOptionOpt = false
      } else {
        this.isOptionOpt = true
      }
    },
    async getDetail () {
      let opts = {
        code: this.$route.query.code
      }
      this.loading = true
      let data = await api.getSingleStockGg(opts)
      this.loading = false
      if (data.status === 0) {
        this.detail = data.data
      } else {
        Toast(data.msg)
      }
    },
    async addOptions () {
      //   if(!this.$store.state.userInfo.phone){
      //     MessageBox.confirm('您还未登录，是否去登录?').then(action => {
      //         this.$router.push('/login')
      //     });
      //     return
      //   }
      let data = await api.addOption({ code: this.$route.query.code,type:'hk' })
      if (data.status === 0) {
        Toast('添加自选成功')
        this.isOptionOpt = true
      } else {
        Toast(data.msg)
      }
    },
    async deteleOptions () {
      let data = await api.delOption({ code: this.$route.query.code,type:'hk' })
      if (data.status === 0) {
        Toast('删除自选股成功')
        this.isOptionOpt = false
      } else {
        Toast(data.msg)
      }
    },
    async toBuy () {
      //期货
      if(this.$route.query.code != undefined && this.$route.query.code.indexOf('hf_')!=-1){
        this.$router.push({
          path: '/futuresBuy',
          query: {
            info: this.qhinfo
          }
        })
      } else if(this.$route.query.code != undefined && (this.$route.query.code.indexOf('sh')!=-1 || this.$route.query.code.indexOf('sz')!=-1)){
        this.$router.push({
          path: '/indexBuy',
          query: {
            info: this.zsinfo
          }
        })
      } else{
        this.$router.push(
        {
          name: 'buy',
          params: {
            gid: this.detail.id,
            name: this.detail.name,
            code: this.detail.code,
            hcrate: this.detail.hcrate,
            nowPrice: this.detail.nowPrice,
            stockType: 1, // 港股
          }
        })
      }
      
    }
  }
}
</script>
<style lang="less" scoped>
  .btn-box{
    padding: 0;
  }
  .mint-header {
    background: #21252a;
  }
  .page-part{
    // background: #21252a;
    padding:0.3rem;
    margin-bottom: 0.1rem;
    border-bottom: 0.01rem solid #676b6f;
  }
  .stock-price li{
    width: 20%;
    p{
      height: 0.34rem;
      line-height: 0.34rem;
    }
  }
  .detail-part{
    .price{
      font-size: 0.56rem;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      padding-bottom: 0.2rem;
    }
    .gain{
      font-size: 0.24rem;
    }
    .title{
      line-height: 0.36rem;

    }
    .number{
      line-height: 0.36rem;

    }
    .price-detail{
      li{
        width: 50%;
        float: left;
        margin-bottom: 0.16rem;
      }
    }
    .detail-list{
      padding-left:0.3rem;
    }
  }
  .box-part{
    padding: 0;
  }
</style>
