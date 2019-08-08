<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="org"
             :rules="rules"
             ref="accountFrom"
             label-width="150px"
             size="small">
      <el-form-item label="机构名称：" prop="name">
        <el-input v-model="org.name" class="input-width" :disabled="this.isEdit"></el-input>
      </el-form-item>
      <el-form-item label="上级机构：" prop="parentOrgSN">
        <el-select v-model="org.parentOrgSN" filterable remote reserve-keyword placeholder="请输入上级机构名称"
                   :remote-method="getOrgByName" :loading="loading">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.sn"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构类型：" prop="nickName">
        <el-input v-model="org.orgType" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="org.remark">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('accountFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('accountFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createOrg, fetchList, getOrg, updateOrg} from '@/api/org';

  const defaultOrg = {
    account: null,
    nickName: null,
    avatar: "",
    systemSN: "SYSTEM-340539910304186368"
  };

  export default {
    name: 'orgDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {

      return {
        options: [],//上级组织机构
        org: Object.assign({}, defaultOrg),
        rules: {
          name: [{required: true, message: '请输入账号', trigger: 'blur'}]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getOrg(this.$route.query.id).then(response => {
          this.org = response;
        });
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                this.org.id = this.$route.query.id;
                updateOrg(this.org).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createOrg(this.org).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.org = Object.assign({}, defaultOrg);
      },
      getOrgByName(orgName) {
        if (!!!orgName) {
          this.options = [];
        } else {
          this.loading = true;
          let query = {
            queryOrders: [{propertyName: "id", sort: false}],
            queryCriteria: [{propertyName: "systemSN_EQ", value: "SYSTEM-340539910304186368"}]
          };
          query.queryCriteria.push({propertyName: "name_LIKE", value: orgName});
          fetchList(query).then(response => {
            this.loading = false;
            this.options = response.list;
          });
        }
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


