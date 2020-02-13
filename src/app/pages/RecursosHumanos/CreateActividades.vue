<template>
    <div>
        <b-form>
            <b-row>
                <div class="col-md-6">
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
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateActividades",
        data(){
            return{
              actividades:{actividad:'',tiempo_d:'',pro_ratea:'',productiva:false,EmpresaId:1},
              empresa:[]
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
        },
        mounted() {
            this.getEmpresa();
        }
    }
</script>

<style scoped>

</style>