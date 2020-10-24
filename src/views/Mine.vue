<template>
  <div id="mine">
      <header>
          <van-image round width="60px" height="60px" :src="img"/>
          <div class="right">
              <h3>{{form.username  || unlogin.unname }}</h3>
              <p>
                <van-icon class="icon" name="phone-circle-o" />
                <span>{{form.phone || unlogin.unphone  }} </span>
              </p> 
          </div>
           <div class="icon-right"><van-icon @click="goPerson" name="arrow" /></div>
      </header>

        <ul>
            <li><van-cell icon="map-marked" title="我的地址" is-link to="/mine/address" /></li>
            <li><van-cell icon="todo-list" title="规则中心" is-link to="/mine/rule" /></li>
             <li><van-cell icon="service-o" title="我的客服"  /></li>
        </ul>

         <router-view></router-view>
        

  </div>

</template>

<script>
import { mapState } from 'vuex' ;

export default {
    data(){
        return{
            unlogin:{
                unname:'未登录',
                unphone:'****'
            },
           img:require('../assets/head.jpg') 
        }
    },
    methods:{
        goPerson(){
            console.log(this.form);
            this.$router.push('/mine/person');
        }
    },
    computed:{
        ...mapState({
            form : (state) => state.form,
        })
    }
}
</script>

<style lang="scss" >
#mine{
    background-color: #eee;;
    height: 600px;
    bottom: 50px;
    z-index:10000;
    header{
        display: flex;
        padding: 30px;
        height: 120px;
        box-sizing: border-box;
        background-color: #0085ff;
        .right{
            margin-left: 20px;
            width: 65%;
            float: left;
            h3{
                font-size: 20px;
                margin-top: 4px;
                margin-bottom: 2px;
            }
            p{
                margin-top: 12px;
                font-size: 12px;
                .icon{
                    padding-right: 4px;
                    padding-top: 4px;
                }
                span{
                    padding-top: 9px;
                };
            }
           
        }
        .icon-right{
            float: left;
            font-size: 20px;
            margin-top: 20px;
        }
    }
    ul{
        padding-top: 140px;
        li{
            border-radius: 4px;
            margin-top: 12px;
            border-bottom: 1px solid #e7e3e3;
            border-top: 1px solid #e7e3e3;
        }
    }
    .person{
        padding-top: 140px;
        display: flex;
        justify-content: center;
       
    }
}

</style>