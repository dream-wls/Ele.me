<template>
  <div id="search">
    <header>
      <van-icon class="icon" name="arrow-left" @click="goBack" />
      <van-search v-model="value" size="14" show-action placeholder="请输入商家、商品名称" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </header>


  <div v-if="isShow">
    <ul class="list-item">
      <li v-for="item in info" :key="item._id" @click="goDetail(item._id)">
        <div><img :src="item.storeImg" alt=""></div>
        <h1>{{item.storeName}}</h1>
        <p>{{item.storeInfo}}</p>
      </li>
    </ul>
  </div>

    <div class="container" v-if="isHave">
      <section>
        <div class="history">
            <h1>历史搜索</h1>
            <van-icon  class="his-right" @click="deleteAction" color="#ddd" name="delete" />
        </div>
        <section class="hisBtn" >
          <ul>
            <li v-for="(item,index) in vList" :key="index">
              <van-button class="v-btn" color="#f7f7f7" size="mini"><span>{{item}}</span></van-button>
            </li>
          </ul>
          
        </section>
      </section>

      <section>
        <h1 style="padding:8px 10px">热门搜索</h1>
        <section class="hot hisBtn">
          <ul>
            <li v-for="item in hotList" :key="item">
              <van-button class="v-btn" color="#f7f7f7" size="mini"><span>{{item}}</span></van-button> 
            </li>
          </ul>
          
        </section>
      </section>
    </div>
   
  



  </div>
</template>

<script>
// import { Toast } from "vant" ;

export default {
  data(){
    return{
      vList : [] ,
      value : '' ,
      hotList : [ "骨头" , "奶茶" ,"肯德基" ,"华莱士" ,"披萨" ,"汉堡" ,"手抓饼" ,"kfc" ,"炸鸡" ,"麻辣烫" ,],
      history : true ,
      info : [] ,
      isShow :false ,
      isHave:true ,

    }
  },
  methods:{
    onSearch(){
      this.isShow = true ;
     //请求数据库的数据
      this.$axios.get('/api/store/search',{
        params : { value : this.value }
      }).then((res) => {
        console.log(res.data);
        if(res.data.code == 0){
          // Toast('搜索成功');
          //得到搜索的数据
          this.info = res.data.infos ;
          console.log('搜索成功',this.info);
          this.isHave = false ;
          this.vList.push(this.value) ;
          console.log(this.value, this.vList);

        }else{
          // Toast('搜索失败');
          console.log('搜索失败');

        }
      }).catch((err) => {
        // Toast('搜索失败',err);
          console.log('搜索失败',err);

      })
    },
    deleteAction(){
      this.vList = [] ;
    },
    goBack(){
      this.$router.back();
    },
    goDetail(id){
      this.$router.push('/detail/' + id)
    }
  },
}
</script>

<style lang="scss" scoped>
html,
body {
  overflow-x: hidden;
}
#search{
    position: absolute;
    top: 0;
    bottom: 0;
    background: #fff;
    // background: skyblue;
    width: 100%;
    height: 100%;
    z-index: 2007;
    header{
      height: 50px;
      position: relative;
      .icon{
        padding:10px 0 0 10px;
        font-size: 28px;
        color: #ddd;
      }
    }
    .container{
      width: 100%;
      height: 90%;
      position: relative;
      top: 46px;
      // background: antiquewhite;
      box-sizing: inherit;
      section{
        margin-bottom: 20px;
        color: #666;
        .history{
          height: 20px;
          padding: 8px 14px;
          .his-right{
            float: right;
            font-size: 20px;
          }
        }
        h1{
          float: left;
          font-size: 16px;
        }
        .hisBtn{
          padding: 8px 14px;
          span{
            color:#666;
          }
        }
        .hot{
          float: left;
          padding: 0 14px;
          .v-btn{
            margin-top: 8px;
            padding: 0 14px;
          }
        }
        li{
          float: left;
          margin:0 4px
        }
      }
    }
    .list-item{
      position: relative;
      top: 47px;
      width: 100%;
      // background: pink;
      li{
        float: left;
        width: 90%;
        padding: 10px 17px;
        border-bottom:1px solid #eee;
        div{
          width: 60px;
          height: 60px;
          float: left;
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        h1{
          float: left;
          padding: 5px 10px;
          font-size: 16px;
          font-weight: 700;
          line-height: 22px;
          max-width: 210px;
          width: 236px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p{
          font-size: 12px;
          float: left;
          padding: 0 10px;
          max-width: 255px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  

}



</style>