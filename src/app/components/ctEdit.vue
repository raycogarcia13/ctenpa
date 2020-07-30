<template>
      <div>
        <div class="row mb-2">
            <div class="float-left col-md-4"><label for="">Horas del mes: <strong>{{horasMes}}</strong></label></div>
            <br>
            <div class="text-center col-md-4 bg-red " v-if="this.vali===true"><label for="ct" class="text-white" >CT inválido </label></div>
            <br>
            <div class="text-center col-md-4"><label for="">Día de la Semana: <strong>{{diaSemana}}: {{hoursDay}} horas</strong></label></div>
            <br>
        </div>
        <div class="table-responsive-sm">
            <table class="table table-responsive table-borderless table-responsive-sm table-striped" id="tblData">
                <thead class="thead-dark">
                <th>Nombre</th>
                <th v-for="dia in dias" :key="dia">{{dia}}</th>
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
                        <div class="view"  @dblclick="editData(lol,index)">
                            {{mio}}
                        </div>
                        <div class="edit">
                            <input @input="validar(lol,idx)"
                                   name="tiemposI"
                                   class="sumar"
                                   ref="input"
                                   style="width: 30px"
                                   type="text"
                                   @keypress.enter="saveData(lol,index),validate(lol,index)"
                                   v-model.number="lol.tiempos[idx]"/>
                            <div v-if="errors.length" :class="error">
                                <p class="error">l</p>
                            </div>
                        </div>
                       </td>
                    <td class="noPrint">
                        <div class="view noPrint">
                            <button class="btn btn-outline-info" @click="editData(lol,index)">Editar</button>
                        </div>
                        <div class="edit noPrint">
                            <button  class="btn btn-outline-success" @click="saveData(lol,index),validate(lol,index)">Guardar</button>
                        </div>
                    </td>
                </tr>
                </tbody>
                <tfoot class="thead-dark">
               <tr>
                   <th>Total</th>
                   <th v-for="(mio, idx)  in dias" :key="idx">{{ total=rowTotal(idx)  }}
                       <div v-if="total > 9" class="bg-danger rounded-circle text-justify center-align center text-center" style="width: 50px">Error</div>
                   </th>
<!--                   <th> Total del mes:{{totalMes}}</th>-->
               </tr>
                </tfoot>
            </table>
        </div>
       <div class="float-right">
           <div class="pt-2">
               <vue-excel-xlsx
                       class="btn btn-outline-info float-right"
                       :data="datos"
                       :columns="columns"
                       :filename="this.nombrexsl"
                       :sheetname="'sheetname'"
               >
                   Download <span><i class="fa fa-download"></i></span>
               </vue-excel-xlsx>
           </div>
<!--           <button @click="exportTableToExcel('tblData', 'CT:'+getName +'mes:'+ fch )" class="btn btn-outline-info ">Exportar a Excell</button>-->
       </div>
    </div>
</template>

