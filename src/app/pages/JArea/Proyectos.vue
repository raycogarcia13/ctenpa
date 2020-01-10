<template>
  <div>  
     <b-container fluid>
        <b-row>             
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>65</h3>

                  <p>Cumplimiento</p>
                </div>
                <div class="icon">
                  <i class="fa fa-calendar"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>4</h3>
                  <p>Proyectistas</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
          <b-col lg="4">
            <div>
              <!-- small box -->
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>
                    4
                    <sup style="font-size: 20px">%</sup>
                  </h3>

                  <p>Total de Proyectos</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
        </b-row>
         <!-- Main table element -->
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
      </b-container>
    </div>
  
</template>