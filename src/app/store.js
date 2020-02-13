import Vue from 'vue'
import Vuex from 'vuex'
import router from './router' 

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        autenticado:false,
        user_signed:null,
        siderShow:true
    },
    mutations:{
        logged(state)
        {
            state.autenticado=true;
        },
        toogleSidebar(state)
        {
            state.siderShow=!state.siderShow;
        },
        actionLogin(state,user)
        {
            state.autenticado=true;
            state.user_signed=user;
        },
        actionLogout(state)
        {
            state.autenticado=false;
            state.user_signed=null;
        }
    },
    actions:{
        sigin({commit},user){
            sessionStorage.setItem('ctenpa-secret',JSON.stringify(user.token));
            sessionStorage.setItem('ctenpa-user',JSON.stringify(user));
            commit('actionLogin',user);
        },
        verify({commit})
        {
            let user=sessionStorage.getItem('ctenpa-user');
            let token=sessionStorage.getItem('ctenpa-secret');
            if(token && user)
            {
                commit('actionLogin',JSON.parse(user));
            }

            return token;
        },
        signout({commit})
        {
            sessionStorage.removeItem('ctenpa-user');  
            sessionStorage.removeItem('ctenpa-secret');  
            router.go('/');
            commit('actionLogout');
        }
    }
})