<template>
  <div class="accountList">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="账户名称" width="100"> </el-table-column>
      <el-table-column prop="store" label="管理店铺" width="200"> </el-table-column>
      <el-table-column prop="evaluate" label="状态" width="150">
          <!-- v-model="state" -->
          <el-switch
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" @click="changePermission(scope.row._id)" icon="el-icon-edit">权限修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  
    data() {
        return {
            tableData: []
        
        }
    },
    
    methods: {
      changePermission(id) {
        this.$router.push('/admin/superAdmini/accountManage/'+id);
      }
    },
    mounted() {
      this.$axios.get('/api/users/man/user').then((res)=> {
        var data = res.data.infos;
        this.tableData = data;
      })
    }
    

}
</script>

<style lang='scss'>
.accountList {
  .el-table {
      margin-top: 20px;
      border-radius: 10px;
  }
  .el-table__header-wrapper {
      line-height: 50px;
      height: 50px;
  }
}
</style>