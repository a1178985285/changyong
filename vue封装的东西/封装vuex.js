//main.js里面
//import store from './vuex/'

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
Vue.use(Vuex)

const state = {		
	//api
	apis:'http://chat.zp600.com'
}

const mutations={
  add(state,n){
    state.count=state.count+n
}
  }

  const getters ={
    //通过方法访问
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters ,
})


