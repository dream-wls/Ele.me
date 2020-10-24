<template>
  <div class="storeList">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>店铺列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="编号" width="100"> </el-table-column>
      <el-table-column prop="name" label="店铺名称" width="200"> </el-table-column>
      <el-table-column prop="evaluate" label="评价" width="150">
    
    </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="编辑" width="400px">
          <el-button type="success" icon="el-icon-view">预览</el-button>
          <el-button type="primary" icon="el-icon-edit">资料修改</el-button>
           <el-button type="danger" icon="el-icon-delete">下架</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                number: '1',
                name: '周黑鸭',
                evaluate: 4.5,
                address: '上海市普陀区金'
                },
                {
                number: '2',
                name: '周黑鸭',
                evaluate: 4.5,
                address: '上海市普陀区金'
                }]
        
        }
    }

}
</script>

<style>
.el-table {
    margin-top: 20px;
    border-radius: 10px;
}
.el-table__header-wrapper {
    line-height: 50px;
    height: 50px;
}
</style>