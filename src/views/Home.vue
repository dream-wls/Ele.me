<template>
  <div id="home">
    <header>
      <van-icon class="icon" name="location" />
      <span>袋鼠社区公寓dfdfsf ffffffffffffffffff</span>
      <van-icon @click="goAddress" style=" font-size:14px" name="arrow-down" />
    </header>


   
  </div>
</template>

<script>



export default {
  data(){
    return{

    }
  },
  methods:{
    goAddress(){
      this.$router.push('/mine/address');
    }
  }
}
</script>

<style lang="scss" scoped>
#home{
  header{
    display: flex;
    padding: 30px;
    height: 90px;
    box-sizing: border-box;
    background-color: #0085ff;
    font-size: 20px;
    .icon{
      padding-top: 4px;
    }
    span{
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
      
    }
  }
}
</style>
