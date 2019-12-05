<template>
  <aside class="left-side sidebar-offcanvas" :class="{'collapse-left':!siderShow}">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="active">
          <router-link to="/home">
            <i class="fa fa-home"></i>
            <span>Incio</span>
          </router-link>
        </li>
        <li v-if="hasPermission('proyectista')">
          <a href="pages/widgets.html">
            <i class="fa fa-th"></i>
            <span>Rellenar CT</span>
            <small class="badge pull-right bg-green">Importante</small>
          </a>
        </li>
        <li v-if="hasPermission('admin')" class="treeview" :class="{'active':showed=='user'}">
          <a style="color:#f6f6f6;cursor:pointer" @click="mostrarSubMenu('user')">
            <i class="fa fa-users"></i>
            <span>Usuarios</span>
            <i class="fa pull-right" :class="flechita('user')"></i>
          </a>
          <ul class="treeview-menu" :style="{'display':mostrar('user')}">
            <li>
              <router-link :to="{name:'users'}">
                <i class="fa fa-table"></i> Listado
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-user'}">
                <i class="fa fa-plus"></i> Crear Usuario
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      showed: null
    };
  },
  computed: {
    ...mapState(["siderShow", "user_signed"])
  },
  methods: {
    active(item) {
      return item;
    },
    mostrarSubMenu(sub) {
      if (this.showed == sub) this.showed = null;
      else this.showed = sub;
    },
    flechita(sub) {
      return this.showed == sub ? "fa-angle-down" : "fa-angle-left";
    },
    mostrar(sub) {
      return this.showed == sub ? "block" : "none";
    },
    hasPermission(rol) {
      if (rol == this.user_signed.Rol.rol) return true;
      return false;
    }
  },
  mounted() {}
};
</script>