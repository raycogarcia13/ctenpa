<template>
 <div>
   <b-row>
     <div class="col-md-12">
          <!-- Custom Tabs (Pulled to the right) -->
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs pull-right">
              <li class="pull-left header"><i class="fa fa-th"></i> Plan Total: {{getTotales}}</li>

             <b-nav-item-dropdown html="<i class='fa fa-university'> Áreas</i>" right>
                    <b-dropdown-item v-for="(item) in areas " 
                    :key="item.id"
                    @click="getProyecXarea(item.id)"  
                    href="#">{{item.nombre}} | {{item.codigo}}
                    </b-dropdown-item>                   
              </b-nav-item-dropdown>
            </ul>
            <div class="tab-content">
            
              <!-- /.tab-pane -->
              <div class="tab-pane active" id="tab_3-2">
               <!-- Main table element -->
    <b-row>           
      <b-col lg="6" class="my-1">
        <h3>Horas del Mes : {{horasXmes}}</h3>       
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
      <!-- <template v-slot:cell(createdAt)="data">
        <span v-html="formatedDate(data.value)"></span>
      </template> -->
      <!-- <template v-slot:cell(Rol.name)="data">
        <span v-html="formatedROl(data.value)"></span>
      </template> -->
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="info" data-toggle="tooltip" title="Ver CT" class="mr-1" @click="setWorker(row.item)">
          <i class="fa fa-eye"></i>
        </b-button>
        <!-- <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i class="fa fa-trash"></i> </b-button> -->
        <b-button size="sm" variant="primary" @click="row.toggleDetails">
          {{ row.detailsShowing ? '-' : '+' }} 
        </b-button>
      </template>
<!-- detalles de la fila -->
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <!-- <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li> -->
            <li> Apellidos: {{ row.item.apellidos }}</li>
            <li> Especialidad: {{ row.item.Especialidad.especialidad }}</li>
            <li> Area: {{ row.item.Area.nombre }}</li>
            <!-- <li> Usuario: {{ row.item.UsuarioId }}</li> -->
            <!-- <li> Coeficiente: {{ row.item.coeficiente }}</li> -->
            <!-- <li> Salario con descuento: {{ salpordes= Math.round(((row.item.salario_basico/190.6)*this.horasXmes*100))/100 }}</li> -->
            <!-- <li> Salario por resultado: {{salporResult= salpordes * row.item.coeficiente }}</li> -->
            <!-- <li> Salario Total: {{ Math.round((salporResult + salpordes)*100)/100 }}</li> -->
          </ul>
        </b-card>        
      </template>
      <!-- <template v-slot:cell(salario_basico)="data">
        <span v-html="formatedROl(data.value)"></span>
      </template> -->
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
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- nav-tabs-custom -->
        </div>
   </b-row>
       
   </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
 
data(){
    return{
        onearea:[],
        horasXmes:'',
        items:[],
        fields:[
            { key: 'number', label: '#' },
            { key:'nombre', labels:'Nombre',sortable: true, sortDirection: 'desc'},
            { key:'apellidos', labels:'Apellidos',sortable: true, sortDirection: 'desc'},
            { key:'perfec_empresarial', labels:'Perfeccionamiento Empresarial',sortable: true, sortDirection: 'desc'},
            { key:'salario_basico', labels:'Salario Básico',sortable: true, sortDirection: 'desc'},
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
        areas:[],
       
    }
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
      },
      getTotales(){
        let semi=0;
        let salpordes=0;
        let salporResult=0;
        let salTotal=0;
        let horas = this.horasXmes;
        let total =this.items;
        for (let i = 0; i < total.length; i++) {
          const element = total[i];
          salpordes= Math.round(((element.salario_basico/190.6)*horas*100))/100;
          salporResult= salpordes * element.coeficiente;
          salTotal= Math.round((salporResult + salpordes)*100)/100;
          semi +=salTotal
        }
        
        return semi
      }
    },
methods:{
   
        ...mapMutations(['toogleSidebar']),
        ...mapActions(['signout']),

        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
  gethoras(mes,anno){
        let em =this;
        let month =new Date().getMonth();
        let year =new Date().getFullYear();
        this.$api.post('fechas/month_hours',{mes:month+1,anno:year}).then(function (response) {
              em.horasXmes=response.data.hours
        })
        .catch(function (error) {
        console.log(error);
        });
        },  
  getProyecXarea(item)
      {        
        console.log('Item:',item);
          this.isBusy=true;
          this.$api.get("/proyectista/getXarea/"+item,{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{
              this.isBusy=false;
              this.items = res.data;
              this.totalRows = this.items.length
          }).catch(err=>{
              this.isBusy=false;
              console.log(err); 
          })
      },  
  getAreas(){
      this.$api.get('/area',{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{            
              this.areas = res.data;             
          }).catch(err=>{             
              console.log(err); 
          })
      },
  getOneArea(){
      this.$api.get('/area/getOne',{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{            
              this.onearea = res.data;             
          }).catch(err=>{             
              console.log(err); 
          })
      },
  setWorker(item){
      sessionStorage.setItem('idwork',JSON.stringify(item));
      this.$router.push('add-ct');
      }   
},
mounted() {
    this.gethoras();
    this.getAreas();
    // this.getProyecXarea();
  }

}
</script>

<style>
/* @import './assets/styles/yourstyles.css'; */
 .color-palette {
      height: 35px;
      line-height: 35px;
      text-align: center;
    }

    .color-palette-set {
      margin-bottom: 15px;
    }

    .color-palette span {
      display: none;
      font-size: 12px;
    }

    .color-palette:hover span {
      display: block;
    }

    .color-palette-box h4 {
      position: absolute;
      top: 100%;
      left: 25px;
      margin-top: -40px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      display: block;
      z-index: 7;
    }
</style>