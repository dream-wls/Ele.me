<template>
    <div id="address">            
        <van-nav-bar title="我的地址" left-text="返回" right-text="删除" left-arrow @click-left="onRetrun" @click-right="onDelete"/>
        
        <!-- 新增的地址 -->
        <van-address-list

        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认 "
        @add="onAdd"
        @edit="onEdit"
        @click-item="onGetIndex"
        />
        
        <router-view></router-view>
    </div>

</template>


<script>
import { mapState } from 'vuex' ;
import { Dialog } from 'vant';

export default {
    data(){
        return{
            chosenAddressId: '1',
            list: [],
            index : 0 ,
            isTrue : false,
            Idindex : 0 ,
        }
    },
    computed:{
        ...mapState({
            form : (state) => state.form,
        })
    },
    watch:{
        //监听
        $route(){
            this.loading();
        }
    },
    methods:{
        onRetrun(){
            this.$router.push('/mine');
        },
         onAdd() {
            this.$router.push('/mine/address/addressedit');
        },
        onEdit(item, index) {
            console.log(this.list[index].id);
            this.Idindex = this.list[index].id;
            this.$router.push('/mine/address/addressupdate/'+ this.Idindex);
        },
        onGetIndex(item,index){
            this.index = index ;
        },
        onDelete(){
            Dialog.confirm({
                title: '删除',
                message: '是否删除该地址？',
            }).then(() => {
                // 发送delete删除请求
                this.$axios.post('/api/address/delete' , {
                     id : this.list[this.index].id 
                }).then((res) => {
                    if(res.data.code == 0) {
                        this.list.splice(this.index,1);
                        console.log(this.list );
                        console.log('删除成功');
                    }else{
                        console.log('删除失败');
                    }
                }).catch((err) => {
                    console.log(err,'删除失败');
                })
               
                // console.log(this.list );

            }).catch(() => {
                // 取消 on cancel
            });
        },

        //刷新
        loading(){
            this.$axios.get('/api/address/getAddress', {
            params : { username : this.form.username }
        }).then((res) => {
            // console.log(res.data);
            if(res.data.code == 0){
                // console.log(res.data.infos);
                this.list = res.data.infos;
                this.list = this.list.map(item => ({
                    id : item._id,
                    tel : item.tel,
                    name : item.name,
                    address : item.province+item.city+item.county+item.country+item.addressDetail,
                    isDefault : item.isDefault,
                }))
                
                console.log(this.list);
                // console.log('获取数据成功');
                
            }else{
                console.log('获取数据失败');
            }
        }).catch((err) => {
            console.log(err,'获取数据失败');
        })
        }

        
    },
    created(){
        this.loading();
        
    }

     
}
</script>

<style lang='scss' scoped>
#address{
    z-index: 2000;
    background-color:#eee;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
   .van-address-list{
       height: 0;
   }

}
</style>