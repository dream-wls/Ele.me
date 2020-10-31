import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import( /* webpackChunkName : "home" */ '@/views/Home.vue'),
   
  },
  // 搜索页面search 和 商家详情detail
  {
    path : '/search' ,
    name : 'Search',
    component : () => import( /* webpackChunkName : "search" */ '@/views/Search.vue'),
  },
  {
    path : '/detail/:id' ,
    name : 'Detail',
    component : () => import(/* webpackChunkName : "detail" */  '@/views/Detail.vue'),
    props : true ,
  },
  {
    path : '/item/:itemId',
    name : 'Item',
    component : () => import(/* webpackChunkName : "detail" */ '@/components/Item.vue'),
    props : true ,
  },

  //订单 order
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName : "order" */ '@/views/Order.vue')
  },

  //我的 mine
  {
    path: '/mine',
    name: 'Mine',
    component: () => import( /* webpackChunkName : "mine" */ '@/views/Mine.vue'),
    children : [
      {
        path: 'person',
        component: () => import( /* webpackChunkName : "mine" */ '@/components/Person.vue'),
      },
      {
        path: 'address',
        component: () => import( /* webpackChunkName : "mine" */ '@/components/Address.vue'),
        children : [
          {
            path : 'addressedit' ,
            component : () => import( /* webpackChunkName : "mine" */ '@/components/Addressedit.vue')
          },
          {
            path : 'addressupdate/:Idindex' ,
            component : () => import( /* webpackChunkName : "mine" */ '@/components/Addressupdate.vue'),
            props:true,
          }
        ]
      },
      {
        path: 'rule',
        component: () => import( /* webpackChunkName : "mine" */ '@/components/Rule.vue')
      },
    ]
  },

  //登录和注册 login register
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName : "login" */ '@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(  /* webpackChunkName : "register" */ '@/views/Register.vue')
  },


  {
    path: '/*',
    redirect : '/home'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局前置守卫，所有的路由都会走到这里
router.beforeEach((to, from, next) => {
  //to : 从哪里来的url
  if( to.path == '/login' || to.path == '/register' ){
    next();
  }
  else{
    axios.get('/api/users/info2').then((res)=>{
      if(res.data.code == 0){
        // console.log(res.data);
        store.commit('SET_USERNAME',res.data.phone);
        store.commit('SET_FORM',{
          username : res.data.username,
          phone : res.data.phone
        });

        next();
      }
      else{
        next('/login');
      }
    }).catch(()=>{
      next('/login');
    });
    
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

export default router
