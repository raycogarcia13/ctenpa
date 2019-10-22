<template>
    <div>
        <b-container class="content-header">
                    <h2>
                        Bienvenido
                        <small><code>Control panel</code></small>
                    </h2>
        </b-container>
        <b-container class="content">
            

        </b-container>
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
}
</script>