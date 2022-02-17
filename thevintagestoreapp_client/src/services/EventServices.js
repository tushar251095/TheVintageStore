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
    let res = await apiClient.get("/trades");
    return res.data;
  },

  async getProductDetails(payload) {
    let sendobj = {
      product_id: payload,
    };
    let res = await apiClient.post("/trade", sendobj);
    console.log(res.data);
    return res.data;
  },
  async getMoreitems(payload) {
    // let sendobj = {
    //   category_id: payload,
    // };
     let res = await apiClient.post("/moreitems", payload);
    return res.data;
  },
  async getdropdownCategories() {
    let res = await apiClient.get("/categories");
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
    let res = await apiClient.post("/view/allproduct",payload);
    return res.data;
  },
  async deleteProduct(payload) {
    // console.log(payload)
    let res = await apiClient.post("/delete/trade", payload);
    return res.data;
  },
  async updateProduct(payload) {
    // console.log(payload)
    let res = await apiClient.post("/update/trade", payload);
    return res.data;
  },
  async findCategory(payload) {
    // console.log(payload)
    let res = await apiClient.post("/find/catrgory", payload);
    return res.data;
  },
  async editCategory(payload) {
    // console.log(payload)
    let res = await apiClient.post("/edit/catrgory", payload);
    return res.data;
  },
};
