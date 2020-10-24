<template>
<div class="homePage">
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
              >
            <!-- 管理店铺 -->
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-eleme"></i>
                    <span>管理店铺</span>
                  </template>
                    <el-menu-item index="1-1">店铺列表</el-menu-item>
                    <el-menu-item index="1-2">注册店铺</el-menu-item>
                </el-submenu>
              </el-menu>
            <!-- 管理商家账户 -->
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>账户管理</span>
                  </template>
                    <el-menu-item index="1-1">账户列表</el-menu-item>
                    <el-menu-item index="1-2">添加账号</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>

          <router-view/>

        </el-main>
      </el-container>
      </div>
</template>

<script>
export default {

}
</script>

<style>
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
.el-menu-vertical-demo  {
    width: 100%;
}
.el-main ,.el-aside{
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
</style>