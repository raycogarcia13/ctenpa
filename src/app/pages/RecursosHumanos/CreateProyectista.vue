<template>
    <div>
        <b-form>
                <h1>Insertar Trabajador</h1>
            <b-row >
    <div class="col-md-6">
    <b-form-group
                label="Nombre de Usuario:"
                label-for="usuario"
                :class='{ "has-error":errors.username.status==false}'
                >
                <b-form-input
                id="usuario"
                v-model="usuario.username"
                type="text"
                required
                placeholder="Usuario"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.username.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.username.status" :state="validar" class="text-center">
                    {{errors.username.msg}}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                label="Descripción:"
                label-for="descripcion"
                :class='{ "has-error":errors.descripcion.status==false}'
                >
                <b-form-input
                id="descripcion"
                v-model="usuario.descripcion"
                type="text"
                required
                placeholder="Breve descripción del usuario"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.descripcion.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.descripcion.status" :state="validar" class="text-center">
                    {{errors.descripcion.msg}}
                </b-form-invalid-feedback>
            </b-form-group>
             <b-form-group
                label="Contraseña:"
                label-for="password"
                :class='{ "has-error":errors.password.status==false}'
                >
                <b-form-input
                id="password"
                @change="validateAll()"
                v-model="usuario.password"
                :state="errors.password.status"
                autocomplete="false"
                :disabled="cargando"
                type="password"
                required
                placeholder="Contraseña"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!errors.password.status" :state="validar" class="text-center">
                {{errors.password.msg}}
            </b-form-invalid-feedback>
            </b-form-group>
             <b-form-group
                label="Repetir Contraseña:"
                label-for="password-conform"
                :class='{ "has-error":errors.password_confirm.status==false}'
                >
                <b-form-input
                id="password_confirm"
                v-model="usuario.password_confirm"
                @change="validateAll()"
                :state="errors.password_confirm.status"
                :disabled="cargando"
                autocomplete="false"
                type="password"
                required
                placeholder="Repita la Contraseña"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!errors.password_confirm.status" :state="validar" class="text-center">
                {{errors.password_confirm.msg}}
            </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="Correo:"
                label-for="email"
                :class='{ "has-error":errors.email.status==false}'
                >
                <b-form-input
                @change="validateAll()"
                :state="errors.email.status"
                :disabled="cargando"
                id="email"
                v-model="usuario.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.email.status" :state="validar" class="text-center">
                    {{errors.email.msg}}
                </b-form-invalid-feedback>
            </b-form-group>
