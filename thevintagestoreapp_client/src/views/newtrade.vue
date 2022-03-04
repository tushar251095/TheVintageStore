<template>
  <main class="container-fluid p-3">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-12 col-md-10 col-lg-6">
        <form class="w-100 p-5 tradeform mt-3">
          <h4 class="text-center">New Trade</h4>
          <label class="mt-3"
            ><b>Category</b><span class="text-danger">*</span></label
          >
          <select v-model="tradeobj.category_id" class="form-control">
            <option disabled value="">Please select one</option>
            <option
              v-for="(category, index) in dropdowncategories"
              :key="index"
              :value="category.category_id"
            >
              {{ category.title }}
            </option>
          </select>
          <p class="text-danger">{{errorobj.category_nameErr}}</p>
          <br />
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
              <label><b>Category Name</b></label
              ><br />
              <input
                class="form-control"
                type="text"
                placeholder="Enter category name"
                v-model="addcatobj.category_name"
              /><br />
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
          <label class="mt-3"
            ><b>Product Name</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.prod_name"
            class="form-control"
            type="text"
            placeholder="Enter Name of Product"
            required
          />

          <label class="mt-3"
            ><b>Seller Name</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.seller"
            class="form-control"
            type="text"
            placeholder="Enter Name who will sell it"
          />

          <label class="mt-3"
            ><b>Year</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.year"
            class="form-control"
            type="number"
            placeholder="Enter year"
          />

          <label class="mt-3"
            ><b>Product Image URL</b><span class="text-danger">*</span></label
          >
          <input
            v-model="tradeobj.product_img_url"
            class="form-control"
            type="url"
            placeholder="Enter product image URL"
          />

          <label class="mt-3"
            ><b>Description</b><span class="text-danger">*</span></label
          >
          <textarea
            v-model="tradeobj.description"
            class="form-control"
            cols="20"
            rows="5"
          ></textarea>
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
export default {
  data() {
    return {
      category: "",
      tradeobj: {
        prod_name: "",
        category_id: 0,
        year: "",
        seller: "",
        description: "",
        product_img_url: "",
      },
      errorobj: {
        category_nameErr:""
      },
      dropdowncategories: [],
      addcatobj: {
        imageurl: "",
        category_name: "",
      },
    };
  },
  created() {
    this.categoriesdropdown();
  },
  methods: {
    async categoriesdropdown() {
      EventServices.getdropdownCategories().then((data) => {
        this.dropdowncategories = data;
      });
    },
    formValidations() {
      if (this.tradeobj.prod_name == "") {
        this.errorobj.prod_nameErr = "Product name is required";
      }
      if (this.tradeobj.category_name == "") {
        this.errorobj.category_nameErr = "Category name is required";
      }
      if (this.tradeobj.product_img_url == "") {
        this.errorobj.product_img_urlErr = "Product Image URL is required";
      }
      if (this.tradeobj.year == "") {
        this.errorobj.yearErr = "year is required";
      }
      if (this.tradeobj.seller == "") {
        this.errorobj.sellerErr = "seller name is required";
      }
      if (this.tradeobj.description == "") {
        this.errorobj.descriptionErr = "Description is required";
      }
    },
    CreateTrade() {
      if (
        this.tradeobj.prod_name == "" ||
        this.tradeobj.product_img_url == "" ||
        this.tradeobj.category_name == "" ||
        this.tradeobj.year == "" ||
        this.tradeobj.description == "" ||
        this.tradeobj.seller == ""
      ) {
        this.formValidations()
        console.log(this.errorobj);
      } else {
        EventServices.addNewTrade(this.tradeobj).then(() => {
          this.$toast.open({
            message: "Trade Added Successfully",
            type: "success",
            position: "top",
          });
          this.$router.push("Trades");
        });
      }
    },
    CreateCategory() {
      if (this.addcatobj.imageurl == "") {
        this.addcatobj.imageurl =
          "https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg";
      }
      EventServices.addNewCategory(this.addcatobj).then(() => {
        this.$router.push("Trades");
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/CSS/newTrade.css";
</style>
