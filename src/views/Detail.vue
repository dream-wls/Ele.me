<template>

  <div id="detail">
    <!-- <app-scroll class="content">  </app-scroll> -->
    <!-- 上半部分 -->
    <div class="up">
      <div class="store">
        <nav class="s_img" 
         :style="{ backgroundImage: `url(${store.storeImg})` } ">
          <div class="cover"></div>
          <van-icon class="icon" name="arrow-left" @click="goBack" />
        </nav>   
        <div class="s_name">
          <div class="img"><img :src="store.storeImg" ></div>
          <div class="name">
            <h2>{{store.storeName}}</h2>
            <div class="yueSale">
              <span>评价{{store.storeScore}} </span>
              <span> 月售{{store.storeSales}}单</span>
            </div>
            <div class="tag">
              <van-tag plain type="danger">20减10</van-tag>
              <van-tag plain type="danger">起送费{{store.storePsf}}</van-tag>
              <van-tag plain type="danger">配送费{{store.storeSendFree}}</van-tag>
            </div>
            <van-notice-bar
              class="gongao"
              :scrollable="false"
              :text="store.storeInfo"
            />
          </div>
        </div>
      </div>


    </div>
      
    <!-- 吸顶 -->
    <van-sticky>
      <div class="xiding">
        <van-tabs @click="onClick">
          <van-tab title="点餐"></van-tab>
          <van-tab title="评价"></van-tab>
          <van-tab title="商家"></van-tab>
        </van-tabs>
      </div>
    </van-sticky>

    <!-- 下半部分 -->
    <div class="down">
      <!-- 点餐部分 -->
      <div v-if="isDishes">
        <div class="dishes">
          <van-index-bar :index-list="indexList" :sticky="false" :sticky-offset-top="200" >
            <van-index-anchor v-if="indexList[0]" :index="indexList[0]"></van-index-anchor>
           
            <div class="menu-item"  v-for="item in menu[0]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
               
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d" >{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>
           
          <van-index-anchor v-if="indexList[1]" :index="indexList[1]"></van-index-anchor>
              <div class="menu-item"  v-for="item in menu[1]" :key="item._id">
                <!-- currency 当没有折扣的时候 就不显示￥和价格 -->
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice"
                :origin-price=" item.menuDiscount == 10 ? '' : item.menuPrice "
                :currency=' item.menuDiscount == 10 ? "" : "￥"'
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>
      
          <van-index-anchor v-if="indexList[2]" :index="indexList[2]"></van-index-anchor>
             <div class="menu-item"  v-for="item in menu[2]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>
    
          <van-index-anchor v-if="indexList[3]" :index="indexList[3]"></van-index-anchor>
             <div class="menu-item"  v-for="item in menu[3]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          <van-index-anchor v-if="indexList[4]" :index="indexList[4]"></van-index-anchor>
            <div class="menu-item"  v-for="item in menu[4]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          <van-index-anchor v-if="indexList[5]" :index="indexList[5]"></van-index-anchor>
            <div class="menu-item"  v-for="item in menu[5]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          <van-index-anchor v-if="indexList[6]" :index="indexList[6]"></van-index-anchor>
             <div class="menu-item"  v-for="item in menu[6]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          <van-index-anchor v-if="indexList[7]" :index="indexList[7]"></van-index-anchor>
            <div class="menu-item"  v-for="item in menu[7]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          <van-index-anchor v-if="indexList[8]" :index="indexList[8]"></van-index-anchor>
             <div class="menu-item"  v-for="item in menu[8]" :key="item._id">
               <van-card
               @click-thumb="goDetailItem(item)"
                :tag="item.menuFlag ? '招牌' : '' "
                :price=" item.menuFPrice.toFixed(2)"
                :origin-price=" item.menuDiscount == 10 ? '无' : item.menuPrice "
                :desc=" item.menuInfo"
                :title=" item.menuName"
                :thumb=" item.menuImg"
              >
                <template #tags>
                  <p>
                    <span>月售{{store.storeSales}}单 </span>
                    <span>好评率{{item.menuPraise}}%</span>
                  </p>
                  <van-tag type="danger" plain v-if="item.menuDiscount !== 10" >{{item.menuDiscount}}折</van-tag>
                  <van-tag type="danger" color="rgba(255,76,13,.15)" v-if="item.menuDiscounts !== '无'" text-color="#ff4c0d">{{item.menuDiscounts}}</van-tag>
                </template>
                <template #footer>
                <van-button @click="addShoppingCar(item)" icon="plus" round  size="mini" type="info" />
                </template>
              </van-card>
            </div>

          </van-index-bar>
        </div>
      </div>
      <!-- 评价 -->
      <div v-if="isRcommend">
        <div class="recommend">
          <h1>{{store.storeScore}}</h1>
          <div class="r_score">
            <span>商家评分</span>
            <p><van-rate :size="20" allow-half v-model="store.storeScore" color="#ffd21e" void-icon="star"    void-color="#eee" readonly /></p>
          </div>
          <div class="r_send">
            <span>配送</span>
            <p>{{store.storeSendFree}}</p>
          </div>
           
        </div>
      </div>
      <!-- 商家部分 -->
      <div v-if="isStore">
        <div class="store_wrapper">
          <h3>商家信息</h3>
          <van-cell :title="store.storeInfo" />
          <van-cell title="品类" :value="store.storeType[0]" />
          <van-cell title="商家电话" :value="store.storePhone" />
          <van-cell title="地址" :value="store.storeAddress" />
          <van-cell title="营业时间" value="上午8:00-晚上11:00" />
        </div>
      </div>
    </div>
      

      <!-- 下单 -->
    <div class="pay" v-if="show">
      <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
        <van-cell title="已选商品" value="清空" >
          <template #right-icon>
          <van-icon @click="deleteAll" name="delete" class="delete-icon " />
          </template>
        </van-cell>
        <!-- 下单的列表 -->
        <ul >
          <li v-for="(item,index) in storeOrder" :key="index">
            <h3>{{item.menuName}}</h3>
            <p>
              <!-- 当两个价格不相等的时候显示 -->
              <del v-if="item.fPrice !== item.price">￥{{item.menuFPrice}}</del>
              <span>￥{{item.menuPrice.toFixed(2)}}</span>
            </p>
            <div class="count">
              <van-icon @click="minusAction(item)" class="icon" color="rgb(35, 149, 255)" name="minus" />
              <span>{{item.num}}</span>
              <van-icon @click="plusAction(item)" class="icon" color="rgb(35, 149, 255)" name="plus" />
            </div>
          </li>
        </ul>
        <!-- 结算 -->
          <van-submit-bar class="subBtn" v-if="priceList" :price="priceList*100" button-color="rgb(35, 149, 255)" button-text="支付" @submit="onSubmit(storeOrder)" >
            <div v-if="this.disPrice >= 20" class="youH">
              <span>满20减10</span>
            </div>
          </van-submit-bar>
      </van-popup>

    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex' ;

