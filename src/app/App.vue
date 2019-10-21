<template>
    <div id="app">
        CTEnpa
        <sider v-if="isLogin"></sider>
        <router-view></router-view>
    </div>
</template>
<script>
import Sider from './views/Sider.vue'
export default {
    name:'app',
    data() {
        return {
           
        }
    },
    computed:{
        isLogin(){
            if(this.$router.currentRoute=='login')
                return false
            return true;
        }
    },
    components:{
        Sider
    },
    mounted(){
        // this.$router.go('-1');
    }
}
</script>
