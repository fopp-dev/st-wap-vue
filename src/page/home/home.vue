<template>
  <div class="wrapper">
    <div class="banner">
      <mt-swipe :show-indicators="true">
        <!-- <mt-swipe-item>
          <img class="img" src="../../assets/img/login.jpg" alt="banner">
        </mt-swipe-item> -->
        <template v-for="i in bannerList">
          <mt-swipe-item v-if="i.isM == '0'" :key="i.key">
            <div class="banner-box">
              <div class="box">
                <p class="title animated fadeInDown">{{i.banTitle}}</p>
                <p class="desc animated fadeInUp">{{i.banDesc}}</p>
                <a class="target-btn animated fadeInUp" v-if="i.targetUrl" :href="i.targetUrl">查看详情</a>
              </div>
              <img class="img" :src="i.bannerUrl" alt="banner">
            </div>
          </mt-swipe-item>
        </template>

        <!-- <mt-swipe-item>
          <img class="img" src="../../assets/img/bigbanner.jpg" alt="banner">
        </mt-swipe-item> -->
      </mt-swipe>
    </div>
    <div class="icon-router clearfix">
      <div class="col-xs-24 horseLampModule">
        <div class="horseLamp-box" v-if="artList.artTitle" @click="toAltDetail">
          <i class="iconfont icon-tongzhi"></i>
          <div class="wrap">
            <!-- // 外框，固定宽度 -->
            <div ref="box" id="box">
              <!-- // 内部滚动框 -->
              <div id="marquee">{{artList.artTitle}}</div>
              <!-- //展示的文字 -->
              <div id="copy"></div>
              <!-- // 文字副本，为了实现无缝滚动 -->
            </div>
            <div ref='node' id="node">{{artList.artTitle}}</div>
            <!-- //为了获取text实际宽度 -->
          </div>
          <!-- <span class="pull-right">{{new Date(artList.addTime).getFullYear()}}-{{new Date(artList.addTime).getMonth()+1}}-{{new Date(artList.addTime).getDate()}}</span> -->
        </div>
      </div>
      <!-- <div class="col-xs-3 text-center">
        <a class='icon-wrap animated zoomIn' @click="goList" href="javascript:;">
          <i class="iconfont icon-geguyanpan"></i>
        </a>
        <p>个股</p>
      </div> -->
      <div class="col-xs-3 text-center">
        <a class='icon-wrap animated zoomIn' @click="goList" href="javascript:;">
          <i class="iconfont icon-geguyanpan"></i>
        </a>
        <p>行情</p>
      </div>
      <div class="col-xs-3 text-center">
        <a class='icon-wrap animated zoomIn' @click="goOrderlist" href="javascript:;">
          <i class="iconfont icon-jijinchicang"></i>
        </a>
        <p>持仓</p>
      </div>
      <div class="col-xs-3 text-center">
        <a class='icon-wrap animated zoomIn' @click="goMyList" href="javascript:;">
          <i class="iconfont icon-zixuan"></i>
          <!-- <i class="iconfont icon-xinshou"></i> -->
        </a>
        <p>自选</p>
      </div>
      <div class="col-xs-3 text-center">
        <a class='icon-wrap animated zoomIn' @click="goMyinfo" href="javascript:;">
          <i class="iconfont icon-yonghu"></i>
          <!-- <i class="iconfont icon-xinshou"></i> -->
        </a>
        <p>我的</p>
      </div>
    </div>
    <div class="nav-bg page-part" @click="goList">
      <img class="img" src="../../assets/img/shangpinbg.png" alt="shangpinbg">
    </div>
    <AllList/>
    <div v-show="false" class="box  page-part">
      <div class="box-title">
        <span class="left"></span>大盘指数
      </div>
      <div class="box-contain clearfix">
        <!-- <div :class="index < 3?'animated zoomInDown':index == 3?'animated zoomInLeft':index == 5?'animated zoomInRight':index == 4?'animated zoomIn':'animated zoomInUp'" v-for="(i,index) in market" :key="i.key"> -->
        <div :class="i.floatPoint<0?'tab greenBg':'tab redBg'" v-for="(i,index) in market" :key="i.key">
          <p :index='index' class="name">{{i.indexName}}</p>
          <p :class="changeTextClass[index] == true?'price heartBeat':'price'">{{Number(i.currentPoint).toFixed(2)}}</p>
          <div class="status">
            <span :class="i.floatPoint<0?'pifting green':'pifting red'">{{Number(i.floatPoint).toFixed(2)}}</span>
            <span :class="i.floatPoint<0?'Percentage green':'Percentage red'">{{i.floatRate}}%</span>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>

