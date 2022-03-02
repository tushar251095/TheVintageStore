import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/trade",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default {
  async getCategories() {
    let res = await apiClient.get("/categories");
    return res.data;
  },

  async getProductDetails(payload) {
    let res = await apiClient.get("/"+payload);
    //console.log(res.data);
    return res.data;
  },
  async getMoreitems(payload) {
     let res = await apiClient.post("/moreitems", payload);
    return res.data;
  },
  async getdropdownCategories() {
    let res = await apiClient.get("/categories/names");
    return res.data;
  },
  async addNewTrade(payload) {
    let res = await apiClient.post("/add/trade", payload);
    return res.data;
  },
  async addNewCategory(payload) {
    let res = await apiClient.post("/add/category", payload);
    return res.data;
  },
  async getAllItemsForEditpage(payload) {
    let res = await apiClient.get("/view/allproduct/"+payload.startingIndex+"/"+payload.endingIndex);
    return res.data;
  },
  async deleteProduct(payload) {
    //console.log(payload.product_id)
    let res = await apiClient.delete("/product/delete/"+payload.product_id+"?_method=DELETE");
    return res.data;
  },
  async deleteCategory(payload) {
    // console.log(payload)
    let res = await apiClient.delete("/delete/category/"+payload.category_id+"?_method=DELETE");
    return res.data;
  },
  async updateProduct(payload) {
    // console.log(payload)
    let res = await apiClient.put("/update/trade", payload);
    return res.data;
  },
  async findCategory(payload) {
    // console.log(payload)
    let res = await apiClient.get("/find/catrgory/"+payload.category_id);
    return res.data;
  },
  async editCategory(payload) {
    // console.log(payload)
    let res = await apiClient.put("/edit/catrgory", payload);
    return res.data;
  },
  async mostviewed() {
    // console.log(payload)
    let res = await apiClient.get("/product/mostviewed");
    return res.data;
  },
};
