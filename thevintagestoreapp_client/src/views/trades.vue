<template>
  <main class="container-fluid">
    <section class="row p-3">
      <div class="col-sm-12 col-md-6 col-lg-12 p-3">
        <h4 class="text-center">Categories</h4>
        <btutton
          type="button"
          class="thmbtn1 float-end"
          @click="EditCategoriesEnable()"
          >{{ editbtnname }}</btutton
        >
      </div>
    </section>
    <section class="row justify-content-start">
      <div
        class="col-sm-12 col-md-6 col-lg-4 ps-5 pe-5"
        v-for="(category, index) in categories"
        :key="index"
      >
        <div class="cardbox" :class="cardClass">
          <img :src="category.imageurl" alt="product image" class="cardimage" />
          <h4 class="text-center pt-2">{{ category.title }}</h4>
          <hr class="hrline" />
          <ul
            class="cardlist"
            v-if="category.subtype.length > 0"
            style="min-height: 155px"
          >
            <li class="p-1" v-for="(type, idx) in category.subtype" :key="idx">
              <p @click="StoreProductID(type.product_id)" class="subtypeclass">
                {{ type.prod_name }}
              </p>
            </li>
            <li class="p-1">
              <a
                v-if="category.subtype.length > 2"
                @click="StorecategoryID(category.category_id)"
                class="text-primary"
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
    </section>
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
      editcategory: false,
      editbtnname: "Edit Categories",
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      EventServices.getCategories().then((data) => {
        this.categories = data;
        console.log(this.categories);
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
        this.cardClass = "CardDesign";
        this.editbtnname = "Cancel Edit";
        this.editcategory = true;
      } else {
        this.cardClass = "";
        this.editbtnname = "Edit Categories";
        this.editcategory = false;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/CSS/trades.css";
.CardDesign:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
