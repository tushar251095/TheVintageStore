<template>
  <div id="app">
    <div id="nav" class="d-flex flex-column min-vh-100 scrollclass">
      <headerbar></headerbar>
      <navbar />
      <router-view />
      <footerbar class="mt-auto"></footerbar>
    </div>
  </div>
</template>

<script>
import headerbar from "./components/headerbar.vue";
import navbar from "./components/navbar.vue";
import footerbar from "./components/footerbar.vue";

export default {
  name: "app",
  components: {
    /* eslint-disable vue/no-unused-components */
    navbar: navbar,
    /* eslint-disable vue/no-unused-components */
    headerbar: headerbar,
    footerbar: footerbar,
  },
  created(){
    console.log(sessionStorage.getItem("found"))
  }
};
</script>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
/* body::-webkit-scrollbar {
    display: none;
   
} */

/* Hide scrollbar for IE, Edge and Firefox */
/* body {
  -ms-overflow-style: none;  
  scrollbar-width: none;  
} */
</style>
