<template> 
  <el-card>
    <el-steps :active="active" finishStatus="success" align-center>
      <el-step title="账号基本信息"></el-step>
      <el-step title="个人基本信息"></el-step>
      <!--<el-step title="个人联系信息"></el-step>-->
      <!--<el-step title="个人认证信息"></el-step>-->
    </el-steps>
    <div class="detail-container" v-show="showStatus[0]" @nextStep="nextStep" >
      <div style="margin-top: 20px;border-bottom:1px solid #ebeef5;padding-bottom:5px;">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">编号</el-col>
          <el-col :span="4" class="table-cell">{{account.sn}}</el-col>
          <el-col :span="4" class="table-cell-title">昵称</el-col>
          <el-col :span="4" class="table-cell">{{account.nickName}}</el-col>
        </el-row>
      </div>
    </div>
    <person-info-detail v-show="showStatus[1]" v-model="person" @prevStep="prevStep"></person-info-detail>
  </el-card>
</template>
<script>
  import PersonInfoDetail from './compotents/PersonInfoDetail';
  import {getDetail} from '@/api/account';
  import VDistpicker from 'v-distpicker';
  import ElStep from "../../../../node_modules/element-ui/packages/steps/src/step.vue";
  import ElCard from "../../../../node_modules/element-ui/packages/card/src/main.vue";

  export default {
    name: 'detail',
    components: {
      ElCard,
      PersonInfoDetail,
      ElStep,
      VDistpicker
    },
    data() {
      return {
        id: null,
        account: {},
        active:0,
        showStatus:[true,false]
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getDetail(this.id).then(response => {
        this.account = response.body;
      });
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      hideAll(){
        for (let i=0;i<this.showStatus.length;i++){
          this.showStatus[i]=false;
        }
      },
      prevStep(){
        if(this.active>0 && this.active < this.showStatus.length){
          this.active--;
          this.hideAll();
          this.showStatus[this.active]=true;
        }
      },
      nextStep(){
        if(this.active<this.showStatus.length){
          this.active++;
          this.hideAll();
          this.showStatus[this.active]=true;
        }
      }
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    /*border-left: 1px solid #DCDFE6;*/
    /*border-top: 1px solid #DCDFE6;*/
  }

  .el-row {
    height: 60px;
    line-height: 40px;
  }

  .table-cell {
    border: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


