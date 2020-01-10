<template>
    <div>
         <div class="content-header">
                    <h2>Gestión de Recursos Humanos
                        <small><code>{{capitalizeUs}}</code></small>
                    </h2>
        </div>
        <div class="content">
            <router-view></router-view>         
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "jarea",
  data() {
    return {
      
    }
  },
 computed: {
        ...mapState(['siderShow','user_signed']),
        capitalizeUs()
        {
            return this.user_signed.username.charAt(0).toUpperCase() + this.user_signed.username.slice(1);
        }
    },
    methods: {
        ...mapMutations(['toogleSidebar']),
        ...mapActions(['signout'])
    },
  mounted() {
 
  }
    
};
</script>