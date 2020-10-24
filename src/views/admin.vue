<template>
  <div class="admin">
    <el-container>
      <!-- 头部 -->
      <el-header> 
          <div class="title">
              <i class="el-icon-eleme"></i>
              后台管理系统
          </div>
          <div class="right">
              欢迎您！<span></span>
              <router-link to="/login">退出</router-link>
          </div>
          
      </el-header>
      <!-- 内容 -->
        <router-view/>

    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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