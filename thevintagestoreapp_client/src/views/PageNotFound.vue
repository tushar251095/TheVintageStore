<template>
<div>
  <div class="d-flex flex-column justify-content-center align-items-center p-5 m-5">
    <i class="far fa-frown fa-7x"></i><br>
    <h1>404</h1>
  <h4 class="text-secondary">Requested URL not found</h4>
  <router-link to="/">Back to Home</router-link>
</div>
</div>

</template>
<script>
export default{
  data(){
    return{
      statusCode:0,
      errorMessage:""
    }
  },
  created(){
    this.statusCode=localStorage.getItem("statusCode")
    this.errorMessage=localStorage.getItem("errorMessage")
  }
}
</script>
