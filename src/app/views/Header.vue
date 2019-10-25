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
                
                <b-nav-item-dropdown :text="capitalizeUs" right>
                    <b-dropdown-item href="#"><i class="fa fa-user"></i> Perfil</b-dropdown-item>
                     <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="signout"><i class="fa fa-ban"></i> Salir</b-dropdown-item>
                </b-nav-item-dropdown>
                        <!-- Menu Footer-->
            </b-navbar-nav>
        </b-navbar>
    </header>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"Header",
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
}
</script>