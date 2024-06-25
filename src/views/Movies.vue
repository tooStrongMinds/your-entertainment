<template>
  <div class="movieView head">
    <span class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="search"
        placeholder="Search by movies"
        v-model="searchQuery"
        @input="fetchSearchResults"
      />
    </span>

    <div class="main" v-if="!searchQuery">
      <h1>Movies</h1>
      <div class="card">
        <MovieCard v-for="movie in displayMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
    <div v-else>
      <h1>Search results for "{{ searchQuery }}"</h1>
      <div class="card">
        <MovieCard v-for="movie in searchedMovies" :key="movie.id" :movie="movie"/>
      </div>
    </div>
    <button v-if="!searchQuery && !isAllMoviesLoaded" @click="loadMoreMovies">Load More</button>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";

export default {
  name: "Movies",
  components: {
    MovieCard,
  },
  setup() {
    const movies = ref([]);
    const searchedMovies = ref([]);
    const searchQuery = ref("");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const isAllMoviesLoaded = ref(false);

    const fetchMovies = async () => {
      if (currentPage.value > totalPages.value) {
        isAllMoviesLoaded.value = true;
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${currentPage.value}`
        );
        movies.value.push(...response.data.results);
        totalPages.value = response.data.total_pages;
        currentPage.value++;
      } catch (error) {
        console.log("Error fetching movies", error.message);
      }
    };

    const fetchSearchResults = async () => {
      if (searchQuery.value.trim() === "") {
        searchedMovies.value = [];
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery.value}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        searchedMovies.value = response.data.results;
      } catch (error) {
        console.log("Error fetching search results", error.message);
      }
    };

    const displayMovies = computed(() => {
      return searchQuery.value.trim() ? searchedMovies.value : movies.value;
    });

    const loadMoreMovies = () => {
      fetchMovies();
    };

    onMounted(() => {
      fetchMovies();
    });

    return {
      fetchMovies,
      fetchSearchResults,
      movies,
      searchedMovies,
      searchQuery,
      displayMovies,
      loadMoreMovies,
      isAllMoviesLoaded,
    };
  },
};
</script>

<style>
/* .movies {
  display: flex;
  flex-wrap: wrap;
}

.moviecards {
  position: relative;
  margin: 10px;
}

.moviecards img {
  width: 100%;
  height: auto;
}

.movie-overview {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  box-sizing: border-box;
}

.moviecards:hover .movie-overview {
  display: block;
} */
</style>
