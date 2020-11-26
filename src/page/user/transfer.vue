<template>
  <div class="wrapper">
    <div class="header">
      <mt-header title="账户资金互转">
        <router-link to="/user" slot="left">
          <mt-button icon="back">我的</mt-button>
        </router-link>
      </mt-header>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item v-if="this.$store.state.settingForm.indexDisplay" id="1"
        >融资转指数</mt-tab-item
      >
      <mt-tab-item v-if="this.$store.state.settingForm.indexDisplay" id="2"
        >指数转融资</mt-tab-item
      >
      <mt-tab-item v-if="this.$store.state.settingForm.futuresDisplay" id="3"
        >融资转期货</mt-tab-item
      >
      <mt-tab-item v-if="this.$store.state.settingForm.futuresDisplay" id="4"
        >期货转融资</mt-tab-item
      >

      <mt-tab-item id="5">本金转港股</mt-tab-item>
      <mt-tab-item id="6">港股转本金</mt-tab-item>
      <mt-tab-item id="7">本金转A股</mt-tab-item>
      <mt-tab-item id="8">A股转本金</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="order-list" v-model="selected">
      <mt-tab-container-item id="1">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.enableAmt"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            name="amt"
            v-model="form.account1"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll1">全部</span>
          </mt-field>
        </div>
        <!-- <div class="form-block">
            <mt-field label="资金密码" placeholder="资金密码" type="password" v-model="form.password"></mt-field>
        </div>
        <p class="prompt">资金密码默认为登录密码</p> -->
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入指数账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.enableIndexAmt"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account2"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll2">全部</span>
          </mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入本金账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.enableAmt"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account3"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll3">全部</span>
          </mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入期货账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.enableFuturesAmt"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account4"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll4">全部</span>
          </mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入本金账户</span
          >
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="5">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.userCapital"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            name="amt"
            v-model="form.account5"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll5">全部</span>
          </mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="约等于资金"
            placeholder="约等于资金"
            type="text"
            disabled
            v-model="count5"
          ></mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入港股账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="6">
        <div class="form-block">
          <!-- v-model="this.$store.state.userInfo.enableHmt" -->
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            :value="
              $store.state.userInfo.userStockHKCapital
            "
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account6"
            placeholder="请输入转账金额"
            type="text"
          >
            <!-- <span @click="selectAll6">全部</span> -->
          </mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="约等于资金"
            placeholder="约等于资金"
            type="text"
            disabled
            v-model="count6"
          ></mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入本金账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="7">
        <div class="form-block">
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            v-model="this.$store.state.userInfo.userCapital"
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account7"
            placeholder="请输入转账金额"
            type="text"
          >
            <span @click="selectAll7">全部</span>
          </mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="约等于资金"
            placeholder="约等于资金"
            type="text"
            disabled
            v-model="count7"
          ></mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入A股账户</span
          >
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="8">
        <div class="form-block">
          <!-- v-model="this.$store.state.userInfo.enableAmt" -->
          <mt-field
            label="可转金额"
            placeholder="可转金额"
            type="text"
            disabled
            :value="
              $store.state.userInfo.canWithdrawCapital
            "
          ></mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="转账金额"
            v-model="form.account8"
            placeholder="请输入转账金额"
            type="text"
          >
            <!-- <span @click="selectAll8">全部</span> -->
          </mt-field>
        </div>
        <div class="form-block">
          <mt-field
            label="约等于资金"
            placeholder="约等于资金"
            type="text"
            disabled
            v-model="count8"
          ></mt-field>
        </div>
        <div class="btnbox">
          <span class="text-center btnok loginout" @click="tosubmit"
            >确认转入本金账户</span
          >
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import foot from "@/components/foot/foot";
// import '@/assets/style/common.less'
import * as api from "@/axios/api";
import { Toast } from "mint-ui";

