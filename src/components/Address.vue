<template>
    <div id="address">
        <!-- <div v-if="isOk"> -->
            
            <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onRetrun"/>

            <!-- 新增的地址 -->
            <van-address-list
            
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            />

            <router-view></router-view>

        <!-- </div> -->
    </div>

</template>


<script>
import { mapState } from 'vuex' ;
import { Toast } from 'vant';

export default {
    data(){
        return{
            chosenAddressId: '1',
            listCon:{ },
            list: [
                {
                    id: '1',
                    name: '',
                    tel: '',
                    address: '',
                    isDefault: '',
                },
            ],
            isOk : false ,
        }
    },
    computed:{
        ...mapState({
            address : (state) => state.address,
        })
    },
    methods:{
        onRetrun(){
            this.$router.push('/mine');
        },
         onAdd() {
            // Toast('新增地址');

            //*地址数据********************* */
            //  console.log(this.address);
            this.$router.push('/mine/address/addressedit');
           
        },
        onEdit(item, index) {
            Toast('编辑地址:' + index);
            this.$router.push('/mine/address/addressupdate/'+ index);
        },
        
    },
    created(){
        // this.isOk = true;
        console.log(this.address);
        let newAdr = {
           tel : this.address.tel,
           name : this.address.name,
           isDefault : this.address.isDefault,
           address : this.address.province+this.address.city+this.address.county+this.address.country+this.address.addressDetail,
        }
        this.list[0] = newAdr;
        // this.list.push(newAdr);
        console.log(this.list);
        
    }

     
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