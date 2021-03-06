import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

    meta: {
      keepAlive: true
  }

  },


  {
    path: "/sign-in",
    name: "Sign-in",
    component: () =>
      import( "../views/Sign-in.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: () =>
      import( "../views/Sign-up.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import( "../views/Cart.vue"),
  },
  
  {
    path: "/userInfo",
    name: "UserInfo",
    component: () =>
      import( "../views/UserInfo.vue"),
  },
  
  

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;


