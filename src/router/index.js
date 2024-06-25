import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Movies from "../views/Movies.vue";
import TvSeries from "../views/TvSeries.vue";
import Bookmarked from "../views/Bookmarked.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movies",
    name: "movies",
    component: Movies,
  },
  {
    path: "/tv-series",
    name: "tv-series",
    component: TvSeries,
  },
  {
    path: "/bookmarked",
    name: "bookmarked",
    component: Bookmarked,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
