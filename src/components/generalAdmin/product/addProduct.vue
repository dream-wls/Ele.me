<template>
  <div class="addStore">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>注册商铺</el-breadcrumb-item>
      </el-breadcrumb>
    </div>



    <!-- 表单部分 -->
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item class="storeName" label="商品标题" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" required>
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
             :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
         </el-form-item>

 
      <el-form-item label="主要原料">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
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
      },
      imageUrl: '',
      flie: {},
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
      var param = new FormData();
      param.append('filename',this.flie);
      param.append('storeName',this.form.name);
      // param.append('storeSales',0);
      param.append('storeType',this.form.type);
      param.append('storeInfo',this.form.desc);
      // param.append('storeScore',5);
      param.append('storeAddress',this.form.address);
      param.append('storePsf',this.form.minFee);
      param.append('storePhone',this.form.call);
      param.append('storeSendFree',this.form.shippingFee);
      
      this.$axios.post('/api/store/add',param, {
        headers: {'content-Type' : 'multipart/form-data'}
      }).then((res)=> {
        if(res.data.code == 0) {
          this.$message({
            message: '恭喜你！创建店铺成功',
            type: 'sucess'
          });
        }else {
          this.$message.error('创建店铺失败，请重新创建哦');
        }
      }).catch(()=> {
          this.$message.error('创建店铺失败，请重新创建哦');
      })
    },
    //这个是实现预览的操作
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.flie = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
      },
  },
};
</script>

<style scoped>
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
    border-color: #409EFF;
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
</style>