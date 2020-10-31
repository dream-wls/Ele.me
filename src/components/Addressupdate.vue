<template>
  <div id="edit">
     <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onRetrun" />
    <van-address-edit
    ref="areaInfo"
    :area-list="areaList"
    show-postal
    show-set-default
    show-search-result
    save-button-text="更改"
    :address-info="address"
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onUpdate"
    @change-detail="onChangeDetail"
  />
  </div>
</template>

<script>
import { Toast } from 'vant';
import areaData from './areaData';
import { mapState } from 'vuex' ;

export default {
    props:[ 'Idindex' ],
    data() {
        return {
        areaList:areaData,
        searchResult: [],
        address : {} ,
        newAddress : {},
        };
    },
    computed:{
        ...mapState({
            form : (state) => state.form 
        })
    },
    created(){
        this.$axios.get('/api/address/getOne',{
            params : { id : this.Idindex }
        }).then((res) => {
            if(res.data.code == 0 ){
                this.address = res.data.info;
                console.log(this.address)
                console.log('获取数据成功');
            }else{
                console.log('获取更新数据失败，请重新获取');
            }
        }).catch((err) => {
            console.log(err , '获取更新数据失败');
        });
  
      
    },
    methods: {
        onUpdate() {
            this.newAddress = this.$refs.areaInfo.data

            //发送更新的请求
            this.$axios.post('/api/address/update' , {
                username : this.form.username,
                id : this.Idindex,
                name : this.newAddress.name,
                tel : this.newAddress.tel,
                isDefault : this.newAddress.isDefault,
                province : this.newAddress.province,
                city : this.newAddress.city,
                county : this.newAddress.county,
                country : this.newAddress.country,
                addressDetail : this.newAddress.addressDetail,
                areaCode : this.newAddress.areaCode,
                postalCode : this.newAddress.postalCode,
                
            }).then((res) => {
                if(res.data.code == 0) {
                    setTimeout(() => {
                        Toast('数据更新成功');
                        this.$router.push('/mine/address');
                    },500)
                }else{
                    console.log('数据更新失败');
                }
            }).catch((err) => {
                console.log(err,'数据更新失败');
            })
            

        },
        onChangeDetail(val) {
        if (val) {
            this.searchResult = [
            {
                name: 'B座30教室',
                address: '西部硅谷',
            },
            ];
        } else {
            this.searchResult = [];
        }
        },
        onRetrun(){
            this.$router.back();
        },
    },
}
</script>

<style lang="scss" scoped>
#edit{
  position: absolute;
  top:0;
  bottom: 0;
  z-index:2000;
  width: 100%;
  background-color: #eee;
}
</style>
