<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="account"
             :rules="rules"
             ref="accountFrom"
             label-width="150px"
             size="small">
      <el-form-item label="账号：" prop="account">
        <el-input v-model="account.account" class="input-width" :disabled="this.isEdit"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input v-model="account.nickName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="account.remark">
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
  import {createAccount, fetchList, getAccount, updateAccount} from '@/api/account';

  const defaultAccount = {
    account: null,
    nickName: null,
    avatar: "",
    systemSN: "SYSTEM-340539910304186368"
  };

  export default {
    name: 'accountDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let validateAccountUnique = (rule, account, callback) => {
        if (this.isEdit) {
          callback();
        } else {
          fetchList({
            queryOrders: [{propertyName: "id", sort: false}],
            queryCriteria: [{
              propertyName: "systemSN_EQ",
              value: "SYSTEM-340539910304186368"
            }, {propertyName: "account_EQ", value: account}],
            pageNum: 1,
            pageSize: 1
          }).then(response => {
            if (response.total > 0) {
              callback(new Error("账号已存在"))
            } else {
              callback();
            }
          })
        }
      }
      return {
        account: Object.assign({}, defaultAccount),
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur'},
            {
              validator: validateAccountUnique, trigger: 'blur'
            }
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getAccount(this.$route.query.id).then(response => {
          this.account = response;
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
                this.account.id = this.$route.query.id;
                updateAccount(this.account).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createAccount(this.account).then(response => {
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
        this.account = Object.assign({}, defaultAccount);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


