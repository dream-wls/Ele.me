import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',//用户的用户名
    isAdmin: '',//是否是管理员
  },
  mutations: {
    setUserName(state,payload){
      state.userName = payload;
    },
    setIsAdmin(state,payload){
      state.isAdmin = payload;
    }
  },
  actions: {
    
    
  },
  modules: {
  }
})
