<template>
    <div id="app">
        CTEnpa
        <sider v-if="autenticado"></sider>
        <router-view></router-view>
    </div>
</template>
<script>
import Sider from './views/Sider.vue'
import { mapState } from 'vuex';
export default {
    name:'app',
    data() {
        return {
           
        }
    },
    computed: mapState(['autenticado']),
    components:{
        Sider
    },
    mounted(){
        console.log(this.autenticado)
    }
}
</script>
