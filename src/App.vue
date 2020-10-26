<template>
  <div id="app">
     <nav>
      <van-tabbar route v-model="active">
        <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/order" icon="orders-o">订单</van-tabbar-item>
        <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </nav>
    <router-view/>
  </div>
</template>


<script>
export default {
  data() {
  return {
    active: 0,
  };
},
}
</script>


<style lang="scss">
*{
  margin:0;
  padding:0;
}
#app{
  header{
    background-color: #0085ff;
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    color: #fff;
  }
  nav{
    width:100%;
    height: 50px;
    position: fixed;
    z-index: 10000;
    background-color: pink;
    bottom: 0;
  }
}

</style>
