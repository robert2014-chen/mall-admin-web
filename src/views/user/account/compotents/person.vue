<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finishStatus="success" alignCenter="center">
      <el-step title="个人基本信息"></el-step>
      <el-step title="个人联系信息"></el-step>
      <el-step title="个人认证信息"></el-step>
    </el-steps>
    <person-info-detail v-show="showStatus[0]" v-model="person" @nextStep="nextStep"></person-info-detail>
  </el-card>
</template>
