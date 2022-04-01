<template>
  <main class="container-fluid">
    <div>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h4 class="text-center p-3">{{ catgoryname }}</h4>
        </div>
      </div>
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-3 p-3"
          v-for="(product, index) in productArray"
          :key="index"
        >
          <div class="card">
            <img
              :src="product.product_img_url"
              class="img-fluid"
              alt="Product Image itemimg"
            />
            <div class="p-3">
              <h6>
                <p @click="StoreProductID(product.product_id)">
                  {{ product.prod_name }}
                </p>
              </h6>
              <span v-if="product.ratings == 0"> Rating Not Available </span>
              <span v-if="product.ratings == 1">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </span>
              <span v-if="product.ratings == 2">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </span>
              <span v-if="product.ratings == 3">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </span>
              <span v-if="product.ratings == 4">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
              </span>
              <span v-if="product.ratings == 5">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
              </span>

              <p>Year: {{ product.year }}</p>
              <button class="thmbtn1">Trade It</button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <b-pagination-nav
        class=""
          v-model="currentPage"
          :number-of-pages="pages"
          @change="getproducts()"
          base-url="#"
          first-number
          last-number
        ></b-pagination-nav>
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
      productArray: [],
      catgoryname: "",
      currentPage: 1,
      pages: 9,
      perPage: 8,
      startingIndex: 0,
      endingIndex: 0,
    };
  },
  created() {
    this.getproducts();
  },
  methods: {
    generatingIndex() {
      return new Promise((resolve, reject) => {
        resolve(true);
        reject(true);
      });
    },
    getproducts() {
      var sendobj = {};
      this.generatingIndex().then(() => {
        this.startingIndex = (this.currentPage - 1) * this.perPage;
        this.endingIndex = this.perPage;
        sendobj = {
          startingIndex: this.startingIndex,
          endingIndex: this.endingIndex,
          category_id: sessionStorage.getItem("category_id"),
        };
        EventServices.getMoreitems(sendobj).then((data) => {
          this.productArray = data.products;
          this.catgoryname = data.others.category_name;
          this.pages=((data.others.arraySize) + this.perPage - 1)/this.perPage
        });
      });
    },
    StoreProductID(payload) {
      this.$store.dispatch("saveid", payload).then(() => {
        this.$router.push({
          name: "Trade",
        });
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/CSS/moreItem.css";
</style>
