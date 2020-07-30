import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate  from "vuelidate";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from "element-ui/lib/locale/lang/es";
import { ValidationProvider } from 'vee-validate';

Vue.use(ElementUI);
Vue.use(ElementUI, { locale });
Vue.use(Vuelidate);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use({
    install(Vue) {
        Vue.prototype.$api = axios.create({
            baseURL: '/api/'
        })
    }
});
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
