<template>
  <div id="register">
      <h1>饱了吗</h1>
      <div class="form">
        <van-form v-model="form" @submit="onSubmit">
            <van-field v-model="form.username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="form.phonenum" name="手机号" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="form.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="form.check_pw" type="password" name="确认密码" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请再次填写密码' }]" />
            <div class="btn">
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
            <router-link class="loginBtn" to="/login">已有账号？</router-link>
        </van-form>
      </div>
      
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
    data() {
        return {
            form : {
                username: '',
                phonenum: '',
                password: '',
                check_pw: '' 
            },
        
        };
    },
    methods: {
        onSubmit() {
             this.$axios.post('/api/users/register',{
                username : this.form.username,
                phone : this.form.phonenum,
                password:this.form.password
            }).then((res) => {
               console.log(res.data);

                if(res.data.code == 0 ){
                     Dialog.alert({
                        message: '注册成功!',
                        theme: 'round-button',
                    }).then(() => {
                    // on close
                    });
                    this.$router.push('/login');
                } else{
                    Dialog.alert({
                        message: '注册失败，请重新注册!',
                        theme: 'round-button',
                    }).then(() => {
                    // on close
                    });
                }
            }).catch(() => {
                    Dialog.alert({
                        message: '注册失败，请重新注册!',
                        theme: 'round-button',
                    }).then(() => {
                    // on close
                    });
            })
        },
    },
}
</script>

<style lang='scss'>
#register{
    h1{
        margin-top: 120px ;
        text-align: center;
        color: #0085ff;
    }
    .form{
        width: 80%;
        margin: 0 auto ;
    }
    .btn{
        margin-top: 36px;
    }
    .loginBtn{
        float: right;
        margin-top: 20px;
        font-size: 14px;
    }
    .loginBtn:hover{
        text-decoration: underline;
    }
}
    
</style>