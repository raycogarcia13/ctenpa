<template>
    <div>
     <b-form  @submit.prevent="crear()" >
         <h1>Insertar Trabajador</h1>
         <b-row>
             <div class="col-md-6">
          <b-form-group
          label="Nombre de Usuario:"
          label-for="usuario"

          >
              <b-form-input
                      id="username"
                      name="username"
                      v-model="usuario.username"
                      type="text"
                      required
                      placeholder="Usuario"
                      :disabled="cargando">

              </b-form-input>
              <div v-if="enviado===true"  class="text-center">
                  <p class="text-red">Este campo es requerido </p>
              </div>
          </b-form-group>
             <b-form-group
                     label="Descripcion:"
                     label-for="descripcion"

             >
                 <b-form-input
                         id="descripcion"
                         ref="descripcion"
                         v-model="usuario.descripcion"
                         type="text"
                         required
                         placeholder="Breve descripción"
                         :disabled="cargando">
                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido </p>
                 </div>
             </b-form-group>
             <b-form-group
                     label="Contraseña:"
                     label-for="password"
             >
                 <b-form-input
                         id="password"
                         aria-describedby="passwordError"
                         ref="password"
                         v-model="usuario.password"
                         type="password"
                         required
                         placeholder="Contraseña"
                         :disabled="cargando">

                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">La contraseña deben tener más de 6 caracteres </p>
                 </div>
             </b-form-group>
             <b-form-group
                     label="Confirma la Contraseña:"
                     label-for="password_confirm"

             >
                 <b-form-input
                         id="password_confirm"
                         aria-describedby="password_confirmError"
                         ref="password_confirm"
                         v-model="usuario.password_confirm"
                         type="password"
                         required
                         placeholder="Contraseña"
                         :disabled="cargando">

                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Ambas contraseña deben coincidir </p>
                 </div>
             </b-form-group>
             <b-form-group
                     label="Correo:"
                     label-for="email"
             >
                 <b-form-input
                         id="email"
                         aria-describedby="emailError"
                         ref="email"
                         v-model="usuario.email"
                         type="email"
                         required
                         placeholder="Correo"
                         :disabled="cargando">

                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo debe ser un correo válido</p>
                 </div>
             </b-form-group>

             <b-form-group
                     label="Nombre:"
                     label-for="nombre"

             >
                 <b-form-input
                         id="nombre"
                         aria-describedby="nombreError"
                         ref="nombre"
                         v-model="usuario.nombre"
                         type="text"
                         required
                         placeholder="Nombre"
                         :disabled="cargando">

                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>

             <b-form-group
                     label="Apellidos:"
                     label-for="apellidos"
             >
                 <b-form-input
                         id="apellidos"
                         aria-describedby="apellidosError"
                         ref="apellidos"
                         v-model="usuario.apellidos"
                         type="text"
                         required
                         placeholder="Apellidos"
                         :disabled="cargando">
                 </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             <b-form-group
                         label="Salario por Hora:"
                         label-for="salario_hora"
                 >
                     <b-form-input
                             id="salario_hora"
                             aria-describedby="salario_horaError"
                             ref="salario_hora"
                             v-model.number="usuario.salario_hora"
                             type="text"
                             required
                             placeholder="Salario por hora"
                             :disabled="cargando">
                     </b-form-input>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             </div>

             <div class="col-md-6">
                 <b-form-group
                         label="Escala salarial:"
                         label-for="escala_salarial"

                 >
                     <b-form-input
                             id="escala_salarial"
                             aria-describedby="escala_salarialError"
                             ref="escala_salarial"
                             v-model.number="usuario.escala_salarial"
                             type="text"
                             required
                             placeholder="Escala Salarial"
                             :disabled="cargando">
                     </b-form-input>
                     <div v-if="enviado===true"  class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </div>
                 </b-form-group>
                 <b-form-group
                         label="Perfeccionamiento Empresarial:"
                         label-for="perfeccionamiento_empresarial"

                 >
                     <b-form-input
                             id="perfec_empresarial"
                             aria-describedby="perfec_empresarialError"
                             ref="perfec_empresarial"
                             v-model.number="usuario.perfec_empresarial"
                             type="text"
                             required
                             placeholder="Perfeccionamiento Empresarial"
                             :disabled="cargando">
                     </b-form-input>
                     <div v-if="enviado===true"  class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </div>
                 </b-form-group>
                 <b-form-group
                         label="Coeficiente:"
                         label-for="coeficiente"

                 >
                     <b-form-input
                              id="coeficiente"
                             aria-describedby="coeficienteError"
                             ref="coeficiente"
                             v-model.number="usuario.coeficiente"
                             type="text"
                             required
                             placeholder="coeficiente"
                             :disabled="cargando">
                     </b-form-input>
                     <div v-if="enviado===true"  class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </div>
                 </b-form-group>
             <b-form-group id="input-group-6" label="Rol:" label-for="rol"
                          >
                 <b-form-select
                         id="rol"
                         aria-describedby="rolError"
                         ref="rol"
                         v-model="usuario.RolId"
                         :options="rolSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             <b-form-group id="input-group-1" label="Denominacion:" label-for="denominacion"
                         >
                 <b-form-select
                         id="denominacion"
                         aria-describedby="denominacionError"
                         ref="denominacion"
                         v-model="usuario.DenominacionId"
                         :options="denominacionSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             <b-form-group id="input-group-2" label="Área:" label-for="area"
                           >
                 <b-form-select
                         id="area"
                         aria-describedby="areaError"
                         ref="area"
                         v-model="usuario.areaId"
                         :options="areaSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             <b-form-group id="input-group-3" label="Cargo:" label-for="cargo"
                           >
                 <b-form-select
                         id="cargo"
                         aria-describedby="cargoError"
                         ref="cargo"
                         v-model="usuario.CargoId"
                         :options="cargoSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
             <b-form-group id="input-group-4" label="Especialidad:" label-for="especialidad"
                           >
                 <b-form-select
                         id="especialidad"
                         aria-describedby="especialidadError"
                         ref="especialidad"
                         v-model="usuario.especialidadId"
                         :options="especialidadSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <div v-if="enviado===true"  class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </div>
             </b-form-group>
                </div>

        </b-row>
         <div v-if="cargando" class="text-center">
             <b-spinner class="align-middle text-success"></b-spinner>
         </div>
     </b-form>
        <hr>
        <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
        <b-button @click="crear" type="submit" class="btn-success pull-right">Crear</b-button>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    // import { required, minLength, email,sameAs} from 'vuelidate/lib/validators';

    export default {
        name: "CreateTrabajador",
        data(){
            return{
                usuario:{username:'',descripcion:'',password:'',password_confirm:'',email:'',RolId:'',nombre:'',apellidos:'',perfec_empresarial:'',coeficiente:'',escala_salarial:'',salario_hora:'',areaId:'',especialidadId:'',CargoId:'',DenominacionId:''},
                cargando:false,
                roles:[],
                escalas:[],
                cargos:[],
                denominacion:[],
                especialidades:[],
                areas:[],
                enviado: false,
                err:[]
            }
        },
        computed: {
            ...mapMutations(['logged']),
         },
        // validations:{
        //      usuario:{
        //             username:{required,minLength: minLength(6)},
        //             descripcion:{required},
        //             password:{required,minLength: minLength(6)},
        //             password_confirm:{required,sameAsPassword:sameAs('password')},
        //             email:{required,email},
        //             RolId:{required},
        //             nombre:{required},
        //             apellidos:{required},
        //             perfec_empresarial:{required},
        //             coeficiente:{required},
        //             escala_salarial:{required},
        //             salario_hora:{required},
        //             areaId:{required},
        //             especialidadId:{required},
        //             CargoId:{required},
        //             DenominacionId:{required},
        //         }
        // },
        methods:{
            crear(){
               this.cargando=true;
               this.$api.post('/proyectista',this.usuario,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(res);
                   if (res.data.errores==="SI") {
                     this.enviado=true;
                     this.err.push(res.data.valor);
                       this.$swal({title:"Incorrecto",type:'error',text:res.data.valor,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                   }
                   else
                       {
                       this.$swal({title:"Correcto",type:'success',text:res.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                   }
                  this.clear();
                }).catch(error=>{
                    console.log(error[0]);
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            clear(){
                this.usuario.username="";
                this.usuario.descripcion="";
                this.usuario.password="";
                this.usuario.password_confirm="";
                this.usuario.email="";
                this.usuario.RolId="";
                this.usuario.nombre="";
                this.usuario.apellidos="";
                this.usuario.perfec_empresarial="";
                this.usuario.coeficiente="";
                this.usuario.escala_salarial="";
                this.usuario.salario_hora="";

            },
            getRol(){
                this.$api.get("/rol").then(res=>{
                    this.roles=res.data;
                    this.usuario.RolId=null;
                }).catch(err=>{})
            },
            getEscalas(){
                this.$api.get("/escala").then(res=>{
                    this.escalas=res.data;
                    this.usuario.escala_salarial=null;
                }).catch(err=>{})
            },
            getCargos(){
                this.$api.get("/cargo").then(res=>{
                    this.cargos=res.data;
                    this.usuario.CargoId=null;
                }).catch(err=>{})
            },
            getDenominacion(){
                this.$api.get("/denominacion").then(res=>{
                    this.denominacion=res.data;
                    this.usuario.DenominacionId=null;
                }).catch(err=>{})
            },
            getEspecialidad(){
                this.$api.get("/especialidad").then(res=>{
                    this.especialidades=res.data;
                    this.usuario.especialidadId=null;
                }).catch(err=>{})
            },
            getArea(){
                this.$api.get("/area").then(res=>{
                    this.areas=res.data;
                    this.usuario.areaId=null;
                }).catch(err=>{})
            },
            rolSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.roles.forEach(function(element) {
                    opt.push({text:element.name,value:element.id});
                });
                return opt;
            },
            cargoSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.cargos.forEach(function(element) {
                    opt.push({text:element.cargo,value:element.id});
                });
                return opt;
            },
            especialidadSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.especialidades.forEach(function(element) {
                    opt.push({text:element.especialidad,value:element.id});
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
            escalaSelect(){
                let opt=[];
                let em = this;
                opt.push({text:'Escoja un elemento',value:null});
                this.escalas.forEach(function(element) {
                    opt.push({text:element.escala  +  element.Cargo.cargo,value:element.id});
                });
                return opt;
            },
            denominacionSelect(){
                let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
                this.denominacion.forEach(function(element) {
                    opt.push({text:element.denominacion,value:element.id});
                });
                return opt;
            },
        },
        // terminan los methods
        created(){
            this.getRol();
            this.getEspecialidad();
            this.getArea();
            this.getEscalas();
            this.getDenominacion();
            this.getCargos();
        }
    }
</script>

<style scoped>

</style>
