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
      <el-table-column prop="number" label="编号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="店铺名称" width="200">
      </el-table-column>
      <el-table-column prop="account" label="管理账号"> </el-table-column>
      <el-table-column prop="evaluate" label="评价" width="80">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="编辑" width="400px">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="look(scope.row.id)"
            icon="el-icon-view"
            >预览</el-button
          >
          <el-button
            type="primary"
            @click="update(scope.row.id)"
            icon="el-icon-edit"
            >资料修改</el-button
          >
          <el-button type="danger" @click="del(scope)" icon="el-icon-delete"
            >下架</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>你确定要删除这个店铺吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,isDelete = false">取 消</el-button>
        <el-button type="primary" @click="ensure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pages"
      @current-change="nextPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pages: 1,
      dialogVisible: false,
      isDelete: false
    };
  },
  methods: {
    look(id) {
      this.$router.push("/admin/superAdmini/lookList/" + id);
    },
    update(id) {
      this.$router.push("/admin/superAdmini/updateList/" + id);
    },
    del(scope) {
      var id = scope.row.id;
      var index = scope.$index+1;
      console.log(index);
      console.log(id);
      console.log("删除");
      //弹出确认对话框
      this.dialogVisible = true;
      //进行删除的数据接口请求
      //当点击确认删除的时候才进行删除
      console.log(this.isDelete);
      if(this.isDelete) {
        console.log('--------');
        this.$axios.post("/api/store/delete?id=" + id).then((res) => {
          if (res.data.code == 0) {
              this.$message({
              message: '删除店铺成功~~~',
              type: 'success'
            });
          }
        }).catch((err)=> {
            this.$message.error('删除失败了');
        })
        //前台的数据删除
        this.tableData.splice(index, 1);
        this.isDelete = false;
      }
    },
    nextPage(page) {
      this.$axios.get("/api/store/list?page=" + page).then((res) => {
        var infos = res.data.infos;
        var datas = infos.map((item, index) => ({
          id: item._id,
          number: index + 1,
          name: item.storeName,
          account: item.storeAccount,
          evaluate: item.storeScore,
          address: item.storeAddress,
        }));
        this.tableData = datas;
      });
    },
    //关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log('1213212313213131');
          done();
        })
        .catch((_) => {});
    },
    ensure() {
        console.log('点击了确认按钮');
        this.dialogVisible = false;
        this.isDelete= true;
    }
  },
  //进行列表数据的请求
  mounted() {
    //传过去页数
    this.$axios
      .get("/api/store/list?page=" + this.currentPage, { id: this.currentPage })
      .then((res) => {
        //拿到数据
        console.log(res);
        var infos = res.data.infos;
        var datas = infos.map((item, index) => ({
          id: item._id,
          number: index + 1,
          name: item.storeName,
          account: item.storeAccount,
          evaluate: item.storeScore,
          address: item.storeAddress,
        }));
        this.tableData = datas;
        this.pages = res.data.total;
        console.log(this.pages);
      })
      .catch(() => {});
  },
};
</script>

<style scoped>

</style>
<style lang='scss'>
.storeList {
  .el-table__header-wrapper {
    line-height: 50px;
    height: 50px;
  }
  .el-table {
    margin-top: 20px;
    border-radius: 10px;
  }
  .el-dialog__header {
    height: 40px;
    line-height: 40px;
  }
  .el-dialog__body {
    height: 150px;
    line-height: 150px;

  }
  .el-dialog__footer {
    height: 80px;
    line-height: 80px;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>