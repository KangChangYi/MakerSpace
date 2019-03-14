import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import VueResource from 'vue-resource' //服务器请求

import global from './Navigation/Index' //index
Vue.prototype.global = global //挂载到Vue实例上面

import mavonEditor from 'mavon-editor' //markdown

import '../node_modules/mavon-editor/dist/css/index.css' //markdown

Vue.use(mavonEditor) //markdown


Vue.config.productionTip = false

Vue.use(VueResource); //服务器请求
Vue.use(iView) // 使用 组建
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
