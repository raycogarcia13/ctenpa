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
                  44
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
      <div class="mt-5 mb-3" >
        <h2> Producción según Plan del año Aprobado.</h2>
      </div>        
      <b-col lg="6" class="my-1">
        <h3>Plan Mes : </h3>
        <h3>Horas del mes:</h3><h4 v-html="horasXmes"></h4>
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
            <!-- <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li> -->
            <li> Apellidos: {{ row.item.apellidos }}</li>
            <li> Especialidad: {{ row.item.Especialidad.especialidad }}</li>
            <li> Area: {{ row.item.Area.nombre }}</li>
            <li> Coeficiente: {{ row.item.coeficiente }}</li>
            <li> Salario Basico: ${{ row.item.salario_basico }}</li>
            <li> Salario con descuento: ${{ salpordes= Math.round(((row.item.salario_basico/190.6)*horasXmes*100))/100 }}</li>
            <li> Salario por resultado: ${{salporResult= Math.round((salpordes * row.item.coeficiente)*100)/100 }}</li>
            <li> Salario Total: ${{ Math.round((salporResult + salpordes)*100)/100 }}</li>
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

     <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser" @hide="resetInfoModal">
      <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
      <div v-else>
          <form>
               <b-form-group> <b-form-input
                v-model="user.username"
                type="text"
                placeholder="Usuario"
                ></b-form-input>
                </b-form-group>
                <b-form-group>
                <b-form-input
                v-model="user.email"
                type="text"
                placeholder="correo"
                ></b-form-input>
                </b-form-group>
                <b-form-group>
                <b-form-input
                v-model="proyectista.cargo"
                type="text"
                placeholder="nombre"
                ></b-form-input>
                </b-form-group>
          </form>
      </div>
    </b-modal>
      </b-container>
    </div>
  
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
name:"rhuman",
data(){
    return{
        horasXmes:9,
        items:[],
        fields:[
            { key: 'number', label: '#' },
            { key:'nombre', labels:'Nombre',sortable: true, sortDirection: 'desc'},
            { key:'cargo', labels:'Cargo',sortable: true, sortDirection: 'desc'},
            { key:'escala_salarial', labels:'Escala Salarial',sortable: true, sortDirection: 'desc'},
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
        proyectista:{},
        user:{}
        
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
              this.items = res.data;
              this.totalRows = this.items.length
          }).catch(err=>{
              this.isBusy=false;
              console.log(err); 
          })
      },
      getTotales()
      {
        // obtener todos los totales
     
             let con = this.items;
            //  console.log(con)
             var total=0;           
             for (let index = 0; index < con.length; index++) {
               const totalcon = con[index];
              total += totalcon.coeficiente
             }
              // console.log(total)                  

       
      },
      gethoras(mes,anno){
        let em =this;
        let month =new Date().getMonth()
        let year =new Date().getFullYear()
        this.$api.post('fechas/month_hours',{mes:month+1,anno:year}).then(function (response) {
              em.horasXmes=response.data.hours
        })
        .catch(function (error) {
        console.log(error);
        });
        },      
      deleteUser(item)
      {
        this.$swal({
          title: 'Eliminar usuario?',
          text: "Está seguro de querer eliminar al usuario "+item.username+"!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar!'
        }).then((result) => {
          if (result.value) {
              let url='/proyectista/'+item.id;
              this.$api.delete(url,{
                  headers:{
                      'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                  }
              }).then(res=>{
                  this.$swal({title:"Correcto",type:'success',text:'Proyectista eliminado correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                  this.getData();
              }).catch(error=>{
                  this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
              })
          }
        })
      },
      edit(item) {
        console.log(item);
        this.infoModal.title = `Editar Usuario: ${item.nombre}`
        this.infoModal.content = '';
        this.proyectista=item;
        console.log(this.proyectista.cargo)
           this.$api.get("/user/"+item.UsuarioId,{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{
            console.log(res.data);
            this.user=res.data;
            this.$root.$emit('bv::show::modal', this.infoModal.id);
          }).catch(err=>{
              console.log(err); 
          })
      },
      editarUser(event){
        event.preventDefault();
        this.$root.$emit('bv::show::modal', this.infoModal.id);
        console.log(this.$event);
        alert('si');
      },
       resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      // sal_descuento(){
      //     this.getData();
      //     let salario = (salario_basico/190.6)*180
      //     return salario
      // }
    },
  mounted() {
     this.getData();
     this.getTotales();
    //  this.formatedDate();
     this.gethoras();
  }
    
}
</script>