<template>
  <div>
    <!--tab分页：账号信息、主体信息-->
    <div class="robert-tabs">
      <span @click="changeTab(1)">账号信息</span>
      <span @click="changeTab(2)">个人信息</span>
    </div>
    <!--账号信息-->
    <div :class="['robert-dtails',!this.active&&'robert-non-display']">
      <div><span>系统</span><span>{{account.systemSN}}</span></div>
      <div><span>账号</span><span>{{account.account}}</span></div>
      <div><span>账号类型</span><span>{{account.account}}</span></div>
      <div><span>昵称</span><span>{{account.nickName}}</span></div>
      <div><span>注册时间</span><span>{{account.ctime}}</span></div>
      <div><span>注册IP</span><span>{{account.registerIP}}</span></div>
      <div><span>注册区域</span><span>{{account.regionCode}}</span></div>
      <div><span>最近更新</span><span>{{account.utime}}</span></div>
    </div>
    <!--账号信息-->

    <div v-if="null==person">
      <span>当前账号没有绑定到用户，请前往人工</span><span>绑定</span><span>！</span>
    </div>
    <div v-if="null!=person" :class="['robert-dtails',this.active&&'robert-non-display']">
      <div><span>项目</span><span>{{account.systemSN}}</span></div>
    </div>
    <div class="robert-oper">
      <span class="robert-back" @click="accountList()">返回</span>
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
        person: {},
        active: true,
        activeIndex: 0
      }
    },
    created() {
      getDetail(this.$route.query.id).then(response => {
        console.log(response.body)
        this.account = response.body;
        if (null != response.body && null != response.body.sn) {
          getPersonByAccountSN(response.body.sn).then(r => {
            this.person = r.body;
          })
        }
      })
    },
    methods: {
      accountList() {
        this.$router.push({path: "/user/account"});
      },
      changeTab(index) {
        if (index != this.activeIndex) {
          this.active = !this.active;
          this.activeIndex = index;
        }
      }
    }
  }
</script>
