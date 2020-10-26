<template>
  <div id="edit">
     <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="onRetrun" />
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
    @delete="onDelete"
    @change-detail="onChangeDetail"
  />
  </div>
</template>

<script>

import { Toast } from 'vant';
import areaData from './areaData';

export default {
 data() {
    return {
      areaList:areaData,
      searchResult: [],
      address : {} ,
    };
  },
  methods: {
    onSave() {
      Toast('save');
      this.address = this.$refs.areaInfo.data
      console.log(this.address);
      this.$router.push('/mine/address');
      this.$store.commit('SET_ADDRESS',this.address);

    },
    onDelete() {
      this.$refs.areaInfo = '';
      Toast('delete');
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
