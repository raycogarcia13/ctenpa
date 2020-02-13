<template>
    <div>
        <b-form>
            <h1>Insertar Proyectista</h1>
            <b-row >
                <div class="col-md-6">
                    <b-form-group
                            label="Nombre de Usuario:"
                            label-for="codigo"
                            :class='{ "has-error":errors.codigo.status==false}'
                    >
                        <b-form-input
                                id="usuario"
                                v-model="area.codigo"
                                type="text"
                                required
                                placeholder="Código"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.codigo.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.codigo.status" :state="validar" class="text-center">
                            {{errors.codigo.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                            label="Nombre:"
                            label-for="nombre"
                            :class='{ "has-error":errors.nombre.status==false}'
                    >
                        <b-form-input
                                id="descripcion"
                                v-model="area.nombre"
                                type="text"
                                required
                                placeholder="Breve descripción del usuario"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.nombre.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.nombre.status" :state="validar" class="text-center">
                            {{errors.nombre.msg}}
                        </b-form-invalid-feedback>
                    </b-form-group>


                </div>
                <div class="col-md-6">
                    <b-form-group
                            label="Cargo:"
                            label-for="cargo"
                            :class='{ "has-error":errors.cargo.status==false}'
                    >
                        <b-form-input
                                id="cargo"
                                v-model="usuario.cargo"
                                type="text"
                                required
                                placeholder="Cargo"
                                @change="validateAll()"
                                :disabled="cargando"
                                :state="errors.cargo.status"
                        ></b-form-input>
                        <b-form-invalid-feedback v-if="!errors.cargo.status" :state="validar" class="text-center">
                            {{errors.cargo.msg}}
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
        <b-button @click="crear" class="btn-success pull-right">Crear</b-button>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
        name: "CreateAreas",
        data() {
            return {
                area:{codigo:'',nombre:'',},
                error:null,
                errors:{
                    codigo:{status:null,msg:""},
                    nombre:{status:null,msg:""}
                },
                cargando:false
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>