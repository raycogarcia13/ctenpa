<template>
    <div id="app">
        <Header v-if="autenticado"></Header>
         <div v-if="autenticado" class="wrapper row-offcanvas row-offcanvas-left">
            <Sider ></Sider>
             <aside class="right-side" :class="{'strech':!siderShow}">                
                <router-view></router-view>
            </aside>
         </div>
        <router-view v-else></router-view>

    </div>
</template>
<script>
import Sider from './views/Sider.vue'
import Header from './views/Header.vue'
import { mapState } from 'vuex';
export default {
    name:'app',
    data() {
        return {
           
        }
    },
    computed: {
        ...mapState(['autenticado','siderShow']),
        mostrar(){
            if(this.autenticado)
                return 'block';
            return 'none';
        }
    },
    components:{
        Sider,Header
    },
    mounted(){
        // console.log(this.autenticado)
    }
}
</script>

<style>
.bg-olive{
     color: #f9f9f9 !important;
}
.bg-olive {
  background-color: #3d9970 !important;
}

.cursor-pointer{
    cursor: pointer;
}
</style>
