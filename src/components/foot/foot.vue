<template>
  <div class="footer" style="position: fixed;
    bottom: 0;
    width: 100%;">
    <mt-tabbar v-model="select">
      <mt-tab-item id="home" :class="$store.state.select == '/home' ? 'on' : ''">
        <i v-if="$store.state.select == '/home'" class="iconfont icon-zhuiocn02"></i>
        <i v-else class="iconfont icon-zhuiocn"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="list" :class="$store.state.select == '/list' || $store.state.select == '/indexlist'? 'on' : ''">
        <i v-if="$store.state.select == '/list'" class="iconfont icon-hangqing"></i>
        <i v-else class="iconfont icon-hangqing-copy"></i>
        行情
      </mt-tab-item>
      <mt-tab-item id="orderlist" :class="$store.state.select == '/orderlist' ? 'on' : ''">
         <!--<i  v-if="$store.state.select == '/orderlist'" class="iconfont icon-rechargefill"></i>-->
        <i v-if="$store.state.select == '/orderlist'" class="iconfont icon-hangqing2"></i>
        <i v-else class="iconfont icon-hangqing-unselectedx"></i>
        持仓
      </mt-tab-item>
      <mt-tab-item id="mylist" :class="$store.state.select == '/mylist' ? 'on' : ''">
        <!-- <i  v-if="$store.state.select == '/mylist'" class="iconfont icon-xuanze2"></i> -->
        <i v-if="$store.state.select == '/mylist'" class="iconfont icon-xuanze3" style="font-size: 0.40rem; padding-top: 0.04rem;"></i>
        <i v-else class="iconfont icon-xuanze" style="font-size: 0.40rem; padding-top: 0.04rem;"></i>
        自选
      </mt-tab-item>
      <mt-tab-item id="user" :class="$store.state.select == '/user' ? 'on' : ''">
        <!-- <i  v-if="$store.state.select == '/user'" class="iconfont icon-myfill"></i> -->
        <i v-if="$store.state.select == '/user'" class="iconfont icon-peoplefill"></i>
        <i v-else class="iconfont icon-my"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      select: ''
    }
  },
  mounted: function () {
    this.select = this.$store.state.select
  },
  watch: {
    select: {
      handler: function (newval, oldval) {
        this.$store.state.select = newval
        this.select = this.$store.state.select
        this.$router.push(newval)
      }
    }
  }
}
</script>
<style lang="css" scoped>
  /* .mint-tabbar > .mint-tab-item,
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #ff9600;
  } */
  .mint-tabbar {
    /* background: #ffffff; */
    height: 0.97rem;
  }

  .footer .mint-tabbar {
    /* background: #13161b; */
    box-shadow: 0px 0px 10px #c7c7c7;
    box-shadow: 0px 0px 4px rgba(6, 0, 1, 0.2);
  }

  .mint-tab-item-label .iconfont {
    display: block;
    font-size: 0.5rem;
    margin-top: 0.05rem;
    height: 0.5rem;
  }

  .mint-tab-item-label .icon-recharge,
  .mint-tab-item-label .icon-rechargefill {
    font-size: 0.46rem;
  }

  .mint-tab-item-label .icon-xuanze,
  .mint-tab-item-label .icon-xuanze2 {
    font-size: 0.38rem;
    padding-top: 0.02rem;
  }

  .mint-tab-item-label .icon-chicang {
    font-size: 0.36rem;
    margin-top: 0.1rem;
  }
</style>
