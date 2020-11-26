import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/home/home";
import Buy from "@/page/home/buy";
import Alertdetail from "@/page/home/components/alert"; // 公告详情
import Register from "@/page/register";
import RegisterEmail from "@/page/registerEmail";
import Forget from "@/page/forget";
import ForgetEmail from "@/page/forgetEmail";
import Login from "@/page/login";
import LoginEmail from "@/page/loginEmail";
import List from "@/page/list/list";
import Searchlist from "@/page/list/list-search";
import IndexSearchlist from "@/page/list/indexlist-search"; // 指数查询
import SearchMylist from "@/page/list/my-list-search";
import ListDetail from "@/page/list/detail";
import ListDetailHk from "@/page/list/detailHk";
import MyList from "@/page/list/my-list";
import Inquiry from "@/page/home/inquiry";
import User from "@/page/user/user";
import OrderList from "@/page/user/order-list";
import holdOrderList from "@/page/user/search-order/hold-stockCode";
import holdOrderList2 from "@/page/user/search-order/hold-stockSpell";
import sellOrderList from "@/page/user/search-order/sell-stockCode";
import sellOrderList2 from "@/page/user/search-order/sell-stockSpell";
import Detail from "@/page/user/detail";
import Card from "@/page/user/card";
import Authentication from "@/page/user/authentication";
import Aggre from "@/page/user/agreement";
import Recharge from "@/page/user/recharge";
import RechargeSure from "@/page/user/recharge-sure";
import RechargeList from "@/page/user/rechargelist";
import Cash from "@/page/user/cash";
import Cashlist from "@/page/user/cashlist";
import AddCard from "@/page/user/addCard";
import Setting from "@/page/user/my";
import Transfer from "@/page/user/transfer";
import IndexList from "@/page/list/index-list";
import indexBuy from "@/page/home/index-buy";
import futuresBuy from "@/page/home/futures-buy";

import Agree from "@/page/registerAgree";
import Trage from "@/page/tradeAgree";
import OpenAccount from "@/page/openaccount";

