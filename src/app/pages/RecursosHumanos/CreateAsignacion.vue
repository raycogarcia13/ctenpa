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
            <el-dialog :visible.sync="visible" title="Insertar Proyectos al equipo">
                <b-form>
                    <b-row>
                        <div class="col-md-6">
                            <b-form-group
                                    label="Insertar proyectos al equipo:"
                                    label-for="funcion"
                            >
                            </b-form-group>

                            <b-form-group
                                    label="Elige el Proyecto:"
                                    label-for="SubProyectoId">
                                <b-form-select
                                        id="SubProyectoId"
                                        v-model.number="asignacion.SubProyectoId"
                                        :options="subproyectoSelect()"
                                        required
                                ></b-form-select>
                            </b-form-group>
                            <b-form-group
                                    label="Equipo al que Pertenece:"
                                    label-for="EquipoId">
                                <b-form-select
                                        id="EquipoId"
                                        v-model.number="asignacion.EquipoId"
                                        :options="equipoSelect()"
                                        required
                                ></b-form-select>
                            </b-form-group>
                            <hr>
                            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                            <b-button @click="crear" class="btn-success pull-right">Crear Equipo</b-button>
                        </div>
                        <div class="col-md-6 justify-content-center border-danger" v-if="enviado===true">
                          <span class="text-red ">
                                {{err[0]}}
                          </span>
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
                    <b-row>
                        <div class="col-md-12">
                            <b-form-group
                                    label="Insertar proyectos al equipo:"
                                    label-for="funcion"
                            >
                            </b-form-group>

                            <b-form-group
                                    label="Elige el Proyecto:"
                                    label-for="SubProyectoId">
                                <b-form-select
                                        id="SubProyectoId"
                                        v-model.number="asignacion.SubProyectoId"
                                        :options="subproyectoSelect()"
                                        required
                                ></b-form-select>
                            </b-form-group>
                            <b-form-group
                                    label="Equipo al que Pertenece:"
                                    label-for="EquipoId">
                                <b-form-select
                                        id="EquipoId"
                                        v-model.number="asignacion.EquipoId"
                                        :options="equipoSelect()"
                                        required
                                ></b-form-select>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 justify-content-center border-danger" v-if="enviado===true">
                          <span class="text-red ">
                                {{err[0]}}
                          </span>
                        </div>
                    </b-row>
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
                asignacion:{id:'',EquipoId:'',SubProyectoId:''},
                subproyecto:[],
                listequipo:[],
                items:[],
                fields:[{key: 'number', label: '#'},
                       { key:'equipo', labels:'Equipo',sortable: true, sortDirection: 'desc'},
                       { key:'proyecto', labels:'Subproyectos',sortable: true, sortDirection: 'desc'},
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
                enviado:false,
                err:[],
                llenado:false
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
            validar(){
                if (this.asignacion.EquipoId===null||this.asignacion.SubProyectoId===null)
                    return this.llenado=true;
                else
                    return this.llenado=false;
            },

            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            getData()
            {
                this.isBusy=true;
                this.$api.get("/asignacion/",{
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
                console.log(this.asignacion);
                this.validar();
                if (this.llenado===true){
                    this.$swal({title:"Incorrecto",type:'error',text:'Formulario incorrecto por favor corríjalo',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                } else
                this.$api.post('/asignacion/',this.asignacion,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    // return console.log(res.data);
                    this.cargando=false;
                    if (res.data.errores==="SI") {
                        this.enviado=true;
                        this.err.push(res.data.nombre);
                        this.$swal({title:"Incorrecto",type:'error',text:res.data.nombre,toast:true,position:'top-end',showConfirmButton:false,timer:5000});
                    }
                    else
                    {
                        this.getData();
                        this.$swal({title:"Correcto",type:'success',text:'Asignación insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    }

                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });

            },
            edit(item) {
                this.infoModal.title = `Editar Asignación: ${item.equipo}`;
                this.infoModal.content = '';
                this.asignacion=item;
                this.$root.$emit('bv::show::modal', this.infoModal.id);
                // return console.log(this.asignacion);
            },
            editarUser(event){
                event.preventDefault();
                // return console.log(this.asignacion);
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/asignacion/'+this.asignacion.id,this.asignacion,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                        }).then(res=>{
                            this.cargando=false;
                    if (res.data.errores==="SI") {
                        this.enviado=true;
                        this.err.push(res.data.nombre);
                        this.$swal({title:"Incorrecto",type:'error',text:res.data.nombre,toast:true,position:'top-end',showConfirmButton:false,timer:5000});
                    }
                    else
                    {
                        this.getData();
                        this.$swal({title:"Correcto",type:'success',text:'Asignación insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    }
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
            getSubProyecto(){
                this.$api.get("/subproyecto").then(res=>{
                    this.subproyecto=res.data;
                    this.asignacion.SubProyectoId=null;
                }).catch(err=>{})
            },
            getEquipos(){
                this.$api.get("/equipo").then(res=>{
                    this.listequipo=res.data;
                    this.asignacion.EquipoId=null;
                }).catch(err=>{})
            },
            subproyectoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.subproyecto.forEach(function(element) {
                    opt.push({text:element.Proyecto.nombre +'-' + element.codigo,value:element.id});
                });
                return opt;
            },
            equipoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.listequipo.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar usuario?',
                    text: "Está seguro de querer eliminar al usuario "+item.equipo+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/asignacion/'+item.id;
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
            this.getSubProyecto();
            this.getData();
            this.getEquipos();
        }
    }
</script>

<style scoped>

</style>
