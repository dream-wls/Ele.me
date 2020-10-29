<template>
  <div class="addList">
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
      <el-form-item class="storeName" label="店铺名称" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="店铺logo" required>
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
          <el-checkbox label="咖啡店" name="type" value="咖啡店"></el-checkbox>
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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

<style lang="scss">
.addList {
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
}

</style>