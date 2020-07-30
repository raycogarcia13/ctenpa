<template>
    <div>
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
            <div class="pt-2">
                <vue-excel-xlsx
                        class="btn btn-outline-info float-right"
                        :data="datos"
                        :columns="columns"
                        :filename="this.nombrexsl"
                        :sheetname="'sheetname'"
                >
                    Download <span><i class="fa fa-download"></i></span>
                </vue-excel-xlsx>
            </div>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser"
                     @hide="resetInfoModal">
                <pre v-if="infoModal.content!=''">{{ infoModal.content }}</pre>
                <div v-else>
                    <form>
                       <b-form-group
                                label="Produccion Bruta:"
                                label-for="funcion"
                        >
                            <b-form-input
                                    id="bruta"
                                    v-model="equipo.produccion_bruta"
                                    type="text"
                                    required
                                    placeholder="Produccion Bruta"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Produccion que realiza:"
                                label-for="funcion"
                        >
                            <b-form-input
                                    id="mercantil"
                                    v-model="equipo.produccion_mercantil"
                                    type="text"
                                    required
                                    placeholder="Produccion mercantil"
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Produccion en CUC:"
                                label-for="funcion"
                        >
                            <b-form-input
                                    id="cuc"
                                    v-model="equipo.produccion_cuc"
                                    type="text"
                                    required
                                    placeholder="Produccion cuc"
                            >
                            </b-form-input>
                        </b-form-group>

                    </form>
                </div>
            </b-modal>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import Vue from 'vue';
    import moment from "moment";
    import VueExcelXlsx from "vue-excel-xlsx";
    Vue.use(VueExcelXlsx);
    export default {
        name: "cierre",
        components: {

        },
        data() {
            return {
                equipo: {id: '',produccion_acumulada:'', produccion_bruta: '', produccion_mercantil: '', produccion_cuc: ''},
                nombrexsl: moment().locale('es').format('l'),
                items: [],
                fields:[
                    { key:'codigo', labels:'Codigo',sortable: true, sortDirection: 'desc'},
                    { key:'nombre', labels:'Actividades',sortable: true, sortDirection: 'desc'},
                    { key:'mes', labels:'mes',sortable: true, sortDirection: 'desc'},
                    { key:'anno', labels:'anno',sortable: true, sortDirection: 'desc'},
                    { key:'produccion_bruta', labels:'Produccion Bruta',sortable: true, sortDirection: 'desc'},
                    { key:'produccion_acumulada', labels:'Produccion Acumulada',sortable: true, sortDirection: 'desc'},
                    { key:'produccion_mercantil', labels:'Produccion Mercantil',sortable: true, sortDirection: 'desc'},
                    { key:'produccion_cuc', labels:'Produccion cuc',sortable: true, sortDirection: 'desc'},
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
                columns: [
                    {
                        label: "Codigo",
                        field: "codigo",
                    },
                    {
                        label: "Actividades",
                        field: "nombre",
                    },
                    {
                        label: "Mes",
                        field: "mes",
                    },
                    {
                        label: "Año",
                        field: "anno",
                    },
                    {
                        label: "Produccion Bruta",
                        field: "produccion_bruta",
                        dataFormat: this.priceFormat
                    },
                    {
                        label: "Produccion Acumulada",
                        field: "produccion_acumulada",
                        dataFormat: this.priceFormat
                    },
                    {
                        label: "Produccion Mercantil",
                        field: "produccion_mercantil",
                        dataFormat: this.priceFormat
                    },
                    {
                        label: "Produccion Cuc",
                        field: "produccion_cuc",
                        dataFormat: this.priceFormatcuc
                    },
                ],
                datos:[],
            };
        },
        computed: {
            ...mapState(['siderShow', 'user_signed']),
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {text: f.label, value: f.key}
                    });
            },
        },
        methods: {
            ...mapMutations(['toogleSidebar']),
            ...mapActions(['signout']),

            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },
            priceFormat(value) {
                return '$ ' + value;
            },
            priceFormatcuc(value) {
                return '$$ ' + value;
            },
            getData(){
                this.$api.get('/cierre/',{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    this.items=res.data;
                    this.datos = res.data;
                    this.$swal({title:"Correcto",type:'success',text:'Datos Obtenidos correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                });
            },
            edit(item) {
                this.infoModal.title = `Editar Cierre: ${item.id}`;
                this.infoModal.content = '';
                this.equipo.id = item.id,
                    this.equipo.produccion_acumulada = item.produccion_acumulada,
                    this.equipo.produccion_bruta = item.produccion_bruta,
                    this.equipo.produccion_mercantil = item.produccion_mercantil,
                    this.equipo.produccion_cuc = item.produccion_cuc,
                    this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event) {
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/cierre/' + this.equipo.id, this.equipo, {
                    headers: {
                        'secret': JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res => {
                    this.cargando = false;
                    this.getData();
                    this.$swal({
                        title: "Correcto",
                        type: 'success',
                        text: 'cierre actualizado correctamente',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }).catch(error => {
                    this.$swal({
                        title: "Error ",
                        type: 'error',
                        text: error.response.data,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    this.cargando = false;
                });
                console.log(event);
                // alert('si');
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = '';
            },
            deleteUser(item) {
                this.$swal({
                    title: 'Eliminar Proyecto?',
                    text: "Está seguro de eliminar proyecto " + item.nombre + "!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url = '/cierre/' + item.id;
                        this.$api.delete(url, {
                            headers: {
                                'secret': JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                            }
                        }).then(res => {
                            this.$swal({
                                title: "Correcto",
                                type: 'success',
                                text: 'Equipo eliminado correctamente',
                                toast: true,
                                position: 'top',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            this.getData();
                        }).catch(error => {
                            this.$swal({
                                title: "Error ",
                                type: 'error',
                                text: error.response.data,
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000
                            });
                        })
                    }
                })
            },
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>

