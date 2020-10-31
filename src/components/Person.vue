<template>
  <div id="person">
    <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="onRetrun"/>
    <div class="content">
        <van-cell title="头像" center >
            <van-image round width="60px" height="60px" :src="img"/>
        </van-cell> 
        <van-cell title="用户名" is-link :value="form.username" />
        <van-cell title="手机号" is-link :value="form.phone" />
       <van-cell title="登录密码" is-link value="*****" />
    </div>
  
      <van-button style="margin-top:20px; margin-left:30px;width:80%"  round block type="danger" @click="goLogin">退出登录</van-button>
    </div>
</template>

<script>
import { mapState } from 'vuex' ;

export default {

  data(){
    return{
      img:require('../assets/head.jpg') ,
    }
  },
  computed:{
    ...mapState({
      form : (state) => state.form ,
    })
  },
  methods:{
    onRetrun(){
        this.$router.back();
    },
    goLogin(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang='scss'>
#person{
  z-index: 2007;
  background-color:#eee;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .content{
    padding-top: 10px;
  }
}
</style>