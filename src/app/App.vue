<template>
    <div id="app">
        <Header v-if="autenticado"></Header>
         <div v-if="autenticado" class="wrapper row-offcanvas row-offcanvas-left" :class="{'relative active':!siderShow}" >
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
import { mapState, mapActions } from 'vuex';
export default {
    name:'app',
    data() {
        return {
           
        }
    },
    computed: {
        ...mapState(['autenticado','siderShow']),
    },
    components:{
        Sider,Header
    },
    methods: {
      ...mapActions(['verify']) 
    },
    created(){
        this.verify().then((tkn)=>{
            if(this.autenticado && this.$router.currentRoute.name==="login")
                this.$router.push('/home');
             else if(!this.autenticado && this.$router.currentRoute.name!=="login")
            {
                this.$router.push('/');
            }
        });
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
.content{
    min-height: 100px;
}
</style>
