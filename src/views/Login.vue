<template>
  <div id="Mine">
      <h1>饱了吗</h1>
      <div class="form">
        <van-form v-model="form" @submit="onSubmit">
            <van-field v-model="form.phonenum" name="手机号" label="手机号" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' }]" />
            <van-field v-model="form.password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div class="btn">
                <van-button @click="onSubmit" round block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
        <router-link class="loginBtn" to="/register">注册账号？</router-link>
      </div>
        

  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
    data(){
        return{
            form : {
                phonenum : '' ,
                password : ''
            },
            result : {} ,
        }
    },
    methods:{
        onSubmit(){
           this.$axios.post('/api/users/login',{
               phone:this.form.phonenum,
               password:this.form.password,
               
           }).then((res)=>{
            //    console.log(res.data);
               if(res.data.code == 0){
                   this.result = res.data.info;
                    Dialog.alert({
                        message: '登录成功!',
                        theme: 'round-button',
                    }).then(() => {
                    // on close
                    });

                   this.$router.push('/mine');
                   localStorage.setItem('token' , res.data.token);
               }else{
                   Dialog.alert({
                        message: '登录失败，请重新登录!',
                        theme: 'round-button',
                    }).then(() => {
                        // on close();
                    });
               }
           }).catch(() => {
                Dialog.alert({
                    message: '登录失败，请重新登录!',
                    theme: 'round-button',
                }).then(() => {
                    // location.href='/login';
                });
           })
            
        }
    }
}
</script>

<style lang="scss">
#Mine{
    
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