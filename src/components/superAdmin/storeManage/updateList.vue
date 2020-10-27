<template>
  <div class="addStore">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini/storeList'}">商铺列表</el-breadcrumb-item>
        <el-breadcrumb-item>资料修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 表单部分 -->
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item class="storeName" label="店铺名称" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="店铺logo" required>
        <el-upload  class="avatar-uploader"
               action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            :on-success="handleAvatarSuccess"
              >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="店铺地点">
        <el-input v-model="form.address" required></el-input>
      </el-form-item>

      <el-form-item label="店铺品类" required>
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="饭 店" name="type" value="饭 店"></el-checkbox>
          <el-checkbox label=" 快餐店" name="type" value="快餐店"></el-checkbox>
          <el-checkbox label=" 茶餐厅" name="type" value="茶餐厅"></el-checkbox>
          <el-checkbox label="火锅店" name="type" value="火锅店"></el-checkbox>
          <el-checkbox label="茶 馆" name="type" value="茶 馆"></el-checkbox>
          <el-checkbox label=" 咖啡店" name="type" value="咖啡店"></el-checkbox>
          <el-checkbox label="饺子馆" name="type" value="饺子馆"></el-checkbox>
          <el-checkbox label="西餐厅" name="type" value="西餐厅"></el-checkbox>
          <el-checkbox label="米粉店" name="type" value="米粉店"></el-checkbox>
          <el-checkbox label=" 熟食店" name="type" value="熟食店"></el-checkbox>
          <el-checkbox label="汤品店" name="type" value="汤品店"></el-checkbox>
          <el-checkbox label="面 馆" name="type" value="面 馆"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="起送费用">
        <el-input v-model="form.minFee" width="100px"></el-input>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="form.shippingFee" width="100px"></el-input>
      </el-form-item>

      <el-form-item label="商家电话">
        <el-input v-model="form.call"></el-input>
      </el-form-item>
      <el-form-item label="店铺介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改资料</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        type: [],
        minFee: 0,
        shippingFee: 0,
        call: "",
        desc: "",
        desc: "",
      },
      imageUrl: '',
      file: {}
    };
  },
  props:['id'],
  methods: {
    //修改店铺
    onSubmit() {
      console.log("submit!");
      var param = new FormData();
      console.log('======',this.form);
      console.log('======',this.file);
      param.append('filename',this.file);
      param.append('storeName',this.form.name);
      // param.append('storeSales',0);
      param.append('storeType',this.form.type);
      param.append('storeInfo',this.form.desc);
      // param.append('storeScore',5);
      param.append('storeAddress',this.form.address);
      param.append('storePsf',this.form.minFee);
      param.append('storePhone',this.form.call);
      param.append('storeSendFree',this.form.shippingFee);

      this.$axios.post('/api/store/update?id='+this.id,param,{
        headers: {'content-Type' : 'multipart/form-data'}
      }).then((res)=> {
        console.log('修改成功');
        console.log(res);
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.file = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
      },
  },
  mounted() {
    this.$axios.get('/api/store/find?id='+this.id)
    .then((res)=> {
      var data = res.data.info;
      console.log(data);
     this.form.name= data.storeName,
     this.form.address= data.storeAddress,
     this.form.type= data.storeType,
     this.form.minFee= data.storeSendFree,
     this.form.shippingFee= data.storePsf,
     this.form.call= data.storePhone,
     this.form.desc= data.storeInfo;
     this.imageUrl = data.storeImg;
     this.file = data.storeImg;
    })
  }
};
</script>

<style lang='scss'>
.addStore {
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
}

</style>