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
      <el-table-column prop="username" label="账户名称" width="100">
      </el-table-column>
      <el-table-column prop="store" label="管理店铺" width="200">
      </el-table-column>
      <el-table-column prop="evaluate" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.state"
            @change="switchChange(scope)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="changePermission(scope.row._id)"
            icon="el-icon-edit"
            >权限修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    ...mapState({
      username: (state) => state.userName,
    }),
  },
  methods: {
    changePermission(id) {
      this.$router.push("/admin/superAdmini/accountManage/" + id);
    },
    switchChange(value) {
      //改变用户的状态
      this.$axios
        .post("/api/users/change", {
          userName: value.row.username,
          state: value.row.state,
        })
        .then((res) => {
          console.log(res);
        });
    },
    del(scope) {
      console.log(scope);
      var userName = scope.row.username;
      console.log(userName);
      var index = scope.$index;
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$axios
            .post("/api/users/delete?username=" + userName)
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "删除账号成功~~~",
                  type: "success",
                });
              }
              //前台的数据删除
              this.tableData.splice(index, 1);
              this.isDelete = false;
            })
            .catch((err) => {
              this.$message.error("删除失败了");
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.$axios.get("/api/users/man/user").then((res) => {
      var data = res.data.infos;
      this.tableData = data;
      console.log(data);
    });
  },
};
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