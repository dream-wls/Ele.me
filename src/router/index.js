import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios';
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/Mine.vue'),
    children : [
      {
        path: 'person',
        component: () => import('@/components/Person.vue'),
      },
      {
        path: 'address',
        component: () => import('@/components/Address.vue'),
        children : [
          {
            path : 'addressedit' ,
            component : () => import('@/components/Addressedit.vue')
          },
          {
            path : 'addressupdate/:index' ,
            component : () => import('@/components/Addressupdate.vue'),
            props:true,
          }
        ]
      },
      {
        path: 'rule',
        component: () => import('@/components/Rule.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
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