export default {
  props: ['id' ] ,
  data(){
    return{
      store : {} ,
      menu : [],
      isDishes: true,
      isStore:false,
      isRcommend:false,
      isActive:false,
      indexList: [],
      information : {} ,

      //下单
      show: false,
      singleS : [] ,
      dishes : [],
      priceList:[],
      menuNum:1,
      //记录原始价格 和 打折价格
      price : 1 ,
      disPrice : 1,
      plusTrue : true ,
      del : false ,
      saveOrder : {},
      storeOrder:[]
    }
  },
  computed:{
    ...mapState({
      form : (state) => state.form
    })
  },
  created(){
    //请求商家信息
    this.$axios.get('/api/store/find',{
      params : { id : this.id }
    }).then((res) => {
        this.store = res.data.info ;
        console.log(this.store);
        //请求菜品信息
        this.$axios.get('/api/store/menu',{
          params : { storeName : this.store.storeName }
        }).then((res) => {
          if(res.data.code == 0) {
            //处理数据
            res.data.infos.forEach(item => {
               //处理侧边栏的数据
              if(item.id == '优惠' || item.id == '热销'){
                this.indexList.unshift(item.id);
                this.menu.unshift(item.data);
                return ;
              }
              this.indexList.push(item.id);
              //处理菜品数据
             this.menu.push(item.data);
            });
            
          }else{
            console.log('获取菜品信息失败');
          }
        }).catch((err) => {
            console.log(err,'获取菜品信息失败');

        })
    }).catch((err) => {
      console.log(err,'获取数据失败');
    }) ;
    
  },
  
  methods:{
    requestAjax(){
       this.$axios.get('/api/order/orderAdd' ,{ params : this.information }).then((res) => {
        if(res.data.code == 0){
          this.dishes = res.data.infos ;
           this.$axios.get('/api/order/userStoreList' , {
            params : { storeName : this.store.storeName , name : this.form.username }
          }).then((res) => {
            console.log(res.data,res.data.infos);
            if(res.data.code == 0){
              this.storeOrder = res.data.infos;
              this.priceList = res.data.priceList;
              if( this.priceList >= 20 ){
                this.priceList = this.priceList - 10 ;
                return ;
              }
              console.log('请求成功',this.storeOrder, this.priceList );
            }
          }).catch((err) => {
            console.log('请求失败',err);
          })
        }else{
          console.log('订单请求失败');
        }
      }).catch((err) => {
          console.log('订单请求失败',err);
      }) ;
    },
    //清空请求
    requestDelete(){
       //发送清空的请求
      this.$axios.post('/api/order/delete',{
        storeName : this.store.storeName,
        username : this.form.username ,
      }).then((res) => {
        console.log(res.data );
        if(res.data.code ==0){
          if(this.del)
          {
            this.storeOrder = [];
            this.priceList = [];
            Toast('已清空!');
            console.log('订单删除成功');
          }else{
            Toast('支付成功！');
          }
        }else{
          console.log('订单删除失败');
        }
      }).catch((err) =>{
        console.log('订单删除失败',err);
      })
    },
    goBack(){
      this.$router.push('/home');
    },
    onClick(name, title) {
      Toast(title);
      // console.log(name);
      if(name == 0){
        this.isDishes = true ;
        this.isStore = false ;
        this.isRcommend = false;
      }else if(name == 1){
        this.isRcommend = true;
        this.isDishes = false;
        this.isStore = false ;
      }else{
        this.isStore = true ;
        this.isDishes = false ;
        this.isRcommend = false;
      }

   },
    goDetailItem(item){
      //跳转到单个套餐的详情
      let itemId = item._id
      this.$router.push('/item/' +  itemId);
      this.$store.commit('SET_MENU' , item) ;
    },
    //减
     minusAction(v){
      this.information.menuName = v.menuName ;
      this.information.plusTrue = false ;
      this.requestAjax();
    },
    //加
    plusAction(v){
      this.information.menuName = v.menuName ;
      this.information.plusTrue = true ;
      this.requestAjax();
    },
    addShoppingCar(v){
      this.show = true ;
      //接收最原始的价格
      this.price = v.menuPrice ;
      this.disPrice = v.menuFPrice ;
      this.p = v.menuFPrice;
      
      this.information = {
        name : this.form.username,           //用户名
        storeName : this.store.storeName,   //商家名称
        price : this.disPrice,              //单价
        num : 1,                            //商品数量
        menuName : v.menuName ,             //商品名称
        menuPrice : this.disPrice,         //单个菜品的总价
        plusTrue : this.plusTrue ,         //加减
        fPrice : this.price,              //菜品的原价
        menuFPrice :  this.price,         //总价
        storeImg : this.store.storeImg,    //商家图片
      }
      console.log(this.plusTrue);
      this.requestAjax();
      
    },
    // 清空
    deleteAll(){
      this.del = true ;
      this.requestDelete();
    },
    onSubmit(item){
      //提交之后清空购物列表
      let menuNameList = [] ;
      let menuImage = '' ;
      let sName = '';
      console.log(item);
      item.forEach(v => {
        menuNameList.push(v.menuName);
        menuImage = v.storeImg;
        sName = v.storeName ;
      })
      this.saveOrder = {
        storeName : sName,
        menuNameList : menuNameList,
        price : this.priceList ,//打着减掉的价
        image : menuImage,
        name :this.form.username,
        id : this.id,

      }
      console.log(this.id,this.store._id);

      this.$axios.post('/api/order/add', this.saveOrder).then((res) => {
        if(res.data.code == 0){
          console.log('订单发送成功');
        }else{
          console.log('订单发送失败');
        }
      }).catch((err) => {
        console.log('订单发送失败',err);
      })
      //跳转到订单页
      if(this.priceList >= this.store.storePsf){
        this.$router.push('/order');
        this.del = false ;
        this.requestDelete();        
      }else{
        Toast('未满起送费。请再选一些商品！')
      }

    },
    
  }
  
}

