<template>
  <div class="container-fluid pb-2">
    <div class="row">
      <div class="col-xm-12">
        <h3 class="text-center mt-3">WatchList</h3>
      </div>
    </div>
    <div class="row mt-3" v-if="watchlist.length > 0">
      <div class="col-md-6" v-for="(product, index) in watchlist" :key="index">
        <div class="card mb-3" style="max-width: 50vw">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                :src="product.product_img_url"
                class="card-img listimg"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ product.prod_name }}</h5>
                <p class="card-text">
                  <i class="far fa-thumbs-up text-info"></i>&nbsp; {{ product.like.length }} &nbsp; &nbsp;<i
                    class="far fa-thumbs-down text-danger"
                  ></i
                  >&nbsp;{{ product.dislike.length }}
                </p>
                <p class="card-text">Status:{{ product.product_status }}</p>
                <p class="card-text">Seller Name: {{ product.seller }}</p>
                <button
                  class="buttonWishlist"
                  :disabled="product.product_status == 'Not Available'"
                  @click="trading(product)"
                >
                  Trade It</button
                >&nbsp;
                <button
                  class="buttonWishlist"
                  @click="remove(product.product_id)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-5 border border-secondary" v-else>
        <h3 class="text-center text-secondary">No product in watchlist</h3>
    </div>
  </div>
</template>
<script>
import UserServices from "@/services/userService.js";
export default {
  data() {
    return {
      watchlist: [
        {
          like:[],
          dislike:[]
        }
      ],
    };
  },
  created() {
    this.getWatchList();
  },
  methods: {
    getWatchList() {
      UserServices.getWatchList().then((data) => {
        this.watchlist = data;
      });
    },
    trading(product) {
      localStorage.setItem("tradeproduct", JSON.stringify(product));
      this.$router.push("/trading");
    },
    remove(product) {
      UserServices.removeFromWatchList({ product_id: product }).then((data) => {
        if (data == true) {
          this.$toast.open({
            message: "Removed from watchlist",
            type: "success",
            position: "top",
          });
          this.getWatchList();
        } else {
          this.$toast.open({
            message: "Unable to remove from watclist.Please try again",
            type: "error",
            position: "top",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.buttonWishlist {
  background-color: #880e4f;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.listimg {
  min-height: 230px;
  max-height: 230px;
  width: 100%;
}
</style>
>
