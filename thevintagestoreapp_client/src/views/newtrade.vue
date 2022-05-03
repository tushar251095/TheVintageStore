<template>
  <main class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-12 col-md-10 col-lg-6">
        <form class="w-100 p-5 tradeform mt-3">
          <h4 class="text-center">New Trade</h4>
          <label class="mt-3"
            ><b>Category</b><span class="text-danger">*</span></label
          >
          <div class="form-group">
          <select v-model="tradeobj.category_id" class="form-control" :class="{ 'is-invalid': submitted && $v.tradeobj.category_id.$error }">
            <option disabled value="">Please select one</option>
            <option
              v-for="(category, index) in dropdowncategories"
              :key="index"
              :value="category.category_id"
            >
              {{ category.title }}
            </option>
          </select>
          <div v-if="submitted && !$v.tradeobj.category_id.required" class="invalid-feedback">Category is required</div>
          <br />
          </div>
          <label>Not in list add new:&nbsp;&nbsp;</label>

          <button
            type="button"
            v-b-modal.addcategory-modal
            class="btn btn-secondary btn-sm"
          >
            Add Category
          </button>
          <br />

          <b-modal id="addcategory-modal" hide-header>
            <h4 class="text-center">Add Category</h4>
            <div class="p-3 d-flex flex-column justify-content-center">
              <div class="form-group">
              <label><b>Category Name</b></label
              ><br />
              <input
                class="form-control"
                type="text"
                placeholder="Enter category name"
                v-model="addcatobj.category_name"
               :class="{ 'is-invalid': catsubmitted && $v.addcatobj.category_name.$error }"
              />
              <div v-if="catsubmitted && !$v.addcatobj.category_name.required" class="invalid-feedback">Category name is required</div>
              <br />
              </div>
              <label><b>Category Image URL</b></label
              ><br />
              <input
                class="form-control"
                v-model="addcatobj.imageurl"
                type="url"
                placeholder="Image URL for catergory"
              /><br />
            </div>
            <template #modal-footer="{ cancel }">
              <b-button size="md" variant="secondary" @click="cancel()">
                Cancel
              </b-button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click.prevent="CreateCategory()"
              >
                Create Category
              </button>
            </template>
          </b-modal>
          <div class="form-group">
          <label class="mt-3"
            ><b>Product Name</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.prod_name"
            class="form-control"
            type="text"
            placeholder="Enter Name of Product"
             :class="{ 'is-invalid': submitted && $v.tradeobj.prod_name.$error }"
          
          />
         <div v-if="submitted && !$v.tradeobj.prod_name.required" class="invalid-feedback">Product Name is required</div>
          </div>
          <div class="form-group">
          <label class="mt-3"
            ><b>Seller Name</b><span class="text-danger">*</span></label
          >
          <input
            disabled
            v-model="tradeobj.seller"
            class="form-control"
            type="text"
            placeholder="Enter Name who will sell it"
             :class="{ 'is-invalid': submitted && $v.tradeobj.seller.$error }"
          />
          <div v-if="submitted && !$v.tradeobj.seller.required" class="invalid-feedback">Seller Name is required</div>
          </div>
          <div class="form-group">
          <label class="mt-3"
            ><b>Year</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.year"
            class="form-control"
            type="number"
            placeholder="Enter year"
             :class="{ 'is-invalid': submitted && $v.tradeobj.year.$error }"
          />
          <div v-if="submitted && $v.tradeobj.year.$error" class="invalid-feedback">
            <span v-if="!$v.tradeobj.year.required">Year is required</span>
            <span v-if="!$v.tradeobj.year.minLength">year must be at least 4 characters</span>
            <span v-if="!$v.tradeobj.year.maxLength">year must be at atmost 4 characters</span>
          </div>
          </div>
          <div class="form-group">
          <label class="mt-3"
            ><b>Product Image URL</b></label
          >
          <input
            v-model="tradeobj.product_img_url"
            class="form-control"
            type="url"
            placeholder="Enter product image URL"
          />
          </div>
          <div class="form-group">
          <label class="mt-3"
            ><b>Description</b><span class="text-danger">*</span></label
          >
          <textarea
            v-model="tradeobj.description"
            class="form-control"
            cols="20"
            rows="5"
             :class="{ 'is-invalid': submitted && $v.tradeobj.description.$error }"
          ></textarea>
          <div v-if="submitted && !$v.tradeobj.description.required" class="invalid-feedback">Description is required</div>
          </div>
          <div class="text-center mt-3">
            <button @click.prevent="CreateTrade()" class="thmbtn1">
              Create Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import EventServices from "@/services/EventServices.js";
import {required, minLength, maxLength} from "vuelidate/lib/validators"
//https://codesandbox.io/s/r0lkrn4wxo?file=/app/App.vue
export default {
  data() {
    return {
      category: "",
      submitted:false,
      catsubmitted:false,
      tradeobj: {
        prod_name: "",
        category_id: "",
        year: "",
        seller: "",
        description: "",
        product_img_url: "",
      },
      dropdowncategories: [],
      addcatobj: {
        imageurl: "",
        category_name: "",
      },
    };
  },
  validations:{
    addcatobj:{
      category_name:{required},
    },
    
    tradeobj: {
        category_id:{required},
        prod_name: {required},
        year: {required,minLength: minLength(4),maxLength: maxLength(4)},
        seller: {required},
        description: {required}
      }
  },
  created() {
    this.categoriesdropdown();
    this.tradeobj.seller=localStorage.getItem('username')
  },
  methods: {
    async categoriesdropdown() {
      EventServices.getdropdownCategories().then((data) => {
        this.dropdowncategories = data;
      });
    },
    CreateTrade() {
        this.submitted = true;
        this.$v.tradeobj.$touch();
        if (this.$v.tradeobj.$invalid) {
            return;
        }
        if(this.tradeobj.product_img_url==""){
          this.tradeobj.product_img_url="https://github.com/tushar251095/TheVintageStore_V2/blob/main/thevintagestoreapp_client/src/assets/Images/no-image.jpg?raw=true"
        }
        EventServices.addNewTrade(this.tradeobj).then((res) => {
          if(res==true){
            this.$toast.open({
            message: "Trade Added Successfully",
            type: "success",
            position: "top",
          });
          this.$router.push("Trades");
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
    CreateCategory() {
       this.catsubmitted = true;
      this.$v.addcatobj.$touch();
        if (this.$v.addcatobj.$invalid) {
            return;
        }
      if (this.addcatobj.imageurl == "") {
        this.addcatobj.imageurl =
          "https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg";
      }
      EventServices.addNewCategory(this.addcatobj).then(() => {
        //this.$router.push("newtrade");
        window.location.reload()
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/CSS/newTrade.css";
</style>
