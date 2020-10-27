<template>
  <div class="lookList">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini/storeList'}">商铺列表</el-breadcrumb-item>
        <el-breadcrumb-item>店铺信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

 
 
  <a-descriptions title="店铺资料" :column="1" :bordered="true" >
    <a-descriptions-item label="店铺名" with="100px">
      {{form.storeName}}
    </a-descriptions-item>
    <a-descriptions-item label="店铺logo">
      <img class="logo" :src="form.storeImg" alt="">
    </a-descriptions-item>
    <a-descriptions-item label="电话号码">
       {{form.storePhone}}
    </a-descriptions-item>
    <a-descriptions-item label="月销量">
      {{form.storeSales}}
    </a-descriptions-item>
    <a-descriptions-item label="多少起送">
      {{form.storeSales}}
    </a-descriptions-item>
    <a-descriptions-item label="类型">
      {{type}}
    </a-descriptions-item>
    <a-descriptions-item label="配送费">
      {{form.storePsf}}
    </a-descriptions-item>
    <a-descriptions-item label="商店位置">
      {{form.storeAddress}}
    </a-descriptions-item>
    <a-descriptions-item label="商家信息">
      {{form.storeInfo}}
    </a-descriptions-item>
  </a-descriptions>
 
  </div>
</template>

<script>
import {Descriptions,} from 'ant-design-vue'
export default {
  props:['id'],
  data() {
    return {
      form: {},
      type: '',
    };
  },
  components: {
      [Descriptions.name]:Descriptions,
      [Descriptions.Item.name]:Descriptions.Item,
      // [Dadge.name]:Dadge,

  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  mounted() {
    //进行预览的数据请求
    this.$axios.get('/api/store/find', {
      params:{
        id: this.id
      }
    }).then((info) => {
      console.log(this.id);
        console.log('返回的数据',info);
        this.form= info.data.info;
        console.log(this.form);
        this.form.storeType.forEach((item)=> {
          this.type += item;
        });
        console.log(this.type);
    }).catch();
  }
};
</script>

<style lang='scss'>
.lookList {
  .el-form {
  margin: 30px 0px;
  width: 400px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-checkbox-group {
  float: left;
}
.logo {
  width: 100px;
  height: 100px;
}
.ant-descriptions-item-label {
  width: 150px;
}
.ant-descriptions-item-content {
  width: 350px;
}
.ant-descriptions-view {
  width: 500px;
  margin-bottom: 40px;
}
.ant-descriptions-title {
  margin-top: 20px;
  margin-left: 300px;
  text-align: left;
}

}

</style>