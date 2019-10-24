<template>
        <aside class="left-side sidebar-offcanvas" :class="{'collapse-left':!siderShow}">                
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- /.search form -->
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu">
                        <li class="active">
                            <router-link to="/home">
                                <i class="fa fa-home"></i> <span>Incio</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="pages/widgets.html">
                                <i class="fa fa-th"></i> <span>Widgets</span> <small class="badge pull-right bg-green">new</small>
                            </a>
                        </li>
                        <li class="treeview active">
                            <a href="#">
                                <i class="fa fa-bar-chart-o"></i>
                                <span>Charts</span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="pages/charts/morris.html"><i class="fa fa-angle-double-right"></i> Morris</a></li>
                                <li><a href="pages/charts/flot.html"><i class="fa fa-angle-double-right"></i> Flot</a></li>
                                <li><a href="pages/charts/inline.html"><i class="fa fa-angle-double-right"></i> Inline charts</a></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name:"Header",
    computed: {
        ...mapState(['siderShow']),
    },
    methods: {
        active(item)
        {
            return item;
        }
    },
    mounted(){

    }
}
</script>