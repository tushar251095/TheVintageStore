<template>
  <main class="container-fluid">
    <div class="row mt-3">
      <div class="col-sm-12 col-md-4 col-lg-4 p-3">
        <img
          class="productimage img-fluid"
          :src="productdetails.product_img_url"
          alt="image"
        />
      </div>
      <div class="col-sm-12 col-md-5 col-lg-5 p-3">
        <section class="detailssection">
          <h3>{{ productdetails.prod_name }}</h3>
          <span class="d-flex">
            <span>
              <label><b>Rating:&nbsp;&nbsp;</b></label>
            </span>
            <span v-if="productdetails.ratings==0">Rating Not Available</span>
            <span v-if="productdetails.ratings == 1">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 3">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 4">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 5">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
            </span>
          </span>
          <label><b>Category:</b> {{ productdetails.category_name }}</label
          ><br />
          <label><b>Year:</b> {{ productdetails.year }}</label><br />

          <label class=""
            ><b>Seller:</b>&nbsp;{{ productdetails.seller }}</label
          >

          <p><b>Discription:</b></p>
          <p>
            {{ productdetails.description }}
          </p>
        </section>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 p-3">
        <div class="sidesection">
          <p><b>Are you interested in this product?</b></p>
          <!-- <button class="thmbtn1">Trade It</button>
            <button class="thmbtn2">Rate It</button> -->
          <router-link to="/" class="btn thmbtn1">Trade It</router-link>
          <router-link to="/" class="btn thmbtn2 ml-2">Rate It</router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import EventServices from '@/services/EventServices.js';
export default {
  data() {
    return {
      productdetails: {
        prod_name: "",
        year: "",
        seller: "",
        description: "",
        ratings: 0,
        category: "",
        product_img_url: "",
        category_name:""
      },
    };
  },
  created() {
    this.getproductdetails();
  },
  methods: {
    async getproductdetails() {
      EventServices.getProductDetails(this.$store.state.product_id).then((data) => {
        this.productdetails = data[0];
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/CSS/trade.css";
</style>
