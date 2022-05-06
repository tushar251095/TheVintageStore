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
                <p>
                  {{ product.prod_name }}
                </p>
              </h6>
              <p class="">
                  <i class="far fa-thumbs-up text-info"></i>&nbsp; {{ product.like.length }} &nbsp; &nbsp;<i
                    class="far fa-thumbs-down text-danger"
                  ></i
                  >&nbsp;{{ product.dislike.length }}
                </p>

              <p>Year: {{ product.year }}</p>
              <button class="thmbtn1" @click="StoreProductID(product.product_id)">More Details</button>
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
      user:null,
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
    this.user=localStorage.getItem('id')
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
          category_id: localStorage.getItem("category_id"),
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
