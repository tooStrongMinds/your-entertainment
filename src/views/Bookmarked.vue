<template>
  <div class="head">
    <span class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" placeholder="Search Bookmarked Shows" />
    </span>

    <div class="main">
      <div class="movies">
        <h1>Bookmarked Movies</h1>
        <MovieCard
          v-for="movie in bookmarkedMovies"
          :key="movie.id"
          :movie="movie" @bookmark-toggled="handleBookmarkToggled"
        />
      </div>
      <div class="tv-series">
        <h1>Bookmarked TV Series</h1>
        <MovieCard
          v-for="movie in bookmarkedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MovieCard from "@/components/MovieCard.vue";

export default {
  name: "Bookmarked",
  components: {
    MovieCard,
  },
  tup() {
    const bookmarkedMovies = ref([]);
    const bookmarkedTVSeries = ref([]);

    const loadBookmarkedMovies = () => {
      const movies = JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
      bookmarkedMovies.value = movies;
    };

    const handleToggle = (movie) => {
      // Toggle bookmarked state
      // loadBookmarkedMovies();
      
    }

    const loadBookmarkedTVSeries = () => {
      const tvSeries =
        JSON.parse(localStorage.getItem("bookmarkedTVSeries")) || [];
      bookmarkedTVSeries.value = tvSeries;
    };

    onMounted(() => {
      loadBookmarkedMovies();
      loadBookmarkedTVSeries();
      
    });

    return {
      bookmarkedMovies,
      bookmarkedTVSeries,
      handleToggle
    };
  },
};
</script>

<style></style>
