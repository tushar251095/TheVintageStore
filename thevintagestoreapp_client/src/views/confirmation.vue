<template>
    <div class="container-fluid p-5">
        <div class="row">
            <div class="col-sm-12">
                <div class="text-center">
                     <i class="fas fa-check-circle text-success fa-7x"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
                <h4 class="text-center mt-3">Your trade has been requested.<br></h4>
                <h5 class="text-center text-secondary">Please wait for the seller to accept/reject the offer.</h5>
                <router-link to="/trades">Continue Trading</router-link>
            </div>
        </div>
         <div class="row">
            <div class="col-sm-12">
                <h5 class="mt-5">Recommended Product based on your previous trade:</h5>
            </div>
        </div>
        <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-3 p-3"
          v-for="(product, index) in productlist"
          :key="index"
        >
          <div class="card">
            <img
              :src="product.product_img_url"
              class="img-fluid"
              alt="Product Image"
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
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import EventServices from "@/services/EventServices.js";
export default {
  data() {
    return {
      user:null,
       productlist:[],
    };
  },
  created() {
    this.getRecommendedProducts();
  },
  beforeRouteLeave (to, from,next) {
      console.log(to+from)
    localStorage.removeItem('requestedid')
    next()
  },
  beforeRouteEnter (to, from, next) {
  console.log(to+from)
  if(localStorage.getItem('requestedid')==null){
      next('/trades')
  }else{
      next()
  }
},
  methods: {
    async getRecommendedProducts() {
      //console.log(this.$store.state.product_id);
      EventServices.getRecommendedProducts(localStorage.getItem('requestedid')).then(
        (data) =>{
          this.productlist = data;
         
        }
      );
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