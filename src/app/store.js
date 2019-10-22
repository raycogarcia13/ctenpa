import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
        }
    },
    actions:{
        sigin({mutations,state},user,tkn){

        }
    }
})