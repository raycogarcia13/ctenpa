<template>
    <div>
        <b-form>
            <b-row>
                <div class="col-md-6">
                    <label class="text-black-50 text-capitalize">Del Proyecto:</label>
                    <b-row>
                        <div class="col-md-4">
                            <b-form-group
                                    label="Número:"
                                    label-for="num_contrato"
                            >
                                <b-form-input
                                        id="num_contrato"
                                        v-model="proyecto.num_contrato"
                                        type="text"
                                        required
                                        placeholder="# del contrato"
                                >

                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                    label="Año:"
                                    label-for="anno_contrato"
                            >
                                <b-form-input
                                        id="anno_contrato"
                                        v-model="proyecto.anno_contrato"
                                        type="text"
                                        required
                                        placeholder="Año del contrato"
                                >

                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-4">
                            <b-form-group
                                    label="Código del CT:"
                                    label-for="cod_ct"
                            >
                                <b-form-input
                                        id="cod_ct"
                                        v-model="proyecto.cod_ct"
                                        type="text"
                                        required
                                        placeholder="Código del CT" >

                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>

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
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateContrato",
        data(){
            return{
                proyecto:{ num_contrato:'',anno_contrato:'',cod_ct:'', nombre:'',valor_total:'',descripcion:'',terminado:true,  ContratoId:'',EstadoId:''},
                contrato:[],
                estados:[]
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
                this.$api.post('/proyecto/',this.proyecto,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.proyecto);
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


        },
        created(){
            this.getContrato();
            this.getEstados();
        }
    }
</script>

<style scoped>

</style>