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

          <!--<el-form-item label="账户编号：">-->
          <!--<el-input v-model="queryCriteriaObj.sn_EQ" class="input-width" placeholder="账户编号（精准匹配）"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="账户昵称：">-->
          <!--<el-input v-model="queryCriteriaObj.nickName_LIKE" class="input-width" placeholder="账户昵称（模糊匹配）"></el-input>-->
          <!--</el-form-item>-->

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
    <!--<div class="table-container">-->
    <!--<el-table ref="orderTable"-->
    <!--:data="list"-->
    <!--style="width: 100%;"-->
    <!--v-loading="listLoading" border>-->
    <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
    <!--<el-table-column label="编号" width="180" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.id}}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="昵称" width="180" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.nickName}}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="注册IP" width="180" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.registerIP}}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="创建时间" width="180" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.ctime | formatDateTime}}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="最近更新时间" width="180" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.utime | formatDateTime}}</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="操作" width="200" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<el-button-->
    <!--size="mini"-->
    <!--@click="handleDetail(scope.$index, scope.row)"-->
    <!--&gt;查看详情-->
    <!--</el-button>-->
    <!--<el-button-->
    <!--size="mini"-->
    <!--type="danger"-->
    <!--@click="handleDelete(scope.$index, scope.row)">删除-->
    <!--</el-button>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->

    <div class="divs-container">
      <div class="divs-header">
      </div>
      <div class="divs-body">
        <div class="obj-row" v-for="item in list">
          <div class="obj-cell">
            <div>
              <div>
                <span>编码</span>
              </div>
              <div>
                <span>{{item.sn}}</span>
              </div>
            </div>
          </div>
          <div class="obj-cell">
            <div>
              <div>
                <span>昵称</span>
              </div>
              <div>
                <span>{{item.nickName}}</span>
              </div>
            </div>
          </div>
          <div class="obj-cell">
            <div>
              <div>
                <span>注册IP</span>
              </div>
              <div>
                <span>{{item.registerIP}}</span>
              </div>
            </div>
          </div>
          <div class="obj-cell">
            <div>
              <div>
                <span>图片</span>
              </div>
              <div>
                <span>1231231</span>
              </div>
            </div>
          </div>
          <div class="obj-cell operate-cell">
            <el-button
              size="mini"
              @click="handleDetail(1, item)"
            >查看详情
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(1, item)">删除
            </el-button>
          </div>
        </div>
      </div>
      <div class="divs-foots"></div>
    </div>


  </div>
</template>
<script>
  import {fetchList, deleteAccount} from '@/api/account'
  import {fetchQueryList} from '@/api/role'
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    startRow: 0,
    pageSize: 10,
    queryCriteria: []
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
      this.initRoleData();
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
          let params = new URLSearchParams();
          deleteAccount(row.id).then(response => {
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
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

  .divs-container {
    font-size: 12px;
    margin-top: 10px;
  }

  .divs-container .divs-body {
  }

  @media screen and (max-device-width: 400px) {
    .divs-container .divs-body .obj-row {
      border: 1px solid #d8e4f1;
      height: 91px;
    }

    .divs-container .divs-body .obj-row .obj-cell {
      border-bottom: 1px solid #d8e4f1;
      border-right: 1px solid #d8e4f1;
      width: 69%;
    }

    .divs-container .divs-body .obj-row .obj-cell:nth-last-child(2) {
      border: none;
    }

    .divs-container .divs-body .obj-row .obj-cell:nth-last-child(3) {
      border-bottom: none;
    }

    .divs-container .divs-body .obj-row .obj-cell * {
      display: block;
    }

    .divs-container .divs-body .obj-row .obj-cell:nth-last-child(2) {
      position: relative;
      right: -69%;
      top: -87px;
      width: 29%;
      height: 87px;
    }

    .divs-container .divs-body .obj-row .obj-cell > div > div:nth-child(1) {
      border-right: 1px solid #d8e4f1;
    }

    .divs-container .divs-body .obj-row .obj-cell:nth-last-child(2) > div > div:nth-child(1) {
      display: none;
    }

    .divs-container .divs-body .obj-row .obj-cell:nth-last-child(1) {
      width: 100%;
      height: 39px;
      position: relative;
      top: -86px;
      align-items: center;
      padding-top: 7px;
      padding-left: 17px;
      border-left: 1px solid #d8e4f1;
    }

    .divs-container .divs-body .obj-row .obj-cell > div > div {
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      height: 29px;
      line-height: 27px;
      width: 69%;
    }

    .divs-container .divs-body .obj-row .obj-cell > div > div:nth-child(1) {
      width: 29%;
    }

    .divs-container .divs-body .obj-row .obj-cell > div > div span {
      line-height: 27px;
      vertical-align: middle;
      text-align: center;
      padding-left: 7px;
    }

    .divs-container .divs-body .obj-row .obj-cell > div > div:nth-child(1) span {
      text-align: left;
    }

    .divs-container .divs-body .obj-row .obj-cell {
      /*height: 18px;*/
      /*width:200px;*/
    }

    .divs-container .divs-body .obj-row .operate-cell > * {
      display: inline-block;
      vertical-align: middle;
    }
  }


</style>


