<template>
    <div>
        <b-form>
            <b-row>
                <div class="col-md-6">
                    <b-form-group
                            label="Nombre:"
                            label-for="nombre"
                    >
                        <b-form-input
                                id="nombre"
                                v-model="contrato.nombre"
                                type="text"
                                required
                                placeholder="Nombre"
                        >

                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            label="Número:"
                            label-for="numero"
                    >
                        <b-form-input
                                id="numero"
                                v-model.number="contrato.numero"
                                type="text"
                                required
                                placeholder="Número"
                        >
                        </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Fecha Inicio:"
                                label-for="fecha_inicio"
                        >
                            <datepicker :bootstrap-styling="true"
                                        input-class="form-control"
                                        :format="customFormatter"
                                        v-model="contrato.fecha_inicio"
                                        :language="es">

                            </datepicker>
                        </b-form-group>
                    <b-form-group
                            label="Fecha Cierre:"
                            label-for="fecha_cierre"
                    >
                     <datepicker :bootstrap-styling="true"
                                        input-class="form-control"
                                        :format="customFormatter"
                                        v-model="contrato.fecha_cierre"
                                        :language="es">
                            </datepicker>
                    </b-form-group>

                    <b-form-group
                            label="Código Tratos:"
                            label-for="cod_tratos"
                    >
                        <b-form-input
                                id="cod_tratos"
                                v-model.number="contrato.codigo_tratos"
                                type="text"
                                required
                                placeholder="Código de tratos">

                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            label="Activo?"
                            label-for="activo"
                    >
                        <b-form-checkbox v-model="contrato.activo" name="check-button" button button-variant="info">
                            Activo? <b v-if="contrato.activo===false">No</b> <b v-else>Si</b>
                        </b-form-checkbox>
                    </b-form-group>
                    <b-form-group
                            label="Cliente:"
                            label-for="Cliente">
                        <b-form-select
                                id="ClienteId"
                                v-model.number="contrato.ClienteId"
                                :options="clienteSelect()"
                        ></b-form-select>
                    </b-form-group>
                    <hr>
                    <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                    <b-button @click="crear" class="btn-success pull-right">Crear Área</b-button>
                </div>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import { es } from 'vuejs-datepicker/dist/locale'
    export default {
        components: {
            Datepicker
        },
        name: "CreateContrato",
        data(){
            return{
                es:es,
                contrato:{ nombre:'', numero:'', fecha_inicio:new Date(), fecha_cierre:new Date(),codigo_tratos:'', activo:false, ClienteId:''},
                cliente:[]
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
            crear(){
                this.$api.post('/contrato/',this.contrato,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.contrato);
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // this.getClientes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getClientes(){
                this.$api.get("/cliente").then(res=>{
                    this.cliente=res.data;
                    this.contrato.ClienteId=null;
                }).catch(err=>{})
            },
            clienteSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.cliente.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            customFormatter(date) {
                // let f=moment(date).format('D MMMM YYYY');
                let ft=moment(date).format('DD MM YYYY');
                // this.produccion.anno = ft.substr(-4);
                // this.produccion.mes = ft.substr(2,4);
                return ft;
            },
        },
        created(){
            this.getClientes()
        }
    }
</script>

<style scoped>

</style>