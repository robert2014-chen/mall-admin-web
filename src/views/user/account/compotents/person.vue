<template> 
  <div class="detail-container" v-show="showStatus[0]">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
      </div>
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
    </el-card>
  </div>
</template>
