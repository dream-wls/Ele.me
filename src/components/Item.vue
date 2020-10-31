<template>
  <div id="tem">
    <div class="tem-up">
      <img :src="menu.menuImg" alt="">
      <van-icon class="i-right"  name="close" @click="goBack" />
      <div class="cover"></div>
    </div>
    <div class="tem-down">
     <div> 
      <h1>{{menu.menuName}}</h1>
      <p><span>月售{{menu.menuSales}}单 </span>
          <span>好评率{{menu.menuPraise}}%</span></p>
      <p style="color:rgb(255, 83, 57); font-size:16px">￥{{menu.menuFPrice}}</p>
      <p>菜品信息：<br/>
        {{menu.menuInfo}}</p>
     </div>
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex' ;

export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      menu : (state) => state.menu,
    })
  },
  created(){
    console.log(this.menu);
  },
  methods:{
    goBack(){
      this.$router.back();
    }
  }

}
</script>

<style lang="scss" scoped>
#tem{
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width:100%;
  position: absolute;
  z-index: 9999;
  .tem-up{
    width: 100%;
    height: 50%;
    // background: pink;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .i-right{
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 30px;
      color: #fff;
      background: transparent;
      z-index: 20;
    }
    .cover{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height:50px;
      background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5));
      box-sizing: inherit;
      -webkit-tap-highlight-color: transparent;
    }

  }
  .tem-down{
    position: relative;
    width: 100%;
    min-height: 120px;
    font-size: 12px;
    color: #666;
    div{
      padding: 32px 0px;
      h1{
        font-size: 18px;
      }
      p{
        margin: 10px 12px;
      }
    }
  }
}


</style>