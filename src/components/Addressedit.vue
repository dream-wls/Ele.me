<template>
  <div id="edit">
     <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="onRetrun" />
    <van-address-edit
    ref="areaInfo"
    :area-list="areaList"
    show-postal
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @change-detail="onChangeDetail"
    @change-default="onChangeDefault"
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
      form : (state) => state.form,
    })
  },
  methods: {
    //保存
    onSave() {
      Toast('已保存');
      this.address = this.$refs.areaInfo.data
      console.log(this.address);
      this.$router.push('/mine/address');

      this.$axios.post('/api/address/add',{
        username : this.form.username,
        name : this.address.name,
        tel : this.address.tel,
        province : this.address.province,
        city : this.address.city,
        county : this.address.county,
        country : this.address.country,
        addressDetail : this.address.addressDetail,
        postalCode : this.address.postalCode,
        areaCode : this.address.areaCode,
        isDefault : this.address.isDefault,
      }).then((res) => {
        console.log(res.data);
        if(res.data.code == 0){
          console.log('数据请求成功');

        }else{
          console.log('数据请求失败');
        }
      }).catch(() => {
          console.log('数据请求失败');
      })


    },
    //更改地址
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
    //修改默认
    onChangeDefault(value){
      console.log(value);
    },
    onRetrun(){
        this.$router.push('/mine/address');
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
  height: 100%;
  background-color: #eee;

}
</style>
