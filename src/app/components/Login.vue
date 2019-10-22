<template>
    <div>
       <div class="form-box" id="login-box">
            <div class="mx-auto" style="width: 200px;">
                <b-img src="./assets/attr.png" fluid class=""></b-img>
            </div>
            <br>
            <div class="header"><b>C</b>ontrol de <b>T</b>iempo Trabajado</div>
            <form method="post">
                <div class="body bg-white">
                    <div class="form-group">
                        <input type="text" name="userid" class="form-control" placeholder="User ID"/>
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" placeholder="Password"/>
                    </div>          
                    <div class="form-group">
                        <input type="checkbox" name="remember_me"/> Recordar
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="button" @click="sendLogin" class="btn bg-olive btn-block">Entrar</button>  
                    
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
class Usuario{
    constructor(username,password)
    {
        this.username=username,
        this.password=password
    }
}
import { mapState } from 'vuex';
export default {
    name:'login',
    data() {
        return {
            user:{username:null,password:null}
        }
    },
    computed: mapState(['autenticado','user_signed']),
    methods: {
        sendLogin(){
            this.$api.post('login',this.user).then(res=>{
                console.log(res.data);
            })
            
        }
    },
    mounted(){
        if(this.autenticado)
            this.$router.push("/home");

           
    },
}
</script>
