import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import store from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


export const eventBus=new Vue();

import router from './router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
