import axios from "axios";
import router from '../router'
import errorjs from "../Javascript/error"
const apiClient = axios.create({
  baseURL: "http://localhost:3000/users",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:"Bearer"+" " + localStorage.getItem("token")
  },
 
});

export default {
  async registerUser(payload) {
    try{
      let res = await apiClient.post("/new",payload);
      return res.data;
    }catch(error){
      if(error.response.data.message=="Email has been used"){
         return error.response.data.message
      }else{
        errorjs.openRouteErrors(error)
      }
     
    }
  },
  async loginService(payload) {
    try{
      let res = await apiClient.post("/login",payload);
      return res.data;
    }catch(error){
      return error.response.data.message;
  }
},
  async profileService(payload) {
    try{
      let res = await apiClient.get("/profile",payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
     
    }
  },
  async addToWatchList(payload) {
    try{
      let res = await apiClient.post("/watchlist",payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
     
    }
  },
  async getWatchList() {
    try{
      let res = await apiClient.get("/watchlist");
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
     
    }
  },
  async removeFromWatchList(payload) {
    try{
      let res = await apiClient.post("/watchlist/remove",payload);
      return res.data;
    }catch(error){
      errorjs.restrictedRouteErrors(error)
     
    }
  },
  async logout() {
    try{
     // let res = await apiClient.get("/logout");
      localStorage.clear()
      router.push({ path: '/'});
      location.reload()
      return;
    }catch(error){
      errorjs.openRouteErrors(error)
    }
  },
};
