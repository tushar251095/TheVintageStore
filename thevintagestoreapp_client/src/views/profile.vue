<template>
<div class="container-fluid">
  <div class="row mt-4">
    <h2 class="text-center">Welcome</h2>
  </div>
<div class="row pb-3">
      <div class="col-sm-4 pt-4 ps-5">
       
        <router-link  to="/trades" tag="div" class="customcard card-color-green text-light">
          <i class="fa fa-list-alt fa-5x iconpos" aria-hidden="true"></i>
           <h3 class="pt-4 ps-3">Categories</h3>
        </router-link >
      </div>
       <div class="col-sm-4 pt-4 ps-5">
        <router-link  to="/newtrade" tag="div" class="customcard card-color-red text-light">
          <i class="fas fa-exchange fa-5x iconpos"></i>
           <h3 class="pt-4 ps-3">Start Trading</h3>
        </router-link>
      </div>
       <div class="col-sm-4 pt-4 ps-5">
        <router-link  to="/edit" tag="div" class="customcard card-color-yellow text-light">
         <i class="fas fa-edit fa-5x iconpos"></i>
           <h3 class="pt-4 ps-3">My products</h3>
        </router-link>
      </div>
       <div class="col-sm-4 pt-4 ps-5">
        <router-link  to="/users/profile" tag="div" class="customcard card-color-blue text-light">
          <i class="fa-solid fa-user fa-5x iconpos"></i>
           <h3 class="pt-4 ps-3">Profile</h3>
        </router-link>
      </div>
   </div>
</div>
   
</template>
<script>
//import UserServices from "@/services/userService.js";
export default {
   created(){
     
   },
   methods:{
     
   }
}
</script>
<style>
.customcard{
  height:200px;
  width: 300px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  
}
.card-color-green{
 background: rgb(31,158,62);
background: linear-gradient(90deg, rgba(31,158,62,1) 19%, rgba(3,169,125,0.6647701316854867) 100%);
}
.card-color-red{
 background: rgb(233,61,35);
background: linear-gradient(90deg, rgba(233,61,35,0.8076272745426296) 24%, rgba(185,54,22,0.5331174706210609) 100%);
}
.card-color-yellow{
background: rgb(236,195,46);
background: linear-gradient(90deg, rgba(236,195,46,0.8076272745426296) 24%, rgba(185,172,22,0.5331174706210609) 100%);
}
.card-color-blue{
background: rgb(46,120,236);
background: linear-gradient(90deg, rgba(46,120,236,0.8076272745426296) 24%, rgba(22,141,185,0.45188497762386204) 100%);
}
.iconpos{
  position: absolute;
  bottom: 0;
  right: 0;
  padding-right: 10px;
   padding-bottom: 10px;
   opacity: 0.75;
}
</style>