<template>
    <div>
        <b-form>
            <h1>Insertar area</h1>
            <b-row >
                <div class="col-md-6">
                    <b-form-group
                            label="Código del Área:"
                            label-for="codigo"
                            :class='{ "has-error":errors.codigo.status==false}'
                    >
                        <b-form-input
                                id="codigo"
                                v-model="area.codigo"
                                type="text"
                                required
                                placeholder="Código"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.codigo.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.codigo.status" :state="validar" class="text-center">
                            {{errors.codigo.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                            label="Nombre:"
                            label-for="nombre"
                            :class='{ "has-error":errors.nombre.status==false}'
                    >
                        <b-form-input
                                id="nombre"
                                v-model="area.nombre"
                                type="text"
                                required
                                placeholder="Nombre del área"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.nombre.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.nombre.status" :state="validar" class="text-center">
                            {{errors.nombre.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <hr>
                    <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                    <b-button @click="crear" class="btn-success pull-right">Crear Área</b-button>

                </div>
                <div class="col-md-6">
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
                                    label="Listado"
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
                                    <li> Código: {{ row.item.codigo }}</li>
                                    <li> Nombre: {{ row.item.nombre }}</li>
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
                </div>
            </b-row>


            <div v-if="cargando" class="text-center">
                <b-spinner class="align-middle text-success"></b-spinner>
            </div>
        </b-form>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser" @hide="resetInfoModal">
            <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
            <div v-else>
                <form>
                    <b-form-group> <b-form-input
                            v-model="area.codigo"
                            type="text"
                            placeholder="Nombre"
                    ></b-form-input></b-form-group><b-form-group>
                    <b-form-input
                            v-model="area.nombre"
                            type="text"
                            placeholder="nombre"
                    ></b-form-input></b-form-group>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateAreas",
        data() {
            return {
                items:[],
                fields:[
                    { key: 'number', label: '#' },
                    { key:'codigo', labels:'Código',sortable: true, sortDirection: 'desc'},
                    { key:'nombre', labels:'Nombre del Área',sortable: true, sortDirection: 'desc'},
                    { key:'actions', labels:'Acciones',sortable: true, sortDirection: 'desc'}
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
                isBusy:false,
                area:{id:'',codigo:'',nombre:'',},
                error:null,
                errors:{
                    codigo:{status:null,msg:""},
                    nombre:{status:null,msg:""},
                },
                cargando:false
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
                    });
            },
            validar()
            {
                return !this.error;
            },
            // cargar()
            // {
            //    return  this.cargando=!this.cargando;
            // }
        },
        methods:{

            ...mapMutations(['toogleSidebar']),
            ...mapActions(['signout']),

            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            getAreas()
            {
                this.isBusy=true;
                this.$api.get("/area/",{
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

            crear()
            {
                this.validateAll();
                // if(this.error)
                // {
                //     this.$swal({title:"Error ",type:'error',text:"El formulario contiene errores, por favor revíselo.",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                //     return;
                // }

                this.cargando=true;
                this.$api.post('/area',this.area,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.area);
                    this.$swal({title:"Correcto",type:'success',text:'Área insertada correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.getAreas();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },

            validateAll(){
                this.clear();
                if(this.area.codigo==='')
                {
                    this.errors.codigo.status=false;
                    this.errors.codigo.msg="Este campo  es obligaorio y deben ser mas de 3 caracteres";
                    this.error=true;
                }

                if(this.area.nombre==='')
                {
                    this.errors.nombre.status=false;
                    this.errors.nombre.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }
            },

            clear(){
                this.errors.codigo.status=true;
                this.errors.nombre.status=true;
                this.nombre='';
                this.codigo='';
            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar Especialidad?',
                    text: "Está seguro de querer eliminar al usuario "+item.nombre+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/area/'+item.id;
                        this.$api.delete(url,{
                            headers:{
                                'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res=>{
                            this.$swal({title:"Correcto",type:'success',text:'Especialidad eliminada correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                            this.getAreas();
                        }).catch(error=>{
                            this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                        })
                    }
                })
            },
            edit(item) {
                this.infoModal.title = `Editar Área: ${item.nombre}`;
                this.infoModal.content = '';
                this.area=item;
                    this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event){
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/area/'+this.area.id,this.area,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getAreas();
                    this.$swal({title:"Correcto",type:'success',text:'Área actualizado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
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
        // terminan los metodos
        mounted() {
            this.getAreas();
        }

    }
</script>

<style scoped>

</style>
