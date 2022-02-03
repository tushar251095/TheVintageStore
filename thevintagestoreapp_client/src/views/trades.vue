<template>
  <main class="container-fluid">
    <section class="row p-3 text-center">
      <div class="col-sm-12 p-3">
        <h4 class="">Categories</h4>
      </div>
    </section>
    <section class="row justify-content-start">
      <div
        class="col-sm-12 col-md-6 col-lg-4 pl-5 pr-5"
        v-for="category in categories"
        :key="category"
        
      >
        <div class="cardbox">
          <img :src="category.imageurl" alt="product image" class="cardimage" />
          <h4 class="text-center pt-2">{{ category.title }}</h4>
          <hr class="hrline" />
          <ul class="cardlist" v-if="category.subtype.length>0" style="min-height:155px">
            <li class="p-1" v-for="type in category.subtype" :key="type">
                
              <router-link to="/trade"  @click="$store.dispatch('saveid', type.product_id)" class="subtypeclass">{{ type.prod_name }}</router-link>
            </li>
            <li class="p-1">
              <router-link to="/viewmore" v-if="category.subtype.length>2"  @click="$store.dispatch('savecatid', category.category_id)"   class="text-primary">More Items...</router-link>
              
            </li>
             <div class="mt-auto" style="" v-if="category.subtype.length<3 ">
              <h5 class="text-center text-secondary">No More Items</h5>
          </div> 
          </ul>
          <div class="mt-auto" style="min-height:155px" v-if="category.subtype.length==0 ">
              <h5 class="text-center pt-5">No Items</h5>
          </div> 
        </div>
      </div>
    </section>
  </main>
</template>
<script>
// import categoriesData from "../Categories_Data.json";
import EventServices from '@/services/EventServices.js';
export default {
  data() {
    return {
      categories: [],
      id:0,
    
    };
  },
  created(){
this.getdata()

  },
  methods:{
      async getdata(){
        EventServices.getCategories().then(data=>{
          this.categories=data
        })
      }
     }
};
</script>

<style scoped>
@import "../assets/CSS/trades.css";
</style>
