<template>
  <div class="accountManage">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/superAdmini/accountList'}">账户列表</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 表单部分 -->
    <div class="myform">

    
      <p class="title" style="text-align: center; margin: 10px 0px 10px 250px">门店授权</p>
      <div style="text-align: center ">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value4"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[]"
          :titles="['可授权店铺', '授权店铺']"
          :button-texts="['取消', '授权']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handleChange"
          :data="data">
          <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
          <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
          <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
        </el-transfer>
      </div>

        <!-- <a-card style="width: 300px">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card> -->

        <!-- <div class="introduce">
          授权说明：
          注：已绑定商家信息或者被其他商家授权管理门店的会员账号不能再次授权
          1、选择一个或多个门店进行授权
          2、输入会员手机号
          3、点击发送授权码，向该用户发送“授权码”手机短信
          4、与被授权用户联系，获得授权码并输入完成门店管理授权
        </div> -->
        <el-button type="primary" @click="submit">确认授权</el-button>
        </div>
  </div>
</template>

<script>
import {Card} from 'ant-design-vue'
export default {
  components: {
    [Card.name]:Card
  },
  data() {
  
      return {
        storeList: [],//左边的那个框
        storesName:[],
        data: [],
        value: [1],
        value4: [],//这个是对应右边的框
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        }
      };
  },
  props: ['id'],//接收传过来的id
  methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      //确认授权点击
      submit() {
        console.log('点击了确认授权按钮');
        console.log('data',this.data);
        console.log('value',this.value);
        console.log('value4',this.value4);

        console.log('-----------');
        var stores = [];
        for(var i =0;i<this.value4.length;i++){
          stores.push(this.data[this.value4[i]-1].label);
        }
        this.storesName = stores;
        //我这里传过去账号id  和店铺名（店铺名是一个数组）
        this.$axios.post('/api/store/empower',{params:{id:this.id,stores:this.storesName}})
        .then((res)=> {
          console.log(res);
          if(res.data.code == 0) {
             this.$message({
                message: '恭喜你,授权成功',
                type: 'success'
              });
          }else {
             this.$message.error('授权失败');
          }
        }).catch(()=> {})
      }
  },
  mounted() {
    //我们在这里请求商店名  商店名---> 账号
    this.$axios.get('/api/store/storeName').then((res)=>{
        // console.log(res);
        this.storeList = res.data.infos;
        // console.log(this.storeList);
        // this.data =generateData();
        console.log('879797',this.storeList[1].storeName);
        for (let i = 1; i <= this.storeList.length; i++) {
          this.data.push({
            key: i,
            label: this.storeList[i-1].storeName,
          });
        }
    }).catch(()=> {

    })
    
    //我们还需要知道该账号管理的店铺
    this.$axios.get('/api/store/getEmpower?id='+this.id).then((res)=> {
      //拿到该用户对应的已授权店铺  设置左边框
      this.storeList = res.data.info[0].store;
      console.log(this.storeList);
      console.log(this.storeList.length);
      console.log(this.data.length);
      console.log(this.data);
      var mydata = JSON.parse(JSON.stringify(this.data));
      //这样我们就可以了
      //我们要将数据回显 我们要找到店铺对应的下标
      for(var i=0;i < this.storeList.length;i++) {
          for(var j=0;j <mydata.length;j++) {
            console.log(mydata[j].label);
            if(this.storeList[i] == mydata[j].label) {
              this.value4.push(j+1);
              break;
            }
          }
      }
      console.log('/*/*/**//*/*/*/*/**');
      console.log('->',this.value4);
    })

    //我们要知道有一些店铺不能被选择了

  }
  } 
</script>
<style scoped>
.introduce {
  border: 1px solid #ccc;
}
.myform {
  width: 800px;
}

</style>
<style lang='scss'>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
.accountManage {
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    padding-left: 100px;
  }
  .el-input--small,
  .el-transfer-panel__filter,
  .el-transfer-panel__filter {
        height: 30px;
    line-height: 30px;
  }
  .el-transfer-panel__item {
    left: 15px;
  }
}
</style>
