<template>
    <div>
        <b-form>
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
    name:"CreateUser",
    data() {
        return {
            usuario:{username:'',password:'',password_confirm:'',email:'',RolId:''},
            roles:[],
            error:null,
            errors:{
                username:{status:null,msg:""},
                password:{status:null,msg:""},
                password_confirm:{status:null,msg:""},
                email:{status:null,msg:""},
                rol:{status:null,msg:""}
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
        cargar()
        {
            this.cargando=!this.cargando;
        }
    },
    methods: {
        getRol(){
            this.$api.get("/rol").then(res=>{
                this.roles=res.data;
                     // this.usuario.RolId=this.roles[0].id;
                this.usuario.RolId=null;
            }).catch(err=>{

            })
        },
        rolSelect(){
            let opt=[];
                opt.push({text:'Escoja un elemento',value:null});
            this.roles.forEach(function(element) {
                opt.push({text:element.name,value:element.id});
            });
            return opt;
        },
        crear()
        {
            this.validateAll();
            if(this.error)
            {
                this.$swal({title:"Error ",type:'error',text:"El formulario contiene errores, por favor revíselo.",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                return;
            }

            this.cargando=true;
            this.$api.post("/user",this.usuario,{
                // data:this.usuario,
                headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                }
            }).then(res=>{
                this.cargando=false;
                this.$swal({title:"Correcto",type:'success',text:'Usuario insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
            }).catch(error=>{
                 this.$swal({title:"Error ",type:'error',text:"Existen errores en el formulario",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                this.cargando=false;
            })
        },
        validateAll()
        {
            this.clear();
            if(this.usuario.username=='')
            {
                this.errors.username.status=false;
                this.errors.username.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.usuario.password==''){
                this.errors.password.status=false;
                this.errors.password.msg="Este campo es obligaorio";
                this.error=true;
            }else if(this.usuario.password.length<3){
                this.errors.password.status=false;
                this.errors.password.msg="La conraseña debe tener al menos 3 caracteres";
                this.error=true;
            }else if(this.usuario.password!=this.usuario.password_confirm){
                this.errors.password.status=false;
                this.errors.password_confirm.status=false;
                this.errors.password.msg="Las conraseñas no coinciden";
                this.errors.password_confirm.msg="Las conraseñas no coinciden";
                this.error=true;
            }

            var ermail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(this.usuario.email==''){
                this.errors.email.status=false;
                this.errors.email.msg="Este campo es obligaorio";
                this.error=true;
            }else if(!ermail.test(this.usuario.email))
            {
                this.errors.email.status=false;
                this.errors.email.msg="Correo inválido";
                this.error=true;
            }

            if(this.usuario.RolId==null)
            {
                this.errors.rol.status=false;
                this.errors.rol.msg="Debe escoger un rol";
                this.error=true;
            }
        },
        clear()
        {
           this.errors.username.status=true;
           this.errors.password.status=true;
           this.errors.password_confirm.status=true;
           this.errors.email.status=true;
           this.errors.rol.status=true;
           this.error=false; 
        }
    },
    created(){
        this.getRol();
    }
}
</script>