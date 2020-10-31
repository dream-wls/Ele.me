<template>
  <div id="order">
    <van-nav-bar class="bar" title="我的订单" />

    <div class="order-item">
      <ul>
        <li v-for="(item,index) in oList" :key="index">
           <van-card 
            :price="item.price.toFixed(2)"
            :desc=" item.menuNameList.length >= 1 ? item.menuNameList[0] +' 等 '+ item.menuNameList.length + '份商品' : '' " 
            :title="item.storeName" :thumb="item.image" >
          <template #footer> <van-button class="aginBtn" size="mini" @click="againOrder()">再来一单</van-button>
          <span class="arrived"> 已送达</span> </template>
        </van-card>
        </li>
      </ul>
     
    </div>

  </div>
</template>


<script>
import { mapState } from 'vuex' ;

export default {
    data(){
      return{
        oList : [],
        pic : '' ,
        price:0,

      }
    },
    computed:{
      ...mapState({
        form : (state) => state.form ,
        storeId : (state) => state.id,
      })
    },
    created(){
      this.$axios.get('/api/order/orderList',{
        params : { username : this.form.username }
      }).then((res) => {
        console.log(res.data);
        if(res.data.code == 0){
          console.log(res.data)
          this.oList = res.data.infos;
          console.log('请求订单成功',this.oList);
        }else{
          console.log('请求订单失败');
        }
      }).catch((err) => {
        console.log('请求订单失败',err);
      })
    },
    methods:{
      againOrder(){
        console.log(this.storeId);
        this.$router.push('/detail/' + this.storeId);
      },
    }
}
</script>

<style lang="scss" scoped>
#order{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 50px;
  right: 0;
  // background: pink;
  .bar{
    background: lightskyblue;
  }
  .order-item{
    width: 100%;
    height: 100%;
    // background: lightsalmon;
    ul{
      width: 100%;
      height: 100%;
      // background: plum;
      li{
        float: left;
        width: 94%;
        padding: 10px;
      }
    }
  }
  .aginBtn{
    border-color: #2395ff;
    color:  #2395ff;
  }
  .arrived{
    position: absolute;
    left: 38px;
    bottom: 12px;
    color: orangered;
  }



  .van-card__price{
    position: absolute;
    right: 0;
    top: 60px;
  }
  .van-card__title {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    max-width: 166px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-ellipsis{
    width:180px;
  }
}


</style>