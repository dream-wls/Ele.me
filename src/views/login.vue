<template>
  <div class="loginBox">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3 class="title"><i class="el-icon-eleme"></i>后台管理系统</h3>
        <el-form-item label="账号" prop="user">
          <el-input type="txt" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="yzm"  v-model="ruleForm.yzm" type="password" autocomplete="off"></el-input>
          <!-- 这里是验证码图片 -->
          <img id="yzm" @click="yzmChange"  src="/api/users/ycode" alt="">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <router-link class="register" to="/register">注册账号</router-link>
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
      
      return {
        ruleForm: {
              pass: '',
              user: '',
              yzm: '',
            },
            rules: {
              user: [
                { validator: validateUser, trigger: 'blur' }
              ],
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
            }
      }
    },
    methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post('/api/users/man/login',{
                username: this.ruleForm.user,
                password: this.ruleForm.pass,
                yzm: this.ruleForm.yzm,

              }).then((res)=> {
                //res就是那个响应的json数据
                  if(res.data.code == 0) {
                      //登录成功
                      this.$message({
                        message: '恭喜你，登录成功',
                        type: 'success'
                      });
                      this.$router.push('/admin');
                      //我们要把type存进去
                      this.$store.commit('setUserName', this.ruleForm.user);
                      //我这边就可以拿到了token 
                      localStorage.setItem('token',res.data.token);
                  }else {
                    this.$message.error('登录失败');
                  }
              })
            } else {
              return false;
            }
          });
       }
        ,
        yzmChange() {
          $('#yzm').attr('src','/api/users/ycode?'+ Math.random());
        }
    }
}
</script>

<style scoped>

  .register  {
    align-items: bottom;
    float: right;
  }
  .yzm {
      width: 100px;
  }
  .title {
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
  }
</style>
<style lang="scss">
.loginBox {
  .demo-ruleForm {
    width: 400px;
    margin: 0 auto;
    border: 1px solid lightblue;
    padding: 30px;
    border-radius: 15px;
  }
}
  
</style>