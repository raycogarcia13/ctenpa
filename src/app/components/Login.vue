<template>
    <div>
       <div class="form-box" id="login-box">
            <div class="mx-auto" style="width: 200px;">
                <b-img src="/app/assets/attr.png" fluid class=""></b-img>
            </div>
            <br>
            <div class="header"><b>C</b>ontrol de <b>T</b>iempo Trabajado</div>
            <form method="post">
                <div class="body bg-white">
                    <div class="form-group" :class='{ "has-error":validar}'>
                        <b-input type="text" v-validate="'required'" @keyup.enter="sendLogin" :disabled="cargando" :state="validar" v-model="user.username" class="form-control" placeholder="Nombre de Usuario"/>
                    </div>
                    <div class="form-group">
                        <input type="password" v-validate="'required|min:5'" @keyup.enter="sendLogin" :disabled="cargando"  :state="validar" v-model="user.password" class="form-control" placeholder="Contraseña"/>
                        <b-form-invalid-feedback :state="validar" class="text-center">
                           {{error}}
                        </b-form-invalid-feedback>
                    </div>          
                    <div class="form-group">
                        <input type="checkbox" name="remember_me"/> Recordar
                    </div>
                    <div v-if="cargando" class="text-center">
                        <b-spinner class="align-middle text-success"></b-spinner>
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="button" :disabled="cargando" @click="sendLogin" class="btn bg-olive btn-block">Entrar</button>  
                    
                    <router-link :to="{ name:'home' }" class="text-center">Registrar <code class="text-warning">solo para desarrollo</code></router-link>
                </div>
            </form>

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
            user:{username:null,password:null},
            error:null,
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
            this.cargar;
            this.$api.post('login',this.user).then(res=>{
                    this.cargar;
                    this.$router.go('/home');
                    let tkn=res.headers.secret;
                    let user=res.data.data.user;
                    user.token=tkn;
                    this.sigin(user);
                    this.$swal({title:"Login",type:'success',text:'Bienvenido al sitio',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
            }).catch((error)=> {
                    this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    this.cargando=false;
            })
            
        }
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
