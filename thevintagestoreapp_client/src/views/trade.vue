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
          <label class="mt-2"
            ><b>Status:</b> {{ productdetails.product_status }}</label
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
      <div class="col-sm-12 col-md-3 col-lg-3 p-3" v-if="user!=null">
        <div class="sidesection">
          <p v-if="user!=productdetails.seller_id"><b>Are you interested in this product?</b></p>
          <!-- <button class="thmbtn1">Trade It</button>
            <button class="thmbtn2">Rate It</button> -->
          <button @click="trading()" class="thmbtn1" v-if="user!=productdetails.seller_id && productdetails.product_status=='Available'" :disabled="tradebtnTitle==='Requested'">{{tradebtnTitle}}</button>
          <router-link to="/" class="thmbtn2 ms-2 anchorstyle" v-if="user!=productdetails.seller_id" 
            >Rate It</router-link
          >
           <button class="thmbtn2 ms-2 anchorstyle" v-if="user!=productdetails.seller_id" :disabled="watchlistStatus" @click="watchList(productdetails.product_id)"
            >+ watchlist</button
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
import userServices from "@/services/userService.js";
export default {
  data() {
    return {
      tradebtnTitle:"Trade it",
      user:null,
      watchlistStatus:true,
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
    this.user=localStorage.getItem('id')
    this.getproductdetails();
  },
  methods: {
    async getproductdetails() {
      //console.log(this.$store.state.product_id);
      EventServices.getProductDetails(localStorage.getItem("product_id")).then(
        (data) => {
          console.log(data)
          this.watchlistStatus=data.watchlist
          this.productdetails = data.productdetails[0];
          this.productdetails.category_name=data.categorytitle
          if(data.tradedetails.length>0){
            if(data.tradedetails[0].status=='pending'){
               this.tradebtnTitle='Requested'
            }
            
          }
        }
      );
    },
    trading(){
      localStorage.setItem('tradeproduct',JSON.stringify(this.productdetails) )
      this.$router.push("/trading")
    },
    watchList(productid){
         userServices.addToWatchList({product_id:productid}).then(
        (data) => {
           location.reload()
            if(data==true){
                 this.$toast.open({
          message: "Added to watchList",
          type: "success",
          position: "top",
        });
            }else{
               this.$toast.open({
          message: "Failed to add. Please try again",
          type: "error",
          position: "top",
        });
            }
           
        })
    }
  },
};
</script>

<style scoped>
@import "../assets/CSS/trade.css";
@import "../assets/CSS/common.css";
</style>
