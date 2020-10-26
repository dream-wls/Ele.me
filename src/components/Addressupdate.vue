<template>
  <div id="edit">
     <van-nav-bar title="编辑地址" left-arrow @click-left="onRetrun" />
    <van-address-edit
    ref="areaInfo"
    :area-list="areaList"
    show-postal
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @change-detail="onChangeDetail"
  />
  </div>
</template>

<script>

import { Toast } from 'vant';
import areaData from './areaData';
import { mapState } from 'vuex' ;

export default {
    data() {
        return {
        areaList:areaData,
        searchResult: [],
        address : {} ,
        };
    },
    computed:{
        ...mapState({
            adr : (state) => state.address,
        })
    },
    created(){
        console.log(this.adr);
        this.$refs.areaInfo = this.adr;
        this.$refs.areaInfo = {
            name : this.adr.name ,
            tel : this.adr.tel ,
            addressDetail : this.adr.addressDetail ,
            areaCode : this.adr.areaCode ,
            province : this.adr.province ,
            city : this.adr.city ,
            county : this.adr.county ,
            isDefault : this.adr.isDefault ,

        };

        console.log(this.$refs.areaInfo);
    },
    methods: {
        onSave(  ) {

        // console.log(this.$refs.areaInfo.data);
        this.address = this.$refs.areaInfo.data
        this.$router.push('/mine/address');
        this.$store.commit('SET_ADDRESS',this.address);
        Toast('save');
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
  z-index:1000;
  width: 100%;
  background-color: pink;
}
</style>
