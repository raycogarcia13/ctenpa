<template>
    <div>
        <b-form>
            <h3>Insertar Especialidad</h3>
            <b-row class="mt-5">
                <div class="col-md-6">
                    <b-form-group
                            label="Código de la Especialidad:"
                            label-for="codigo"
                            :class='{ "has-error":errors.codigo.status==false}'
                    >
                        <b-form-input
                                id="codigo"
                                v-model="espec.codigo"
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
                            label="Especialidad:"
                            label-for="especialidad"
                            :class='{ "has-error":errors.especialidad.status==false}'
                    >
                        <b-form-input
                                id="nombre"
                                v-model="espec.especialidad"
                                type="text"
                                required
                                placeholder="Breve descripción del usuario"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.especialidad.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.especialidad.status" :state="validar" class="text-center">
                            {{errors.especialidad.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <hr>
                    <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                    <b-button @click="crearE" class="btn-success pull-right">Crear Especialidad</b-button>
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
                                    <li> Especialidad: {{ row.item.especialidad }}</li>
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
            </b-row>


            <div v-if="cargando" class="text-center">
                <b-spinner class="align-middle text-success"></b-spinner>
            </div>
        </b-form>
        <hr>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser" @hide="resetInfoModal">
            <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
            <div v-else>
                <form>
                    <b-form-group> <b-form-input
                            v-model="espec.especialidad"
                            type="text"
                            placeholder="Especialidad"
                    ></b-form-input></b-form-group><b-form-group>
                    <b-form-input
                            v-model="espec.codigo"
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
        name: "CreateEspecialidad",
        data() {
            return {
                items:[],
                fields:[
                    { key: 'number', label: '#' },
                    { key:'codigo', labels:'Código',sortable: true, sortDirection: 'desc'},
                    { key:'especialidad', labels:'Especialidad',sortable: true, sortDirection: 'desc'},
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

                espec:{especialidad:'',codigo:''},
                error:null,
                errors:{
                    especialidad:{status:null,msg:""},
                    codigo:{status:null,msg:""},
                },
                cargando:false
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
            validar()
            {
                return !this.error;
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
            getEspecialidad()
            {
                this.isBusy=true;
                this.$api.get("/especialidad/",{
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

            crearE()
            {
                this.validateAll();
                // try {
                //     if(this.error)
                //     {
                //         this.$swal({title:"Error ",type:'error',text:"El formulario contiene errores, por favor revíselo."+ this.especialidad.codigo + this.especialidad.especialidad,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                //         return;
                //     }
                // }catch(e)
                // {
                //     alert(e)
                // }
                this.cargando=true;
                this.$api.post('/especialidad/',this.espec,{

                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    console.log(this.espec);
                    this.cargando=false;
                    this.$swal({title:"Correcto",type:'success',text:'Área insertada correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.getEspecialidad();
                }).catch(error=>{
                    console.log(this.espec);
                    this.$swal({title:"Error ",type:'error',text:"Existen errores en el formulario",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });
                this.clear();
                this.clearFields();
            },

            validateAll(){
                this.clear();
                if(this.espec.codigo==='')
                {
                    this.errors.codigo.status=false;
                    this.errors.codigo.msg="Este campo  es obligaorio y deben ser mas de 3 caracteres";
                    this.error=true;
                }

                if(this.espec.especialidad==='')
                {
                    this.errors.especialidad.status=false;
                    this.errors.especialidad.msg="Este campo  es obligaorio y deben ser mas de 3 caracteres";
                    this.error=true;
                }
            },

            clear(){
                this.errors.codigo.status=true;
                this.errors.especialidad.status=true;
            },
            clearFields(){
                this.codigo='';
                this.especialidad='';
            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar Especialidad?',
                    text: "Está seguro de querer eliminar al usuario "+item.especialidad+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/especialidad/'+item.id;
                        this.$api.delete(url,{
                            headers:{
                                'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res=>{
                            this.$swal({title:"Correcto",type:'success',text:'Especialidad eliminada correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                            this.getEspecialidad();
                        }).catch(error=>{
                            this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                        })
                    }
                })
            },
            edit(item) {
                this.infoModal.title = `Editar Especialidad: ${item.especialidad}`;
                this.infoModal.content = '';
                this.espec=item;
                this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event){
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/especialidad/'+this.espec.id,this.espec,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getEspecialidad();
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
        // terminan los metodos
        mounted() {
            this.getEspecialidad();
        }

    }
</script>

<style scoped>

</style>
