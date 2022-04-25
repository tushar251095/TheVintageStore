import axios from "axios";
import router from '../router'
const apiClient = axios.create({
  baseURL: "http://localhost:3000/trade",
  
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:"Bearer"+" " + localStorage.getItem("token")
  },
});

let errorView="error"
export default {
  async getCategories() {
    try{
      let res = await apiClient.get("/categories");
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },

  async getProductDetails(payload) {
    try{
      let res = await apiClient.get("/"+payload);
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async getMoreitems(payload) {
    try{
      let res = await apiClient.get("/moreitems/"+payload.category_id+"/"+payload.startingIndex+"/"+payload.endingIndex);
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async getdropdownCategories() {
    try{
      let res = await apiClient.get("/categories/names");
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async addNewTrade(payload) {
    try{
      let res = await apiClient.post("/add/trade", payload);
    return res.data;
    }catch(error){
      if(error.response.data.statusCode==401){
        alert("Unauthorized access")
        this.logout().then(()=>{
          console.log("logout")
        })
       // return router.push(errorView)
     }else{
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
     }
    }
  },
  async addNewCategory(payload) {
    try{
      let res = await apiClient.post("/add/category", payload);
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async getAllItemsForEditpage(payload) {
    try{
      let res = await apiClient.get("/view/allproduct/"+payload.startingIndex+"/"+payload.endingIndex);
    return res.data;
    }catch(error){
      if(error.response.data.statusCode==401){
        alert("Unauthorized access")
        this.logout().then(()=>{
          console.log("logout")
        })
       // return router.push(errorView)
     }else{
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
     }
    }
  },
  async deleteProduct(payload) {
    try{
      let res = await apiClient.delete("/product/delete/"+payload.product_id+"?_method=DELETE");
    return res.data;
    }catch(error){
      if(error.response.data.statusCode==401){
        alert("Unauthorized access")
        this.logout().then(()=>{
          console.log("logout")
        })
       // return router.push(errorView)
     }else{
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
     }
    }
  },
  async deleteCategory(payload) {
    try{
      let res = await apiClient.delete("/delete/category/"+payload.category_id+"?_method=DELETE");
    return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async updateProduct(payload) {
    try{
      let res = await apiClient.put("/update/trade", payload);
      return res.data;
    }catch(error){
      if(error.response.data.statusCode==401){
        alert("Unauthorized access")
        this.logout().then(()=>{
          console.log("logout")
        })
       // return router.push(errorView)
     }else{
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
     }
    }
  },
  async findCategory(payload) {
    try{
      let res = await apiClient.get("/find/catrgory/"+payload.category_id);
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async editCategory(payload) {
    try{
      let res = await apiClient.put("/edit/catrgory", payload);
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
  async mostviewed() {
    try{
      let res = await apiClient.get("/product/mostviewed");
      return res.data;
    }catch(error){
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
    }
  },
};
