import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Help from "../views/Help.vue";
import Historial from "../views/Historial.vue";
import Favoritas from "../views/Favoritas.vue";
import Registro from "../views/Registro.vue";
import Entrada from "../views/Entrada.vue";
import IniciarSesion from "../views/IniciarSesion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
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
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
  },
  {
    path: "/",
    name: "Entrada",
    component: Entrada,
  },
  {
    path: "/iniciarSesion",
    name: "IniciarSesion",
    component: IniciarSesion,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
