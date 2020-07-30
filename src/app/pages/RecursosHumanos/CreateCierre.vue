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
                <!--            <template v-slot:cell(tiempo)="row">-->
                <!--                <span v-html="row.item.id">-->

                <!--                </span>-->
                <!--            </template>-->
                <template v-slot:cell(equipo)="data">
                    <span v-html="formatedTerminado(data.value)"></span>
                </template>

                <template v-slot:cell(Integrantes)="row" class="center-block center center-align text-justify">
                    <!--                    <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i-->
                    <!--                            class="fa fa-edit"></i>-->
                    <!--                    </b-button>-->
                    <!--                    <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i-->
                    <!--                            class="fa fa-trash"></i>-->
                    <!--                    </b-button>-->
                    <b-button size="sm" variant="primary" @click="row.toggleDetails">
                        {{ row.detailsShowing ? '-' : '+' }}
                    </b-button>
                </template>
                <!-- detalles de la fila -->
                <template v-slot:row-details="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item.equipo" :key="key">
                                <div class=" flex-container ">
                                    <div class=" align-items-md-start">Nombre</div>
                                    <div class=""> {{ value.nombre }} {{ value.apellidos }}</div>
                                    <div class=" align-items-md-start">Tiempo Trabajado : <strong>{{value.acumulado_obras}}h</strong>
                                    </div>
                                </div>

                            </li>

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
                <!--            <el-button @click="visible = true" class="btn btn-outline-info float-right">Ver Cierre</el-button>-->
                <vue-excel-xlsx
                        class="btn btn-outline-info float-right"
                        :data="data"
                        :columns="columns"
                        :filename="this.nombrexsl"
                        :sheetname="'sheetname'"
                >
                    Download <span><i class="fa fa-download"></i></span>
                </vue-excel-xlsx>
                <el-button @click="generarCierre()" class="btn btn-outline-info">Generar Cierre</el-button>
                <!--                <el-dialog :visible.sync="visible" title="Insertar Integrante">-->
                <!--                    <b-form>-->
                <!--                        <b-row>-->
                <!--                            <div class="col-md-12">-->
                <!--                                <cierre></cierre>-->
                <!--                            </div>-->
                <!--                        </b-row>-->
                <!--                    </b-form>-->
                <!--                </el-dialog>-->
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
                                    v-model="equipo.produccionb"
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
                                    v-model="equipo.produccionm"
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
                                    v-model="equipo.produccionc"
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
    import moment from 'moment'
    import Vue from "vue";
    import VueExcelXlsx from "vue-excel-xlsx";

    Vue.use(VueExcelXlsx);
    export default {
        name: "createCierre",
        components: {
            // cierre,
        },
        data() {
            return {
                visible: false,
                nombrexsl: moment().locale('es').format('l'),
                equipo: {id: '', produccionb: '', produccionm: '', produccionc: ''},
                subproyecto: [],
                asignacion: [],
                trabajador: [],
                items: [],
                fields: [
                    {key: 'number', label: '#'},
                    {key: 'nombre', labels: 'Proyecto', sortable: true, sortDirection: 'desc'},
                    {key: 'codigo', labels: 'Codigo', sortable: true, sortDirection: 'desc'},
                    {key: 'sum', labels: 'Tiempo', sortable: true, sortDirection: 'desc'},
                    {key: 'Integrantes', labels: 'Acciones', sortable: true, sortDirection: 'desc'}],
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
                        label: "Equipo",
                        field: "equipo",
                    },
                    {
                        label: "Código",
                        field: "codigo",
                    },
                    {
                        label: "Tiempo por proyecto",
                        field: "tiempo",
                    },

                    {
                        label: "Nombre",
                        field: "nombre",
                    },
                    {
                        label: "Tiempo Trabajado",
                        field: "acumulado_obras",
                    },


                ],
                data: [],
            }
        },
        computed: {
            ...mapState(['siderShow', 'user_signed']),
            capitalizeUs() {
                return this.user_signed.username.charAt(0).toUpperCase() + this.user_signed.username.slice(1);
            },
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
            getData() {
                this.isBusy = true;
                this.$api.post("/cierre/getcierreMes/", {
                    headers: {
                        'secret': JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res => {
                    this.isBusy = false;
                    this.items = res.data;
                    let rec = res.data;
                    let all=[];
                    for (let i = 0; i <rec.length ; i++) {
                        let v=rec[i].equipo;
                        for (let j = 0; j <v.length ; j++) {
                            let obj={nombre: '',acumulado_obras: '',equipo: '',codigo: '',tiempo: ''};
                            obj.nombre= v[j].trabajador;
                            obj.acumulado_obras= v[j].acumulado_obras;
                            obj.equipo= rec[i].nombre;
                            obj.codigo= rec[i].codigo;
                            obj.tiempo= rec[i].acumulado;
                            all.push(obj)
                        }
                    }
                    this.data = all;
                    this.totalRows = this.items.length;
                }).catch(err => {
                    this.isBusy = false;
                    console.log(err);
                })
            },
            generarCierre: async function () {
                let idCierre=[];
                let tmp = this.items;
                let tmp1 = [];
                let curr = 0;
                let response = await this.$api.get('/cierre/');
                let result = response.data;
                idCierre = response.data.map((ids) => {
                    return ids.codigo;
                });
                // return console.log(idCierre)

                for (let i = 0; i < tmp.length; i++) {
                    let cierre = {};
                    // for (var l = 0; l < idCierre.length; l++){
                    //     lol=idCierre[l];
                    // }
                    cierre = {
                        proyectoID: tmp[i]['id'],
                        produccion_bruta: 0,
                        produccion_mercantil: 0,
                        produccion_cuc:0,
                    };
                    // return console.log(lol);
                    // if(lol === tmp[i]['codigo']){
                    // return console.log('si',tmp[i]['codigo'])
                    // this.$api.put('/cierre/' + this.equipo.id, cierre)
                    // }else{
                    if (tmp[i]['id'] !== curr) {
                        // return console.log('no',tmp[i]['codigo'])
                        this.$api.post('/cierre/', cierre).then(res => {
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
                        });
                        tmp1.push(cierre);
                        curr = tmp[i]['id'];
                    }
                }
                // }

                this.$swal({
                    title: "Correcto",
                    type: 'success',
                    text: 'Cierre generado correctamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });


            },
            edit(item) {
                this.infoModal.title = `Editar Cierre: ${item.nombrep}`;
                this.infoModal.content = '';
                this.equipo.id = item.id,
                    this.equipo.produccionb = item.produccionb,
                    this.equipo.produccionm = item.produccionm,
                    this.equipo.produccionc = item.produccionc,
                    this.$root.$emit('bv::show::modal', this.infoModal.id);
            },
            editarUser(event) {
                event.preventDefault();
                // this.$root.$emit('bv::show::modal', this.infoModal.id);
                this.$api.put('/cierrep/' + this.equipo.id, this.equipo, {
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

            getTrabajador() {
                this.$api.get("/proyectista").then(res => {
                    this.trabajador = res.data;
                    this.equipo.TrabajadorId = null;
                }).catch(err => {
                })
            },
            getSubProyecto() {
                this.$api.get("/subproyecto").then(res => {
                    this.subproyecto = res.data;
                    this.equipo.SubProyectoId = null;
                }).catch(err => {
                })
            },
            getAsignacion() {
                this.$api.get("/asignacion").then(res => {
                    this.asignacion = res.data;
                    this.equipo.AsignacionId = null;
                }).catch(err => {
                })
            },
            trabajadorSelect() {
                let opt = [];
                opt.push({text: 'Escoja un elemento', value: null});
                this.trabajador.forEach(function (element) {
                    opt.push({text: element.nombre, value: element.id});
                });
                return opt;
            },
            subproyectoSelect() {
                let opt = [];
                opt.push({text: 'Escoja un elemento', value: null});
                this.subproyecto.forEach(function (element) {
                    opt.push({text: element.codigo, value: element.id});
                });
                return opt;
            },
            asignacionSelect() {
                let opt = [];
                opt.push({text: 'Escoja un elemento', value: null});
                this.asignacion.forEach(function (element) {
                    opt.push({text: element.equipo, value: element.id});
                });
                return opt;
            },
            deleteUser(item) {
                this.$swal({
                    title: 'Eliminar usuario?',
                    text: "Está seguro de querer eliminar al usuario " + item.username + "!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar!'
                }).then((result) => {
                    if (result.value) {
                        let url = '/integrantes/' + item.id;
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
            formatedTerminado(data) {
                String.prototype.replaceAll = function (search, replacement) {
                    var target = this;
                    return target.split(search).join(replacement);
                };
                let tmp = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].equipo !== []) {
                        var variable = data[i]['Trabajador.nombre'] + '-' + data[i]['acumulado_obras'] + ' h' + '<br>';
                        tmp.push(variable);
                    }
                }
                let mio = tmp.toString();
                return mio.replaceAll(",", ' ');
            },
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
