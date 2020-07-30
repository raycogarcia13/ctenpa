<template>
    <div>
        <b-form>
            <b-row>

                <div class="col-md-12">
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

                        <template v-slot:cell(activo)="data">
                            <span v-html="formatedActivos(data.value)"></span>
                        </template>


                        <template v-slot:cell(actions)="row" class="center-block center center-align text-justify">
                            <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i
                                    class="fa fa-edit"></i></b-button>
                            <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i
                                    class="fa fa-trash"></i></b-button>
                        </template>
                        <!-- detalles de la fila -->

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
            </b-row>
        </b-form>
        <div class="pt-2">
            <el-button @click="visible = true" class="btn btn-outline-info">Insertar</el-button>
            <el-dialog :visible.sync="visible" title="Insertar Contrato">
                <b-form>
                    <b-row>
                        <div class="col-md-12">
                            <b-form-group
                                    label="Nombre:"
                                    label-for="nombre"
                            >
                                <b-form-input
                                        id="nombre"
                                        v-model="contrato.nombre"
                                        type="text"
                                        required
                                        placeholder="Nombre"
                                >

                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Número:"
                                    label-for="numero"
                            >
                                <b-form-input
                                        id="numero"
                                        v-model.number="contrato.numero"
                                        type="text"
                                        required
                                        placeholder="Número"
                                >
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Fecha Inicio:"
                                    label-for="fecha_inicio"
                            >
                                <datepicker :bootstrap-styling="true"
                                            input-class="form-control"
                                            :format="customFormatter"
                                            v-model="contrato.fecha_inicio"
                                            :language="es">

                                </datepicker>
                            </b-form-group>
                            <b-form-group
                                    label="Fecha Cierre:"
                                    label-for="fecha_cierre"
                            >
                                <datepicker :bootstrap-styling="true"
                                            input-class="form-control"
                                            :format="customFormatter"
                                            v-model="contrato.fecha_cierre"
                                            :language="es">
                                </datepicker>
                            </b-form-group>

                            <b-form-group
                                    label="Código Tratos:"
                                    label-for="cod_tratos"
                            >
                                <b-form-input
                                        id="cod_tratos"
                                        v-model.number="contrato.codigo_tratos"
                                        type="text"
                                        required
                                        placeholder="Código de tratos">

                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Activo?"
                                    label-for="activo"
                            >
                                <b-form-checkbox v-model="contrato.activo" name="check-button" button button-variant="info">
                                    Activo? <b v-if="contrato.activo===false">No</b> <b v-else>Si</b>
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group
                                    label="Cliente:"
                                    label-for="Cliente">
                                <b-form-select
                                        id="ClienteId"
                                        v-model.number="contrato.ClienteId"
                                        :options="clienteSelect()"
                                ></b-form-select>
                            </b-form-group>
                            <hr>
                            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                            <b-button @click="crear" class="btn-success pull-right">Crear Contrato</b-button>
                        </div>
                    </b-row>
                </b-form>
            </el-dialog>
    </div>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarContrato" @hide="resetInfoModal">
            <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
            <div v-else>
                <form>
                    <div class="col-md-12">
                        <b-form-group
                                label="Nombre:"
                                label-for="nombre"
                        >
                            <b-form-input
                                    id="nombre"
                                    v-model="contrato.nombre"
                                    type="text"
                                    required
                                    placeholder="Nombre"
                            >

                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Número:"
                                label-for="numero"
                        >
                            <b-form-input
                                    id="numero"
                                    v-model.number="contrato.numero"
                                    type="text"
                                    required
                                    placeholder="Número"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Fecha Inicio:"
                                label-for="fecha_inicio"
                        >
                            <datepicker :bootstrap-styling="true"
                                        input-class="form-control"
                                        :format="customFormatter"
                                        v-model="contrato.fecha_inicio"
                                        :language="es">

                            </datepicker>
                        </b-form-group>
                        <b-form-group
                                label="Fecha Cierre:"
                                label-for="fecha_cierre"
                        >
                            <datepicker :bootstrap-styling="true"
                                        input-class="form-control"
                                        :format="customFormatter"
                                        v-model="contrato.fecha_cierre"
                                        :language="es">
                            </datepicker>
                        </b-form-group>

                        <b-form-group
                                label="Código Tratos:"
                                label-for="cod_tratos"
                        >
                            <b-form-input
                                    id="cod_tratos"
                                    v-model.number="contrato.codigo_tratos"
                                    type="text"
                                    required
                                    placeholder="Código de tratos">

                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Activo?"
                                label-for="activo"
                        >
                            <b-form-checkbox v-model="contrato.activo" name="check-button" button button-variant="info">
                                Activo? <b v-if="contrato.activo===false">No</b> <b v-else>Si</b>
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group
                                label="Cliente:"
                                label-for="Cliente">
                            <b-form-select
                                    id="ClienteId"
                                    v-model.number="contrato.ClienteId"
                                    :options="clienteSelect()"
                            ></b-form-select>
                        </b-form-group>
                    </div>

                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import { es } from 'vuejs-datepicker/dist/locale'
    export default {
        components: {
            Datepicker
        },
        name: "CreateContrato",
        data(){
            return{
                visible: false,
                es:es,
                contrato:{ id:'',nombre:'', numero:'', fecha_inicio:'', fecha_cierre:'',codigo_tratos:'', activo:false, ClienteId:''},
                cliente:[],
                items: [],
                fields:[
                    { key:'nombre', labels:'Código',sortable: true, sortDirection: 'desc'},
                    { key:'numero', labels:'Actividades',sortable: true, sortDirection: 'desc'},
                    { key:'fecha_inicio', labels:'Fecha_inicio',sortable: true, sortDirection: 'desc'},
                    { key:'fecha_cierre', labels:'Fecha_cierre',sortable: true, sortDirection: 'desc'},
                    { key:'codigo_tratos', labels:'Código Tratos',sortable: true, sortDirection: 'desc'},
                    { key:'activo', labels:'Activos',sortable: true, sortDirection: 'desc'},
                    { key:'actions', labels:'Acciones',sortable: true, sortDirection: 'desc'}],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
                isBusy: false,
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
            }
        },
        computed:{
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
                    });
            },
        },
        methods:{
            ...mapMutations(['toogleSidebar']),
            ...mapActions(['signout']),

            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            crear(){
                this.$api.post('/contrato/',this.contrato,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.getData();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getData(){
                this.$api.get('/contrato/',{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.isBusy = false;
                    this.cargando=false;
                    this.items=res.data;
                    this.$swal({title:"Correcto",type:'success',text:'Datos Obtenidos correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.totalRows = this.items.length;
                }).catch(error=>{
                    this.isBusy = false;
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });
            },
            getClientes(){
                this.$api.get("/cliente").then(res=>{
                    this.cliente=res.data;
                    this.contrato.ClienteId=null;
                }).catch(err=>{})
            },
            clienteSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.cliente.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            customFormatter(date) {
                // let f=moment(date).format('D MMMM YYYY');
                let fort = moment(date).format('DD MM YYYY');
                // this.produccion.anno = ft.substr(-4);
                // this.produccion.mes = ft.substr(2,4);
                return fort;
            },
            formatedActivos(data){
                if(data==true){
                    return '<span class="badge badge-success">SI</span>';
                }else{
                if(data==false)
                    return '<span class="badge badge-danger">NO</span>';
                }
                return data;
            },
            edit(item) {
                this.infoModal.title = `Editar Contrato: ${item.nombre}`;
                this.infoModal.content = '';
                this.contrato=item;
                    // this.contrato.nombre=item.nombre,
                    // this.contrato.codigo=item.numero,
                    this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarContrato(event){
                event.preventDefault();
                // return alert(this.contrato.id);
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/contrato/'+this.contrato.id,this.contrato,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getData();
                    this.$swal({title:"Correcto",type:'success',text:'Equipo actualizado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });
                console.log(event);
                // alert('si');
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = '';
            },
        },
        created(){
            this.getClientes();
            this.getData();
        }
    }
</script>

<style scoped>

</style>
