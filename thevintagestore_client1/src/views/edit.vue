<template>
  <main class="container-fluid">
    <div>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h4 class="text-center p-3">Edit Products</h4>
        </div>
      </div>
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-3 p-3"
          v-for="product in productArray"
          :key="product"
        >
          <div class="card" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)">
            <img
              :src="product.product_img_url"
              class="img-fluid"
              alt="Product Image"
            />
            <div class="p-3">
              <h6>
                <router-link
                  to="/trade"
                  @click="$store.dispatch('saveid', product.product_id)"
                  class="subtypeclass text-dark"
                  >{{ product.prod_name }}</router-link
                >
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
              <button
                class="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#editmodal"
                @click="openUpdateForm(product.product_id)"
              >
                Update
              </button>
              <button
                class="btn btn-outline-danger ml-2"
                data-toggle="modal"
                data-target="#deletemodal"
                @click="saveProductID(product.product_id, product.prod_name)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="deletemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deletemodalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
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
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              NO
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteTrade()"
              data-dismiss="modal"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editmodalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              src="../assets/Images/edit.png"
              alt="delete icon"
              height="70"
              width="70"
              class="mt-2 mx-auto d-block"
            />
            <h5 class="text-center mt-3">Below are the current details.</h5>
            <label>Product Name</label><br />
            <input
              type="text"
              v-model="editobj.prod_name"
              class="form-control"
            /><br />
            <label>Category</label><br />
            <select v-model="editobj.category_id" class="form-control">
              <option disabled value="">Please select one</option>
              <option
                v-for="category in dropdowncategories"
                :key="category"
                :value="category.category_id"
              >
                {{ category.title }}
              </option></select
            ><br />
            <label>Year</label><br />
            <input
              type="text"
              v-model="editobj.year"
              class="form-control"
            /><br />
            <label>Product Image URL</label><br />
            <input
              type="url"
              v-model="editobj.product_img_url"
              class="form-control"
            /><br />
            <label>Description</label><br />
            <textarea
              v-model="editobj.description"
              class="form-control"
              rows="7"
            /><br />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              CLOSE
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="editTrade()"
              data-dismiss="modal"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EventServices from "@/services/EventServices.js";
export default {
  data() {
    return {
      productArray: [],
      productID: 0,
      productname: "",
      dropdowncategories: [],
      editobj: {},
    };
  },
  created() {
    this.getproducts();
  },
  methods: {
    getproducts() {
      EventServices.getAllItemsForEditpage(this.$store.state.category_id).then(
        (data) => {
          this.productArray = data;
        }
      );
    },
    saveProductID(productid, name) {
      this.productID = productid;
      this.productname = name;
    },
    deleteTrade() {
      EventServices.deleteProduct({ product_id: this.productID }).then(() => {
        this.$router.push("Edit");
        window.location.reload();
      });
    },
    openUpdateForm(product_id) {
      this.getproductdetails(product_id);
      EventServices.getdropdownCategories().then((data) => {
        this.dropdowncategories = data;
        console.log(this.dropdowncategories[0].title);
      });
    },
    async getproductdetails(product_id) {
      EventServices.getProductDetails(product_id).then((data) => {
        this.editobj = data[0];
        // console.log(this.editobj)
      });
    },
    editTrade() {
      // console.log(this.editobj);
      EventServices.updateProduct(this.editobj).then((data) => {
        console.log(data[0]);
        this.$router.push("Edit");
        window.location.reload();
      });
    },
  },
};
</script>
<style scoped>
.img-fluid {
  max-height: 200px;
  min-height: 200px;
  width: 100%;
}
</style>
