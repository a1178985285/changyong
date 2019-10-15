import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
//封装的调用下面这个
// import axios from './http'
//封装的调用下面这个
import store from './vuex/'
//复制

// 设置一个全局变量
import global from './components/api/global.js';
Vue.prototype.global = global

Vue.prototype.axios=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




