<template>
<div>
  <div class="d-flex flex-column justify-content-center align-items-center p-5 m-5">
    <i class="far fa-frown fa-7x"></i><br>
    <h1>{{statusCode}}</h1>
  <h4 class="text-secondary">{{errorMessage}}</h4>
  <h4 class="text-secondary" v-if="statusCode==500">Something went wrong while processing your request.</h4>
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
    this.Unauthorized();
  },
  methods:{
    Unauthorized(){
      if(this.statusCode==401){
        localStorage.clear()
        //this.$router.push({ path: "/login" })
        this.$toast.open({
          message: "Unauthorized access",
          type: "error",
          position: "top",
        })
      }
    }
  }
}
</script>
