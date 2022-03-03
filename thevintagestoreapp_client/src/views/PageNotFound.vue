<template>
<div>
  <div>
    <h1>{{statusCode}}</h1>
  <h1>{{errorMessage}}</h1>
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
    this.statusCode=sessionStorage.getItem("statusCode")
    this.errorMessage=sessionStorage.getItem("errorMessage")
  }
}
</script>
