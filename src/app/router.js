import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from './components/Login.vue'
import Home from './components/Home.vue'

let routes=[
    {
        path:'/',
        name:'login',
        component:Login
    },
    {
        path:'/home',
        name:'home',
        component: Home
    },

]

export default new Router({
    mode:'history',
    routes,
})