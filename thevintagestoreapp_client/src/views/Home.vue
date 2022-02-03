<template>
<main class="container-fluid">
      <section class="row maincontent">
        <div class="col-sm-12 col-md-12 col-lg-6 detailsdiv">
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
            <router-link class="thmbtn1 pr-4 pl-4" to="/trades">Trades</router-link>
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
              than an antique but not less than 20 years, it falls under the
              term vintage.
            </p>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 homecard">
            <img src="../assets/Images/trade.png" alt="image" class="detailsimg" />
            <h5 class="text-left mt-2">How does trade work?</h5>
            <p class="text-left mt-2">
              Register/Add your vintage product with us and trade other vintage
              product anytime. You can trade any listed product in categories
              which matches your product value. On approval of both side of
              trade product is then exchange with the respective client.
            </p>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 homecard">
            <img src="../assets/Images/quality.jpg" alt="image" class="detailsimg" />
            <h5 class="text-left mt-2">Quality & Trustable Product</h5>
            <p class="text-left mt-2">
              Trust is the foundation of every successful trade.
             Search for a genuine product which are original,real and authentic
            that comes from the entity that created the item in the first instance.
            All the vendors are trusted and verified, so as to eliminate the 
            bad trade possibility. 
            </p>
          </div>
        </div>
      </section>
    </main>
</template>

<style scoped>

@import '../assets/CSS/common.css';
</style>