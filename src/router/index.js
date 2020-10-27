import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import axios from 'axios'
// 这个地方是访问不到原型上面的axios的 
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/login')
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect:'/admin/superAdmini',
    component: () => import('../views/admin'),
    children: [
      
      //这里是一般用户的路由
        {
        path: 'generalAdmin',
        name: 'generalAdmin',
        component: () => import('../components/homePage'),
          children: [
              //添加商品列表
              {
                path: 'addProduct',
                name: 'addProduct',
                component: () => import('@/components/generalAdmin/product/addProduct'),
              },
              {
                path: 'productList',
                name: 'productList',
                component: () => import('@/components/generalAdmin/product/productList'),
              },
          ]
        },
      //这里是管理用户的路由
        {
          path: 'superAdmini',
          name: 'superAdmini',
          component: () => import('@/components/homePage'),
          children:[
            { 
              path: '',
              name: '',
              component: {template: '<div style="font-size:20px">欢迎使用饿了么后台管理系统</div>'},
              
            },
            //店铺列表
            {
              path: 'storeList',
              name: 'storeList',
              component: () => import('../components/superAdmin/storeManage/storeList'),
            },
            //编辑店铺资料
            {
              path: 'updateList/:id',
              name: 'updateList',
              component: () => import('../components/superAdmin/storeManage/updateList'),
              props: true,
            },
            //预览店铺资料
            {
              path: 'lookList/:id',
              name: 'lookList',
              component: () => import('../components/superAdmin/storeManage/lookList'),
              props: true,
            },
            //添加店铺列表
            {
              path: 'addList',
              name: 'addList',
              component: () => import('../components/superAdmin/storeManage/addList'),
            },
            //账号数据列表
            {
              path: 'accountList',
              name: 'accountList',
              component: () => import('../components/superAdmin/accountManage/accountList'),
            },
            //账号管理
            {
              path: 'accountManage/:id',
              name: 'accountManage',
              component: () => import('../components/superAdmin/accountManage/accountManage'),
              props: true,
            }
          ]
        }
    ]
    // redirect:'/admin',
    // children: [
    //   {
    //       path: '/admin',
    //       name: 'admin',
    //       component: () => import('@/components/superAdmini/homePage'),
    //   }
    // ]
  },
  {
    path: '**',
    redirect:'/login',
  }
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//全局前置路由
router.beforeEach((to, from, next) => {
  //当时去到登录和注册的界面就不用拦截
  if(to.path =='/login' || to.path == '/register') {
    next();
  }else {
    //如果有token令牌  
    axios.get('/api/users/info').then((res)=> {
      if(res.data.code == 0) {
        // 我们把用户名传到仓库
        let type = false;
        //判断一下是否为管理员
        if(res.data.username == 'admin') {
          type = true;
        }
        store.commit('setUserName',res.data.username);
        store.commit('setIsAdmin',type);
        next();
      }else {
        next('/login');
      }
    }).catch(()=> {
        next('/login');
    }) 
  }
})

export default router
