import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from './views/Users.vue'
import UsListado from './pages/users/Listado.vue'
import CreateUser from './pages/users/CreateUser.vue'
import Rhuman from './views/RHuman.vue'
import JArea from './views/JArea.vue'
import Economia from './views/Economia.vue'
import ViewRecursos from './pages/RecursosHumanos/Listado.vue'
import ViewAreas from './pages/RecursosHumanos/ListadoXareas.vue'
import Proyectos from './pages/JArea/Proyectos.vue'
import CreateProyectista from './pages/RecursosHumanos/CreateProyectista.vue'
import CreateAreas from './pages/RecursosHumanos/CreateAreas.vue'
import CreateEspecialidad from './pages/RecursosHumanos/CreateEspecialidad.vue'
import CreateTrabajador from './pages/RecursosHumanos/CreateTrabajador.vue'
import CreateCliente from './pages/RecursosHumanos/CreateCliente.vue'
import Planmes from './pages/RecursosHumanos/Planmes.vue'
import PlanAnual from './pages/RecursosHumanos/PlanAnual.vue'
import CreateContrato from "./pages/RecursosHumanos/CreateContrato.vue";
import Createproyecto from "./pages/RecursosHumanos/Createproyecto.vue";
import CreateSubproyecto from "./pages/RecursosHumanos/CreateSubproyecto.vue";
import CreateEquipo from "./pages/RecursosHumanos/CreateEquipo.vue";
import CreateActividades from "./pages/RecursosHumanos/CreateActividades.vue";
import CreateCT from "./pages/RecursosHumanos/CreateCT.vue";
import CreateCierre from "./pages/RecursosHumanos/CreateCierre.vue";
import CreateIntegrantes from "./pages/RecursosHumanos/CreateIntegrantes.vue";
import CreateAsignacion from "./pages/RecursosHumanos/CreateAsignacion.vue";
import Cierre from './pages/Economia/GetCierre.vue';
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
            { path: "/", name: 'rhumans', component: ViewRecursos },
            { path: "ver", name: 'verXareas', component: ViewAreas },
            { path: "add", name: 'add-proyectista', component: CreateProyectista },
            { path: "add-areas", name: 'add-areas', component: CreateAreas },
            { path: "add-especialidad", name: 'add-especialidad', component: CreateEspecialidad },
            { path: "add-planmes", name: 'add-planmes', component: Planmes },
            { path: "add-trabajador", name: 'add-trabajador', component: CreateTrabajador },
            { path: "add-cliente", name: 'add-cliente', component: CreateCliente },
            { path: "add-contrato", name: 'add-contrato', component: CreateContrato },
            { path: "add-planAnual", name: 'add-planAnual', component: PlanAnual },
            { path: "add-proyecto", name: 'add-proyecto', component: Createproyecto },
            { path: "add-subproyecto", name: 'add-subproyecto', component: CreateSubproyecto },
            { path: "add-equipo", name: 'add-equipo', component: CreateEquipo },
            { path: "add-actividades", name: 'add-actividades', component: CreateActividades },
            { path: "add-ct", name: 'add-ct', component: CreateCT },
            { path: "add-asignacion", name: 'add-asignacion', component: CreateAsignacion},
            { path: "add-integrantes", name: 'add-integrantes', component: CreateIntegrantes},
            // { path: "add-cierre", name: 'add-cierre', component: CreateCierre},
            // { path: "get-cierre", name: 'get-cierre', component: Cierre},
        ]
    },
    {
        path: '/jarea/',
        component: JArea,
        children: [
            { path: "/", name: 'jarea', component: Proyectos },

        ]
    },
    {
        path: '/economia/',
        component: Economia,
        children: [
            { path: "get-cierre", name: 'get-cierre', component: Cierre },
            { path: "add-cierre", name: 'add-cierre', component: CreateCierre},
        ]
    },
];

export default new Router({
    base: '/app/',
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
