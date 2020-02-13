<template>
    <div>
        <b-form>
        <b-row>
        <div class="col-md-6">
            <b-form-group
                    label="Funcion:"
                    label-for="funcion"
            >
                <b-form-input
                        id="funcion"
                        v-model="equipo.funcion"
                        type="text"
                        required
                        placeholder="Función que cumple"
                >

                </b-form-input>
            </b-form-group>
            <b-form-group
                    label="Elige el Proyectista:"
                    label-for="TrabajadorId">
                <b-form-select
                        id="ContratoId"
                        v-model.number="equipo.TrabajadorId"
                        :options="trabajadorSelect()"
                ></b-form-select>
            </b-form-group>
            <b-form-group
                    label="Subproyecto al que Pertenece:"
                    label-for="SubProyectoId">
                <b-form-select
                        id="SubProyectoId"
                        v-model.number="equipo.SubProyectoId"
                        :options="subproyectoSelect()"
                ></b-form-select>
            </b-form-group>
            <hr>
            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
            <b-button @click="crear" class="btn-success pull-right">Crear Equipo</b-button>
        </div>
        </b-row>
        </b-form>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateEquipo",
        data(){
            return{
                equipo:{funcion:'',SubProyectoId:'',TrabajadorId:''},
                subproyecto:[],
                trabajador:[]
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
                this.$api.post('/equipo/',this.equipo,{
                    // data:this.usuario,
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(this.equipo);
                    this.$swal({title:"Correcto",type:'success',text:'Contrato insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // this.getClientes();
                }).catch(error=>{
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            getTrabajador(){
                this.$api.get("/proyectista").then(res=>{
                    this.trabajador=res.data;
                    this.equipo.TrabajadorId=null;
                }).catch(err=>{})
            },
            getSubProyecto(){
                this.$api.get("/subproyecto").then(res=>{
                    this.subproyecto=res.data;
                    this.equipo.SubProyectoId=null;
                }).catch(err=>{})
            },
            trabajadorSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.trabajador.forEach(function(element) {
                    opt.push({text:element.nombre,value:element.id});
                });
                return opt;
            },
            subproyectoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.subproyecto.forEach(function(element) {
                    opt.push({text:element.codigo,value:element.id});
                });
                return opt;
            },
        },
        created() {
            this.getTrabajador();
            this.getSubProyecto();
        }
    }
</script>

<style scoped>

</style>