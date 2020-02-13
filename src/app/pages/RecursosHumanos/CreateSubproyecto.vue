<template>
    <div>
        <b-form>
            <b-row>
                <div class="col-md-6">
                    <label for="">Del SubProyecto:</label>
                    <b-row>
                        <div class="col-md-3">
                            <b-form-group
                                    label="Código :"
                                    label-for="cod_servicio"
                            >
                                <b-form-input
                                        id="cod_servicio"
                                        v-model="subproyecto.cod_servicio"
                                        type="text"
                                        required
                                        placeholder="Código del Servicio" >

                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-3">
                            <b-form-group
                                    label="# de contrato:"
                                    label-for="num_contrato"
                            >
                                <b-form-input
                                        id="num_contrato"
                                        v-model="subproyecto.num_contrato"
                                        type="text"
                                        required
                                        placeholder="# del contrato"
                                >

                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-3">
                            <b-form-group
                                    label="Año:"
                                    label-for="anno_contrato"
                            >
                                <b-form-input
                                        id="anno_contrato"
                                        v-model="subproyecto.anno_contrato"
                                        type="text"
                                        required
                                        placeholder="Año del contrato"
                                >

                                </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-3">
                            <b-form-group
                                    label="Código del CT:"
                                    label-for="cod_ct"
                            >
                                <b-form-input
                                        id="cod_ct"
                                        v-model="subproyecto.cod_ct"
                                        type="text"
                                        required
                                        placeholder="Código del CT" >

                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-row>

                    <b-form-group
                            label="Valor del SubProyecto:"
                            label-for="valor_total"
                    >
                        <b-form-input
                                id="sub_valor"
                                v-model.number="subproyecto.sub_valor"
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
                                v-model="subproyecto.descripcion"
                                placeholder="agregar una descripción"
                                rows="3"
                                max-rows="6"
                        ></b-form-textarea>

                    </b-form-group>
                    <b-form-group
                            label="Proyecto"
                            label-for="terminado"
                    >
                        <b-form-checkbox v-model="subproyecto.terminado" name="check-button" button button-variant="info">
                            Terminado => <b v-if="subproyecto.terminado===true">SI</b> <b v-else>NO</b>
                        </b-form-checkbox>
                    </b-form-group>
                    <b-form-group
                            label="Area a la q se le asignará:"
                            label-for="AreaId">
                        <b-form-select
                                id="AreaId"
                                v-model.number="subproyecto.AreaId"
                                :options="areaSelect()"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                            label="Proyecto al que pertenece:"
                            label-for="ProyectoId">
                        <b-form-select
                                id="ProyectoId"
                                v-model.number="subproyecto.ProyectoId"
                                :options="proyectoSelect()"
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
        name: "CreateSubproyecto",
        data(){
            return{
                subproyecto:{cod_servicio:'',num_contrato:'',anno_contrato:'',cod_ct:'', sub_valor:'',descripcion:'',terminado:true,  ProyectoId:'',AreaId:''},
                proyecto:[],
                areas:[]
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

                this.$api.post('/subproyecto/',this.subproyecto,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.subproyecto);
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // this.getClientes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getProyecto(){
                this.$api.get("/proyecto").then(res=>{
                    this.proyecto=res.data;
                    this.subproyecto.ProyectoId=null;
                }).catch(err=>{})
            },
            getAreas(){
                this.$api.get("/area").then(res=>{
                    this.areas=res.data;
                    this.subproyecto.AreaId=null;
                }).catch(err=>{})
            },
            proyectoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.proyecto.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            areaSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.areas.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },


        },
        created(){
            this.getProyecto();
            this.getAreas();
        }
    }
</script>

<style scoped>

</style>