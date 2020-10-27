<template>
  <div class="registerBox">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3 class="title"><i class="el-icon-eleme"></i>后台管理系统</h3>
        <el-form-item label="账号" prop="user">
          <el-input type="txt" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input type="password" v-model="ruleForm.pass2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <router-link class="register" to="/login">登录账号</router-link>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    data() {
       var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.pass !== '') {
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.user !== '') {
          }
          callback();
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.user !== '') {
            // this.$refs.ruleForm.validateField('pass');
          }
          callback();
        }
      }
      
      return {
        ruleForm: {
              pass: '',
              pass2: '',
              user: '',
            },
            rules: {
              user: [
                { validator: validateUser, trigger: 'blur' }
              ],
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              pass2: [
                { validator: validatePass2, trigger: 'blur' }
              ],
            }
      }
    },
    methods: {
        submitForm(formName) {
          console.log('点击了注册');
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('/api/users/man/register', {
                  username: this.ruleForm.user,
                  password: this.ruleForm.pass
              }).then((res)=> {
                if(res.data.code == 0) {
                  this.$message({
                        message: '恭喜你，注册成功',
                        type: 'success'
                  });
                }else {
                  this.$message.error('注册失败');
                }

              })
            } else {
              console.log('提交失败!!');
              return false;
            }
          });
       }
    }
}
</script>

<style scoped>
  .register  {
    align-items: bottom;
    float: right;
  }
  .title {
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
  }
</style>
<style lang="scss">
.registerBox {
   .demo-ruleForm {
    width: 400px;
    margin: 0 auto;
    border: 1px solid lightblue;
    padding: 30px;
    border-radius: 15px;
  }
}
</style>