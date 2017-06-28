import Vue from 'vue'
import VeeValidate from 'vee-validate'

import App from './App'
import router from './router'
import './store'
import 'script-loader!sweetalert/dist/sweetalert.min.js'

Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
