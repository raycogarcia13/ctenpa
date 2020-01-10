import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from './views/Users.vue'
import UsListado from './pages/users/Listado.vue'
import CreateUser from './pages/users/CreateUser.vue'
import Rhuman from './views/RHuman.vue'
import JArea from './views/JArea.vue'
import CreateProyectista from './pages/RecursosHumanos/CreateProyectista.vue'
import Proyectos from './pages/JArea/Proyectos.vue'

let routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/user/',
        component: Users,
        children: [
            { path: "/", name: 'users', component: UsListado },
            { path: "add", name: 'add-user', component: CreateUser }
        ]
    },
    {
        path: '/rhuman/',
        component: Rhuman,
        children: [
            { path: "/", name: 'rhumans', component: CreateProyectista },
            // { path: "add", name: 'add-user', component: CreateUser }
        ]
    },
    {
        path: '/jarea/',
        component: JArea,
        children: [
            { path: "/", name: 'jarea', component: Proyectos },
            // { path: "add", name: 'add-user', component: CreateUser }
        ]
    }
]

export default new Router({
    base: '/app/',
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})