import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/appointments",
      name: "appointments",
      component: () => import("../views/AppointmentsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/instant-consultation",
      name: "instantConsultation",
      component: () => import("../views/InstantConsultationView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/self-checkup",
      name: "selfCheckup",
      component: () => import("../views/SelfCheckupView.vue"),
    },
    {
      path: "/health-tips",
      name: "healthTips",
      component: () => import("../views/HealthTipsView.vue"),
    },
    {
      path: "/reviews",
      name: "reviews",
      component: () => import("../views/ReviewsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/ReportsView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {

  const localUser = localStorage.getItem("user");
  const sessionUser = sessionStorage.getItem("user");
  const isAuthenticated = localUser !== null || sessionUser !== null;

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/login");
  }
  else if (to.name === "login" && isAuthenticated) {
    next("/");
  }
  else {
    next();
  }
});

export default router;
