<template>
    <div>
        <div class="content-header">
                    <h2>
                        Bienvenido
                        <small><code>Control panel</code></small>
                    </h2>
        </div>
        <div class="content">
            asdasd

        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name:'Home',
    data() {
        return {
            
        }
    },
    computed: mapMutations(['logged']),
    mounted() {
        this.$swal({title:"Login",type:'success',text:'Bienvenido al sitio',toast:true,position:'top',showConfirmButton:false,timer:3000});
    },
}
</script>