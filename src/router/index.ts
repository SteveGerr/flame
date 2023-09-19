import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PeopleView from "@/views/PeopleView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import CharacterView from "@/views/CharacterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/people",
  },
  {
    path: "/people",
    name: "people",
    component: PeopleView,
  },
  {
    path: "/people/:id",
    name: "character",
    component: CharacterView,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
