import ElementUI from 'element-ui';
import axios from 'axios'
import { Button } from 'ant-design-vue';

export default {
    install(Vue) {
        // ElementUI的加载
        Vue.use(ElementUI);
        
        Vue.use(Button);
        //axios的加载
        Vue.prototype.$axios = axios;
        axios.interceptors.request.use(function(config){
            config.headers.token = localStorage.getItem('token');
            return config;
        },function(error){
        return Promise.reject(error);
        });
    }


}