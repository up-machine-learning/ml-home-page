import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/auth/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/pages/auth/RegisterPage.vue"),
    },
    {
      path: "/destination",
      name: "Destination",
      component: () => import("@/pages/Destination.vue"),
    },
    {
      path: "/search-result",
      name: "SearchResult",
      component: () => import("@/pages/SearchResult.vue"),
    },
    {
      path: "/search-result/:id",
      name: "SearchResultDetail",
      component: () => import("@/pages/SearchResultDetail.vue"),
    },
  ] as RouteRecordRaw[],
  history: createWebHashHistory(),
});

const whiteList = ["Login", "Register"];

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem("token");
  if (!whiteList.includes(to.name as string) && !hasToken) {
    next({
      name: "Login",
    });
  } else {
    next();
  }
});
export default router;
