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
            <template v-slot:cell(Estado.estado)="data">
                <span v-html="formatedEstado(data.value)"></span>
            </template>
            <template v-slot:cell(terminado)="data">
                <span v-html="formatedTerminado(data.value)"></span>
            </template>
            <template v-slot:cell(actions)="row" class="center-block center center-align text-justify">
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
                        <li>Estado del sub proyecto <p v-if="row.item.terminado===true"><span class="badge badge-success">Terminado</span></p> <p v-else><span class="badge badge-info">En Ejecución</span></p> </li>
                        <li>Estado de Aprobación: {{row.item.Estado.estado}} </li>
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

        <div class="pt-2">
            <el-button @click="visible = true" class="btn btn-outline-info">Insertar</el-button>
            <el-dialog :visible.sync="visible" title="Insertar Proyecto">
                <b-form>
                    <b-row>
                        <div class="col-md-12">
                            <label class="text-black-50 text-capitalize">Del Proyecto:</label>

                                <div>
                                    <b-form-group
                                            label="Código:"
                                            label-for="codigo"
                                    >
                                        <b-form-input
                                                id="num_contrato"
                                                v-model="proyecto.codigo"
                                                type="text"
                                                required
                                                placeholder="#contrato+año_contrato+CT"
                                        >

                                        </b-form-input>
                                    </b-form-group>
                                </div>


                            <b-form-group
                                    label="Nombre:"
                                    label-for="nombre"
                            >
                                <b-form-input
                                        id="nombre"
                                        v-model="proyecto.nombre"
                                        type="text"
                                        required
                                        placeholder="Nombre"
                                >

                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Valor Total del Proyecto:"
                                    label-for="valor_total"
                            >
                                <b-form-input
                                        id="valor_total"
                                        v-model.number="proyecto.valor_total"
                                        type="text"
                                        required
                                        placeholder="Valor Total"
                                >
                                </b-form-input>
                            </b-form-group>

                            <b-form-group
                                    label="Descripción:"
                                    label-for="descripcion"
                            >
                                <b-form-textarea
                                        id="textarea"
                                        v-model="proyecto.descripcion"
                                        placeholder="agregar una descripción"
                                        rows="3"
                                        max-rows="6"
                                ></b-form-textarea>

                            </b-form-group>
                            <b-form-group
                                    label="Proyecto"
                                    label-for="activo"
                            >
                                <b-form-checkbox v-model="proyecto.terminado" name="check-button" button button-variant="info">
                                    Terminado => <b v-if="proyecto.terminado===true">SI</b> <b v-else>NO</b>
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group
                                    label="Contrato:"
                                    label-for="Contrato">
                                <b-form-select
                                        id="ContratoId"
                                        v-model.number="proyecto.ContratoId"
                                        :options="contratoSelect()"
                                ></b-form-select>
                            </b-form-group>
                            <b-form-group
                                    label="Estado:"
                                    label-for="EstadoId">
                                <b-form-select
                                        id="EstadoId"
                                        v-model.number="proyecto.EstadoId"
                                        :options="estadoSelect()"
                                ></b-form-select>
                            </b-form-group>
                            <hr>
                            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                            <b-button @click="crear" class="btn-success pull-right">Crear Proyecto</b-button>
                        </div>
                    </b-row>
                </b-form>
            </el-dialog>
        </div>

        <!-- Info modal -->
        <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarProyecto" @hide="resetInfoModal">
            <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
            <div v-else>
                <form>
                    <div class="col-md-12">
                        <label class="text-black-50 text-capitalize">Del Proyecto:</label>
                        <div>
                            <b-form-group
                                    label="Código:"
                                    label-for="codigo"
                            >
                                <b-form-input
                                        id="num_contrato"
                                        v-model="proyecto.codigo"
                                        type="text"
                                        required
                                        placeholder="#contrato+año_contrato+CT"
                                >

                                </b-form-input>
                            </b-form-group>
                        </div>

                        <b-form-group
                                label="Nombre:"
                                label-for="nombre"
                        >
                            <b-form-input
                                    id="nombre"
                                    v-model="proyecto.nombre"
                                    type="text"
                                    required
                                    placeholder="Nombre"
                            >

                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Valor Total del Proyecto:"
                                label-for="valor_total"
                        >
                            <b-form-input
                                    id="valor_total"
                                    v-model.number="proyecto.valor_total"
                                    type="text"
                                    required
                                    placeholder="Valor Total"
                            >
                            </b-form-input>
                        </b-form-group>

                        <b-form-group
                                label="Descripción:"
                                label-for="descripcion"
                        >
                            <b-form-textarea
                                    id="textarea"
                                    v-model="proyecto.descripcion"
                                    placeholder="agregar una descripción"
                                    rows="3"
                                    max-rows="6"
                            ></b-form-textarea>

                        </b-form-group>
                        <b-form-group
                                label="Proyecto"
                                label-for="activo"
                        >
                            <b-form-checkbox v-model="proyecto.terminado" name="check-button" button button-variant="info">
                                Terminado => <b v-if="proyecto.terminado===true">SI</b> <b v-else>NO</b>
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group
                                label="Contrato:"
                                label-for="Contrato">
                            <b-form-select
                                    id="ContratoId"
                                    v-model.number="proyecto.ContratoId"
                                    :options="contratoSelect()"
                            ></b-form-select>
                        </b-form-group>
                        <b-form-group
                                label="Estado:"
                                label-for="EstadoId">
                            <b-form-select
                                    id="EstadoId"
                                    v-model.number="proyecto.EstadoId"
                                    :options="estadoSelect()"
                            ></b-form-select>
                        </b-form-group>
                        <hr>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateContrato",
        data(){
            return{
                visible: false,
                proyecto:{id:'',codigo:'', nombre:'',valor_total:'',descripcion:'',terminado:true,  ContratoId:'',EstadoId:''},
                // proyecto:{id:'', num_contrato:'',anno_contrato:'',cod_ct:'', nombre:'',valor_total:'',descripcion:'',terminado:true,  ContratoId:'',EstadoId:''},
                contrato:[],
                estados:[],
                items:[],
                fields:[{key: 'number', label: '#'},
                    { key:'nombre', labels:'Nombre del Proyecto',sortable: true, sortDirection: 'desc'},
                    { key:'codigo', labels:'Código',sortable: true, sortDirection: 'desc'},
                    { key:'valor_total', labels:'Valor',sortable: true, sortDirection: 'desc'},
                    { key:'descripcion', labels:'Descripción',sortable: true, sortDirection: 'desc'},
                    { key:'terminado', labels:'Descripción',sortable: true, sortDirection: 'desc'},
                    { key:'Contrato.nombre', labels:'Contrato',sortable: true, sortDirection: 'desc'},
                    { key:'Estado.estado', labels:'Estado',sortable: true, sortDirection: 'desc'},
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
                this.$api.get("/proyecto/",{
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
                this.$api.post('/proyecto/',this.proyecto,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getData();
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // this.getClientes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getContrato(){
                this.$api.get("/contrato").then(res=>{
                    this.contrato=res.data;
                    this.proyecto.ContratoId=null;
                }).catch(err=>{})
            },
            getEstados(){
                this.$api.get("/estados").then(res=>{
                    this.estados=res.data;
                    this.proyecto.EstadoId=null;
                }).catch(err=>{})
            },
            contratoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.contrato.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            estadoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.estados.forEach(function(element) {
                    opt.push({text:element.estado,value:element.id});
                });
                return opt;
            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar Subproyecto?',
                    text: "Está seguro de querer eliminar el subproyecto "+item.username+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/proyecto/'+item.id;
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
            formatedEstado(data)
            {
                if(data=='APROBADO')
                    return '<span class="badge badge-success">'+data+'</span>';
                if(data=='EN ESPERA')
                    return '<span class="badge badge-danger">'+data+'</span>';
                if(data=='TERMINADO')
                    return '<span class="badge badge-info">'+data+'</span>';
                return data;
            },
            formatedTerminado(data)
            {
                if(data==true)
                    return '<span class="badge badge-success">Terminado</span>';
                if(data==false)
                    return '<span class="badge badge-danger">En Ejecución</span>';
                return data;
            },

            edit(item) {
                this.infoModal.title = `Editar Equipo: ${item.nombre}`;
                this.infoModal.content = '';
                this.proyecto=item;
                this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarProyecto(event){
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/proyecto/'+this.proyecto.id,this.proyecto,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getData();
                    this.$swal({title:"Correcto",type:'success',text:'Proyecto actualizado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
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
            this.getContrato();
            this.getEstados();
            this.getData();
        }
    }
</script>

<style scoped>

</style>
