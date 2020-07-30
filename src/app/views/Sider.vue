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
              <router-link :to="{name:'add-trabajador'}">
                <i class="fa fa-plus"></i> Agregar Trabajador
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="hasPermission('rhuman')" class="treeview" :class="{'active':showed=='user'}">
          <a style="color:#f6f6f6;cursor:pointer" @click="mostrarSubMenu('user')">
            <i class="fa fa-users"></i>
            <span>Men&uacute;- RH</span>
            <i class="fa pull-right" :class="flechita('user')"></i>
          </a>
          <ul class="treeview-menu" :style="{'display':mostrar('user')}">
<!--            <li>-->
<!--              <router-link :to="{name:'add-planAnual'}">-->
<!--                <i class="fa fa-table"></i> Plan de Produccion Anual-->
<!--              </router-link>-->
<!--            </li>-->
            <li>
              <router-link :to="{name:'add-cliente'}">
                <i class="fa fa-plus"></i> Agregar Cliente
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-contrato'}">
                <i class="fa fa-plus"></i> Agregar Contrato
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-proyecto'}">
                <i class="fa fa-plus"></i> Agregar Proyecto
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-subproyecto'}">
                <i class="fa fa-plus"></i> Agregar SubProyecto
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-trabajador'}">
                <i class="fa fa-plus"></i> Agregar Trabajador
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-equipo'}">
                <i class="fa fa-plus"></i> Agregar Equipo
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-actividades'}">
                <i class="fa fa-plus"></i> Agregar Actividad
              </router-link>
            </li>
<!--            <li>-->
<!--              <router-link :to="{name:'verXareas'}">-->
<!--                <i class="fa fa-plus"></i> Ver por Áreas-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li>-->
<!--              <router-link :to="{name:'add-planmes'}">-->
<!--                <i class="fa fa-plus"></i> Plan del mes-->
<!--              </router-link>-->
<!--            </li>-->
            <li>
              <router-link :to="{name:'add-areas'}">
                <i class="fa fa-plus"></i> Insertar Áreas
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-especialidad'}">
                <i class="fa fa-plus"></i> Insertar Especialidad
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-asignacion'}">
                <i class="fa fa-plus"></i> Asignar Proyectos a los Equipos
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-integrantes'}">
                <i class="fa fa-plus"></i> Integrantes de los Equipos
              </router-link>
            </li>
<!--            <li>-->
<!--              <router-link :to="{name:'add-cierre'}">-->
<!--                <i class="fa fa-plus"></i> Cierre-->
<!--              </router-link>-->
<!--            </li>-->
          </ul>

        </li>
            <!-- Jefe de Area -->
        <li v-if="hasPermission('jArea')" class="treeview" :class="{'active':showed=='user'}">
          <a style="color:#f6f6f6;cursor:pointer" @click="mostrarSubMenu('user')">
            <i class="fa fa-users"></i>
            <span>Men&uacute;-Jefe de Área</span>
            <i class="fa pull-right" :class="flechita('user')"></i>
          </a>
          <ul class="treeview-menu" :style="{'display':mostrar('user')}">
              <li>
              <router-link :to="{name:'jarea'}">
                <i class="fa fa-plus"></i> C&aacute;lculo de Tiempo
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'add-integrantes'}">
                <i class="fa fa-plus"></i> Integrantes de los Equipos
              </router-link>
            </li>
          </ul>
        </li>
<!--        trabajador-->
        <li v-if="hasPermission('trabajador')" class="treeview" :class="{'active':showed=='user'}">
          <a style="color:#f6f6f6;cursor:pointer" @click="mostrarSubMenu('user')">
            <i class="fa fa-users"></i>
            <span>Men&uacute;-Proyectista</span>
            <i class="fa pull-right" :class="flechita('user')"></i>
          </a>
          <ul class="treeview-menu" :style="{'display':mostrar('user')}">
            <li>
              <router-link :to="{name:'add-ct'}">
                <i class="fa fa-plus"></i> CT
              </router-link>
            </li>

          </ul>
        </li>

        <li v-if="hasPermission('economia')" class="treeview" :class="{'active':showed=='user'}">
          <a style="color:#f6f6f6;cursor:pointer" @click="mostrarSubMenu('user')">
            <i class="fa fa-list-alt"></i>
            <span>Cierre</span>
            <i class="fa pull-right" :class="flechita('user')"></i>
          </a>
          <ul class="treeview-menu" :style="{'display':mostrar('user')}">
            <li>
              <router-link :to="{name:'add-cierre'}">
                <i class="fa fa-plus"></i> Cierre Parcial
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'get-cierre'}">
                <i class="fa fa-plus"></i> Cierre
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
