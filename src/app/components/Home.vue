<template>
  <div>
    <div class="content-header">
      <h2>
        Bienvenido
        <small>
          <code>Control panel</code>
        </small>
      </h2>
    </div>
    <div class="content">
      <b-container fluid>
        <b-row>
          <b-col lg="3">
            <div>
              <!-- small box -->
              <div class="small-box bg-info">
                <div class="inner">
                  <h3 v-text="alluser"></h3>
                  <p>Total de Usuarios</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="#" class="small-box-footer">
                  More info
                  <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          </b-col>
          <b-col lg="3">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>65</h3>

                  <p>Unique Visitors</p>
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
          <b-col lg="3">
            <div>
              <!-- small box -->
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>{{alluser}}</h3>
                  <p>Unique Visitors</p>
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
          <b-col lg="3">
            <div>
              <!-- small box -->
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>
                    53
                    <sup style="font-size: 20px">%</sup>
                  </h3>

                  <p>Bounce Rate</p>
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
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "Home",
  data() {
    return {
      alluser: ''
    };
  },
  methods: {
    countUsers() {
     this.$api.post('user/count',{
              headers:{
                  'secret':JSON.parse(sessionStorage.getItem('ctenpa-secret'))
              }}).then(res=>{
                this.alluser=res.data;
                // this.alluser=res.send('hello')
               console.log('locol');           
                        
            }).catch(err=>{
              console.log(err)
            })
    },

  
  },
  computed: {
    ...mapMutations(["logged"])
  },
  mounted() {
    this.countUsers();
    console.log('baff');
  }
    
};
</script>