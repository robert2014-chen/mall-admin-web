<template> 
  <div>
    <div class="detail-container" v-show="showStatus[1]">
      <div style="margin-top: 20px;border-bottom:1px solid #ebeef5;padding-bottom:5px;">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell-title">昵称</el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
