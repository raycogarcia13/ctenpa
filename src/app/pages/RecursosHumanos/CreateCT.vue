<template>
   <div>
       <ct></ct>
   </div>
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
    /*@import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");*/
    .el-table__row .el-input .el-input__inner{
        border-style:none;
    }
    .hover-row .el-input .el-input__inner{
        border-style:solid;
    }
</style>
