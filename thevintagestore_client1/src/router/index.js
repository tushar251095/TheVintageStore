import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Trades from "../views/trades.vue";
import Trade from "../views/trade.vue";
import MoreItems from "../views/moreitems.vue";
import Addtrade from "../views/newtrade.vue";
import About from "../views/about.vue";
import Edit from "../views/edit.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
