<template>
    <div id="rule">
        <van-nav-bar title="规则" left-text="返回" left-arrow @click-left="onRetrun"/>
        <div>
            <van-cell is-link @click="showYing">营业资质</van-cell>
            <van-popup v-model="Ying">
                <div class="imgCon"><img :src="img1" alt=""></div>
            </van-popup>
            <van-cell is-link @click="showPing">平台承诺</van-cell>
            <van-popup v-model="Ping">
                <div class="imgCon"><img :src="img2" alt=""></div>
            </van-popup>
            <van-cell is-link @click="showRule">规则动态</van-cell>
            <van-popup v-model="Rule" round >
                <div class="rule">
                    <h1>公示通知</h1>
                    <ol>
                        <li>1.《饱了吗商家违规行为管理规则》变更公示通知</li>
                        <li>2.《饱了吗食品提货券交易管理规则》新增公示通知</li>
                        <li>3.《饱了吗·食品提货券商品管理规范》新增公示通知</li>
                        <li>4.《饱了吗隐私权政策》变更公示通知</li>
                        <li>注意：以上仅为本次项目的数据而已，并无正真含义</li>
                    </ol>
                    <h1>平台公告</h1>
                    <ol>
                        <li>1.饿了么关于配合监管要求处理电子烟类商品的相关公告</li>
                        <li>2.互联网餐饮消费营养分析报告（2018）</li>
                        <li>3.饿了么关于禁止烟草类商品售卖通知</li>
                        <li>注意：以上仅为本次项目的数据而已，并无正真含义</li>
                    </ol>
                </div>
            </van-popup>
            <van-cell is-link @click="showUser">用户协议</van-cell>
            <van-popup v-model="User" round >
                <div class="user">
                    <h1>鸟窝跑腿用户协议</h1>
                    <p>风里雨里为你而来，我亲爱的顾客，上帝!</p>
                </div>
            </van-popup>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            Ying: false,
            Ping:false,
            User:false,
            Rule:false,
            img1:require('../assets/zhizhao.png'),
            img2:require('../assets/serve.png') 
        }
    },
    methods:{
        onRetrun(){
            this.$router.back();
        },
        showYing() {
            this.Ying = true;
        },
        showPing(){
            this.Ping = true;
        },
         showUser() {
            this.User = true;
        },
        showRule(){
            this.Rule = true;
        }
    }
}
</script>

<style lang='scss'>
#rule{
    z-index: 2007;
    background-color:#eee;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .imgCon{
        width: 320px;
        overflow: auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .rule{
        padding: 10px;
        width: 300px;
        height:400px;
        h1{
            font-size: 25px;
        }
        ol{
            margin-top: 10px;
            li{
                line-height: 24px;
                font-size: 14px;
            }
        } 
       
    }
     .user{
            padding: 10px;
            width: 260px;
            height:150px;
            h1{
                font-size: 25px;
            }
            p{
                margin-top: 15px;
                line-height: 24px;
                font-size: 14px;
            }
        }
}
</style>