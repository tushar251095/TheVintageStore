<template>
  <main class="container-fluid">
    <section class="row maincontent">
      <div class="col-sm-12 col-md-12 col-lg-6 detailsdiv ms-4">
        <h3>Welcome to <span class="">The Vintage Store</span></h3>
        <p class="">
          <i
            >Collect things you love and your house becomes your story.<br />Be
            Vintagy. Be Elegant.</i
          >
        </p>
        <p class="mb-4">
          The place where you can trade your certified vintage products.<br />
        </p>
        <span class="mt-2">
          <router-link class="thmbtn1 pe-4 ps-4" to="/trades"
            >Trades</router-link
          >
        </span>
      </div>
    </section>
    <section class="container-fluid mt-2 text-center p-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-6 col-lg-4 homecard">
          <img
            src="../assets/Images/vintagedetails.jpg"
            alt="image"
            class="detailsimg"
          />
          <h5 class="text-left mt-2">What is Vintage product?</h5>
          <p class="text-left mt-2">
            It is an object that represents a previous era or time period in
            human society. An item should be at least 100 years old to be
            defined as an antique. Generally speaking if the item is no older
            than an antique but not less than 20 years, it falls under the term
            vintage.
          </p>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 homecard">
          <img
            src="../assets/Images/trade.png"
            alt="image"
            class="detailsimg"
          />
          <h5 class="text-left mt-2">How does trade work?</h5>
          <p class="text-left mt-2">
            Register/Add your vintage product with us and trade other vintage
            product anytime. You can trade any listed product in categories
            which matches your product value. On approval of both side of trade
            product is then exchange with the respective client.
          </p>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 homecard">
          <img
            src="../assets/Images/quality.jpg"
            alt="image"
            class="detailsimg"
          />
          <h5 class="text-left mt-2">Quality & Trustable Product</h5>
          <p class="text-left mt-2">
            Trust is the foundation of every successful trade. Search for a
            genuine product which are original,real and authentic that comes
            from the entity that created the item in the first instance. All the
            vendors are trusted and verified, so as to eliminate the bad trade
            possibility.
          </p>
        </div>
      </div>
    </section>
    <section class="card p-3 mb-3">
      <div class="row">
        <div class="col-sm-12 col-lg-12 col-md-12">
          <h4 class="">Most Viewed Products</h4>
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
    </section>
    <section>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6 p-5">
          <div class="card h-100">
            <span>
            <img src="../assets/Images/old.jpeg" class="image-fluid homecardimg" />
            </span>
             <div class="p-3">
            <h4>
              What's the difference between old clothes and Vintage clothing?
            </h4>
            <p>
              Well, "old" is a relative term. You might consider your four year
              old designer purse old, not to mention your 10 year old Manolo
              Blahniks. However, were you to sell these items today, they would
              be considered premium second hand or pre-loved designer fashion.
              Keep them for another decade or two though, and they will become
              official vintage pieces.
            </p>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6 p-5">
          <div class="card h-100">
            <span>
            <img src="../assets/Images/retro.jpeg" class="image-fluid homecardimg" />
            </span>
            <div class="p-3">
            <h4>Retro or vintage?</h4>
            <p>
              Retro, which is short for Retrospective, is often called "vintage
              style" and usually refers to clothing imitating the clothing style
              of a previous era. The "nostalgia cycle" of fashion and clothing
              style is often focusing on the two decades 20–30 years before the
              current one. Retro style does is often but not necessarily consist
              of vintage garments and accessories. It might be a mix of vintage
              and newly produced clothing pieces, or entirely new ones.
              Reproduction, or repro, clothing is a newly made copy of an older
              garment.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
export default {
  data() {
    return {
      productArray: [],
    };
  },
  created() {
    this.getmostvieweddata();
  },
  methods: {
    async getmostvieweddata() {
      EventServices.mostviewed().then((data) => {
        this.productArray = data;
        // console.log(this.categories);
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
@import "../assets/CSS/common.css";
</style>