Vue.use(Router);

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      meta: {
        title: "首页",
        requireAuth: true
      },
      component: Home
    },
    {
      path: "/buy",
      name: "buy",
      meta: {
        title: "购买",
        requireAuth: true
      },
      component: Buy
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册"
      },
      component: Register
    },
    {
      path: "/registerEmail",
      name: "registerEmail",
      meta: {
        title: "注册"
      },
      component: RegisterEmail
    },
    {
      path: "/forget",
      name: "forget",
      meta: {
        title: "忘记密码"
      },
      component: Forget
    },
    {
      path: "/forgetEmail",
      name: "forgetEmail",
      meta: {
        title: "忘记密码"
      },
      component: ForgetEmail
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录"
      },
      component: Login
    },
    {
      path: "/loginEmail",
      name: "loginEmail",
      meta: {
        title: "登录"
      },
      component: LoginEmail
    },
    {
      path: "/openaccount",
      name: "openaccount",
      meta: {
        title: "开户"
      },
      component: OpenAccount
    },
    {
      path: "/list",
      name: "list",
      meta: {
        title: "列表",
        requireAuth: false
      },
      component: List
    },
    {
      path: "/indexsearchlist",
      name: "指数查询",
      meta: {
        title: "指数查询"
      },
      component: IndexSearchlist
    },
    {
      path: "/indexlist",
      name: "indexlist",
      meta: {
        title: "指数列表",
        requireAuth: false
      },
      component: IndexList
    },
    {
      path: "/searchlist",
      name: "个股查询",
      meta: {
        title: "个股查询"
      },
      component: Searchlist
    },
    {
      path: "/searchmylist",
      name: "searchmylist",
      meta: {
        title: "自选查询",
        requireAuth: true
      },
      component: SearchMylist
    },
    {
      path: "/mylist",
      name: "mylist",
      meta: {
        title: "自选列表",
        requireAuth: true
      },
      component: MyList
    },
    {
      path: "/listdetail",
      name: "listdetail",
      meta: {
        title: "详情",
        requireAuth: false
      },
      component: ListDetail
    },
    {
      path: "/listdetailhk",
      name: "listdetailhk",
      meta: {
        title: "详情",
        requireAuth: false
      },
      component: ListDetailHk
    },
    {
      path: "/indexBuy",
      name: "indexBuy",
      meta: {
        title: "指数购买",
        requireAuth: false
      },
      component: indexBuy
    },
    {
      path: "/futuresBuy",
      name: "futuresBuy",
      meta: {
        title: "期货购买",
        requireAuth: false
      },
      component: futuresBuy
    },
    {
      path: "/inquiry",
      name: "inquiry",
      meta: {
        title: "询价",
        requireAuth: true
      },
      component: Inquiry
    },
    {
      path: "/user",
      name: "user",
      meta: {
        title: "我的",
        requireAuth: true
      },
      component: User
    },
    {
      path: "/transfer",
      name: "transfer",
      meta: {
        title: "资金互转",
        requireAuth: true
      },
      component: Transfer
    },
    {
      path: "/orderlist",
      name: "orderlist",
      meta: {
        title: "订单记录",
        requireAuth: true
      },
      component: OrderList
    },
    {
      path: "/holdorderlist",
      name: "holdorderlist",
      meta: {
        title: "查询持仓",
        requireAuth: true
      },
      component: holdOrderList
    },
    {
      path: "/holdorderlist2",
      name: "holdorderlist2",
      meta: {
        title: "查询持仓",
        requireAuth: true
      },
      component: holdOrderList2
    },
    {
      path: "/sellorderlist",
      name: "sellorderlist",
      meta: {
        title: "查询平仓",
        requireAuth: true
      },
      component: sellOrderList
    },
    {
      path: "/sellorderlist2",
      name: "sellorderlist2",
      meta: {
        title: "查询平仓",
        requireAuth: true
      },
      component: sellOrderList2
    },
    {
      path: "/detail",
      name: "detail",
      meta: {
        title: "资金明细",
        requireAuth: true
      },
      component: Detail
    },
    {
      path: "/card",
      name: "card",
      meta: {
        title: "银行卡",
        requireAuth: true
      },
      component: Card
    },
    {
      path: "/authentication",
      name: "authentication",
      meta: {
        title: "认证",
        requireAuth: true
      },
      component: Authentication
    },
    {
      path: "/aggre",
      name: "aggre",
      meta: {
        title: "合作协议",
        requireAuth: true
      },
      component: Aggre
    },
    {
      path: "/recharge",
      name: "recharge",
      meta: {
        title: "充值",
        requireAuth: true
      },
      component: Recharge
    },
    {
      path: "/rechargeSure",
      name: "rechargeSure",
      meta: {
        title: "确认充值",
        requireAuth: true
      },
      component: RechargeSure
    },
    {
      path: "/rechargelist",
      name: "rechargelist",
      meta: {
        title: "充值记录",
        requireAuth: true
      },
      component: RechargeList
    },
    {
      path: "/cash",
      name: "cash",
      meta: {
        title: "提现",
        requireAuth: true
      },
      component: Cash
    },
    {
      path: "/addCard",
      name: "addCard",
      meta: {
        title: "添加银行卡",
        requireAuth: true
      },
      component: AddCard
    },
    {
      path: "/cashlist",
      name: "cashlist",
      meta: {
        title: "提现记录",
        requireAuth: true
      },
      component: Cashlist
    },
    {
      path: "/setting",
      name: "setting",
      meta: {
        title: "设置",
        requireAuth: true
      },
      component: Setting
    },
    {
      path: "/agree",
      name: "agree",
      meta: {
        title: "注册协议",
        requireAuth: true
      },
      component: Agree
    },
    {
      path: "/trade",
      name: "trade",
      meta: {
        title: "交易⻛险揭示书",
        requireAuth: true
      },
      component: Trage
    },
    {
      path: "/alertdetail",
      name: "alertdetail",
      meta: {
        title: "公告详情",
        requireAuth: true
      },
      component: Alertdetail
    },
    {
      // 会匹配所有路径
      path: "*",
      redirect: "/home"
    }
  ]
});
