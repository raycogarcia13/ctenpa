<template>
    <div>
        <template>
            <el-button @click="addRow">Agregar</el-button>
            <el-button @click="saveAll">Guardar Todo</el-button>

            <el-table :data="tableData" style="width: 100%" height="90%">
                <el-table-column fixed="left" label="Actividades" width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.actividad" placeholder="Select">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.actividad">
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="scope" :data="proyectos">
                        <el-input  v-model="scope.row.nombre" ize="small"
                                   style="text-align:center">

                        </el-input>
                    </template>
                </el-table-column>

                <!--                    del proyecto-->
                <el-table-column  label="Proyectos" width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.codigo" placeholder="Select">
                            <el-option
                                    v-for="item in allproyect"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.Sub_proyecto.Proyecto.codigo">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="actividad" label="Name" width="120">
                    <template slot-scope="scope">
                        <el-input size="small"
                                  style="text-align:center"
                                  v-model="scope.row.actividad"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="tiempo_d" label="Tiempo" width="100">
                    <template slot-scope="scope">
                        <el-input size="small"
                                  style="text-align:center"
                                  v-model="scope.row.tiempo_d"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="pro_ratea" label="Pro Ratea" width="300">
                    <template slot-scope="scope">
                        <el-input size="small"
                                  style="text-align:center"
                                  v-model="scope.row.pro_ratea"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        header-align="center"
                        align="center"
                        prop="productiva"
                        label="Productiva"
                >
                  <template slot-scope="scope">
                      <el-switch
                              style="display: block"
                              v-model="scope.row.productiva"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                              v-if="scope.row.productiva===true"
                              active-text="SI">
                      </el-switch>
                      <el-switch
                              style="display: block"
                              v-model="scope.row.productiva"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                              v-else
                              inactive-text="NO">
                      </el-switch>
                  </template>
                </el-table-column>

                <el-table-column fixed="right" label="Acciones" width="120">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="saveRow(scope.$index, scope.row)" type="text" size="small">
                            <i class="fa fa-save"></i>
                        </el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">
                            <i class="fa fa-trash"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
             <div>
                 <ol>
                     <li v-for="(pelicula, index) in allproyect" :key="index">{{ pelicula }}</li>
                 </ol>

             </div>
        </template>

    </div>

</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "CreateCT",
        data() {
            return {
                options:[],
                allproyect:[],
                proyectos:[],
                tableData:[
                    { key:'index'},
                    { key:'actividad'},
                    { key:'tiempo_d'},
                    { key:'pro_ratea'},
                    { key:'productiva'},
                    { key:'actions'}],
                este:[[this.tableData

                ]],
                addCount:0
            }
        },
        computed:{
            ...mapState(['siderShow','user_signed']),
            capitalizeUs()
            {
             return this.user_signed.username.charAt(0).toUpperCase() + this.user_signed.username.slice(1);
            },
        },

    methods: {
        deleteRow(index, rows) {
            this.tableData.splice(index, 1);
            if(this.addCount > 0)
                -- this.addCount;
        },
        saveRow(index, rows) {
            //  api
        },
        addRow:function(){
            let newRow  = {
                tiempo_d:0.5,

            };
            this.tableData = [newRow,...this.tableData];
            ++ this.addCount;
        },
        saveAll:function(){
            // api
            console.log(JSON.stringify(this.disabledList));
        },
        getActividades(){
         this.$api.get("/actividad").then(res=>{
             this.tableData = res.data;
             this.options = res.data;
         }).catch(err=>{
             console.log(err);
         })
        },
        actividadesSelect(){
            let opt=[];
            opt.push({text:'Escoja un elemento',value:null});
            this.options.forEach(function(element) {
                opt.push({text:element.actividad,value:element.id});
            });
            return opt;
        },
        getProyectosById(uid){
             // uid = this.user_signed.id;
            this.$api.post('/equipo/ct/'+uid,{
                headers:{
                    'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                }
            }).then(res=>{
                this.proyectos = res.data;
                // let opt=[];
                // this.proyectos.forEach(function(element) {
                //     opt.push({text:element.Sub_proyecto.Proyecto.codigo,value:element.id});
                // });
                this.allproyect = res.data;
             console.log(this.proyectos);
             console.log(this.allproyect.Sub_proyecto.Proyecto.descripcion);
            }).catch(error=>{console.log(error)})

        }
    },
    mounted() {
            this.getActividades();
            console.log(this.getProyectosById(15));
            console.log(this.proyectos.codigo);
    }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");
    .el-table__row .el-input .el-input__inner{
        border-style:none;
    }
    .hover-row .el-input .el-input__inner{
        border-style:solid;
    }


</style>