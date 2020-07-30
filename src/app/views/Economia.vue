<template>
    <div>
        <div class="content-header">
            <h2>Módulo de gestión para economía
                <small><code>{{capitalizeUs}}</code></small>
            </h2>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "Economia",
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
    }
</script>

<style scoped>

</style>
