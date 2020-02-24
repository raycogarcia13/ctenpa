<template>
    <div>
        <div>
            <table class="table table-responsive table-bordered" id="tblData">
                <thead>
                <th>Nombre</th>
                <th v-for="dia in dias">{{dia}}</th>
                </thead>
                <tbody>
                <tr v-for="(lol,index) in tabledata" :key="index" :class="{editing: lol == editedUser}" v-cloak>
                    <td>
                        <div class="view">
                            {{lol.nombre}}
                        </div>
                        <div class="edit">
                            {{lol.nombre}}
                        </div>
                    </td>
                    <td v-for="(mio, idx)  in lol.tiempos" :key="idx">
                        <div class="view">
                            {{mio}}
                        </div>
                        <div class="edit">
                            <input type="text" v-model.number="lol.tiempos[idx]"/>
                        </div>
                       </td>
                    <td>
                        <div class="view">
                            <button class="btn btn-outline-info" @click="editData(lol,index)">edit</button>
                        </div>
                        <div class="edit">
                            <button  class="btn btn-outline-success" @click="saveData(lol,index)">save</button>
                        </div>
                    </td>
                    <td><button class="btn btn-outline-danger" >delete</button></td>
                </tr>
                </tbody>
            </table>
        </div>
       <div class="float-right">
           <button @click="exportTableToExcel('tblData', 'CT:'+getName +'mes:'+ fch )" class="btn btn-outline-info ">Exportar a Excell</button>
       </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "ctEdit",
        data: function() {
            return {
                fch:new Date().getUTCMonth()+1,
                tabledata: [],
                idTrab:{},
                equipoId:{},
                dias:[],
                editMode: false,
                editedUser: null,
            }
        },
        computed:{
            ...mapState(['siderShow','user_signed']),
            capitalizeUs()
            {
                return this.user_signed.username.charAt(0).toUpperCase() + this.user_signed.username.slice(1);
            },
            getName()
            {
                return this.user_signed.username;
            },

        },
        methods: {
            getTrabxId(){
              let us =  this.$api.get('/equipo/trab/' + this.user_signed.id).then(res=>{
                   this.idTrab = res.data;
                }).catch(error=>{console.log(error)});
                // return us;
            },
            getEquiXtrab(){
                let us =  this.$api.get('/equipo/equixtrab/' + this.user_signed.id).then(res=>{
                    this.equipoId = res.data;
                }).catch(error=>{console.log(error)});
                // return us;
            },
            saveData(data,index) {
                console.log(data);
                if(data.typ=='obras'){
                    let ekipId = this.equipoId.id;
                    var ke = Object.keys(data.tiempos);
                    var vale = Object.values(data.tiempos);
                    var obj={};
                    var tmp={};

                    for (let i = 0; i <vale.length ; i++) {
                        obj={
                            dia: i+1,
                            mes:data.mes,
                            anno:data.anno,
                            tiempo:vale[i],
                            EquipoId:ekipId
                        };
                        // const union = Object.assign(obj, tmp);
                        // console.log(obj)
                       this.$api.post('/control_obra/',obj);
                    }
                    this.$swal({title:"Correcto",type:'success',text:'Horas insertadas correctamente en el Proyecto',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }


                if (data.typ=='actividades'){
                    let trabId=this.idTrab.id;
                    var ke = Object.keys(data.tiempos);
                    var vale = Object.values(data.tiempos);
                    var obj;
                    // for (let i = 0; i <vale.length ; i++) {
                        obj={
                            mes:data.mes,
                            anno:data.anno,
                            tiempos:vale,
                            // dia: i+1,
                            ActividadeId:data.id,
                            TrabajadorId:trabId
                        };
                        this.$api.post('/control_act/',obj);
                    // }
                    this.$swal({title:"Correcto",type:'success',text:'Horas insertadas correctamente en la Actividad',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                }

            },
            editData (data) {
                this.beforEditCache = data;
                this.editedUser = data;
            },
            cantDaysMonth(mes, anno) {
                switch (mes) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                    case 2:
                        if (anno % 100 == 0)
                            if (anno % 400 == 0)
                                return 29;
                            else
                                return 28;
                        else if (anno % 4 == 0)
                            return 29;
                        else
                            return 28;
                }
                return 0;
            },
            getDias(){
                let mes = new Date().getMonth();
                let year = new Date().getFullYear();
                for (let i = 1; i <=this.cantDaysMonth(mes +1,year) ; i++) {
                    this.dias.push(i);
                }
            },
            getProyectosById(uid){
                this.$api.post('/equipo/ct/'+this.user_signed.id,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.tabledata = res.data;
                }).catch(error=>{console.log(error)})
            },

            // exportar a excell
        exportTableToExcel(tableID, filename = ''){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename?filename+'.xls':this.getName+this.fch +'.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML ;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
        },

        },
        mounted: function() {
            this.getProyectosById();
            this.getDias();
            this.getTrabxId();
            this.getEquiXtrab();
            // this.exportTableToExcel();
            console.log(this.user_signed);

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
    [v-cloak] {
        display: none;
    }
    .edit {
        display: none;
    }
    .editing .edit {
        display: block
    }
    .editing .view {
        display: none;
    }
</style>