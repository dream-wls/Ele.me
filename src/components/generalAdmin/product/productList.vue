<template>
  <div class="productList">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.menuName }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <img :src="props.row.menuImg" alt="" srcset="" />
            </el-form-item>
            <el-form-item label="上架时间">
              <span>{{ props.row.menuDate | setTimer }}</span>
            </el-form-item>
            <el-form-item label="好评">
              <span>{{ props.row.menuPraise }}</span>
            </el-form-item>
            <el-form-item label="折扣">
              <span>{{ props.row.menuDiscount }}</span>
            </el-form-item>
            <el-form-item label="优惠">
              <span>{{ props.row.menuDiscounts }}</span>
            </el-form-item>
            <el-form-item label="折扣价">
              <span>{{ props.row.menuFPrice }}</span>
            </el-form-item>
            <el-form-item label="原件">
              <span>{{ props.row.menuPrice }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.menuType }}</span>
            </el-form-item>
            <el-form-item label="是否是招牌">
              <span>{{ props.row.menuFlag }}</span>
            </el-form-item>
            <el-form-item label="菜品信息">
              <span>{{ props.row.menuInfo }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="menuNum"> </el-table-column>
      <el-table-column label="商品名称" prop="menuName"> </el-table-column>
      <el-table-column label="折扣价" prop="menuFPrice"> </el-table-column>
      <el-table-column label="上架时间" prop="menuDate"> </el-table-column>
      <el-table-column label="操作">
        <!-- <el-button
          type="primary"
          @click="update(scope.row.id)"
          icon="el-icon-edit"
          >资料修改</el-button
        > -->
        <el-button type="danger" @click="del(scope)" icon="el-icon-delete"
          >下架</el-button
        >
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
        <el-button @click="(dialogVisible = false), (isDelete = false)"
          >取 消</el-button
        >
        <el-button type="primary" @click="ensure">确 定</el-button>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pages: 1, //页数
      dialogVisible: false,
      isDelete: false,
    };
  },
  computed: {
    ...mapState({
      currentStore: (state) => state.currentStore,
    }),
  },
  //我们要进行监听 每当当前店铺改变的时候就重新渲染一下
  watch: {
    currentStore: {
      handler() {
        //每选择的店铺改变的时候就进行一次请求
        this.productListAxios();
      },
      immediate: true,
    },
  },
  //过滤器过滤时间
  filters: {
    setTimer: function (value) {
      return value.slice(0, 10);
    },
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
      var index = scope.$index + 1;
      console.log(index);
      console.log(id);
      console.log("删除");
      //弹出确认对话框
      this.dialogVisible = true;
      //进行删除的数据接口请求
      //当点击确认删除的时候才进行删除
      console.log(this.isDelete);
      if (this.isDelete) {
        console.log("--------");
        this.$axios
          .post("/api/store/delete?id=" + id)
          .then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除店铺成功~~~",
                type: "success",
              });
            }
          })
          .catch((err) => {
            this.$message.error("删除失败了");
          });
        //前台的数据删除
        this.tableData.splice(index, 1);
        this.isDelete = false;
      }
    },
    nextPage(page) {
      this.currentPage = page;
      this.productListAxios();
    },
    //关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log("1213212313213131");
          done();
        })
        .catch((_) => {});
    },
    ensure() {
      console.log("点击了确认按钮");
      this.dialogVisible = false;
      this.isDelete = true;
    },
    //进行当前列表的请求
    productListAxios() {
      this.$axios
        .get("/api/store/caiList", {
          params: { storeName: this.currentStore, page: this.currentPage },
        })
        .then((res) => {
          console.log("---------");
          console.log(res);
          console.log(res.data.total);
          this.pages = res.data.total;
          // 筛选数据
          var data = res.data.infos.map((item, index) => ({
            menuNum: index + 1,
            menuName: item.menuName,
            menuImg: item.menuImg,
            menuDate: item.menuDate.slice(0, 10),
            menuPrice: item.menuPrice, //原件
            menuFPrice: item.menuFPrice, //折扣价
            menuPraise: item.menuPraise, //好评
            menuType: item.menuType,
            menuFlag: item.menuFlag, //是否为招牌
            menuSales: item.menuSales,
            menuInfo: item.menuInfo,
          }));
          console.log(data);
          this.tableData = data;
        });
    },
  },
  //进行列表数据的请求
  mounted() {
    //传过去页数
    this.productListAxios();
  },
};
</script>

<style scoped>
</style>
<style lang='scss'>
.productList {
  .el-table__header-wrapper {
    line-height: 50px;
    height: 50px;
  }
  .el-table {
    margin-top: 20px;
    border-radius: 10px;
  }
}
</style>