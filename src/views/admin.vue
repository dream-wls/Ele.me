<template>
  <div class="admin">
    <el-container>
      <!-- 头部 -->
      <el-header> 
          <div class="title">
              <i class="el-icon-eleme"></i>
              后台管理系统
          </div>
          <div class="right">
              <div class="select" v-if="!isAdmin">
                  当前店铺：
                  <el-select class="elSelect"  @change="selectStore" v-model="value" placeholder="请选择">

                  <el-option
                    
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                    >
                  </el-option>
                  </el-select>

                  <span></span>
              </div>
              欢迎您！<span>{{username}}</span>
              <router-link to="/login" @click="exit">退出</router-link>
          </div>
          
      </el-header>
      <!-- 内容 -->
        <router-view/>
    </el-container>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
      return {
        options: [],
        value: '',
        storesName: '',
      }
    },

  computed: {
       ...mapState({
         username: (state) => state.userName,
         isAdmin: (state) => state.isAdmin,
       }),
       
  },
  watch: {
      username: {
        handler: function(newVal,oldVal) {
            this.value = this.username;
        },
        immediate: true,
      }
  },
  methods: {
    exit() {
      localStorage.removeItem('token');
    },
    selectStore(){
      this.storesName = this.options[this.value].label;
      this.$store.commit('setCurrentStore',this.storesName);
    }
  },
  
  mounted() {
    //账号对应的店铺
    this.$axios.get('/api/store/getPower?username='+ this.username)
    .then((res)=>{
       this.options = res.data.stores.map((item,index)=>({
        value: index,
        label: item,
       }));
       this.value = this.options[0].label;
       //这里要进行初始设置一下
       this.$store.commit('setCurrentStore',this.value);
    })
  
   
  },



  

};
</script>

<style scoped>
.title {
    float: left;
    font-size: 30px;
    font-weight: 700;
}
.right {
    float: right;
    font-size: 16px;
}
a {
  color: #333;
  margin-left: 15px;
}
.select {
  display: inline-block;
}
</style>
<style lang="scss">
.admin {
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-col-12 {
    width: 100%;

}
.el-menu-vertical-demo  {
    width: 100%;
}
.el-main ,.el-aside{
    margin-bottom: -9999px;
    padding-bottom: 9999px;
}
.el-header {
    padding: 15px 35px;
    box-sizing: content-box;
}
.el-input--suffix {
  width: 120px;
}

.elSelect {
    background-color: #B3C0D1;
    border-color: #B3C0D1;
    margin-right: 10px;
}
.el-select__caret {
  color: red;
}
}

</style>