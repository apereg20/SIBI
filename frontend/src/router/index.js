import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Help from "../views/Help.vue";
import Historial from "../views/Historial.vue";
import Favoritas from "../views/Favoritas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/help",
    name: "Help",
    component:  Help
  },
  {
    path: "/favoritas",
    name: "Favoritas",
    component:  Favoritas
  },
  {
    path: "/historial",
    name: "Historial",
    component:  Historial
  },
];

const router = new VueRouter({
  routes
});

export default router;
