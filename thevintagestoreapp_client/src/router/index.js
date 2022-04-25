import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Trades from "../views/trades.vue";
import Trade from "../views/trade.vue";
import MoreItems from "../views/moreitems.vue";
import Addtrade from "../views/newtrade.vue";
import About from "../views/about.vue";
import Edit from "../views/edit.vue";
import Signup from "../views/registrationForm.vue";
import Login from "../views/Login.vue";
import errorViewComponent from "../views/error.vue";
import Contact from "../views/contact.vue";
import PageNotFound from "../views/PageNotFound.vue";
import profile from "../views/profile.vue";
import userProfile from "../views/userProfile.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/newtrade",
    name: "Addtrade",
    component: Addtrade,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/trades",
    name: "Trades",
    component: Trades,
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
  },
  {
    path: "/viewmore",
    name: "MoreItems",
    component: MoreItems,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    meta: {
      requiresAuth: true
  }
  },
  {
    path: "/registration",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/contact",
    name: "contact",
    component:Contact ,
  },
  {
    path: "/users/profile",
    name: "/users/profile",
    component:userProfile ,
    meta: {
      requiresAuth: true
  }
  },
  { path: "/error", 
  name:"error",
  component: errorViewComponent,
 },
 { path: "/users/loginhome", 
  name:"/users/loginhome",
  component: profile,
  meta: {
    requiresAuth: true
}
 },
 { path: "*", 
  name:"PageNotFound",
  component: PageNotFound,
 }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
   if(to.name=='Login'){
     if(localStorage.getItem('id')!=null){
       alert("You are already logged in")
       next('/users/loginhome')
     }else{
       next()
     }
   }
  var authenticatedUser = null;
  if(localStorage.getItem('token')!=null){
    authenticatedUser=true;
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && ! authenticatedUser) {
    alert("you need to login first")
    localStorage.clear();
    next('/login')
    location.reload()
  }else{
     next();
  }
 
});

export default router;
