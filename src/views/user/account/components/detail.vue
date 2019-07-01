<template>
  <div>
    <!--tab分页：账号信息、主体信息-->
    <div class="robert-tabs">
      <span :class="this.activeTabs[0]&&'active' " @click="changeActiveTab(0)">账号信息</span>
      <span :class="this.activeTabs[1]&&'active' " @click="changeActiveTab(1)">个人信息</span>
    </div>
    <!--账号信息-->
    <div :class="['robert-dtails',!this.activeTabs[0]&&'robert-non-active']">
      <div><span>系统</span><span>{{account.systemSN}}</span></div>
      <div><span>账号</span><span>{{account.account}}</span></div>
      <div><span>账号类型</span><span>{{account.account}}</span></div>
      <div><span>昵称</span><span>{{account.nickName}}</span></div>
      <div><span>注册时间</span><span>{{account.ctime}}</span></div>
      <div><span>注册IP</span><span>{{account.registerIP}}</span></div>
      <div><span>注册区域</span><span>{{account.regionCode}}</span></div>
      <div><span>最近更新</span><span>{{account.utime}}</span></div>
    </div>

    <!--个人信息-->
    <div :class=" [!this.activeTabs[1]&&'robert-non-active','robert-dtails']">
      <div v-if="null==person" style="width: 100%;font-size: 12px;color: red;text-align: center">
        <span>当前账号没有绑定到用户，请前往人工</span><span>绑定</span><span>！</span>
      </div>
      <div v-if="null!=person"><span>姓名</span><span></span></div>
      <!--<div v-if="null!=person"><span>账号</span><span>{{account.account}}</span></div>-->
      <!--<div v-if="null!=person"><span>账号类型</span><span>{{account.account}}</span></div>-->
      <!--<div v-if="null!=person"><span>昵称</span><span>{{account.nickName}}</span></div>-->
      <!--<div v-if="null!=person"><span>注册时间</span><span>{{account.ctime}}</span></div>-->
      <!--<div v-if="null!=person"><span>注册IP</span><span>{{account.registerIP}}</span></div>-->
      <!--<div v-if="null!=person"><span>注册区域</span><span>{{account.regionCode}}</span></div>-->
      <!--<div v-if="null!=person"><span>最近更新</span><span>{{account.utime}}</span></div>-->

    </div>
    <div class="robert-oper">
      <span class="robert-back" @click="roleList()">返回</span>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/robert-tables.scss";
</style>
<script>
  import {getDetail} from '@/api/account';
  import {getPersonByAccountSN} from '@/api/person';

  export default {
    name: 'detail',
    data() {
      return {
        account: {},
        person: null,
        activeTabIndex: 0,
        activeTabs: [true, false]
      }
    },
    created() {
      getDetail(this.$route.query.id).then(response => {
        console.log(response.body)
        this.account = response.body;
        if (null != response.body && null != response.body.sn) {
//          getPersonByAccountSN(response.body.sn).then(r => {
//            this.person = r.body;
//          })
        }
      })
    },
    methods: {
      accountList() {
        this.$router.push({path: "/user/account"});
      },
      changeActiveTab(index) {
        this.activeTabIndex = index;
        console.log(index);
        for (var i = 0; i < this.activeTabs.length; i++) {
          this.activeTabs[i] = false;
        }
        this.activeTabs[index] = true;
      }
    }
  }
</script>
