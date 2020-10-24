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
    address : {} ,
  },
  mutations: {
    SET_USERNAME(state,payload){
      state.username = payload;
    },
    SET_FORM(state,payload){
      state.form = payload;
    },
    SET_ADDRESS(state,payload){
      state.address = payload;
      // console.log( state.address);

    }
  },
  actions: {
  },
  modules: {
  }
})
