<template>
  <div class="addProduct">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>



    <!-- 表单部分 -->
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item class="storeName" label="商品标题" required>
        <el-input v-model="form.menuName"></el-input>
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

      <el-form-item  label="是否为招牌">
          <el-switch
            v-model="form.menuFlag"
            active-color="#13ce66"
            inactive-color="#ff4949">
            <!-- 左右颜色 -->
          </el-switch>
      </el-form-item>
      <el-form-item class="storeName" label="商品类型" required>
          <el-input  class="input" v-model="form.menuType"></el-input>
      </el-form-item>


      <el-form-item class="storeName" label="价格" required>
        <el-input v-model="form.menuPrice"></el-input>
      </el-form-item>

      <el-form-item class="storeName" label="折扣" required>
        <el-input v-model="form.menuDiscount"></el-input>
      </el-form-item>

      <el-form-item class="storeName" label="优惠" required>
        <el-input v-model="form.menuDiscounts"></el-input>
      </el-form-item>

      <el-form-item label="主要原料">
        <el-input type="textarea"  rows="5" cols="20" v-model="form.menuInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Button } from 'ant-design-vue'
console.log(Button);
export default {
  components:{
    [Button.name] : Button,
  },
  data() {
    return {
      form: {
        filename:'',
        menuName: '',
        menuInfo: '',
        menuFlag: false,
        menuDiscount: 1,
        menuDiscounts: '',
        menuPrice: 20,
        menuType:''
      },
      storeName:'this',
      imageUrl: '',
      flie: {},
      radio: '1',
      addType: ''
    }
  },
  computed: {
    ...mapState({
      sName: (state) => state.currentStore,
    })
  },
  methods: {
    onSubmit() {
      var param = new FormData();
      param.append('filename',this.flie);
      param.append('menuName',this.form.menuName);
      param.append('menuInfo',this.form.menuInfo);
      param.append('menuFlag',this.form.menuFlag);
      param.append('menuDiscount',this.form.menuDiscount);
      param.append('menuDiscounts',this.form.menuDiscounts);
      param.append('menuPrice',this.form.menuPrice);
      param.append('menuType',this.form.menuType);
      param.append('storeName',this.sName);//这里要传入商铺名
      this.$axios.post('/api/store/caiAdd',param, {
        headers: {'content-Type' : 'multipart/form-data'}
      }).then((res)=> {
        if(res.data.code == 0) {
          this.$message({
            message: '恭喜你！添加商品成功',
            type: 'sucess'
          });
        }else {
          this.$message.error('添加商品失败，请重新添加哦');
        }
      }).catch(()=> {
          this.$message.error('添加商品失败，请重新添加哦');
      })
    },
    //这个是实现预览的操作
    handleAvatarSuccess(res, file) {
      this.flie = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //添加菜品类型
    addAction() {
      console.log('点击了添加按钮');
      if(!this.addType) {
        this.$message.error('没有输入任何类型哦');
        return;
      }else {
        // 进行dom操作
        $('#radioGroup').append(`<el-radio :label="6">十二区</el-radio>`);
      }

    }
  },
 
};
</script>
<style>
.input {
  float: left;
  width: 150px;

}
.addButton {
  float: left;
  align-items: center;
  margin-left: 20px;
  margin-top: 4px;
}
</style>
<style lang='scss'>
.addProduct {
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
  .el-radio {
    margin-top: 5px;
    margin-bottom: 12px;
  }
}

</style>