</template>

<script>
import foot from '@/components/foot/foot'
import AllList from '@/page/list/list-all'
import HomeList from './components/home-list'
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'
import bannerImg from '../../assets/img/banner.png'

export default {
  components: {
    foot,
    HomeList,
    AllList
  },
  props: {},
  data () {
    return {
      moveStats: false,
      bannerList: '',
      bannerImg: bannerImg,
      market: {}, // 大盘指数
      changeTextClass: {},
      artList: {}, // 公告列表
      timer: null,
      timer2: null,
      settingForm: {
        futuresDisplay: false,
        indexDisplay: false,
        kcStockDisplay: false,
        stockDisplay: false
      }
    }
  },
  created () {
    this.getProductSetting()
    // this.timer = setInterval(this.refreshList, 3000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  computed: {},
  // 更新的时候运动
  updated () {
    if (!this.moveStats) {
      this.move()
    }
  },
  methods: {
    move () {
      // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      if (!document.getElementById('node')) {
        return
      }
      let width = document.getElementById('node').getBoundingClientRect().width
      // let width = this.$refs.node.getBoundingClientRect().width
      let box = document.getElementById('box')
      let copy = document.getElementById('copy')
      copy.innerText = this.artList.artTitle // 文字副本填充
      let distance = 0 // 位移距离
      // 设置位移
      this.moveStats = true
      clearInterval(this.timer2)
      this.timer2 = setInterval(function () {
        distance = distance - 1
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 16
          // clearInterval(timer)
        }
        box.style.transform = 'translateX(' + distance + 'px)'
      }, 30)
    },
    async getArtList () {
      // 获取公告列表
      let opts = {
        pageNum: 1,
        pageSize: 1
      }
      let result = await api.getArtList(opts)
      if (result.status === 0) {
        if (result.data.list.length > 0) {
          this.artList = result.data.list[0]
        }
      } else {
        this.$message.error(result.msg)
      }
    },
    async getMarket () {
      // 获取大盘指数
      // let result = await api.getMarket()
      let result = await api.getIndexMarket()
      if (+result.status === 0) {
        this.market = result.data
      } else {
        Toast(result.msg)
      }
    },
    async refreshList () {
      // 刷新大盘指数
      let result = await api.getIndexMarket()
      this.changeTextClass = {}
      if (+result.status === 0) {
        // this.market = result.data.market
        result.data.forEach((element, i) => {
          this.changeTextClass[i] = ''
          if (element.currentPoint !== this.market[i].currentPoint) {
            this.changeTextClass[i] = true // 设置对应的动画过滤
            this.market[i].currentPoint = element.currentPoint
            this.market[i].floatPoint = element.floatPoint
            this.market[i].floatRate = element.floatRate
          }
        })
      } else {
        Toast(result.msg)
      }
    },
    async getBanner () {
      // 获取显示的banner
      let result = await api.getBannerByPlat({ platType: 'm' })
      if (+result.status === 0) {
        this.bannerList = result.data
      } else {
        Toast(result.msg)
      }
    },
    async getProductSetting () {
      // 获取产品配置信息
      let result = await api.getProductSetting()
      if (+result.status === 0) {
        this.settingForm = result.data
      } else {
        Toast(result.msg)
      }
    },
    articleList () {
      // 新手
      this.$router.push('/articleList')
    },
    toBuy () {
      // 去购买页面
      this.$router.push('/buy')
    },
    goList () {
      // 去列表页面
      this.$router.push('/list')
    },
    goMyList () {
      this.$router.push('/mylist')
    },
    goOrderlist () {
      this.$router.push('/orderlist')
    },
    goMyinfo () {
      this.$router.push('/user')
    },
    goIndexList () {
      this.$router.push('/indexlist')
    },
    toDetail () {
      // 去列表页面
      this.$router.push('/listdetail')
    },
    toAltDetail () {
      this.$router.push({
        path: 'alertdetail',
        query: {
          id: this.artList.id
        }
      })
    }
  },
  mounted () {
    // this.getMarket() // 获取大盘指数
    this.getBanner()
    this.getArtList() // 获取公告
  }
}
</script>
<style lang="less" scoped>
  @fontColor: #cfd0d1;
  @fontColor2: #ccc;
  .horseLampModule {
    height: 0.5rem;
    line-height: 0.5rem;
    margin-bottom: 0.1rem;
    padding: 0 0.2rem;

    .horseLamp-box {
      position: relative;
      padding-left: 0.6rem;
      padding-right: .3rem;
    }

    .iconfont {
      position: absolute;
      left: 0;
      vertical-align: middle;
      margin-right: 0.1rem;
    }

    .pull-right {
      position: absolute;
      right: 0;
      top: 0;
    }

    .pull-right::before {
      content: '';
      height: 0.3rem;
      border-left: 0.01rem solid #666;
      padding-left: 0.15rem;
    }

    // 限制外框宽度，隐藏多余的部分
    .wrap {
      letter-spacing: 0.06rem;
      overflow: hidden;
    }
  }

  // 移动框宽度设置
  #box {
    width: 80000%;
  }

  // 文字一行显示
  #box div {
    float: left;
  }

  // 设置前后间隔
  #marquee {
    margin: 0 16px 0 0;
  }

  // 获取宽度的节点，隐藏掉
  #node {
    position: absolute;
    z-index: -999;
    top: -999999px;
  }

  .banner {
    width: 100%;
    height: 3.74rem;
    height: 4.2rem;
    overflow: hidden;

    .banner-box {
      width: 100%;
      height: 100%;
      position: relative;
      opacity: 0.86;

      .box {
        position: absolute;
        text-align: center;
        top: 30%;
        width: 100%;
        background: none;
      }

      .title {
        color: #ff9600;
        font-size: 0.46rem;
        // font-weight: 600;
        margin-bottom: 0.4rem;
        letter-spacing: 0.08rem;
      }

      .desc {
        font-size: 0.26rem;
        margin-bottom: 0.8rem;
      }

      .target-btn {
        display: inline-block;
        font-size: 0.22rem;
        color: #ff9600;
        padding: 0.1rem 0.3rem;
        border: 0.01rem solid #ff9600;
        border-radius: 0.5rem;
      }

      .img {
        width: 100%;
        height: 100%;
      }
    }

  }

  .tipstexts {
    // height: 0.91rem;
    height: 0.41rem;

    .horseLampModule {
      width: 80%;
      height: .91rem;
      margin: .24rem auto;
      margin-left: 0.16rem;
      padding: 0 .417rem;
      height: .43rem;
      border-radius: 0.72rem;
      position: relative;
      float: left;
    }

    .novice {
      float: right;
      height: 0.3rem;
      font-size: 0.25rem;
      margin-top: 0.2rem;
      display: block;
      color: #b63717;
      padding: .04rem .24rem;
      border-left: .027rem solid #989898
    }
  }

  .nav-bg {
    width: 100%;
    padding: 0 2%;
    height: 1.11rem;
    margin: 0 auto;
    padding-bottom: .14rem;
    overflow: hidden;
    // margin-bottom: 0.12rem;
    .img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .icon-router {
    .col-xs-3 {
      width: 25%;
    }
  }

  /*大盘指数*/

  .dynamic-info {
    padding: .14rem;
    border-bottom: .02rem solid rgba(147, 147, 147, .2);
  }

  .dynamic-info li {
    float: left;
    font-size: .25rem;
    height: auto;
  }

  .dynamic-info li.tips {
    width: 15%;
  }

  .dynamic-info li.tips p {
    font-size: .22rem;
    text-align: center;
    width: .417rem;
    height: .625rem;
    color: #fff;
    padding-top: .04rem;
    background: url(../../assets/img/buyicon.png) no-repeat;
    background-size: contain;
  }

  .dynamic-info li p {
    font-size: .25rem;
  }

  .dynamic-name-code {
    width: 25%;
  }

  .dynamic-phone-win {
    width: 38%;
  }

  .dynamic-name-code p,
  .dynamic-phone-win p {
    font-size: .22rem;
    text-align: center;
    padding-top: .18rem;
    color: @fontColor2;
  }

  .dynamic-name-code p:first-child,
  .dynamic-phone-win p:first-child {
    font-size: .25rem;
    // color: rgb(34, 34, 34);
  }

  .btn-group {
    width: 22%;
    text-align: right;
    padding-top: .2rem;
    padding-right: .14rem;
  }

  .btn-group button {
    color: #fff;
    width: 1.279rem;
    font-size: .22rem;
    padding: .125rem .18rem;
    background: rgb(213, 0, 0);
    border: none;
  }

  .table-list .title {
    ul li {
      width: 33.33333333%;
      padding-right: 15px;
      padding-left: 15px;
    }
  }
</style>
