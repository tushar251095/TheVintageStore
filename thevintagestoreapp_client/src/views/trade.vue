<template>
  <main class="container-fluid pb-5">
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
          <div class="mt-3 mainlikedislike">
            <div
              @click="likeDisike(productdetails.product_id, 'like')"
              v-show="liked"
            >
              <i class="fas fa-thumbs-up likedislike text-info"></i
              >&nbsp;&nbsp;{{
                productdetails.like.length
              }}&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div
              @click="likeDisike(productdetails.product_id, 'like')"
              v-show="!liked"
            >
              <i class="far fa-thumbs-up likedislike text-info"></i
              >&nbsp;&nbsp;{{
                productdetails.like.length
              }}&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div
              @click="likeDisike(productdetails.product_id, 'dislike')"
              v-show="disliked"
              class=""
            >
              <i class="fas fa-thumbs-down likedislike text-danger dislike"></i
              >&nbsp;&nbsp;<span class="dislike">{{
                productdetails.dislike.length
              }}</span>
            </div>

            <div
              @click="likeDisike(productdetails.product_id, 'dislike')"
              v-show="!disliked"
              class=""
            >
              <i class="far fa-thumbs-down likedislike text-danger"></i
              >&nbsp;&nbsp;<span class="dislike">{{
                productdetails.dislike.length
              }}</span>
            </div>
          </div>
          <label class="mt-3"
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
      <div class="col-sm-12 col-md-3 col-lg-3 p-3" v-if="user != null">
        <div class="sidesection">
          <p
            v-if="
              user != productdetails.seller_id &&
              productdetails.product_status == 'Available'
            "
          >
            <b>Are you interested in this product?</b>
          </p>
          <!-- <button class="thmbtn1">Trade It</button>
            <button class="thmbtn2">Rate It</button> -->
          <button
            @click="trading()"
            class="thmbtn1"
            v-if="
              user != productdetails.seller_id &&
              productdetails.product_status == 'Available'
            "
            :disabled="tradebtnTitle === 'Requested'"
          >
            {{ tradebtnTitle }}
          </button>
          <button
            class="thmbtn2 ms-2 anchorstyle"
            v-if="
              user != productdetails.seller_id &&
              productdetails.product_status == 'Available'
            "
            @click="watchList(productdetails.product_id)"
          >
            {{ watchlistbtnTitle }}
          </button>

          <div class="commentsection mt-3">
            <p><b>Post Comment:</b></p>
            <span>Limit: 40 characters</span>
            <span class="float-end">Current: {{comment.length}}</span>
            <textarea
              v-model="comment"
              rows="6"
              cols="35"
              class="form-control"
               :class="{ 'is-invalid': submitted && $v.comment.$error }"
            ></textarea>
             <div v-if="submitted && $v.comment.$error" class="invalid-feedback">
            <span v-if="!$v.comment.required">Comment is required</span>
            <span v-if="!$v.comment.minLength">Comment must be at least 4 characters</span>
            <span v-if="!$v.comment.maxLength">Comment must be at atmost 40 characters</span>
          </div>
            <button @click="postComment()" class="btn btn-secondary w-100 mt-1">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
    <comments :product_id="productdetails.product_id" :key="commentKey"></comments>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
import userServices from "@/services/userService.js";
import {required, minLength, maxLength} from "vuelidate/lib/validators"
import comments from "../components/comments.vue";
export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    comments: comments,
  },
  data() {
    return {
      commentKey:0,
      submitted:false,
      comment: "",
      decision: "",
      tradebtnTitle: "Trade it",
      watchlistbtnTitle: "Add to watchlist",
      user: null,
      watchlistStatus: true,
      liked: false,
      disliked: false,
      productdetails: {
        product_id:"",
        like: [],
        dislike: [],
        prod_name: "",
        year: "",
        seller: "",
        description: "",
        ratings: 0,
        category: "",
        product_img_url: "",
        category_name: "",
        comments:[]
      },
    };
  },
  validations:{
    comment:{required,minLength: minLength(4),maxLength: maxLength(40)}
  },
  created() {
    this.user = localStorage.getItem("id");
    this.getproductdetails();
  },
  methods: {
    async getproductdetails() {
      //console.log(this.$store.state.product_id);
      EventServices.getProductDetails(localStorage.getItem("product_id")).then(
        (data) => {
         // console.log(data);
          this.liked = data.liked;
          this.disliked = data.disliked;
          this.watchlistStatus = data.watchlist;
          if (this.watchlistStatus == true) {
            this.watchlistbtnTitle = "Remove from watchlist";
          }
          this.commentKey= data.productdetails[0].comments.length
          this.productdetails = data.productdetails[0];
          this.productdetails.category_name = data.categorytitle;
          if (data.tradedetails.length > 0) {
            if (data.tradedetails[0].status == "pending") {
              this.tradebtnTitle = "Requested";
            }
          }
        }
      );
    },
    trading() {
      localStorage.setItem("tradeproduct", JSON.stringify(this.productdetails));
      this.$router.push("/trading");
    },
    watchList(id) {
      if (this.watchlistbtnTitle == "Remove from watchlist") {
        console.log("in if");
        this.removeFromWatchList(id);
      } else {
        this.addTowatchList(id);
      }
    },
    likeDisike(productid, decision) {
      if(localStorage.getItem('token')==null){
         this.$toast.open({
            message: "You need to login to perform action",
            type: "error",
            position: "top",
          });
      }else{
        EventServices.likeDislike({
        product_id: productid,
        decision: decision,
      }).then(() => {
        //console.log(data);
        this.getproductdetails();
      });
      }
      
    },
    removeFromWatchList(product) {
      userServices.removeFromWatchList({ product_id: product }).then((data) => {
        if (data == true) {
          this.$toast.open({
            message: "Removed from watchlist",
            type: "success",
            position: "top",
          });
          this.getproductdetails();
        } else {
          this.$toast.open({
            message: "Unable to remove from watclist.Please try again",
            type: "error",
            position: "top",
          });
        }
      });
    },
    postComment() {
      let commentobj = {};
       this.submitted = true;
        this.$v.comment.$touch();
        if (this.$v.comment.$invalid) {
            return;
        }
      commentobj.comment = this.comment;
      commentobj.product_id = this.productdetails.product_id;
      console.log(commentobj);
      EventServices.postComment(commentobj).then(() => {
        this.getproductdetails();
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        this.submitted = false;
        this.comment=""
      });
    },
    addTowatchList(productid) {
      userServices.addToWatchList({ product_id: productid }).then((data) => {
        if (data == true) {
          this.$toast.open({
            message: "Added to watchList",
            type: "success",
            position: "top",
          });
          this.getproductdetails();
        } else {
          this.$toast.open({
            message: "Failed to add. Please try again",
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
@import "../assets/CSS/trade.css";
@import "../assets/CSS/common.css";
</style>
