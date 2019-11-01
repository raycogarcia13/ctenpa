<template>
    <div>
       <div class="form-box" id="login-box">
            <div class="mx-auto" style="width: 200px;">
                <b-img src="/app/assets/attr.png" fluid class=""></b-img>
            </div>
            <br>
            <div class="header"><b>C</b>ontrol de <b>T</b>iempo Trabajado</div>
            <b-form>
                <div class="body bg-white">
                    <div class="form-group" :class='{ "has-error":errors.username.status}'>
                        <b-input type="text" @change="validateAll()" @keyup.enter="sendLogin" :disabled="cargando"  :state="errors.username.status"  v-model="user.username"  class="form-control" placeholder="Nombre de Usuario"/>
                        <b-form-invalid-feedback v-if="!errors.username.status" :state="validar" class="text-center">
                           {{errors.username.msg}}
                        </b-form-invalid-feedback>
                    </div>
                    <div class="form-group">
                        <b-input type="password" autocomplete="false" @change="validateAll()" @keyup.enter="sendLogin" :disabled="cargando"  :state="errors.password.status"  v-model="user.password"  class="form-control" placeholder="Contraseña"/>
                        <b-form-invalid-feedback v-if="!errors.password.status" :state="validar" class="text-center">
                           {{errors.password.msg}}
                        </b-form-invalid-feedback>
                    </div>          
                    <b-form-checkbox
                        id="checkbox-1"
                        v-model="recordar"
                        value=true
                        unchecked-value=false
                        >
                        Recordarme
                    </b-form-checkbox>


                    <div v-if="cargando" class="text-center">
                        <b-spinner class="align-middle text-success"></b-spinner>
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="button" :disabled="cargando" @click="()=>{validateAll(); sendLogin()}" class="btn bg-olive btn-block">Entrar</button>  
                </div>
            </b-form>

            <div class="margin text-center">
                Desarrollado por <code>r@ncode</code> <b-img ></b-img>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState,mapActions } from 'vuex';
export default {
    name:'login',
    data() {
        return {
            user:{username:'',password:''},
            recordar:false,
            error:null,
            errors:{
                username:{status:null,msg:""},
                password:{status:null,msg:""}
            },
            cargando:false
        }
    },
    computed: {
        ...mapState(['autenticado']),
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
        ...mapActions(['sigin']),
        sendLogin(){
            if(this.error)
            {
                this.$swal({title:"Error ",type:'error',text:"El formulario contiene errores, por favor revís   elo.",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                return;
            }

            this.cargar;
            this.$api.post('login',this.user).then(res=>{
                    this.cargar;
                    this.$router.go('/home');
                    let tkn=res.headers.secret;
                    let user=res.data.data.user;
                    user.token=tkn;
                    this.sigin(user);
                    this.$swal({title:"Login",type:'success',text:'Bienvenido al sitio',toast:true,position:'top',showConfirmButton:false,timer:3000});

            }).catch((error)=> {
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
            })
            
        },
        validateAll()
        {
            this.clear();
            if(this.user.username=='')
            {
                this.errors.username.status=false;
                this.errors.username.msg="Este campo es obligaorio";
                this.error=true;
            }
            
            if(this.user.password==''){
                this.errors.password.status=false;
                this.errors.password.msg="Este campo es obligaorio";
                this.error=true;
            }else if(this.user.password.length<3){
                this.errors.password.status=false;
                this.errors.password.msg="La conraseña debe tener al menos 3 caracteres";
                this.error=true;
            }
        },
        clear()
        {
           this.errors.username.status=true;
           this.errors.password.status=true;
           this.error=false; 
        }
    },
    created(){
        this.clear();
    },
    mounted(){
        // this.$api.post('user',{
        //     username:'kronos',
        //     password:'kronosk13',
        //     email:'rayco.garcia13@nauta.cu',
        //     des:'Administrador Rayco',
        //     RolId:'90f07d16-f4f7-11e9-b0b3-6155f7e7f629',
        // })

           
    },
}
</script>
