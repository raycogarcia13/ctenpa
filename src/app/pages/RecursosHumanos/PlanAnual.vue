<template>
    <div>
        <b-form>
            <h1>Insertar Plan Anual</h1>
            <b-row >
                <div class="col-md-6">
<!--                    <b-form-group-->
<!--                            label="Año:"-->
<!--                            label-for="anno"-->
<!--                            :class='{ "has-error":errors.anno.status==false}'-->
<!--                    >-->
<!--                        <b-form-input-->
<!--                                id="nombre"-->
<!--                                v-model="produccion.anno"-->
<!--                                type="text"-->
<!--                                required-->
<!--                                placeholder="Año"-->
<!--                                @change="validateAll()"-->
<!--                                :disabled="cargando"-->
<!--                                :state="errors.anno.status"-->
<!--                        ></b-form-input>-->
<!--                        <b-form-invalid-feedback v-if="!errors.anno.status" :state="validar" class="text-center">-->
<!--                            {{errors.anno.msg}}-->
<!--                        </b-form-invalid-feedback>-->
<!--                    </b-form-group>-->
                    <b-form-group
                            label="Plan:"
                            label-for="plan"
                            :class='{ "has-error":errors.plan.status==false}'
                    >
                        <b-form-input
                                id="plan"
                                v-model="produccion.plan"
                                type="text"
                                required
                                placeholder="plan del mes"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.plan.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.plan.status" :state="validar" class="text-center">
                            {{errors.plan.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>


                    <b-form-group id="input-group-3" label="Empresa:" label-for="area" :class='{ "has-error":errors.EmpresaId.status==false}'>
                        <b-form-select
                                id="areas"
                                v-model.number="produccion.EmpresaId"
                                :options="empresaSelect()"
                                @change="validateAll()"
                                :state="errors.EmpresaId.status"
                                :disabled="cargando"
                        ></b-form-select>
                        <b-form-invalid-feedback v-if="!errors.EmpresaId.status" :state="validar" class="text-center">
                            {{errors.EmpresaId.msg}}
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
                            <!--                            <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i class="fa fa-edit"></i> </b-button>-->
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
                                    <li> Empresa: {{ row.item.Empresa.nombre }}</li>
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

    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "Planmes",
        data() {
            return {
                items:[],
                empresa:[],
                fields:[
                    { key: 'number', label: '#' },
                    { key:'anno', labels:'Año',sortable: true, sortDirection: 'desc'},
                    { key:'plan', labels:'Plan',sortable: true, sortDirection: 'desc'},
                    { key:'salario_medio', labels:'Salario Medio',sortable: true, sortDirection: 'desc'},
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
                produccion:{anno:'',plan:'',salario_medio:'',EmpresaId:''},
                error:null,
                errors:{
                    // anno:{status:null,msg:""},
                    plan:{status:null,msg:""},
                    EmpresaId:{status:null,msg:""},
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
            getEmpresa(){
                this.$api.get("/empresa").then(res=>{
                    this.empresa=res.data;
                    this.produccion.EmpresaId=null;
                }).catch(err=>{})
            },
            empresaSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.empresa.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            getPlanAnual()
            {
                this.isBusy=true;
                this.$api.get("/planAnual/",{
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
                this.$api.post('/planAnual',this.produccion,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.$swal({title:"Correcto",type:'success',text:'Plan insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.getPlanMes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data+"Existen errores en el formulario",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },

            validateAll(){
                this.clear();
                // if(this.produccion.anno==='')
                // {
                //     this.errors.anno.status=false;
                //     this.errors.anno.msg="Este campo  es obligaorio y deben ser mas de 4 caracteres";
                //     this.error=true;
                // }

                if(this.produccion.plan==='')
                {
                    this.errors.plan.status=false;
                    this.errors.plan.msg="Este campo  es obligaorio y deben ser mas de 4 caracteres";
                    this.error=true;
                }
                if(this.produccion.EmpresaId==='')
                {
                    this.errors.EmpresaId.status=false;
                    this.errors.EmpresaId.msg="Este campo  es obligaorio y deben ser mas de 6 caracteres";
                    this.error=true;
                }
            },

            clear(){
                // this.errors.anno.status=true;
                this.errors.plan.status=true;
                this.errors.EmpresaId.status=true;

            },
            deleteUser(item)
            {
                this.$swal({
                    title: 'Eliminar Plan?',
                    text: "Está seguro de querer eliminar al usuario "+item.mes+"!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url='/plan/'+item.id;
                        this.$api.delete(url,{
                            headers:{
                                'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res=>{
                            this.$swal({title:"Correcto",type:'success',text:'Especialidad eliminada correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                            this.getPlanAnual();
                        }).catch(error=>{
                            this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                        })
                    }
                })
            },

        },
        // terminan los metodos
        mounted() {
            this.getEmpresa();
            this.getPlanAnual();
        }

    }
</script>

<style scoped>

</style>