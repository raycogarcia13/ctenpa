<template>
    <div>
        <b-form>
            <h1>Insertar area</h1>
            <b-row >
                <div class="col-md-6">
                    <b-form-group
                            label="Mes:"
                            label-for="mes"
                            :class='{ "has-error":errors.mes.status==false}'
                    >
                        <b-form-input
                                id="mes"
                                v-model="produccion.mes"
                                type="text"
                                required
                                placeholder="mes"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.mes.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.mes.status" :state="validar" class="text-center">
                            {{errors.mes.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                            label="Año:"
                            label-for="anno"
                            :class='{ "has-error":errors.anno.status==false}'
                    >
                        <b-form-input
                                id="nombre"
                                v-model="produccion.anno"
                                type="text"
                                required
                                placeholder="Año"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.anno.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.anno.status" :state="validar" class="text-center">
                            {{errors.anno.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>
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

                    <b-form-group
                            label="Salario Mensual:"
                            label-for="salario_mensual"
                            :class='{ "has-error":errors.salario_mensual.status==false}'
                    >
                        <b-form-input
                                id="salario_mensual"
                                v-model="produccion.salario_mensual"
                                type="text"
                                required
                                placeholder="salario del mes"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.salario_mensual.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.salario_mensual.status" :state="validar" class="text-center">
                            {{errors.salario_mensual.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                            label="Horas Mensual:"
                            label-for="horas_mensual"
                            :class='{ "has-error":errors.horas_mensual.status==false}'
                    >
                        <b-form-input
                                id="horas_mensual"
                                v-model="produccion.horas_mensual"
                                type="text"
                                required
                                placeholder="salario del mes"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.horas_mensual.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.horas_mensual.status" :state="validar" class="text-center">
                            {{errors.horas_mensual.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Area:" label-for="area" :class='{ "has-error":errors.areaId.status==false}'>
                        <b-form-select
                                id="areas"
                                v-model="produccion.areaId"
                                :options="areaSelect()"
                                @change="validateAll()"
                                :state="errors.areaId.status"
                                :disabled="cargando"
                        ></b-form-select>
                        <b-form-invalid-feedback v-if="!errors.areaId.status" :state="validar" class="text-center">
                            {{errors.areaId.msg}}
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
                                    <li> Area: {{ row.item.Area.nombre }}</li>
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
                areas:[],
                fields:[
                    { key: 'number', label: '#' },
                    { key:'mes', labels:'Mes',sortable: true, sortDirection: 'desc'},
                    { key:'anno', labels:'Año',sortable: true, sortDirection: 'desc'},
                    { key:'plan', labels:'Plan',sortable: true, sortDirection: 'desc'},
                    { key:'plan_real', labels:'Plan Real',sortable: true, sortDirection: 'desc'},
                    { key:'salario_mensual', labels:'Salario del Mes',sortable: true, sortDirection: 'desc'},
                    { key:'horas_mensual', labels:'Horas del Mes',sortable: true, sortDirection: 'desc'},
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
                produccion:{mes:'',anno:'',plan:'',plan_real:'',salario_mensual:'',horas_mensual:'',areaId:''},
                error:null,
                errors:{
                    mes:{status:null,msg:""},
                    anno:{status:null,msg:""},
                    plan:{status:null,msg:""},
                    plan_real:{status:null,msg:""},
                    salario_mensual:{status:null,msg:""},
                    horas_mensual:{status:null,msg:""},
                    areaId:{status:null,msg:""},
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
            getAreas(){
                this.$api.get("/area").then(res=>{
                    this.areas=res.data;
                    this.produccion.areaId=null;
                }).catch(err=>{})
            },
            areaSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.areas.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            getPlanMes()
            {
                this.isBusy=true;
                this.$api.get("/produccion/",{
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
                this.$api.post('/produccion',this.produccion,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.$swal({title:"Correcto",type:'success',text:'Área insertada correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.getPlanMes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:"Existen errores en el formulario",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },

            validateAll(){
                this.clear();
                if(this.produccion.mes==='')
                {
                    this.errors.mes.status=false;
                    this.errors.mes.msg="Este campo  es obligaorio y deben ser mas de 3 caracteres";
                    this.error=true;
                }

                if(this.produccion.anno==='')
                {
                    this.errors.anno.status=false;
                    this.errors.anno.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }

                if(this.produccion.plan==='')
                {
                    this.errors.plan.status=false;
                    this.errors.plan.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }

                if(this.produccion.plan_real==='')
                {
                    this.errors.plan_real.status=false;
                    this.errors.plan_real.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }

                if(this.produccion.salario_mensual==='')
                {
                    this.errors.salario_mensual.status=false;
                    this.errors.salario_mensual.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }

                if(this.produccion.horas_mensual==='')
                {
                    this.errors.horas_mensual.status=false;
                    this.errors.horas_mensual.msg="Este campo  es obligaorio y deben ser mas de 63 caracteres";
                    this.error=true;
                }

                if(this.produccion.areaId==='')
                {
                    this.errors.areaId.status=false;
                    this.errors.areaId.msg="Este campo  es obligaorio y deben ser mas de 6 caracteres";
                    this.error=true;
                }
            },

            clear(){
                this.errors.mes.status=true;
                this.errors.anno.status=true;
                this.errors.plan.status=true;
                this.errors.plan_real.status=true;
                this.errors.salario_mensual.status=true;
                this.errors.horas_mensual.status=true;
                this.errors.areaId.status=true;

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
                        let url='/area/'+item.id;
                        this.$api.delete(url,{
                            headers:{
                                'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res=>{
                            this.$swal({title:"Correcto",type:'success',text:'Especialidad eliminada correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                            this.getPlanMes();
                        }).catch(error=>{
                            this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                        })
                    }
                })
            },

        },
        // terminan los metodos
        mounted() {
            this.getAreas();
            this.getPlanMes();
        }

    }
</script>

<style scoped>

</style>