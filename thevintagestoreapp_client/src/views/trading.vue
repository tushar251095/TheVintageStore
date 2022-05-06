<template>
     <main class="container-fluid">
    <div>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h4 class="text-center p-3">Select product for trading</h4>
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
              alt="Product Image itemimg"
            />
            <div class="p-3">
              <h6>
                <p @click="StoreProductID(product.product_id)">
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
              <button v-if="user!=null" class="thmbtn1" @click="openConfirmationmodal(product.prod_name,product.product_id)"  v-b-modal.confirm-modal>Select</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <b-modal id="confirm-modal" hide-header>
        <div class="text-success text-center mt-3">
            <i class="fas fa-check-circle fa-5x"></i>
        </div>
      <h5 class="text-center mt-3">
        Are you sure you want to trade below product?
      </h5>
      <h5 class="text-center text-secondary">{{ productname }}</h5>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button type="button" class="btn btn-success" @click="confirmTrade()">
          Yes
        </button>
      </template>
    </b-modal>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
export default {
  data() {
    return {
      user:null,
       productlist:[],
       productname:"",
       product_id:""
    };
  },
  created() {
    this.user=localStorage.getItem('id')
    this.getproducts();
  },
  methods: {
    async getproducts() {
      //console.log(this.$store.state.product_id);
      EventServices.getProducts().then(
        (data) =>{
          this.productlist = data;
         
        }
      );
    },
    openConfirmationmodal(prodname,product_id){
        this.productname=prodname;
        this.product_id=product_id
    },
    confirmTrade(){
        let confirmtradeobj={}
        confirmtradeobj.buyer_id=localStorage.getItem('id')
        confirmtradeobj.requested_product_id=JSON.parse(localStorage.getItem('tradeproduct')).product_id
        confirmtradeobj.offered_product_id=this.product_id
        confirmtradeobj.seller_id=JSON.parse(localStorage.getItem('tradeproduct')).seller_id
        confirmtradeobj.requested_product_name=JSON.parse(localStorage.getItem('tradeproduct')).prod_name
        confirmtradeobj.buyer_name=localStorage.getItem('username')
        confirmtradeobj.offered_product_name=this.productname
        confirmtradeobj.seller_name=JSON.parse(localStorage.getItem('tradeproduct')).seller
       EventServices.saveTrade(confirmtradeobj).then(
        (data) =>{
            if(data){
              localStorage.setItem('requestedid',data.requested_product_id)
            this.$toast.open({
          message: "Trade requested successfully",
          type: "success",
          position: "top",
        });
         this.$router.push('/confirmation')
            }
        }
      );
    }
  },
};
</script>