<script>
    import moment from  'moment';
    import Vue from 'vue';
    import {mapState} from "vuex";
    import VueExcelXlsx from "vue-excel-xlsx";
    Vue.use(VueExcelXlsx);
    export default {
        name: "ctEdit",
        data: function() {
            return {
                nombrexsl: moment().locale('es').format('l'),
                totalMes:[],
                HorasM:'',
                HorasD:'',
                horasMes:'',
                hoursDay:'',
                diaSemana:'Viernes',
                fch:new Date().getUTCMonth()+1,
                tabledata: [],
                idTrab:'',
                equipoId:'',
                dias:[],
                editMode: false,
                editedUser: null,
                errors:[],
                vali:false,
                valmes:false,
                Hdiarias:false,
               gettiempos:'',
                getdays:'',
                columns: [
                    {
                        label: "Actividad",
                        field: "nombre",
                    },
                    {
                        label: "mes",
                        field: "mes",
                    },
                    {
                        label: "Anno",
                        field: "anno",
                    },
                    {
                        label: "Tiempo",
                        field: "tiempo",
                    },

                ],
                datos:[],
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
            rowTotal(dia) {
                let sum =0;
                this.tabledata.forEach(function (item) {
                  sum+=item.tiempos[dia]
                });
                return sum;
            },
            totales: async function(){
                // let responseObra= await this.$api.get('control_obra');
                // let responseAct= await this.$api.get('control_act');
                // let dataObra= responseObra.data.map((tiempo,t)=>{
                //    return tiempo+=t.tiempo;
                // });
                // let dataAct= responseAct.data;
                //  console.log(dataObra);
            },
            validate(data){
                let e=this;
                let dia=parseInt(e.getdays)+1;
                let tiempos= e.gettiempos;
                let objVal;

                let d= moment().format("D");
                let dataid=this.idTrab;
                 this.$api.get('/equipo/totalHmes/'+dataid+'/'+data.mes+'/'+data.anno).then(res=>{
                    this.HorasM=res.data.status;
                    if (this.HorasM===true){
                        this.valmes=true;
                        this.$swal({title:"Revise",type:'error',text:"Sobrepaso las horas del mes",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    }
                }).catch(error=>{console.log(error)});

                 this.$api.get('/equipo/totalH/'+dataid+'/'+d+'/'+data.mes+'/'+data.anno).then(res=>{
                    this.Hdiarias=res.data.status;
                    console.log('horas del dia: ',this.Hdiarias);
                     if (this.Hdiarias===true){
                         this.vali=true;
                         this.$swal({title:"Revise",type:'error',text:"Sobrepaso las horas del dia",toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                     }
                }).catch(error=>{console.log(error)});

            },
            validar(e,index) {

                let vale = Object.values(e.tiempos);
                let key = Object.keys(e.tiempos);
                let tmp = vale.length;
                let ctrlA;
                let dia;
                // return console.log(key);

                for (let i = 1; i <=vale.length; i++) {
                    // if (index===""){
                    //     index=0;
                    // }
                    // if (index){
                        ctrlA= vale[index];
                            dia=key[index+1];
                    // }

                }
                // if (ctrlA!==""){
                    this.gettiempos=ctrlA;
                    this.getdays=dia;
                // }

                if (ctrlA <= this.hoursDay ) {
                    return true;
                }
                this.errors = [];
                if (ctrlA > 9) {
                    this.$swal({title:"Verifique",type:'error',text:'Las Horas deben ser menor o igual que '+this.hoursDay,toast:true,position:'top-end',showConfirmButton:false,timer:5000});
                }
                if (this.diaSemana==='Viernes') {
                    this.$swal({title:"Verifique",type:'error',text:'Hoy es viernes las horas deben ser menor que 8',toast:true,position:'top-end',showConfirmButton:false,timer:5000});
                }
                // e.preventDefault();
            },
            getTrabxId(){
             this.$api.get('/equipo/trab/' + this.user_signed.id).then(res=>{
                   this.idTrab = res.data.id;
                   console.log('Este es el id del trabajador',this.idTrab, this.user_signed.id)
                }).catch(error=>{console.log(error)});

            },
            getEquiXtrab(){
                 this.$api.get('/equipo/equixtrab/' + this.user_signed.id).then(res=>{
                    this.equipoId = res.data.id;
                }).catch(error=>{console.log(error)});

            },
            saveData(midata,index) {
                 if (this.vali===false){
                    if(midata.typ=='obras'){
                        let vale = Object.values(midata.tiempos);
                        let trabId=this.idTrab;
                        let obj2;
                        obj2 = {
                            mes: midata.mes,
                            anno: midata.anno,
                            tiempos: vale,
                            TrabajadorId: trabId,
                            SubProyectoId: midata.SubProyectoId,
                        };

                        this.$api.post('/control_obra/', obj2);
                        this.$swal({title:"Correcto",type:'success',text:'Horas insertadas correctamente en el Proyecto',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    }

                    if (midata.typ=='actividades'){
                        let trabId=this.idTrab;
                        let vale = Object.values(midata.tiempos);
                        let obj1;
                        obj1 = {
                            mes: midata.mes,
                            anno: midata.anno,
                            tiempos: vale,
                            ActividadeId: midata.id,
                            TrabajadorId: trabId
                        };
                        this.$api.post('/control_act/', obj1);
                        console.log('esta es l adta',midata);
                        this.$swal({title:"Correcto",type:'success',text:'Horas insertadas correctamente en la Actividad',toast:true,position:'top-end',showConfirmButton:false,timer:3000});
                    }

                }else   {
                    this.$swal({title:"Espere",type:'warning',text:'Hay algo mal con su CT reviselo por favor',toast:true,position:'top-end',showConfirmButton:false,timer:5000});
                    this.vali=false;
                }

            },
            editData (data) {
                this.beforEditCache = data;
                this.editedUser = data;
            },
            getHorasMes(){
                let em =this;
                this.$api.get('/fechas/horasMes/').then(res=>{
                    em.horasMes = res.data.hours;
                }).catch(error=>{console.log(error)});
            },
            getDias(){
                this.$api.get('/fechas/dias/').then(res=>{
                    for (let i = 1; i <=res.data; i++) {
                        this.dias.push(i);
                    }
                }).catch(error=>{console.log(error)});
            },
            getDiasSemana(){
                this.$api.get('/fechas/dia_semana/').then(res=>{
                    this.diaSemana=res.data.name;
                }).catch(error=>{console.log(error)});
            },
            getDiasS(){
                this.$api.get('/fechas/dia_semana/').then(res=>{
                    this.HorasD=res.data.dia;
                }).catch(error=>{console.log(error)});
            },
            getProyectosById(uid){
                this.$api.post('/equipo/ct/'+this.user_signed.id,{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.tabledata = res.data;
                    this.datos = res.data;
                    console.table(this.tabledata);
                }).catch(error=>{console.log(error)})
            },
            getHousrDay(){
                this.$api.get('/fechas/day_hours/',{
                    headers:{
                        'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                    }
                }).then(res=>{
                    this.hoursDay = res.data.hours;
                    // this.hoursDay = 9;
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
            this.getHorasMes();
            this.getDiasSemana();
            this.getHousrDay();
            this.getDiasS();
            this.rowTotal();
            this.totales();
            // this.validate();
           }
    }
</script>

<style scoped type="text/css" media="print">
    /*@import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");*/
    .el-table__row .el-input .el-input__inner{
        border-style:none;
    }
    .hover-row .input .el-input__inner{
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
    @media print {
        .noPrint {display:none;}
    }
    .error input{
        color: red;
    }
</style>