export default {
  components: {
    foot
  },
  data() {
    return {
      selected: "5", // 选中
      form: {
        account1: "",
        account2: "",
        account3: "",
        account4: "",

        account5: "",
        account6: Math.floor(this.$store.state.userInfo.userStockHKCapital),
        account7: "",
        account8: Math.floor(this.$store.state.userInfo.canWithdrawCapital),
        password: ""
      },
      userInfo: {
        realName: ""
      },
      count5: "",
      count6: Math.floor(this.$store.state.userInfo.userStockHKCapital*this.$store.state.userInfo.fixedHRate),
      count7: "",
      count8: Math.floor(this.$store.state.userInfo.canWithdrawCapital)
    };
  },
  watch: {
    form: {
      handler: async function (val, oldVal)  {
        if (this.selected === "5") {
          let data1 = await api.capitalToHmtChange({
            amt: val.account5 == "" ? 0 : val.account5
          });
          if (data1.status === 0) {
            // 成功
            this.count5 = data1.data.countHmt;
          } else {
            Toast(data1.msg);
          }
        }
        if (this.selected === "6") {

          this.form.account6 = Math.floor(this.$store.state.userInfo.userStockHKCapital)
          this.count6 = Math.floor(this.$store.state.userInfo.userStockHKCapital)

          let data2 = await api.hmtToCapitalChange({
            amt: val.account6 == "" ? 0 : val.account6
          });
          if (data2.status === 0) {
            // 成功
            this.count6 = data2.data.countCapital;
          } else {
            Toast(data2.msg);
          }
        }
        if (this.selected === "7") {
          this.count7 =
            Math.floor(val.account7) * this.$store.state.userInfo.hFundingLevel;
        }
        if (this.selected === "8") {
          this.form.account8 = this.$store.state.userInfo.canWithdrawCapital
          this.count8 = this.$store.state.userInfo.canWithdrawCapital
            // Math.floor(val.account8) / this.$store.state.userInfo.aFundingLevel;
        }
      },
      deep: true
    }
  },
  computed: {},
  created() {
    this.getProductSetting();
  },
  mounted() {
    // if (this.$route.query.type) {
    //   this.selected = this.$route.query.type + "";
    // }
    this.getUserInfo();
  },
  methods: {
    async getProductSetting() {
      let data = await api.getProductSetting();
      if (data.status === 0) {
        this.$store.state.settingForm = data.data;
        // if (!this.$store.state.settingForm.indexDisplay) {
        //   this.selected = "3";
        // }
      } else {
        this.$message.error(data.msg);
      }
    },
    selectAll1() {
      // 选择全部
      this.form.account1 = this.$store.state.userInfo.enableAmt;
    },
    selectAll2() {
      // 选择全部
      this.form.account2 = this.$store.state.userInfo.enableIndexAmt;
    },
    selectAll3() {
      // 选择全部
      this.form.account3 = this.$store.state.userInfo.enableAmt;
    },
    selectAll4() {
      // 选择全部
      this.form.account4 = this.$store.state.userInfo.enableFuturesAmt;
    },

    async selectAll5() {
      // 选择全部
      this.form.account5 = this.$store.state.userInfo.userCapital;
      // let data = await api.capitalToHmtChange({
      //   amt: this.form.account5
      // });
      // if (data.status === 0) {
      //   // 成功
      //   this.count5 = data.data.countHmt;
      // } else {
      //   Toast(data.msg);
      // }
    },
    async selectAll6() {
      // 选择全部
      this.form.account6 =
        this.$store.state.userInfo.enableHmt -
        this.$store.state.userInfo.noTransHmt;
      // let data = await api.hmtToCapitalChange({
      //   amt: this.form.account6
      // });
      // if (data.status === 0) {
      //   // 成功
      //   this.count6 = data.data.countHmt;
      // } else {
      //   Toast(data.msg);
      // }
    },
    selectAll7() {
      // 选择全部
      this.form.account7 = this.$store.state.userInfo.userCapital;
      // this.count7 = Math.floor(this.form.account3) * this.$store.state.userInfo.hFundingLevel;
    },
    selectAll8() {
      // 选择全部
      this.form.account8 = $store.state.userInfo.canWithdrawCapital
        // this.$store.state.userInfo.enableAmt -
        // this.$store.state.userInfo.noTransAmt;
      // this.count8 = Math.floor(this.form.account4) / this.$store.state.userInfo.aFundingLevel;
    },
    async tosubmit() {
      if (this.selected === "5") {
        // 本金转港股
        let opt = {
          amt: Math.floor(this.form.account5),
          type: 1
        };
        let data = await api.capitalTransHmtChange(opt);
        if (data.status === 0) {
          Toast(data.msg);
          this.$router.push("/user");
        } else {
          Toast(data.msg);
        }
      } else if (this.selected === "6") {
        // 港股转本金
        let opt = {
          amt: Math.floor(this.form.account6),
          type: 2
        };
        let data = await api.capitalTransHmtChange(opt);
        if (data.status === 0) {
          Toast(data.msg);
          this.$router.push("/user");
        } else {
          Toast(data.msg);
        }
      } else if (this.selected === "7") {
        // 本金转A股
        let opt = {
          amt: Math.floor(this.form.account7),
          type: 1
        };
        let data = await api.capitalTransAmtChange(opt);
        if (data.status === 0) {
          Toast(data.msg);
          this.$router.push("/user");
        } else {
          Toast(data.msg);
        }
      } else if (this.selected === "8") {
        // A股转本金
        let opt = {
          amt: Math.floor(this.form.account8),
          type: 2
        };
        let data = await api.capitalTransAmtChange(opt);
        if (data.status === 0) {
          Toast(data.msg);
          this.$router.push("/user");
        } else {
          this.$message.success(data.msg);
        }
      } else {
        // 融资转指数
        let opt = {
          amt:
            this.selected === "1"
              ? this.form.account1
              : this.selected === "2"
              ? this.form.account2
              : this.selected === "3"
              ? this.form.account3
              : this.form.account4,
          type: this.selected // 1 融资转指数 2 指数转融资
        };
        let data = await api.AmtChange(opt);
        if (data.status === 0) {
          Toast(data.msg);
          this.$router.push("/user");
        } else {
          Toast(data.msg);
        }
      }
    },
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        this.$store.state.userInfo = data.data;
      } else {
        Toast(data.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.is-selected .mint-tab-item-label:hover {
  text-decoration: none;
}

.wrapper /deep/ .mint-tab-item-label {
  font-size: 0.264rem;
}

.mint-navbar .mint-tab-item.is-selected {
  // color: #d50000;
  // border-bottom: 2px solid #d50000;
  text-decoration: none;
  margin-bottom: 0;
}

.prompt {
  padding: 0.3rem 0 0.2rem 0.7rem;
}
</style>
