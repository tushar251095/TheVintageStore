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
              <label class="mt-2"><b>Rating:&nbsp;&nbsp;</b></label>
            </span>
            <span v-if="productdetails.ratings == 0" class="mt-2"
              >Rating Not Available</span
            >
            <span v-if="productdetails.ratings == 1" class="mt-2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 2" class="mt-2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 3" class="mt-2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 4" class="mt-2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
            </span>
            <span v-if="productdetails.ratings == 5" class="mt-2">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
            </span>
          </span>
          <label class="mt-2"
            ><b>Category:</b> {{ productdetails.category_name }}</label
          ><br />
          <label class="mt-2"><b>Year:</b> {{ productdetails.year }}</label
          ><br />

          <label class="mt-2"
            ><b>Seller:</b>&nbsp;{{ productdetails.seller }}</label
          >

          <p class="mt-2">
            <b>Discription:</b><br />
            {{ productdetails.description }}
          </p>
        </section>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 p-3">
        <div class="sidesection">
          <p><b>Are you interested in this product?</b></p>
          <!-- <button class="thmbtn1">Trade It</button>
            <button class="thmbtn2">Rate It</button> -->
          <router-link to="/" class="thmbtn1">Trade It</router-link>
          <router-link to="/" class="thmbtn2 ms-2 anchorstyle"
            >Rate It</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
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
        category_name: "",
      },
    };
  },
  created() {
    this.getproductdetails();
  },
  methods: {
    async getproductdetails() {
      //console.log(this.$store.state.product_id);
      EventServices.getProductDetails(sessionStorage.getItem("product_id")).then(
        (data) => {
          this.productdetails = data[0];
        }
      );
    },
  },
};
</script>

<style scoped>
@import "../assets/CSS/trade.css";
@import "../assets/CSS/common.css";
</style>
