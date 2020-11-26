<template>
  <div class="wrapper ">
    <!-- <mt-header v-if="selected == '2'" fixed  title="">
        <router-link to="/" slot="left">
        </router-link>
        <mt-button slot="right" icon="search" @click="toSearch"></mt-button>
    </mt-header> -->
    <mt-navbar class="top-navbar" v-model="selected" :style="selected != '2'?'':''" >
      <!-- <mt-tab-item id="0">全部</mt-tab-item> -->
      <mt-tab-item v-if="this.$store.state.settingForm.indexDisplay" id="1">指数</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.stockDisplay" id="2">沪深</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.kcStockDisplay" id="3">科创</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.futuresDisplay" id="4">期货</mt-tab-item>
      <mt-tab-item id="5">港股</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="order-list" v-model="selected">
      <!-- <mt-tab-container-item id="0">
          <List0 :changeNavOptions='changeNavOptions'/>
      </mt-tab-container-item> -->
      <mt-tab-container-item v-if="this.$store.state.settingForm.indexDisplay" id="1">
        <List1 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.stockDisplay" id="2">
        <List2 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.kcStockDisplay" id="3">
        <List3 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.futuresDisplay" id="4">
        <List4 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item  id="5">
        <List5 :selectedNumber='selected'/>
      </mt-tab-container-item>
    </mt-tab-container>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot/foot'
// import '@/assets/style/common.less'
import List0 from './list-all'
import List1 from './list-index'
import List2 from './list-stock'
import List3 from './list-kechuang'
import List4 from './list-futures'
import List5 from './list-hk'
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'

export default {
  components: {
    foot,
    List0,
    List1,
    List2,
    List3,
    List4,
    List5
  },
  props: {},
  data () {
    return {
      selected: '' // 选中
    }
  },
  watch: {},
  computed: {},
  created () {
    this.getProductSetting()
    if (!this.$store.state.userInfo.phone) {
      this.getUserInfo()
    }
  },
  mounted () {
    if (this.$route.query.index) {
      this.selected = this.$route.query.index
    }
  },
  methods: {
    toSearch () {
      this.$router.push('/searchlist')
    },
    changeNavOptions (opts) {
      this.selected = opts
    },
    async getUserInfo () {
      // 获取用户信息
      let data = await api.getUserInfo()
      if (data.status === 0) {
        this.$store.state.userInfo = data.data
      } else {
        Toast(data.msg)
      }
    },
    async getProductSetting () {
      let data = await api.getProductSetting()
      if (data.status === 0) {
        this.$store.state.settingForm = data.data
        // 1 指数 2 沪深 3科创 4 期货 5 港股
        if (this.$store.state.settingForm.indexDisplay) {
          this.selected = '1'
        } else if (this.$store.state.settingForm.stockDisplay) {
          this.selected = '2'
        } else if (this.$store.state.settingForm.kcStockDisplay) {
          this.selected = '3'
        } else {
          this.selected = '4'
        }
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .is-selected .mint-tab-item-label:hover {
    text-decoration: none;
  }

  .wrapper /deep/ .mint-tab-item-label {
    font-size: 0.264rem;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #d50000;
    text-decoration: none;
  }

  .nav-wrapper {
    padding-top: 0.8rem;
  }

  .mint-tab-container-item {
    // padding-top: 1.2rem;

    .mint-button--default {
      padding: 0 0.2rem;
      font-size: 0.24rem;
      height: 0.5rem;
      margin: 0.2rem 0.2rem 0;
      color: #607d8b;
      box-shadow: 0 0 1px #3b71b9;
      background: none;
    }
  }

  .mint-navbar {
    box-shadow: 0px 0px 4px rgba(6, 0, 1, 0.2);

    .mint-tab-item {
      // background: #21252a;
      padding: 0.2rem 0;

      &.is-selected {
        border: none;
        margin-bottom: 0;
      }

      .mint-tab-item-label {
        font-size: 0.22rem;
      }

      .iconfont {
        display: block;
        font-size: 0.46rem;
        margin-bottom: 0.12rem;
      }
    }
  }

  .top-navbar {
    .mint-tab-item {
      padding: 0.3rem 0;
    }
  }
</style>
