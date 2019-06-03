<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="queryCriteriaObj" size="small" label-width="140px">

          <el-form-item label="账户编号：">
            <el-input v-model="queryCriteriaObj.sn_EQ" class="input-width" placeholder="账户编号（精准匹配）"></el-input>
          </el-form-item>

          <el-form-item label="账户昵称：">
            <el-input v-model="queryCriteriaObj.nickName_LIKE" class="input-width" placeholder="账户昵称（模糊匹配）"></el-input>
          </el-form-item>

          <!--<el-form-item label="角色列表：">-->
          <!--<el-select v-model="queryCriteriaObj.O_roleSN_IN" class="input-width" placeholder="全部" clearable>-->
          <!--<el-option v-for="item in roleData"-->
          <!--:key="item.sn"-->
          <!--:label="item.name"-->
          <!--:value="item.sn">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="创建时间（起）：">-->
          <!--<el-date-picker-->
          <!--class="input-width"-->
          <!--v-model="queryCriteriaObj.ctime_GEQ"-->
          <!--value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--type="datetime"-->
          <!--placeholder="请选择时间">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="创建时间（止）：">-->
          <!--<el-date-picker-->
          <!--class="input-width"-->
          <!--v-model="queryCriteriaObj.ctime_LEQ"-->
          <!--value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--type="datetime"-->
          <!--placeholder="请选择时间">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>

    <div class="divs-container">
      <div class="divs-header">
      </div>
      <div class="divs-body">
        <div class="obj-row" v-for="item in list">
          <div class="obj-cell">
            <div class="obj-cell-label">
              <span>编码</span>
            </div>
            <div class="obj-cell-value">
              <span>{{item.sn}}</span>
            </div>
          </div>
          <div class="obj-cell">
            <div class="obj-cell-label">
              <span>昵称</span>
            </div>
            <div class="obj-cell-value">
              <span>{{item.nickName}}</span>
            </div>
          </div>
          <div class="obj-cell">
            <div class="obj-cell-label">
              <span>注册IP</span>
            </div>
            <div class="obj-cell-value">
              <span>{{item.registerIP}}</span>
            </div>
          </div>
          <div class="obj-cell">
            <div class="obj-cell-label">
              <span>图片</span>
            </div>
            <div class="obj-cell-value">
              <span>{{item.avatar}}</span>
            </div>
          </div>
          <div class="obj-cell">
            <div class="obj-cell-label">
              <span>操作</span>
            </div>
            <div class="obj-cell-value">
              <!--<div class="operate-cell"-->
              <!--@click="handleDetail(1, item)"-->
              <!--&gt;-->
              <span @click="handleDetail(1, item)">查看详情</span>
              <!--</div>-->
              <!--<div class="operate-cell"-->
              <!--size="mini"-->
              <!--type="danger"-->
              <!--@click="handleDelete(1, item)">-->
              <span>删除</span>
            </div>
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="divs-foots"></div>
    </div>


  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/robert-tables.scss";
</style>
<script>
  import {fetchList, deleteAccount} from '@/api/account'
  import {fetchQueryList} from '@/api/role'
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    startRow: 0,
    pageSize: 10,
    queryCriteria: [],
    queryOrders: [{"propertyName": "ctime", "sort": false}]
  };
  export default {
    name: "fetchList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        roleData: [],
        queryCriteriaObj: {}
      }
    },
    created() {
      this.getList();
//      this.initRoleData();
    },
    filters: {
      formatDateTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.queryCriteriaObj = {};
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 0;
        this.getList();
      },
      handleDetail(index, row) {
        this.$router.push({path: "/user/account/detail", query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//          let params = new URLSearchParams();
//          deleteAccount(row.id).then(response => {
//            this.$message({
//              message: '删除成功！',
//              type: 'success',
//              duration: 1000
//            });
//            this.getList();
//          });
        })
      },
      initRoleData() {
        fetchQueryList([]).then(response => {
          this.roleData = response.body;
        });
      },
      getList() {
        this.listLoading = true;
        let queryCriteria = [];
        if (this.queryCriteriaObj != {}) {
          let obj = this.queryCriteriaObj;
          Object.keys(obj).forEach(function (key) {
            queryCriteria.push({"propertyName": key, "value": obj[key]});
          });
        }
        this.listQuery['queryCriteria'] = queryCriteria;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.body.list;
          this.total = response.body.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }


</style>


