<template>
    <div>
        <b-form>
            <b-row>
                <div class="col-md-6">
                    <b-form-group
                            label="Actividad:"
                            label-for="actividad"
                    >
                        <b-form-input
                                id="actividad"
                                v-model="actividades.actividad"
                                type="text"
                                required
                                placeholder="Actividad"
                        >
                        </b-form-input>
                    </b-form-group>


                    <b-form-group
                            label="Tiempo a Emplear:"
                            label-for="cod_ct"
                    >
                        <b-form-input
                                id="tiempo_d"
                                v-model="actividades.tiempo_d"
                                type="text"
                                required
                                placeholder="Tiempo" >

                        </b-form-input>
                    </b-form-group>


                    <b-form-group
                            label="Actividad Pro_ratea:"
                            label-for="pro_ratea"
                    >
                        <b-form-input
                                id="sub_valor"
                                v-model="actividades.pro_ratea"
                                type="text"
                                required
                                placeholder="Valor Total"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group
                            label-for="terminado"
                    >
                        <b-form-checkbox v-model="actividades.productiva" name="check-button" button button-variant="info">
                            Productiva => <b v-if="actividades.productiva===true">SI</b> <b v-else>NO</b>
                        </b-form-checkbox>
                    </b-form-group>
                    <b-form-group
                            label="Empresa:"
                            label-for="EmpresaId">
                        <b-form-select
                                id="AreaId"
                                v-model.number="actividades.EmpresaId"

                        ></b-form-select>
                    </b-form-group>

                    <hr>
                    <b-button @click="$router.back()" class="btn-danger">Atrás</b-button>
                    <b-button @click="crear" class="btn-success pull-right">Crear SubProyecto</b-button>
                </div>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "ctEdit",
        data(){
            return{
                actividades:{actividad:'',tiempo_d:'',pro_ratea:'',productiva:false,EmpresaId:1},
                empresa:[]
            }
        },
        computed:{

        }
    }
</script>

<style scoped>

</style>