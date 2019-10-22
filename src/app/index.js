import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: '/api/'
    })
  }
})

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app');

