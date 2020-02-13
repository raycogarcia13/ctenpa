<template>
    <div>
     <b-form  @submit.prevent="crear()" >
         <h1>Insertar Trabajador</h1>
         <b-row>
             <div class="col-md-6">
          <b-form-group
          label="Nombre de Usuario:"
          label-for="usuario"
          :class="{ 'is-invalid': submitted && $v.usuario.username.$error , 'is-valid':!$v.usuario.username.$invalid}"
          >
              <b-form-input
                      id="username"
                      aria-describedby="usernameError"
                      ref="username"
                      name="username"
                      v-model.trim="$v.usuario.username.$model"
                      type="text"
                      required
                      placeholder="Usuario"
                      :disabled="cargando">

              </b-form-input>
              <b-form-invalid-feedback v-if="submitted && !$v.usuario.username.required" id="usernameError" class="text-center">
                  <span v-if="!$v.usuario.username.required">El usuario es requerido</span>
                  <span v-if="!$v.usuario.username.minLength">Debe tener al menos {{$v.username.$params.minLength.min}} caracteres</span>
              </b-form-invalid-feedback>
          </b-form-group>
             <b-form-group
                     label="Descripcion:"
                     label-for="descripcion"
                     :class="{ 'is-invalid': submitted && $v.usuario.descripcion.$error }"
             >
                 <b-form-input
                         id="descripcion"
                         aria-describedby="descripcionError"
                         ref="descripcion"
                         v-model="$v.usuario.descripcion.$model"
                         type="text"
                         required
                         placeholder="Breve descripción"
                         :disabled="cargando">

                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.descripcion.required" id="descripcionError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group
                     label="Contraseña:"
                     label-for="password"
                     :class="{ 'is-invalid': submitted && $v.usuario.password.$error }"
             >
                 <b-form-input
                         id="password"
                         aria-describedby="passwordError"
                         ref="password"
                         v-model="$v.usuario.password.$model"
                         type="password"
                         required
                         placeholder="Contraseña"
                         :disabled="cargando">

                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.password.required" id="passwordError" class="text-center">
                     <span v-if="!$v.usuario.password.required">La contraseña es requerida</span>
                     <span v-if="!$v.usuario.password.minLength">Debe tener al menos {{$v.password.$params.minLength.min}} caracteres</span>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group
                     label="Confirma la Contraseña:"
                     label-for="password_confirm"
                     :class="{ 'is-invalid': submitted && $v.usuario.password_confirm.$error }"
             >
                 <b-form-input
                         id="password_confirm"
                         aria-describedby="password_confirmError"
                         ref="password_confirm"
                         v-model="$v.usuario.password_confirm.$model"
                         type="password"
                         required
                         placeholder="Contraseña"
                         :disabled="cargando">

                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.password_confirm.required" id="password_confirmError" class="text-center">
                     <span v-if="!$v.usuario.password_confirm.required">La contraseña es requerida</span>
                     <span v-else-if="!$v.usuario.password_confirm.sameAs">Deben coincidir las contraseñas</span>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group
                     label="Correo:"
                     label-for="email"
                     :class="{ 'is-invalid': submitted && $v.usuario.email.$error }"
             >
                 <b-form-input
                         id="email"
                         aria-describedby="emailError"
                         ref="email"
                         v-model="$v.usuario.email.$model"
                         type="email"
                         required
                         placeholder="Correo"
                         :disabled="cargando">

                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.email.required" id="emailError" class="text-center">
                     <span v-if="!$v.usuario.email.required">El correo es requerido</span>
                     <span v-if="!$v.usuario.email.email">El correo está conformado incorrectamente</span>
                 </b-form-invalid-feedback>
             </b-form-group>

             <b-form-group
                     label="Nombre:"
                     label-for="nombre"
                     :class="{ 'is-invalid': submitted && $v.usuario.nombre.$error }"
             >
                 <b-form-input
                         id="nombre"
                         aria-describedby="nombreError"
                         ref="nombre"
                         v-model="$v.usuario.nombre.$model"
                         type="text"
                         required
                         placeholder="Nombre"
                         :disabled="cargando">

                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.nombre.required" id="nombreError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>

             <b-form-group
                     label="Apellidos:"
                     label-for="apellidos"
                     :class="{ 'is-invalid': submitted && $v.usuario.apellidos.$error }"
             >
                 <b-form-input
                         id="apellidos"
                         aria-describedby="apellidosError"
                         ref="apellidos"
                         v-model="$v.usuario.apellidos.$model"
                         type="text"
                         required
                         placeholder="Apellidos"
                         :disabled="cargando">
                 </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.apellidos.required" id="apellidosError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group
                         label="Salario por Hora:"
                         label-for="salario_hora"
                         :class="{ 'is-invalid': submitted && $v.usuario.salario_hora.$error }"
                 >
                     <b-form-input
                             id="salario_hora"
                             aria-describedby="salario_horaError"
                             ref="salario_hora"
                             v-model.number="$v.usuario.salario_hora.$model"
                             type="text"
                             required
                             placeholder="Salario por hora"
                             :disabled="cargando">
                     </b-form-input>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.salario_hora.required" id="salario_horaError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             </div>

             <div class="col-md-6">
                 <b-form-group
                         label="Escala salarial:"
                         label-for="escala_salarial"
                         :class="{ 'is-invalid': submitted && $v.usuario.escala_salarial.$error }"
                 >
                     <b-form-input
                             id="escala_salarial"
                             aria-describedby="escala_salarialError"
                             ref="escala_salarial"
                             v-model.number="$v.usuario.escala_salarial.$model"
                             type="text"
                             required
                             placeholder="Escala Salarial"
                             :disabled="cargando">
                     </b-form-input>
                     <b-form-invalid-feedback v-if="submitted && !$v.usuario.escala_salarial.required"  id="escala_salarialError" class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </b-form-invalid-feedback>
                 </b-form-group>
                 <b-form-group
                         label="Perfeccionamiento Empresarial:"
                         label-for="perfeccionamiento_empresarial"
                         :class="{ 'is-invalid': submitted && $v.usuario.perfec_empresarial.$error }"
                 >
                     <b-form-input
                             id="perfec_empresarial"
                             aria-describedby="perfec_empresarialError"
                             ref="perfec_empresarial"
                             v-model.number="$v.usuario.perfec_empresarial.$model"
                             type="text"
                             required
                             placeholder="Perfeccionamiento Empresarial"
                             :disabled="cargando">
                     </b-form-input>
                     <b-form-invalid-feedback v-if="submitted && !$v.usuario.perfec_empresarial.required"  id="perfec_empresarialError" class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </b-form-invalid-feedback>
                 </b-form-group>
                 <b-form-group
                         label="Coeficiente:"
                         label-for="coeficiente"
                         :class="{ 'is-invalid': submitted && $v.usuario.coeficiente.$error }"
                 >
                     <b-form-input
                              id="coeficiente"
                             aria-describedby="coeficienteError"
                             ref="coeficiente"
                             v-model.number="$v.usuario.coeficiente.$model"
                             type="text"
                             required
                             placeholder="coeficiente"
                             :disabled="cargando">
                     </b-form-input>
                     <b-form-invalid-feedback v-if="submitted && !$v.usuario.coeficiente.required"   id="coeficienteError" class="text-center">
                         <p class="text-red">Este campo es requerido</p>
                     </b-form-invalid-feedback>
                 </b-form-group>
             <b-form-group id="input-group-6" label="Rol:" label-for="rol"
                           :class="{ 'is-invalid': submitted && $v.usuario.RolId.$error }">
                 <b-form-select
                         id="rol"
                         aria-describedby="rolError"
                         ref="rol"
                         v-model="$v.usuario.RolId.$model"
                         :options="rolSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.RolId.required" id="rolError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group id="input-group-1" label="Denominacion:" label-for="denominacion"
                           :class="{ 'is-invalid': submitted && $v.usuario.DenominacionId.$error }">
                 <b-form-select
                         id="denominacion"
                         aria-describedby="denominacionError"
                         ref="denominacion"
                         v-model="$v.usuario.DenominacionId.$model"
                         :options="denominacionSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.DenominacionId.required" id="denominacionError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group id="input-group-2" label="Área:" label-for="area"
                           :class="{ 'is-invalid': submitted && $v.usuario.areaId.$error }">
                 <b-form-select
                         id="area"
                         aria-describedby="areaError"
                         ref="area"
                         v-model="$v.usuario.areaId.$model"
                         :options="areaSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.areaId.required" id="areaError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group id="input-group-3" label="Cargo:" label-for="cargo"
                           :class="{ 'is-invalid': submitted && $v.usuario.CargoId.$error }">
                 <b-form-select
                         id="cargo"
                         aria-describedby="cargoError"
                         ref="cargo"
                         v-model="$v.usuario.CargoId.$model"
                         :options="cargoSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.CargoId.required"  id="cargoError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
             </b-form-group>
             <b-form-group id="input-group-4" label="Especialidad:" label-for="especialidad"
                           :class="{ 'is-invalid': submitted && $v.usuario.especialidadId.$error }">
                 <b-form-select
                         id="especialidad"
                         aria-describedby="especialidadError"
                         ref="especialidad"
                         v-model="$v.usuario.especialidadId.$model"
                         :options="especialidadSelect()"
                         :disabled="cargando"
                 ></b-form-select>
                 <b-form-invalid-feedback v-if="submitted && !$v.usuario.especialidadId.required" id="especialidadError" class="text-center">
                     <p class="text-red">Este campo es requerido</p>
                 </b-form-invalid-feedback>
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
    import { required, minLength, email,sameAs} from 'vuelidate/lib/validators';
    export default {
        name: "CreateTrabajador",
        data(){
            return{
                errors: [],
                usuario:{username:'',descripcion:'',password:'',password_confirm:'',email:'',RolId:'',nombre:'',apellidos:'',perfec_empresarial:'',coeficiente:'',escala_salarial:'',salario_hora:'',areaId:'',especialidadId:'',CargoId:'',DenominacionId:''},
                cargando:false,
                roles:[],
                escalas:[],
                cargos:[],
                denominacion:[],
                especialidades:[],
                areas:[],
                submitted: false
            }
        },
        computed: {
            ...mapMutations(['logged']),
            // validar()
            // {
            //     return !this.error;
            // },
            // cargar()
            // {
            //     this.cargando=!this.cargando;
            // }
        },
        validations:{
             usuario:{
                    username:{required,minLength: minLength(6)},
                    descripcion:{required},
                    password:{required,minLength: minLength(6)},
                    password_confirm:{required,sameAsPassword:sameAs('password')},
                    email:{required,email},
                    RolId:{required},
                    nombre:{required},
                    apellidos:{required},
                    perfec_empresarial:{required},
                    coeficiente:{required},
                    escala_salarial:{required},
                    salario_hora:{required},
                    areaId:{required},
                    especialidadId:{required},
                    CargoId:{required},
                    DenominacionId:{required},
                }
        },
        methods:{
            crear(){
               this.submitted=true;
                this.$v.$touch();
                // if (this.$v.$invalid) {
                    // 1. Loop the keys
                    // for (let key in Object.keys(this.$v)) {
                        // 2. Extract the input
                        // const input = Object.keys(this.$v)[key];
                        // 3. Remove special properties
                        // if (input.includes("$")) return false;

                        // 4. Check for errors
                        // if (this.$v[input].$error) {
                            // 5. Focus the input with the error
                            // this.$refs[input].focus();
                            // this.$refs.username.focus();
                            // this.$refs.descripcion.focus();
                            // this.$refs.password.focus();
                            // this.$refs.password_confirm.focus();
                            // this.$refs.email.focus();
                            // this.$refs.RolId.focus();
                            // this.$refs.nombre.focus();
                            // this.$refs.apellidos.focus();
                            // this.$refs.perfec_empresarial.focus();
                            // this.$refs.coeficiente.focus();
                            // this.$refs.escala_salarial.focus();
                            // this.$refs.salario_hora.focus();
                            // this.$refs.areaId.focus();
                            // this.$refs.especialidadId.focus();
                            // this.$refs.CargoId.focus();
                            // this.$refs.DenominacionId.focus();    // 6. Break out of the loop
                            // break;
                        // }
                    // }
                    // this.$swal({title:"Error ",type:'error',text: "El formulario contiene errores, por favor revíselo.",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    // return ;
                // }

                this.cargando=true;
                this.$api.post('/proyectista',this.usuario,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.cargando=false;
                    console.log(res);
                    this.$swal({title:"Correcto",type:'success',text:'Proyectista insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }).catch(error=>{
                    console.log(error[0]);
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
                })
            },
            clear(){
                // let u=this.usuario;
                //    this.usuario.username:'',
                //     u.descripcion:'',
                //     u.password:'';
                //     u.password_confirm:{required,sameAs('password')}
                //     u.email:{required,email}
                //     u.RolId:{required}
                //     u.nombre:{required}
                //     u.apellidos:{required}
                //     u.perfec_empresarial:{required}
                //     u.coeficiente:{required}
                //     u.escala_salarial:{required}
                //     u.salario_hora:{required}
                //     u.areaId:{required}
                //     u.especialidadId:{required}
                //     u.CargoId:{required}
                //     u.DenominacionId:{required}
            },
            getRol(){
                this.$api.get("/rol").then(res=>{
                    this.roles=res.data;
                    this.usuario.RolId=null;
                }).catch(err=>{})
            },
            getEscalas(){
                this.$api.get("/escala").then(res=>{
                    console.log(res.data);
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
                    console.log(res.data);
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