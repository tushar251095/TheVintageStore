<template>
  <main class="container-fluid">
    <section class="row p-3">
      <div class="col-sm-12 col-md-6 col-lg-12 p-3">
        <h4 class="text-center">Categories</h4>
        <button
          type="button"
          class="thmbtn1 rounded float-end"
          @click="EditCategoriesEnable()"
        >
          {{ editbtnname }}
        </button>
      </div>
    </section>
    <section class="row justify-content-start" :class="mainbackground">
      <div v-if="categories.length==0">
        <h4 class="text-secondary p-5 text-center border border-rounded border-dark">No Categories to display</h4>
      </div>
      <div
        class="col-sm-12 col-md-6 col-lg-4 ps-5 pe-5 pb-2"
        v-for="(category, index) in categories"
        :key="index"
        v-else
      >
        <div class="cardbox" :class="cardClass">
          <img :src="category.imageurl" alt="product image" class="cardimage" />
          <div class="p-2 float-end" role="button" v-if="editcategory" v-b-modal.delete-modal @click="saveCategoryinfo(category)">
            <i
              class="fa fa-trash fa-lg text-danger editdesign"
              aria-hidden="true"
              
            ></i>
          </div>
          <div
            class="p-2 float-start"
            role="button"
            v-if="editcategory"
            @click="opencateditmodal(category.category_id)"
          >
            <i
              class="fas fa-edit fa-lg text-info editdesign"
              aria-hidden="true"
            ></i>
          </div>
          <h4 class="text-center pt-2">{{ category.title }}</h4>
          <hr class="hrline" />
          <ul
            class="cardlist"
            v-if="category.subtype.length > 0"
            style="min-height: 155px"
          >
            <li class="p-1" v-for="(type, idx) in category.subtype" :key="idx">
              <p
                @click="StoreProductID(type.product_id)"
                class="subtypeclass"
                :class="linkdisabled"
              >
                {{ type.prod_name }}
              </p>
            </li>
            <li class="p-1">
              <a
                v-if="category.subtype.length > 2"
                @click="StorecategoryID(category.category_id)"
                class="text-primary"
                :class="linkdisabled"
                >More Items...</a
              >
            </li>
            <div class="mt-auto" style="" v-if="category.subtype.length < 3">
              <h5 class="text-center text-secondary">No More Items</h5>
            </div>
          </ul>
          <div
            class="mt-auto"
            style="min-height: 155px"
            v-if="category.subtype.length == 0"
          >
            <h5 class="text-center pt-5">No Items</h5>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 ps-5 pe-5" >
        <div
          class="cardbox pluscard d-flex flex-column justify-content-center align-items-center"
          :class="cardClass"
        >
          <div type="button"
            v-b-modal.addcategory-modal>
            <i class="fa-light fa-plus fa-10x text-secondary"></i>
          </div>

          <h3 class="text-center text-secondary">Add category</h3>
        </div>
      </div>
    </section>
    <b-modal ref="modal-editcat" title="editCategory" hide-header>
      <h4 class="text-center">Edit Category</h4>
      <div class="p-3 d-flex flex-column justify-content-center">
        <label><b>Category Name</b></label
        ><br />
        <input
          v-model="editcategories.title"
          class="form-control"
          type="text"
          placeholder="Enter category name"
        /><br />
        <label><b>Category Image URL</b></label
        ><br />
        <input
          v-model="editcategories.imageurl"
          class="form-control"
          type="url"
          placeholder="Image URL for catergory"
        /><br />
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button type="button" class="btn btn-primary" @click="EditCategory()">
          Edit Category
        </button>
      </template>
    </b-modal>
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
      <b-modal id="delete-modal" hide-header>
      <img
        src="../assets/Images/delete.png"
        alt="delete icon"
        height="70"
        width="70"
        class="rounded mt-2 mx-auto d-block"
      />
      <h5 class="text-center mt-3">
        Are you sure you want to delete below category?
      </h5>
      <h5 class="text-center text-secondary">{{catinfo.title}}</h5>
      <template #modal-footer="{ cancel }">
        <b-button size="md" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <button type="button" class="btn btn-danger" @click="deleteCategory()">
          Delete
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
      categories: [
        {
          title: "",
          category_id: 0,
          subtype: [],
        },
      ],
      id: 0,
      cardClass: "",
      mainbackground: "",
      editcategory: false,
      editbtnname: "Edit Category",
      linkdisabled: "",
      modal_category_ID: 0,
      catinfo:{},
      editcategories: {},
      addcatobj:{
        imageurl:""
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      EventServices.getCategories().then((data) => {
         if(data != undefined){
         this.categories = data;
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
    StorecategoryID(payload) {
      this.$store.dispatch("savecatid", payload).then(() => {
        this.$router.push({
          name: "MoreItems",
        });
      });
    },
    EditCategoriesEnable() {
      if (!this.editcategory) {
        this.$toast.open({
          message: "Click on respective icon to edit!",
          type: "info",
          position: "top",
        });
        this.cardClass = "CardDesign";
        this.editbtnname = "Cancel Edit";
        this.linkdisabled = "disabled";
        this.editcategory = true;
        this.mainbackground = "mainbackground";
      } else {
        this.cardClass = "";
        this.editbtnname = "Edit Category";
        this.linkdisabled = "";
        this.mainbackground = "";
        this.editcategory = false;
      }
    },
    opencateditmodal(payload) {
      if (this.editcategory) {
        this.editcategories.category_id = payload;
        EventServices.findCategory({ category_id: payload }).then((data) => {
          this.editcategories = data;
          this.$refs["modal-editcat"].show();
        });

        //console.log("success");
      }
    },
    EditCategory() {
      EventServices.editCategory(this.editcategories).then(() => {
        this.$refs["modal-editcat"].hide();
        this.$toast.open({
          message: "Category edited Successfully",
          type: "success",
          position: "top",
        });
        window.location.reload();
      });
    },
    CreateCategory() {
     // console.log(this.addcatobj)
      if(this.addcatobj.imageurl==""){
        this.addcatobj.imageurl="https://i.ytimg.com/vi/2QvOxa_7wEw/maxresdefault.jpg";
      }
      EventServices.addNewCategory(this.addcatobj).then(() => {
        window.location.reload()
      });
    },
    saveCategoryinfo(data){
        this.catinfo=data
    },
    deleteCategory(){
      EventServices.deleteCategory({ category_id: this.catinfo.category_id }).then(() => {
        this.$toast.open({
          message: "Category Deleted Successfully",
          type: "success",
          position: "top",
        });
        window.location.reload()
      });
    }
  },
};
</script>

<style scoped>
@import "../assets/CSS/trades.css";
</style>
