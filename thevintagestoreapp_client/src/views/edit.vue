<template>
  <main class="container-fluid">
    <div>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h4 class="text-center p-3">Edit Products</h4>
        </div>
      </div>
      <div class="row">
        <div  class="col-sm-12 col-md-12 col-lg-12 p-3" v-if="productArray.length==0">
            <div>
              <h4 class="p-5 border border-secondary text-secondary text-center">No products to display</h4>
            </div>
        </div>
        <div
        v-else
          class="col-sm-12 col-md-6 col-lg-3 p-3"
          v-for="(product, index) in productArray"
          :key="index"
        >
        <div class="main-card">
          <div :class="dynamicClass">
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
              <p class="card-text">
                  <i class="far fa-thumbs-up text-info"></i>&nbsp; {{ product.like.length }} &nbsp; &nbsp;<i
                    class="far fa-thumbs-down text-danger"
                  ></i
                  >&nbsp;{{ product.dislike.length }}
                </p>

              <p>Year: {{ product.year }}</p>

              <button
                v-b-modal.update-modal
                class="btn btn-outline-primary"
                @click="openUpdateForm(product.product_id)"
              >
                Update
              </button>
              <button
                v-b-modal.delete-modal
                class="btn btn-outline-danger ms-2"
                @click="saveProductID(product.product_id, product.prod_name)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
          
        </div>
      </div>
    </div>
    <b-modal id="delete-modal" ref="delete-modal" hide-header>
      <img
        src="../assets/Images/delete.png"
        alt="delete icon"
        height="70"
        width="70"
        class="rounded mt-2 mx-auto d-block"
      />
      <h5 class="text-center mt-3">
        Are you sure you want to delete below trade?
      </h5>
      <h5 class="text-center text-secondary">{{ productname }}</h5>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button type="button" class="btn btn-danger" @click="deleteTrade()">
          Delete
        </button>
      </template>
    </b-modal>

    <b-modal id="update-modal" ref="update-modal" hide-header>
      <div class="modal-body">
        <img
          src="../assets/Images/edit.png"
          alt="delete icon"
          height="70"
          width="70"
          class="mt-2 mx-auto d-block"
        />
        <h5 class="text-center mt-3">Below are the current details.</h5>
        <div class="form-group">
        <label>Product Name</label><br />
        <input
          type="text"
          v-model="editobj.prod_name"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.editobj.prod_name.$error }"
        />
        <div v-if="submitted && !$v.editobj.prod_name.required" class="invalid-feedback">Product Name is required</div>
        <br />
        </div>
        <div class="form-group">
        <label>Category</label><br />
        <select v-model="editobj.category_id" class="form-control" :class="{ 'is-invalid': submitted && $v.editobj.category_id.$error }">
          <option disabled value="">Please select one</option>
          <option
            v-for="(category,index) in dropdowncategories"
            :key="index"
            :value="category.category_id"
          >
            {{ category.title }}
          </option></select
        >
         <div v-if="submitted && !$v.editobj.category_id.required" class="invalid-feedback">Category is required</div>
        <br />
        </div>
        <div class="form-group">
        <label>Year</label><br />
        <input type="text" v-model="editobj.year" class="form-control" :class="{ 'is-invalid': submitted && $v.editobj.year.$error }"/>
         <div v-if="submitted && $v.editobj.year.$error" class="invalid-feedback">
            <span v-if="!$v.editobj.year.required">Year is required</span>
            <span v-if="!$v.editobj.year.minLength">year must be at least 4 characters</span>
            <span v-if="!$v.editobj.year.maxLength">year must be at atmost 4 characters</span>
          </div>
          <br />
        </div>
        <div class="form-group">
        <label>Product Image URL</label><br />
        <input
          type="url"
          v-model="editobj.product_img_url"
          class="form-control"
           :class="{ 'is-invalid': submitted && $v.editobj.product_img_url.$error }"
        />
        <div v-if="submitted && !$v.editobj.product_img_url.required" class="invalid-feedback">Image URL is required</div>
        <br />
        </div>
        <div class="form-group">
        <label>Description</label><br />
        <textarea
          v-model="editobj.description"
          class="form-control"
          rows="7"
          :class="{ 'is-invalid': submitted && $v.editobj.description.$error }"
        />
        <div v-if="submitted && !$v.editobj.description.required" class="invalid-feedback">Description is required</div>
        <br />
        </div>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button
          type="button"
          class="btn btn-primary"
          @click="editTrade()"
          data-dismiss="modal"
        >
          UPDATE
        </button>
      </template>
    </b-modal>
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
  </main>
</template>

<script>
import EventServices from "@/services/EventServices.js";
import {required, minLength, maxLength} from "vuelidate/lib/validators"
export default {
  data() {
    return {
      dynamicClass:"card",
      submitted: false,
      productArray: [],
      productID: 0,
      productname: "",
      dropdowncategories: [],
      editobj: {},
       currentPage: 1,
      pages: 9,
      perPage: 8,
      startingIndex: 0,
      endingIndex: 0,
     
    };
  },
  validations:{
     editobj: {
        category_id:{required},
        prod_name: {required},
        year: {required,minLength: minLength(4),maxLength: maxLength(4)},
        seller: {required},
        description: {required},
        product_img_url: {required},
      }
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
       this.generatingIndex().then(() => {
        this.startingIndex = (this.currentPage - 1) * this.perPage;
        this.endingIndex =  this.perPage;
        var sendobj = {
          startingIndex: this.startingIndex,
          endingIndex: this.endingIndex,
        };
         EventServices.getAllItemsForEditpage(sendobj).then(
        (data) => {
          if(data != undefined){
            this.pages=((data.arraySize) + this.perPage - 1)/this.perPage
          this.productArray = data.products;
          }
        }
      );
        })
     
    },
    saveProductID(productid, name) {
      this.productID = productid;
      this.productname = name;
    },
    deleteTrade() {
      console.log("in")
      EventServices.deleteProduct({ product_id: this.productID }).then(() => {
        this.$toast.open({
          message: "Trade Deleted Successfully",
          type: "success",
          position: "top",
        });
        this.getproducts();
        this.$refs["delete-modal"].hide();
      });
    },
    openUpdateForm(product_id) {
      this.getproductdetails(product_id);
      EventServices.getdropdownCategories().then((data) => {
        this.dropdowncategories = data;
        //console.log(this.dropdowncategories[0].title);
      });
    },
    async getproductdetails(product_id) {
      EventServices.getProductDetails(product_id).then((data) => {
        //console.log(data)
        this.editobj = data.productdetails[0];
        localStorage.setItem("product_id",this.editobj.product_id)
      });
    },
    editTrade() {
        this.submitted = true;
        this.$v.editobj.$touch();
        if (this.$v.editobj.$invalid) {
            return;
        }
      EventServices.updateProduct(this.editobj).then((res) => {
        if(res=="SUCCESS"){
         this.$toast.open({
          message: "Trade Updated Successfully",
          type: "success",
          position: "top",
        });
        this.$router.push("trade");

        }else{
           res.errors.forEach(element => {
                this.$toast.open({
            message: element.msg,
            type: "error",
            position: "top",
          });
             });
        }
       
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
