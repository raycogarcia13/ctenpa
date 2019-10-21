<template>
    <div>
        <h1>Login</h1>

            <input type="text" name="username" v-model="user.username">
            <input type="password" name="password" v-model="user.password">
            <button @click="sendLogin">Entrar</button>

            <b-alert show>Default Alert</b-alert>
            <span>Error de autenticacion</span>
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
export default {
    name:'login',
    data() {
        return {
            user:new Usuario()
        }
    },
    methods: {
        sendLogin(){
            console.log(this.user);
            this.user=new Usuario();
            this.$router.push('/home')
        }
    },
    mounted(){
    },
}
</script>