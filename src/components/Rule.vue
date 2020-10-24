<template>
    <div id="rule">
        <van-nav-bar title="规则" left-text="返回" left-arrow @click-left="onRetrun"/>
        <div>
            <van-cell title="单元格" is-link value="内容">
            </van-cell> 
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        onRetrun(){
            this.$router.back();
        }
    }
}
</script>

<style lang='scss'>
#rule{
    z-index: 1000;
    background-color:pink;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}
</style>