</script>

<style lang="scss"  >
#detail{
  &::-webkit-scrollbar{
    display: none}
  .content{
    width: 100%;
    height: 100%;
  }
    z-index: 2007;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #fff;
    box-sizing: inherit;
    -webkit-tap-highlight-color: transparent;
    .icon{
      font-size: 20px;
      color:#fff;
      padding: 10px;
    }
    .up{
      position:relative;
      width: 100%;
      background: pink;
      .store{
        color: #333;
        font-size: 20px;
        height: 200px;
        background-color: peachpuff;
        .s_img{
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          height: 100px;
          .cover{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-image: linear-gradient(0deg,hsla(0,0%,100%,0),rgba(0,0,0,.5));
            box-sizing: inherit;
            -webkit-tap-highlight-color: transparent;
          }

         
        }
        .s_name{
          padding: 38px 0 0;
          position: relative;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-direction: column;
          flex-direction: column;
          -webkit-align-items: center;
          align-items: center;
          background-color: #fff;
          // height: 120px;
          // background: pink;
          .img{
              position: absolute;
              top: 0;
              left: 50%;
              width: 80px;
              height: 80px;
              margin-top: -56px;
              margin-left: -40px;
              border-radius: 4px;
              img{
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 4px;
                box-shadow: 0 0 0.4vw 0 rgba(0,0,0,.2);
              }
          }
          .name{
            width: 80%;
            flex: 1;
            h2{
              font-size: 25px;
              font-weight: 700;
              white-space: nowrap;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .yueSale{
                margin-top: 10px;
                text-align: center;
                white-space: nowrap;
                    
              span{
                font-size: 12px;
                color: #666;
              };
              
            }
          }
          .gongao{
            background: #fff;
            color: #999;
            font-size: 12px;
            
          }
        }
      }
      
    }
    .xiding{
      width: 100%;
      height:44px;
      margin-top: 62px;
      // display: flex;
      justify-content: center;
      align-items: center;
      
    }
    .dishes{
      .menu-item{
        margin-top: 8px;
        width: 288px;
        margin-right: 8px;
        float: right;
      p{
        color: #666;
        font-size: 12px;
        line-height: 22px;
      }
        
      }
    }
    .recommend{
      margin: 10px 8px;
      border-radius: 5px;
      border: 1px solid #eee;
      width:94%;
      height: 120px;
      background: #fff;
      span{
        font-size: 12px;
        text-align: center;
      }
      h1{
        float: left;
        font-size: 30px;
        padding: 42px 26px;
        font-weight: normal;
      }
      .r_score{
        float: left;
        padding: 42px 12px;
      }
      .r_send{
        float: right;
        padding: 42px 20px;
      }

    }
    .store_wrapper{
      h3{
       padding: 8px 0 4px 8px ;
      }
    }
    .pay{
      ul{
        // background: pink;
        width: 100%;
        li{
          float: left;
          background: #eee;
          border-bottom: 1px solid #fff;
          padding: 2px;
          width: 370px;
          h3{
            float: left;
            padding: 6px 4px;
            font-size: 14px;
            width: 112px;
           
          }
          p{
            float: right;
            margin-right: 96px;
            padding: 11px 7px 8px 0;
            text-align: right;
            del{
              font-size: 12px;
              color:#999;
            }
          }
          .count{
            position: absolute;
            right: 0;
            padding: 8px 18px;

            .icon{
              border: 1px solid rgb(35, 149, 255);
              border-radius: 50%;
              padding: 2px;
            }
            span{
              padding: 5px 5px;
              display: inline-block;
              vertical-align: top;
            }
          }
        }
      }
    }
    .youH{
      padding: 2px 0 0 52px;
      color: #ee0a24;

    }
// 重置内部样式
  .van-notice-bar__content{
    padding:0 74px;
  }
  .van-tag--danger.van-tag--plain{
    margin: 2px  2px 0 2px;
  }
  .tag{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-sticky--fixed{
    top:-62px;
  }
  .van-tab__text--ellipsis{
    padding: 0 38px;
  }
  .van-tabs__line{
    background-color: rgb(35, 149, 255);
  }
  .van-cell__title{
    font-size: 14px;
  }

  .van-cell .van-cell__value{
    font-size: 12px;
  }
  .van-cell:nth-of-type(4) .van-cell__value span{
    max-width: 173px;
    text-align: right;
  }
  .van-index-bar__sidebar{
    // right: 306px;
    left:6px;
    top: 50%;
    height: 450px;
    width: 60px;
    position: fixed;
    text-align: center;
    background: whitesmoke;
    border-radius: 5px;
  }
  .van-index-bar__index{
    padding: 15px 4px 4px 0;
    position: relative;
    // top: 90px;
    //出现了active就给他加这个样式 top: 90px;
  }
  .van-index-anchor{
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px 0 0 83px;
  }
  .van-card__price{
    color:rgb(255, 83, 57)
  }
  .van-tabs--line .van-tabs__wrap{
    border-bottom: 1px solid #ddd;
  }
  // 单元格样式
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .delete-icon {
    font-size: 16px;
    line-height: inherit;
  }
  .van-card__title{
    font-weight: 700;
  }
  
}

</style>