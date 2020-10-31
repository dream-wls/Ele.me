import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username : '',
    form : {
      username : '',
      phone : ''
    },
    menu : {} ,
    priceList : [],
    id : '',

  },
  mutations: {
    SET_USERNAME(state,payload){
      state.username = payload;
    },
    SET_FORM(state,payload){
      state.form = payload;
    },
    SET_MENU(state,payload){
      state.menu = payload;
    },
    SET_TOTALPRICE(state,payload){
      state.priceList = payload ;
    },
    SET_STOREID(state,payload){
      state.id = payload;
    }


  },
  actions: {
  },
  modules: {
  }
})