<b-form-group
                label="Nombre"
                label-for="nombre"
                :class='{ "has-error":errors.nombre.status==false}'
                >
                <b-form-input
                id="nombre"
                v-model="usuario.nombre"
                type="text"
                required
                placeholder="Nombre"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.nombre.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.nombre.status" :state="validar" class="text-center">
                    {{errors.nombre.msg}}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                label="Apellidos:"
                label-for="usuario"
                :class='{ "has-error":errors.apellidos.status==false}'
                >
                <b-form-input
                id="apellidos"
                v-model="usuario.apellidos"
                type="text"
                required
                placeholder="Apellidos"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.apellidos.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.apellidos.status" :state="validar" class="text-center">
                    {{errors.apellidos.msg}}
                </b-form-invalid-feedback>
            </b-form-group>    
            <b-form-group
                label="Perfeccionamiento Empresarial:"
                label-for="perfec_empresarial"
                :class='{ "has-error":errors.perfec_empresarial.status==false}'
                >
                <b-form-input
                id="perfec_empresarial"
                v-model="usuario.perfec_empresarial"
                type="text"
                required
                placeholder="Perfeccionamiento"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.perfec_empresarial.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.perfec_empresarial.status" :state="validar" class="text-center">
                    {{errors.perfec_empresarial.msg}}
                </b-form-invalid-feedback>
            </b-form-group>        
          </div>
    <div class="col-md-6">
        <b-form-group id="input-group-5" label="Cargo:" label-for="cargo" >
            <b-form-select
                    id="cargo"
                    v-model="usuario.cargo_id"
                    :options="cargoSelect()"
                    :disabled="cargando"
            ></b-form-select>
        </b-form-group>
        <b-form-group
                label="coeficiente:"
                label-for="coeficiente"
                :class='{ "has-error":errors.coeficiente.status==false}'
                >
                <b-form-input
                id="coeficiente"
                v-model="usuario.coeficiente"
                type="text"
                required
                placeholder="coeficiente"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.coeficiente.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.coeficiente.status" :state="validar" class="text-center">
                    {{errors.coeficiente.msg}}
                </b-form-invalid-feedback>
            </b-form-group>
        <b-form-group id="input-group-4" label="Escala Salarial:" label-for="escala" >
            <b-form-select
                    id="cargo"
                    v-model="escala_salarial"
                    :options="escalaSelect()"
                    :disabled="cargando"
            ></b-form-select>

        </b-form-group>
           
       <b-form-group
                label="Salario por Hora:"
                label-for="salario_hora"
                :class='{ "has-error":errors.salario_hora.status==false}'
                >
                <b-form-input
                id="salario_hora"
                v-model="usuario.salario_hora"
                type="text"
                required
                placeholder="Salario por Hora"
                @change="validateAll()"
                :disabled="cargando"
                :state="errors.salario_hora.status"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!errors.salario_hora.status" :state="validar" class="text-center">
                    {{errors.salario_hora.msg}}
                </b-form-invalid-feedback>
            </b-form-group>

    <b-form-group id="input-group-3" label="Rol:" label-for="roles" :class='{ "has-error":errors.rol.status==false}'>
                <b-form-select
                id="roles"
                v-model="usuario.RolId"
                :options="rolSelect()"
                @change="validateAll()"
                :state="errors.rol.status"
                :disabled="cargando"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!errors.rol.status" :state="validar" class="text-center">
                    {{errors.rol.msg}}
                </b-form-invalid-feedback>
            </b-form-group>

    <b-form-group id="input-group-8" label="Area:" label-for="area" :class='{ "has-error":errors.areaId.status==false}'>
                <b-form-select
                id="areas"
                v-model="usuario.areaId"
                :options="areaSelect()"
                @change="validateAll()"
                :state="errors.areaId.status"
                :disabled="cargando"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!errors.areaId.status" :state="validar" class="text-center">
                    {{errors.areaId.msg}}
                </b-form-invalid-feedback>
            </b-form-group>

    <b-form-group id="input-group-7" label="Especialidad:" label-for="especialidad" :class='{ "has-error":errors.especialidadId.status==false}'>
                <b-form-select
                id="especialidad"
                v-model="usuario.especialidadId"
                :options="especialidadSelect()"
                @change="validateAll()"
                :state="errors.especialidadId.status"
                :disabled="cargando"
                ></b-form-select>
                <b-form-invalid-feedback v-if="!errors.especialidadId.status" :state="validar" class="text-center">
                    {{errors.especialidadId.msg}}
                </b-form-invalid-feedback>
    </b-form-group>
        <b-form-group id="input-group-6" label="Denominacion:" label-for="denominacion" >
            <b-form-select
                    id="denominacion"
                    v-model="usuario.denominacion_id"
                    :options="denominacionSelect()"
                    :disabled="cargando"
            ></b-form-select>
        </b-form-group>
    </div>
            </b-row>
         

             <div v-if="cargando" class="text-center">
                <b-spinner class="align-middle text-success"></b-spinner>
            </div>
            </b-form>
            <hr>
            <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
            <b-button @click="crear" class="btn-success pull-right">Crear</b-button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
 name:"CreateProyectista",
    data() {
        return {
            usuario:{username:'',descripcion:'',password:'',password_confirm:'',email:'',RolId:'',nombre:'',apellidos:'',perfec_empresarial:'',coeficiente:'',escala_salarial:'',cargo:'',salario_hora:'',areaId:'',especialidadId:'',CargoId:'',DenominacionId:''},
            roles:[],
            escalas:[],
            escala_salarial:[],
            cargos:[],
            denominacion:[],
            especialidades:[],
            areas:[],
            error:null,
            errors:{
                username:{status:null,msg:""},
                descripcion:{status:null,msg:""},
                password:{status:null,msg:""},
                password_confirm:{status:null,msg:""},
                email:{status:null,msg:""},
                rol:{status:null,msg:""},
                nombre:{status:null,msg:""},
                apellidos:{status:null,msg:""},
                perfec_empresarial:{status:null,msg:""},
                coeficiente:{status:null,msg:""},
                escala_salarial:{status:null,msg:""},
                cargo:{status:null,msg:""},                
                salario_hora:{status:null,msg:""},
                areaId:{status:null,msg:""},
                especialidadId:{status:null,msg:""},
            },
            cargando:false
        }
    },
    computed: {
        ...mapMutations(['logged']),
        validar()
        {
            return !this.error;
        },
        // cargar()
        // {
        //     this.cargando=!this.cargando;
        // }
    },
    methods: {
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
        crear()
        {
            this.validateAll();
            console.log(this.error);
            if(this.error)
            {
                this.$swal({title:"Error ",type:'error',text:"El formulario contiene errores, por favor revíselo.",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                return;
            }

            this.cargando=true;
            this.$api.post('/proyectista',this.usuario,{
               headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                }
            }).then(res=>{
                this.cargando=false;
                console.log(this.usuario);
                this.$swal({title:"Correcto",type:'success',text:'Proyectista insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
            }).catch(error=>{
                 this.$swal({title:"Error ",type:'error',text:"Existen errores en el formulario",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                 this.cargando=false;
            })
        },
        validateAll()
        {
            this.clear();
            if(this.usuario.username==='')
            {
                this.errors.username.status=false;
                this.errors.username.msg="Este campo es obligaorio y deben ser mas de 6 caracteres";
                this.error=true;
            }

           if(this.usuario.descripcion==='')
            {
                this.errors.descripcion.status=false;
                this.errors.descripcion.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.usuario.password===''){
                this.errors.password.status=false;
                this.errors.password.msg="Este campo es obligaorio";
                this.error=true;
            }else if(this.usuario.password.length<3){
                this.errors.password.status=false;
                this.errors.password.msg="La conraseña debe tener al menos 3 caracteres";
                this.error=true;
            }else if(this.usuario.password!==this.usuario.password_confirm){
                this.errors.password.status=false;
                this.errors.password_confirm.status=false;
                this.errors.password.msg="Las conraseñas no coinciden";
                this.errors.password_confirm.msg="Las contraseñas no coinciden";
                this.error=true;
            }

            var ermail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(this.usuario.email===''){
                this.errors.email.status=false;
                this.errors.email.msg="Este campo es obligaorio";
                this.error=true;
            }else if(!ermail.test(this.usuario.email))
            {
                this.errors.email.status=false;
                this.errors.email.msg="Correo inválido";
                this.error=true;
            }

           if(this.usuario.nombre==='')
            {
                this.errors.nombre.status=false;
                this.errors.nombre.msg="Este campo es obligaorio";
                this.error=true;
            }

            if(this.usuario.apellidos==='')
            {
                this.errors.apellidos.status=false;
                this.errors.apellidos.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.usuario.perfec_empresarial==='')
            {
                this.errors.perfec_empresarial.status=false;
                this.errors.perfec_empresarial.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.usuario.coeficiente==='')
            {
                this.errors.coeficiente.status=false;
                this.errors.coeficiente.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            // if(this.usuario.escala_salarial==='')
            // {
            //     this.errors.escala_salarial.status=false;
            //     this.errors.escala_salarial.msg="Este campo es obligaorio";
            //     this.error=true;
            // }

            // if(this.usuario.cargo==='')
            // {
            //     this.errors.cargo.status=false;
            //     this.errors.cargo.msg="Este campo es obligaorio";
            //     this.error=true;
            // }
          
            if(this.usuario.salario_hora==='')
            {
                this.errors.salario_hora.status=false;
                this.errors.salario_hora.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.usuario.RolId==null)
            {
                this.errors.rol.status=false;
                this.errors.rol.msg="Debe escoger un rol";
                this.error=true;
            }


          if(this.usuario.especialidadId==null)
            {
                this.errors.especialidadId.status=false;
                this.errors.especialidadId.msg="Debe escoger una especialidad";
                this.error=true;
            }

          if(this.usuario.areaId==null)
            {
                this.errors.areaId.status=false;
                this.errors.areaId.msg="Debe escoger un área";
                this.error=true;
            }
        },
        clear()
        {
           this.errors.username.status=true;
           this.errors.descripcion.status=true;
           this.errors.password.status=true;
           this.errors.password_confirm.status=true;
           this.errors.email.status=true;
           this.errors.nombre.status=true;
           this.errors.apellidos.status=true;
           this.errors.perfec_empresarial.status=true;
           this.errors.coeficiente.status=true;
           // this.errors.cargo.status=true;
           // this.errors.escala_salarial.status=true;
           this.errors.salario_hora.status=true;
           this.errors.rol.status=true;
           this.errors.areaId.status=true;
           this.errors.especialidadId.status=true;
           this.error=false; 
        }
    },
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

<style>

</style>