import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('../components/generalAdmin/homePage'),

        },
      //这里是管理用户的路由
        {
          path: 'superAdmini',
          name: 'superAdmini',
          component: () => import('@/components/superAdmin/homePage'),
          children:[
            { 
              path: '',
              name: '',
              component: {template: '<div style="font-size:20px">欢迎使用饿了么后台管理系统<div>'},
              
            },
            {
              path: 'storeList',
              name: 'storeList',
              component: () => import('../components/superAdmin/storeManage/storeList'),
            },
            {
              path: 'addList',
              name: 'addList',
              component: () => import('../components/superAdmin/storeManage/addList'),
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

export default router
