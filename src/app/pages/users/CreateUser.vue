<template>
    <div>
             <b-form-group
                label="Nombre de Usuario:"
                label-for="usuario"
                >
                <b-form-input
                id="usuario"
                v-model="usuario.username"
                type="text"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
             <b-form-group
                label="Contraseña:"
                label-for="rol"
                >
                <b-form-input
                id="rol"
                v-model="usuario.password"
                type="password"
                required
                placeholder="Contraseña"
                ></b-form-input>
            </b-form-group>
             <b-form-group
                label="Correo:"
                label-for="rol"
                >
                <b-form-input
                id="rol"
                v-model="usuario.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                <b-form-select
                v-model="usuario.RolId"
                :options="rolSelect()"
                required
                ></b-form-select>
            </b-form-group>

            <b-button @click="crear">Enviar</b-button>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"CreateUser",
    data() {
        return {
            usuario:{},
            roles:[]
        }
    },
    computed: {
        ...mapMutations(['logged'])
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
            this.$api.post("/user",this.usuario,{
                // data:this.usuario,
                headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                }
            }).then(res=>{
                console.log(res);
                this.$swal({title:"Correcto",type:'success',text:'Usuario insertado correctamente',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
            })
        }
    },
    created(){
        this.getRol();
    }
}
</script>