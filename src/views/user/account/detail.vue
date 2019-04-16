<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">编号</el-col>
          <el-col :span="4" class="table-cell-title">昵称</el-col>
          <el-col :span="4" class="table-cell-title">出生日期</el-col>
          <el-col :span="4" class="table-cell-title"></el-col>
          <el-col :span="4" class="table-cell-title"></el-col>
          <el-col :span="4" class="table-cell-title"></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{account.sn}}</el-col>
          <el-col :span="4" class="table-cell">{{account.nickName}}</el-col>
          <el-col :span="4" class="table-cell">{{order.birthday | formatDateTime }}</el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {getDetail} from '@/api/account';
  import VDistpicker from 'v-distpicker';

  export default {
    name: 'orderDetail',
    components: {VDistpicker},
    data() {
      return {
        id: null,
        account: {},
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getOrderDetail(this.id).then(response => {
        this.account = response.data;
      });
    },
    filters: {
      formatDateTime(time){
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
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
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


