<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mainnavbar row g-0">
      <div class="responsivenav col-sm-10">
        <ul class="navbar-nav me-auto ms-3">
          <li class="nav-item ms-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/">
              <i class="fa fa-home fa-lg" aria-hidden="true"></i>&nbsp;<b>Home</b>
            </router-link>
          </li>

          <li class="nav-item ms-4">
            <router-link
              class="nav-link text-dark font-weight-bold"
              to="/trades"
              ><i class="fa fa-handshake fa-lg"></i>&nbsp;<b>Trades</b></router-link
            >
          </li>
          <li class="nav-item ms-4" v-if="user!=null && userinfo.role=='user'"> 
            <router-link class="nav-link text-dark font-weight-bold" to="/edit"
              ><i class="fas fa-edit fa-lg"></i>&nbsp;<b>Edit Trade</b></router-link
            >
          </li>
           <li class="nav-item ms-4" v-if="user!=null"> 
            <router-link class="nav-link text-dark font-weight-bold" to="/users/profile"
              ><i class="fa-solid fa-user fa-lg"></i>&nbsp;<b>Profile</b></router-link
            >
          </li>
          <li class="nav-item ms-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/about"
              ><i class="fa fa-info-circle fa-lg"></i>&nbsp;<b>About</b></router-link
            >
          </li>
        </ul>
      </div>
      <router-link  to="/users/loginhome" tag="div" class="col-sm-2 user" v-if="user!=null">
      <h6 class="mt-2"><span class="text-light bg-secondary p-2 border rounded-circle"><i class="fa-solid fa-user"></i></span>&nbsp;{{fullname}}</h6>
      </router-link>
    </nav>
    
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default{
  data(){
    return{
      user:null,
      fullname:"",
      userinfo:{}
    }
  },
  created(){
    if(localStorage.getItem('token')!=null){
       this.userinfo=VueJwtDecode.decode(localStorage.getItem('token'))
    }
    this.user=localStorage.getItem('id')
    this.fullname=localStorage.getItem('username')
  }
}
</script>

<style scoped>
@import "../assets/CSS/common.css";
@media screen and (max-width: 768px) {
  .navbar-nav {
    flex-direction: row;
  }
}
.user{
  cursor: pointer;
}
</style>
