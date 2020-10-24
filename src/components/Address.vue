<template>
    <div id="address">
        <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onRetrun"/>

        <!-- 新增的地址 -->
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        />


        <h1>{{address}}</h1>
        <router-view></router-view>


    </div>

</template>


<script>
import { mapState } from 'vuex' ;
import { Toast } from 'vant';

export default {
    data(){
        return{
            chosenAddressId: '1',
            list: [
                {
                    id: '1',
                    name: '',
                    tel: '',
                    address: ' ',
                    isDefault: true,
                },
            ],
        }
    },
    computed:{
        ...mapState({
            address : (state) => state.address,
        })
    },
    methods:{
        onRetrun(){
            this.$router.back();
            // this.$router.push('/mine');

        },
         onAdd() {
            // Toast('新增地址');

            //*地址数据********************* */
            //  console.log(this.address);
            this.$router.push('/mine/address/addressedit');
           
        },
        onEdit(item, index) {
            Toast('编辑地址:' + index);
        },
        
    },
    created(){
        console.log(this.address);
        this.list.map((item) => {
          item.tel = this.address.tel;
          item.name = this.address.name;
          item.isDefault = this.address.isDefault;
          item.address = this.address.province+this.address.city+this.address.county+this.address.country+this.address.addressDetail
          console.log(item.tel,this.address);
      })
      

    },

    
}
</script>

<style lang='scss'>
#address{
    z-index: 1000;
    background-color:#eee;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .add{
        position: absolute;
        bottom: 10px;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        h3{
            text-align: center;
            color: orangered;
            .icon{
                font-size: 24px;
                padding-right: 10px;
                vertical-align: middle;
                padding-bottom: 2px;
            }
        }


    }
   

}
</style>