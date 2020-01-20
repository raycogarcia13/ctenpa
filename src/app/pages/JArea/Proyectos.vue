<template>
  <div>  
     <b-container fluid>
        <b-row>             
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>65</h3>

                  <p>Cumplimiento</p>
                </div>
                <div class="icon">
                  <i class="fa fa-calendar"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>4</h3>
                  <p>Proyectistas</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>
                    4
                    <sup style="font-size: 20px">%</sup>
                  </h3>

                  <p>Total de Proyectos</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
        </b-row>
         <!-- Main table element -->
    <b-row>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Filtrar"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      hover
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :busy="isBusy" 
      @filtered="onFiltered"
    >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle text-success"></b-spinner>
        <strong class="text-success">Obteniendo datos...</strong>
      </div>
<!-- botones -->
      <template v-slot:cell(number)="row">
        <span v-html="row.index+1"></span>
      </template>
      <template v-slot:cell(createdAt)="data">
        <span v-html="formatedDate(data.value)"></span>
      </template>
      <template v-slot:cell(Rol.name)="data">
        <span v-html="formatedROl(data.value)"></span>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i class="fa fa-edit"></i> </b-button>
        <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i class="fa fa-trash"></i> </b-button>
        <b-button size="sm" variant="primary" @click="row.toggleDetails">
          {{ row.detailsShowing ? '-' : '+' }} 
        </b-button>
      </template>
<!-- detalles de la fila -->
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <!-- pagination -->
    <b-row>
       <b-col offset-md="8" offset-sm="6" sm="6" md="4" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
      </b-container>
    </div>
  
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
name:"rhuman",
data(){
    return{
        items:[],
        fields:[
            { key: 'number', label: '#' },
            { key:'nombre', labels:'Nombre',sortable: true, sortDirection: 'desc'},
            { key:'apellidos', labels:'Apellidos',sortable: true, sortDirection: 'desc'},
            { key:'apellidos', labels:'Proyectos',sortable: true, sortDirection: 'desc'},
            { key:'AreaId', labels:'Especialidad',sortable: true, sortDirection: 'desc'},
            { key:'actions', labels:'Acciones',sortable: true, sortDirection: 'desc'}
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        isBusy:false,
        user:{}
    };
    },
    computed: {
        ...mapState(['siderShow','user_signed']),
        capitalizeUs()
        {
            return this.user_signed.username.charAt(0).toUpperCase() + this.user_signed.username.slice(1);
        },
        sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
        ...mapMutations(['toogleSidebar']),
        ...mapActions(['signout']),

        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      getData()
      {
          this.isBusy=true;
          this.$api.get("/proyectista",{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{
              this.isBusy=false;
              this.items=res.data;
              this.totalRows = this.items.length
          }).catch(err=>{
              this.isBusy=false;
              console.log(err); 
          })
      },
      formatedROl(data)
      {
        if(data=='Administrador')
          return '<span class="badge badge-danger">'+data+'</span>';
        if(data=='Jefe de Área')
          return '<span class="badge badge-info">'+data+'</span>';
        if(data=='Proyectista')
          return '<span class="badge badge-success">'+data+'</span>';
        
        return data;
      },
      formatedDate(data)
      {
        data=new Date(data);
        let day=data.getDate();
        let month=data.getMonth();
        let year=data.getFullYear();
        return `${day}/${month}/${year}`;
      }
    },
  mounted() {
    // this.countUsers();
    this.getData();
  }
    
}
</script>