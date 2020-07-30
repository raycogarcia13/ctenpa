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
            <template v-slot:cell(productiva)="data">
                <span v-html="formatedP(data.value)"></span>
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
                        <div class="col-md-12">
                            <b-form-group
                                    label="Actividad:"
                                    label-for="actividad"
                            >
                                <b-form-input
                                        id="actividad"
                                        v-model="actividades.actividad"
                                        type="text"
                                        required
                                        placeholder="Actividad"
                                >
                                </b-form-input>
                            </b-form-group>


                            <b-form-group
                                    label="Tiempo a Emplear:"
                                    label-for="cod_ct"
                            >
                                <b-form-input
                                        id="tiempo_d"
                                        v-model="actividades.tiempo_d"
                                        type="text"
                                        required
                                        placeholder="Tiempo" >

                                </b-form-input>
                            </b-form-group>


                            <b-form-group
                                    label="Actividad Pro_ratea:"
                                    label-for="pro_ratea"
                            >
                                <b-form-input
                                        id="sub_valor"
                                        v-model="actividades.pro_ratea"
                                        type="text"
                                        required
                                        placeholder="Valor Total"
                                >
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label-for="terminado"
                            >
                                <b-form-checkbox v-model="actividades.productiva" name="check-button" button button-variant="info">
                                    Productiva => <b v-if="actividades.productiva===true">SI</b> <b v-else>NO</b>
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group
                                    label="Empresa:"
                                    label-for="EmpresaId">
                                <b-form-select
                                        id="AreaId"
                                        v-model.number="actividades.EmpresaId"
                                        :options="empresaSelect()"
                                ></b-form-select>
                            </b-form-group>

                            <hr>
                            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                            <b-button @click="crear" class="btn-success pull-right">Crear SubProyecto</b-button>
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
                    <div class="col-md-12">
                        <b-form-group
                                label="Actividad:"
                                label-for="actividad"
                        >
                            <b-form-input
                                    id="actividad"
                                    v-model="actividades.actividad"
                                    type="text"
                                    required
                                    placeholder="Actividad"
                            >
                            </b-form-input>
                        </b-form-group>


                        <b-form-group
                                label="Tiempo a Emplear:"
                                label-for="cod_ct"
                        >
                            <b-form-input
                                    id="tiempo_d"
                                    v-model="actividades.tiempo_d"
                                    type="text"
                                    required
                                    placeholder="Tiempo" >

                            </b-form-input>
                        </b-form-group>


                        <b-form-group
                                label="Actividad Pro_ratea:"
                                label-for="pro_ratea"
                        >
                            <b-form-input
                                    id="sub_valor"
                                    v-model="actividades.pro_ratea"
                                    type="text"
                                    required
                                    placeholder="Valor Total"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label-for="terminado"
                        >
                            <b-form-checkbox v-model="actividades.productiva" name="check-button" button button-variant="info">
                                Productiva => <b v-if="actividades.productiva===true">SI</b> <b v-else>NO</b>
                            </b-form-checkbox>
                        </b-form-group>
                        <b-form-group
                                label="Empresa:"
                                label-for="EmpresaId">
                            <b-form-select
                                    id="AreaId"
                                    v-model.number="actividades.EmpresaId"
                                    :options="empresaSelect()"
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
    export default {
        name: "CreateActividades",
        data(){
            return{
              visible:false,
              actividades:{id:'',actividad:'',tiempo_d:'',pro_ratea:'',productiva:false,EmpresaId:1},
              empresa:[],
                items:[],
                fields:[{key: 'number', label: '#'},
                    { key:'actividad', labels:'Nombre',sortable: true, sortDirection: 'desc'},
                    { key:'tiempo_d', labels:'Tiempo',sortable: true, sortDirection: 'desc'},
                    { key:'pro_ratea', labels:'Pro Ratea?',sortable: true, sortDirection: 'desc'},
                    { key:'productiva', labels:'Productiva',sortable: true, sortDirection: 'desc'},
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
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            getData(){
                this.isBusy=true;
                this.$api.get("/actividad/",{
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
                this.$api.post('/actividad/',this.actividades,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.actividades);
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // this.getClientes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getEmpresa(){
                this.$api.get("/empresa").then(res=>{
                    this.empresa=res.data;
                    this.actividades.EmpresaId=1;
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

            edit(item) {
                this.infoModal.title = `Editar Actividades: ${item.actividad}`;
                this.infoModal.content = '';
                this.actividades=item;
                this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event){
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/actividad/'+this.actividades.id,this.actividades,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.getData();
                    this.$swal({title:"Correcto",type:'success',text:'Actividades actualizado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
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
            formatedP(data){
                if(data==true)
                    return '<span class="badge badge-success">SI</span>';

                if(data==false)
                        return '<span class="badge badge-danger">NO</span>';

                return data;
            }

        },
        mounted() {
            this.getEmpresa();
            this.getData();
        }
    }
</script>

<style scoped>

</style>
