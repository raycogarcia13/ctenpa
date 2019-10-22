<template>
    <header class="header">
        <router-link :to="{name:'home'}" class="logo">
            <!-- Add the class icon to your logo image or logo icon to add the margining -->
            CTEnpa
        </router-link>
        <!-- Header Navbar: style can be found in header.less -->
        <b-navbar>
            <!-- Sidebar toggle button-->
            <a @click="toogleSidebar()" class="navbar-btn sidebar-toggle cursor-pointer">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
                <b-navbar-nav class="ml-auto">
                    <!-- Messages: style can be found in dropdown.less-->
                    <b-nav-item-dropdown html="<i class='fa fa-envelope'></i> <span class='badge bg-green'>4</span>" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item-dropdown html="<i class='fa fa-warning'></i> <span class='badge bg-orange'>10</span>" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item-dropdown text="Usuario" right>
                        <b-dropdown-item href="#">Perfil</b-dropdown-item>
                        <b-dropdown-item href="#">Salir</b-dropdown-item>
                    </b-nav-item-dropdown>
                            <!-- Menu Footer-->
                </b-navbar-nav>
        </b-navbar>
    </header>
</template>
<script>
import { mapState , mapMutations } from 'vuex';
export default {
    name:"Header",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['siderShow']),
    },
    methods: {
        ...mapMutations(['toogleSidebar'])        
    },
}
</script>