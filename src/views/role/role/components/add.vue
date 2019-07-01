<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>新增权限</span>
      </div>

      <div style="margin-top: 15px">
        <el-form :inline="true" :model="role" size="small" label-width="140px">

          <el-form-item label="系统：">
            <el-input v-model="role.systemSN" class="input-width" placeholder="系统"></el-input>
          </el-form-item>

          <el-form-item label="角色编号：">
            <el-input v-model="role.code" class="input-width" placeholder="角色编号"></el-input>
          </el-form-item>

          <el-form-item label="角色名称：">
            <el-input v-model="role.name" class="input-width" placeholder="角色名称"></el-input>
          </el-form-item>

          <el-form-item label="角色状态：">
            <el-select v-model="role.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in status"
                         :key="item.dictValue"
                         :label="item.dictLabel"
                         :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>

      <div class="robert-oper">
        <span class="robert-confirm" @click="submit()">提交</span>
        <span class="robert-back" @click="roleList()">返回</span>
      </div>
    </el-card>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/robert-tables.scss";
</style>
<script>
  import {addRole} from '@/api/rbac';
  import {fetchDictByType} from '@/api/dict';

  export default {
    name: 'detail',
    data() {
      return {
        role: {},
        status: []
      }
    },
    created() {
      this.statusDictList();
    },
    methods: {
      statusDictList() {
        fetchDictByType('10006').then(r => {
          this.status = r.body;
        });
      },
      roleList() {
        this.$router.push({path: "/user/role"});
      },
      submit() {
        if (null != this.role) {
          console.log(this.role)
          addRole(this.role).then(r => {
            this.roleList()
          });
        }
      }
    }
  }
</script>
