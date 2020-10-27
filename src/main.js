import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import Plugin from './plugin'
// import { Button } from 'ant-design-vue';

Vue.use(Plugin);
// Vue.component(Button.name, Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
