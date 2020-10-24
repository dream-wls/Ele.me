import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';


import { AddressEdit } from 'vant';
import { Dialog } from 'vant';


Vue.use(Dialog);


Vue.use(Vant);
Vue.use(AddressEdit);

//拦截器
axios.interceptors.request.use(function (config) {
  config.headers.token = localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});


Vue.prototype.$axios = axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
