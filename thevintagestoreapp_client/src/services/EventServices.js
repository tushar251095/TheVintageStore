import axios from "axios";
//import router from '../router'
import errorjs from "../Javascript/error"
const apiClient = axios.create({
  baseURL: "http://localhost:3000/trade",
  
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:"Bearer"+" " + localStorage.getItem("token")
  },
});

export default {
  async getCategories() {
    try{
      let res = await apiClient.get("/categories");
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },

  async getProductDetails(payload) {
    try{
      let res = await apiClient.get("/"+payload);
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async getMoreitems(payload) {
    try{
      let res = await apiClient.get("/moreitems/"+payload.category_id+"/"+payload.startingIndex+"/"+payload.endingIndex);
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async getdropdownCategories() {
    try{
      let res = await apiClient.get("/categories/names");
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async addNewTrade(payload) {
    try{
      let res = await apiClient.post("/add/trade", payload);
    return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async addNewCategory(payload) {
    try{
      let res = await apiClient.post("/add/category", payload);
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async getAllItemsForEditpage(payload) {
    try{
      let res = await apiClient.get("/view/allproduct/"+payload.startingIndex+"/"+payload.endingIndex);
    return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async deleteProduct(payload) {
    try{
      let res = await apiClient.delete("/product/delete/"+payload.product_id+"?_method=DELETE");
    return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async deleteCategory(payload) {
    try{
      let res = await apiClient.delete("/delete/category/"+payload.category_id+"?_method=DELETE");
    return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async updateProduct(payload) {
    try{
      let res = await apiClient.put("/update/trade/"+payload.product_id, payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async findCategory(payload) {
    try{
      let res = await apiClient.get("/find/catrgory/"+payload.category_id);
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async editCategory(payload) {
    try{
      let res = await apiClient.put("/edit/catrgory", payload);
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async mostviewed() {
    try{
      let res = await apiClient.get("/product/mostviewed");
      return res.data;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
  async getProducts(){
    try{
      let res = await apiClient.get("/users/products");
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async saveTrade(payload){
    try{
      let res = await apiClient.post("/trading/request",payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async getTradeHistory(){
    try{
      let res = await apiClient.get("/trading/history");
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async getTradeOffers(){
    try{
      let res = await apiClient.get("/trading/offers");
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async acceptRejectStatus(paylaod){
    try{
      let res = await apiClient.post("/trading/update/offer",paylaod);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async cancelTrade(paylaod){
    try{
      let res = await apiClient.get("/trading/cancel/offer/"+paylaod);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  },
  async getRecommendedProducts(payload){
    try{
      let res = await apiClient.get("/trading/confirmation/"+payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
    }
  }
};

