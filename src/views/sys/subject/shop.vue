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
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="账号：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="账号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list"
                style="width: 100%;">
        <!--        <el-table-column label="编号" width="200" align="center">-->
        <!--          <template slot-scope="scope">{{scope.row.id}}</template>-->
        <!--        </el-table-column>-->
        <el-table-column label="编号" width="400" align="center">
          <template slot-scope="scope">{{scope.row.sn}}</template>
        </el-table-column>
        <el-table-column label="名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <el-table-column prop="provinceName" label="省份" width="100" align="center">
            <template slot-scope="scope">{{scope.row.provinceName}}</template>
          </el-table-column>
          <el-table-column prop="cityName" label="市" width="100" align="center">
            <template slot-scope="scope">{{scope.row.cityName}}</template>
          </el-table-column>
          <el-table-column prop="countryName" label="县" width="100" align="center">
            <template slot-scope="scope">{{scope.row.countryName}}</template>
          </el-table-column>
          <el-table-column prop="detail" label="详细地址" width="200" align="center">
            <template slot-scope="scope">{{scope.row.detail}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
<!--            <el-button size="mini"-->
<!--                       type="text"-->
<!--                       @click="handleView(scope.$index, scope.row)">查看-->
<!--            </el-button>-->
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
<!--            <el-button size="mini"-->
<!--                       type="text"-->
<!--                       @click="handleAddress(scope.$index, scope.row)">地址-->
<!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList, deleteOrg} from '@/api/org';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    queryOrders: [{propertyName: "id", sort: false}],
    queryCriteria: [{propertyName: "systemSN_EQ", value: "SYSTEM-340539910304186368"}],
    pageNum: 1
  };

  export default {
    name: 'orgList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: []
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatType(type) {
        for (let i = 0; i < defaultTypeOptions.length; i++) {
          if (type === defaultTypeOptions[i].value) {
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatDate(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.$router.push({path: '/sys/addOrg'})
      },
      handleView(index, row) {
        this.$router.push({path: '/sms/couponHistory', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/sys/updateOrg', query: {id: row.id}})
      },
      handleAddress(index, row) {
        this.$router.push({path: '/sys/org/address', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrg(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        })
      },
      getList() {
        debugger;
        this.listLoading = true;
        this.listQuery.queryCriteria.push({"propertyName": "parentOrgSN_EQ", value: this.$route.query.sn})
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
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


