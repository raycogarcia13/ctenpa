<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Filtrar"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      hover
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :busy="isBusy" 
      @filtered="onFiltered"
    >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle text-success"></b-spinner>
        <strong class="text-success">Obteniendo datos...</strong>
      </div>
<!-- botones -->
      <template v-slot:cell(number)="row">
        <span v-html="row.index+1"></span>
      </template>
      <template v-slot:cell(createdAt)="data">
        <span v-html="formatedDate(data.value)"></span>
      </template>
      <template v-slot:cell(Rol.name)="data">
        <span v-html="formatedROl(data.value)"></span>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="warning" @click="passwd(row.item)" class="mr-1"><i class="fa fa-key"></i> </b-button>
        <b-button size="sm" variant="success" @click="edit(row.item)" class="mr-1"><i class="fa fa-edit"></i> </b-button>
        <b-button size="sm" variant="danger" @click="deleteUser(row.item)" class="mr-1"><i class="fa fa-trash"></i> </b-button>
        <b-button size="sm" variant="primary" @click="row.toggleDetails">
          {{ row.detailsShowing ? '-' : '+' }} 
        </b-button>
      </template>
<!-- detalles de la fila -->
      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <!-- pagination -->
    <b-row>
       <b-col offset-md="8" offset-sm="6" sm="6" md="4" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" ok-variant="success" :title="infoModal.title" @ok="editarUser" @hide="resetInfoModal">
      <pre v-if="infoModal.content!=''" >{{ infoModal.content }}</pre>
      <div v-else>
          <form>
               <b-form-group> <b-form-input
                v-model="user.username"
                type="text"
                placeholder="Usuario"
                ></b-form-input></b-form-group><b-form-group>
                <b-form-input
                v-model="user.email"
                type="text"
                placeholder="correo"
                ></b-form-input></b-form-group>
          </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [],
        fields: [
          { key: 'number', label: '#' },
          { key: 'username', label: 'Usuario', sortable: true, sortDirection: 'desc' },
          { key: 'email', label: 'Correo', sortable: true, sortDirection: 'desc' },
          { key: 'descripcion', label: 'Descripcion', sortable: true, sortDirection: 'desc' },
          { key: 'Rol.name', label: 'Rol', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        filter: null,
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        isBusy:false,
        user:{}

      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.getData();
    },
    methods: {
      edit(item) {
        this.infoModal.title = `Editar Usuario: ${item.username}`
        this.infoModal.content = '';
        
        this.user.username=item.username;
        this.user.email=item.email;

        this.$root.$emit('bv::show::modal', this.infoModal.id);
      },
      editarUser(event){
        event.preventDefault();
        // this.$root.$emit('bv::show::modal', this.infoModal.id);
        console.log(this.$event);
        // alert('si');
      },
      passwd(item,error='') {
          this.$swal({
          title: 'Cambiar contraseñas',
          html:
            '<form><input id="swal-input1" placeholder="Contraseña nueva" type="password" autocomplete="false" class="swal2-input">' +
            '<input id="swal-input2" placeholder="Repita la contraseña nueva" type="password" autocomplete="false" class="swal2-input">'+
            '<span class="text-center text-danger">'+error+'</span></form>',
          focusConfirm: false,
          preConfirm: () => {
            return {
              pass:document.getElementById('swal-input1').value,
              pass2:document.getElementById('swal-input2').value
            }
          }
        }).then(values=>{
          if(values.dismiss)
            return;
          let pass=values.value.pass;
          let pass2=values.value.pass2;
          if(pass=='' || pass.length<3)
          {
            return this.passwd(item,'La contraseñas no puede estar en blanco o debe tener al menos 3 caracteres');
          }
          else if(pass!=pass2){
            return this.passwd(item,'Las contraseñas no coinciden');
          }

           let url='/user/changePassAdmin/'+item.id;
              this.$api.put(url,{
                    password:pass,
                  },{
                  headers:{
                      'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                  },
                  
              }).then(res=>{
                  this.$swal({title:"Correcto",type:'success',text:'Contraseña actualizada correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                  this.getData();
              }).catch(error=>{
                  this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
              })

        })
      },
      deleteUser(item)
      {
        this.$swal({
          title: 'Eliminar usuario?',
          text: "Está seguro de querer eliminar al usuario "+item.username+"!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar!'
        }).then((result) => {
          if (result.value) {

              let url='/user/'+item.id;
              this.$api.delete(url,{
                  headers:{
                      'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
                  }
              }).then(res=>{
                  this.$swal({title:"Correcto",type:'success',text:'Usuario eliminado correctamente',toast:true,position:'top',showConfirmButton:false,timer:3000});
                  this.getData();
              }).catch(error=>{
                  this.$swal({title:"Error ",type:'error',text:error.response.data,toast:true,position:'top-end',showConfirmButton:false,timer:3000});
              })
          }
        })
      },
      resetInfoModal() {
        this.infoModal.title = '';
        this.infoModal.content = '';
      },
      changePassword(item,index,button)
      {

      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      getData()
      {
          this.isBusy=true;
          this.$api.get("/user",{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }
          }).then(res=>{
              this.isBusy=false;
              this.items=res.data;
              this.totalRows = this.items.length
          }).catch(err=>{
              this.isBusy=false;
              console.log(err); 
          })
      },
      formatedROl(data)
      {
        if(data=='Administrador')
          return '<span class="badge badge-danger">'+data+'</span>';
        if(data=='RHumanos')
          return '<span class="badge badge-info">'+data+'</span>';
        
        return data;
      },
      formatedDate(data)
      {
        data=new Date(data);
        let day=data.getDate();
        let month=data.getMonth();
        let year=data.getFullYear();
        console.log(data);
        return `${day}/${month}/${year}`;
      }
    }
  }
</script>