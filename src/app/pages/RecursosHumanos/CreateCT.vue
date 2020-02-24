<template>
<!--    <div>-->
<!--        <el-button @click="addRow">Add</el-button>-->
<!--        <el-button @click="saveAll">Save All</el-button>-->
<!--        <el-table :data="allproyect" style="width: 100%" max-height="100%">-->
<!--            <el-table-column-->
<!--                    fixed="left"-->
<!--                    prop="nombre"-->
<!--                    label="Nombre"-->
<!--                    width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="tiempos" label="Name" width="120">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-input size="small"-->
<!--                              style="text-align:center"-->
<!--                              v-model="scope.row.tiempos"-->
<!--                              v-for="(lol, index) in scope.row.tiempos" :key="index"-->
<!--                    >-->
<!--                       {{lol}}-->
<!--                    </el-input>-->
<!--                </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column fixed="right" label="Acciones" width="120">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button @click.native.prevent="saveRow(scope.$index, scope.row)" type="text" size="small">-->
<!--                        <i class="fa fa-save"></i>-->
<!--                    </el-button>-->
<!--                    <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">-->
<!--                        <i class="fa fa-trash"></i>-->
<!--                    </el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
<!--        </el-table>-->

<!--        <div>-->
<!--            <ol>-->
<!--                <li v-for="(lol,index) in proyectos" :key="index">{{lol}}</li>-->
<!--            </ol>-->
<!--        </div>-->
<!--    </div>-->
    <ct></ct>

</template>
<script>
    import {mapState} from "vuex";
    import ct from '../../components/ctEdit.vue'
    export default {
        name: "CreateCT",
        components:{
            ct
        },
        data() {
            return {
                options:[],
                tabla:[],
                allproyect:[],
                proyectos:[],
                tableData:[],
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
        },
        mounted() {

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
