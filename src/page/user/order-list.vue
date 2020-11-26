<template>
  <div class="wrapper">
    <mt-navbar class="top-navbar" v-model="selected" fixed>
      <mt-tab-item v-if="this.$store.state.settingForm.stockDisplay" id="1">沪深账户</mt-tab-item>
      <mt-tab-item v-if="this.$store.state.settingForm.indexDisplay" id="2">指数账户</mt-tab-item>
      <!-- <mt-tab-item id="3">科创</mt-tab-item> -->
      <mt-tab-item v-if="this.$store.state.settingForm.futuresDisplay" id="4">期货账户</mt-tab-item>
      <mt-tab-item  id="5">港股账户</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="order-list" v-model="selected">
      <mt-tab-container-item v-if="this.$store.state.settingForm.stockDisplay" id="1">
        <List1 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="this.$store.state.settingForm.indexDisplay" id="2">
        <List2 :selectedNumber='selected'/>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="3">
          <List3 :handleOptions='handleOptions2'/>
      </mt-tab-container-item> -->
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
import List1 from './order-list1'
import List2 from './order-list2'
import List3 from './order-list3'
import List4 from './order-list4'
import List5 from './order-list5'
import * as api from '@/axios/api'
import { Toast } from 'mint-ui'

export default {
  components: {
    foot,
    List1,
    List2,
    List3,
    List4,
    List5
  },
  props: {},
  data () {
    return {
      selected: '1' // 选中

    }
  },
  watch: {},
  computed: {},
  created () {
    if (!this.$store.state.userInfo.phone) {
      this.getUserInfo()
    }
  },
  mounted () {
    if (this.$route.query.index) {
      this.selected = this.$route.query.index
    }
    this.getProductSetting()
  },
  methods: {
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

  .mint-tab-container-item {
    padding-top: 0.7rem;

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
    // box-shadow: 0px 0px 4px rgba(6,0,1,0.2);
    .mint-tab-item {
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
