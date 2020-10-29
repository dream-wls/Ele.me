<template>
  <div class="homePage">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col id="menu" :span="12">
            <!-- 管理店铺 -->
            <el-menu  v-if="isAdmin"  default-active="1" class="el-menu-vertical-demo" router>
              <el-submenu index="1" router>
                <template slot="title">
                  <i class="el-icon-eleme"></i>
                  <span>管理店铺</span>
                </template>
                <el-menu-item index="/admin/superAdmini/storeList" router="true"
                  >店铺列表</el-menu-item
                >
                <el-menu-item index="/admin/superAdmini/addList"
                  >注册店铺</el-menu-item
                >
              </el-submenu>
            </el-menu>
            
            <!-- 管理商家账户 -->
            <el-menu  v-if="isAdmin"  default-active="2" class="el-menu-vertical-demo" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>账户管理</span>
                </template>
                <el-menu-item index="/admin/superAdmini/accountList"
                  >账户列表</el-menu-item
                >
              </el-submenu>
            </el-menu>


            <!-- 店主管理显示模块 -->
            <el-menu v-if="!isAdmin" default-active="3" class="el-menu-vertical-demo" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-eleme"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="/admin/generalAdmin/productList" router="true">商品列表</el-menu-item>
                <el-menu-item index="/admin/generalAdmin/addProduct" router="true">添加商品</el-menu-item>
              </el-submenu>
            </el-menu>

            <el-menu v-if="!isAdmin" default-active="4" class="el-menu-vertical-demo" router>
              <el-submenu index="1" router>
                <template slot="title">
                  <i class="el-icon-eleme"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="/admin/superAdmini/storeList" router="true">商品订单列表</el-menu-item>
              </el-submenu>
            </el-menu>
               
            <el-menu v-if="!isAdmin" default-active="2" class="el-menu-vertical-demo" router>
              <el-submenu index="1" router>
                <template slot="title">
                  <i class="el-icon-eleme"></i>
                  <span>营销管理</span>
                </template>
                <el-menu-item index="/admin/superAdmini/storeList" router="true">优惠券</el-menu-item>
                
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 这里地方是内容部分 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script scoped>
import {mapState} from 'vuex'
export default {
  data() {
    return{
      isShow: false,
    }
  },
   computed: {
       ...mapState({
         isAdmin: (state) => state.isAdmin,
       })
  },
}
</script>

<style lang="scss">
.homePage {
      .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    .el-col-12 {
      width: 100%;
    }
    .el-menu-vertical-demo {
      width: 100%;
    }
    .el-main,
    .el-aside {
      margin-bottom: -9999px;
      padding-bottom: 9999px;
    }
    .el-header {
      padding: 15px 35px;
      box-sizing: content-box;
    }
    .title {
      float: left;
      font-size: 30px;
      font-weight: 700;
    }
    .right {
      float: right;
    }

}

</style>