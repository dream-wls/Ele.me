<template>
<div id="home">
    <header>
      <div class="head">
        <van-icon class="icon" name="location" />
        <span>袋鼠社区公寓</span>
        <van-icon @click="goAddress" style=" font-size:14px" name="arrow-down" />
      </div>
      
      <div class="search">
        <!--  v-model="value" -->
        <van-search class="sear" shape="round" background="#0085ff"  placeholder="搜索饱了吗商家、商品名称"/>
      </div>
    </header>

    <div class="fresh">
      <van-pull-refresh  v-model="isLoading" @refresh="onRefresh">

      <div class="content">
        <!-- <router-link to=""> -->
        <a href="#">
          <div class="imgCon"><img src="../assets/img1.jpeg" alt=""></div>
          <span>美食</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img3.jpeg" alt=""></div>
          <span>大牌惠吃</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img2.jpeg" alt=""></div>
        <span>汉堡披萨</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img4.jpeg" alt=""></div>
          <span>甜品饮品</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img5.jpeg" alt=""></div>
          <span>地方小吃</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img6.jpeg" alt=""></div>
          <span>米粉面馆</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img7.jpeg" alt=""></div>
        <span>包子粥店</span>
        </a>
        <a href="#">
          <div class="imgCon"><img src="../assets/img8.jpeg" alt=""></div>
          <span>炸鸡炸串</span>
        </a>
        <!-- </router-link> -->
      </div>

      <div>
        <van-divider :style="{ color: '#000', borderColor: '#999', padding: '0 104px' }" >
          推荐商家
        </van-divider>
      </div>
      
      <!-- -->
      <div v-if="isOk"  ref="scroll">
          <div class="list" >
            <div class="item" v-for="(item,index) in dataList" :key="index">
              <div class="leftImg"><img :src="item.storeImg" alt=""></div>
              <div class="rightCon">
                <h1>{{item.storeName}}</h1>
                <div class="commend">
                  <!-- " -->
                  <van-rate :size="6" allow-half v-model="item.storeScore" color="#ffd21e" void-icon="star"    void-color="#eee" readonly />
                  <span> {{item.storeScore}} 月售{{item.storeSales}}单</span>
                </div>
              <div class="price">
                <span>￥{{item.storePsf}}起送 | </span>
                <span>配送￥{{item.storeSendFree}}</span>
              </div>
              <van-tag color="#666" plain>{{item.storeType[0]}}</van-tag>
              </div>
            
            </div>
          </div>
      </div>

      <!-- 上拉加载更多的结构 -->
      <div class="pull-up">
        <div>
          <van-icon class="icon" name="upgrade" />
          <span>{{ pullUpText }}</span>
        </div>
      
      </div>

      </van-pull-refresh>
    </div>

    
</div>
</template>

<script>
import { Toast } from 'vant';
// import IScroll from "iscroll/build/iscroll-probe";

export default {
  data(){
    return{
      page : 1,
      dataList : [],
      isOk : false,
      count: 0,
      isLoading: false,
      pullUpText:'上拉加载更多',
    }
  },
  created(){
    
  },
  mounted(){
    this.$axios('/api/store/list',{
      params : { page : this.page } 
    }).then((res) => {
      if(res.data.code == 0){
        console.log('成功');
        this.isOk = true;
        this.dataList = res.data.infos;
        console.log( this.dataList);

      }else{
        console.log('失败');
      }
    }).catch(() => {
      console.log('失败');
    })
    
  },
  methods:{
    goAddress(){
      this.$router.push('/mine/address');
    },
    onRefresh() {
      this.page++;
      console.log(this.page);
      this.$axios('/api/store/list',{
        params : { page : this.page } 
      }).then((res) => {
        if(res.data.code == 0){
          console.log('成功');
          this.isOk = true;
          res.data.infos.forEach(item => {
            this.dataList.push( item);
          })
          console.log( this.dataList);
        }else{
          console.log('失败');
        }
      }).catch(() => {
        console.log('失败');
      })
      setTimeout(() => {
        this.$axios
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },

    

  }
}
</script>

<style lang="scss" scoped>
#home{
  header{
    display: flex;
    padding-top: 18px;
    padding-left:16px;
    height: 95px;
    box-sizing: border-box;
    background-color: #0085ff;
    font-size: 16px;
    .head{
      height: 25px;
      float: left;
      // background: pink;
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
     .search{
        float: left;
        margin-top: 22px;
        position: absolute;
        .sear{
          width: 332px;
          padding: 8px 10px;
          
        }
      }
   
  }
  .fresh{
    width: 100%;
    margin-top:100px;
    // background-color: pink;
    .content{
        width: 100%;
        height: 160px;
        display: block;
        // background-color: ligh tsalmon;
        a{
          // background-color: lightsalmon;
          margin-top: 4px;
          display: block;
          position: relative;
          float: left;
          width: 20%;
          .imgCon{
            width: 50px;
            height: 50px;
            img{
              width: 100%;
              height: 100%;
              padding:6px;
              display: block;
            }
          }
          span{
            width: 60px;
            color:#666;
            font-size: 12px;
            display: block;
            text-align:center;
            margin-top:8px;

          }

        }
      
      
    }
    .list{
      //  background:coral;
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      //  overflow: aotu;
      margin-bottom: 20px;
      .item{
          width: 100%;
          height: 104px;
          // background-color: lightgoldenrodyellow;
          .leftImg{
            float: left;
            width: 86px;
            height: 86px;
            padding: 8px;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
        }
        .rightCon{
            width: 68%;
            float: left;
            margin: 8px;
            // background-color: pink;
            h1{
                font-size: 20px;
                color: #333;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span{
                font-size: 12px;
                color:#666;
                list-style: none;
                line-height: normal;
                
            }
            .commend{
                span{
                  padding-left: 10px;
                }
            }

        }
      }
    }
  }
  .pull-up{
    width: 100%;
    margin-bottom:66px;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      .icon{
        font-size: 25px;
        padding-right: 8px;
      }
    }
    
  }
 

}
</style>
