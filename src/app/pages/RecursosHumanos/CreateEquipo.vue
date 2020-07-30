<template>
    <div>
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
            <template v-slot:cell(actions)="row" class="center-block center center-align text-justify">
                <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i class="fa fa-edit"></i> </b-button>
                <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i class="fa fa-trash"></i> </b-button>
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
        <div class="pt-2">
            <el-button @click="visible = true" class="btn btn-outline-info">Insertar</el-button>
            <el-dialog :visible.sync="visible" title="Insertar Equipo">
                <b-form>
                    <b-row>
                        <div class="col-md-6">
                            <b-form-group
                                    label="Nombre:"
                                    label-for="nombre"
                            >
                                <b-form-input
                                        id="nombre"
                                        v-model="equipo.nombre"
                                        type="text"
                                        required
                                        placeholder="Nombre del equipo"
                                >
                                </b-form-input>
                            </b-form-group>
                                <b-form-group
                                        label="Codigo:"
                                        label-for="codigo"
                                >
                                    <b-form-input
                                            id="codigo"
                                            v-model="equipo.codigo"
                                            type="text"
                                            required
                                            placeholder="Codigo del equipo"
                                    >

                                    </b-form-input>
                            </b-form-group>
<!--                            <b-form-group-->
<!--                                    label="Elige el Proyectista:"-->
<!--                                    label-for="TrabajadorId">-->
<!--                                <b-form-select-->
<!--                                        id="ContratoId"-->
<!--                                        v-model.number="equipo.TrabajadorId"-->
<!--                                        :options="trabajadorSelect()"-->
<!--                                ></b-form-select>-->
<!--                            </b-form-group>-->
<!--                            <b-form-group-->
<!--                                    label="Subproyecto al que Pertenece:"-->
<!--                                    label-for="SubProyectoId">-->
<!--                                <b-form-select-->
<!--                                        id="SubProyectoId"-->
<!--                                        v-model.number="equipo.SubProyectoId"-->
<!--                                        :options="subproyectoSelect()"-->
<!--                                ></b-form-select>-->
<!--                            </b-form-group>-->
                            <hr>
                            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                            <b-button @click="crear" class="btn-success pull-right">Crear Equipo</b-button>
                        </div>
                    </b-row>
                </b-form>
            </el-dialog>
        </div>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser" @hide="resetInfoModal">
            <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
            <div v-else>
                <form>
                    <b-form-group> <b-form-input
                            v-model="equipo.nombre"
                            type="text"
                            placeholder="Nombre"
                    ></b-form-input></b-form-group><b-form-group>
                    <b-form-input
                            v-model="equipo.codigo"
                            type="text"
                            placeholder="Codigo"
                    ></b-form-input></b-form-group>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateEquipo",
        data(){
            return{
                visible: false,
                equipo:{id:'',nombre:'',codigo:''},
                subproyecto:[],
                trabajador:[],
                items:[],
                fields:[{key: 'number', label: '#'},
                       { key:'nombre', labels:'Nombre',sortable: true, sortDirection: 'desc'},
                       { key:'codigo', labels:'Codigo del equipo',sortable: true, sortDirection: 'desc'},
                       { key:'actions', labels:'Acciones',sortable: true, sortDirection: 'desc'}],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
                isBusy:false,
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
            getData()
            {
                this.isBusy=true;
                this.$api.get("/equipo/",{
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
            crear(){
                this.$api.post('/equipo/',this.equipo,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getData();
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });

            },
            edit(item) {
                this.infoModal.title = `Editar Equipo: ${item.nombre}`;
                this.infoModal.content = '';
                this.equipo.id=item.id,
                this.equipo.nombre=item.nombre,
                this.equipo.codigo=item.codigo,
                this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event){
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/equipo/'+this.equipo.id,this.equipo,{
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

            getTrabajador(){
                this.$api.get("/proyectista").then(res=>{
                    this.trabajador=res.data;
                    this.equipo.TrabajadorId=null;
                }).catch(err=>{})
            },
            getSubProyecto(){
                this.$api.get("/subproyecto").then(res=>{
                    this.subproyecto=res.data;
                    this.equipo.SubProyectoId=null;
                }).catch(err=>{})
            },
            trabajadorSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.trabajador.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            subproyectoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.subproyecto.forEach(function(element) {
                    opt.push({text:element.codigo,value:element.id});
                });
                return opt;
            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar usuario?',
                    text: "Está seguro de querer eliminar al usuario "+item.nombre+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/equipo/'+item.id;
                        this.$api.delete(url,{
                            headers:{
                                'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res=>{
                            this.$swal({title:"Correcto",type:'success',text:'Equipo eliminado correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                            this.getData();
                        }).catch(error=>{
                            this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                        })
                    }
                })
            },
        },
        created() {
            this.getTrabajador();
            this.getSubProyecto();
            this.getData();
        }
    }
</script>

<style scoped>

</style>
