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
          v-for="(product, index) in productArray"
          :key="index"
        >
          <div class="card" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)">
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
    <b-modal id="delete-modal" hide-header>
      <img
        src="../../public/Images/delete.png"
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

    <b-modal id="update-modal" hide-header>
      <div class="modal-body">
        <img
          src="../../public/Images/edit.png"
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
        <input type="text" v-model="editobj.year" class="form-control" /><br />
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
export default {
  data() {
    return {
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
        this.endingIndex = this.currentPage * this.perPage - 1;
        var sendobj = {
          startingIndex: this.startingIndex,
          endingIndex: this.endingIndex,
        };
         EventServices.getAllItemsForEditpage(sendobj).then(
        (data) => {
          this.pages=((data[data.length - 1].arraySize-1) + this.perPage - 1)/this.perPage
         data.pop();
          this.productArray = data;
        }
      );
        })
     
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
.img-fluid {
  max-height: 200px;
  min-height: 200px;
  width: 100%;
}
p {
  cursor: pointer;
}
</style>
