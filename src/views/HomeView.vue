<template>
  <div class="home head">
    <!-- Search bar component -->
    <span class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="search"
        placeholder="Search by movies or TV series"
        v-model="searchQuery"
        @input="fetchSearchResults"
      />
    </span>
    <!-- Trending section -->
    <div v-if="!searchQuery">
      <div class="trending">
        <h1>Trending</h1>
        <div v-if="trendingShows.length" class="trendMovie">
          <MovieCard
            v-for="item in trendingShows.slice(0, 8)"
            :key="item.id"
            :movie="item"
            class="iff"
          />
        </div>
      </div>
      <div class="recommended">
        <h1>Recommended for you</h1>
        <div v-if="recommendedShows.length" class="card">
          <MovieCard
            v-for="movie in recommendedShows.slice(0, 13)"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Search Results for "{{ searchQuery }}"</h1>
      <div class="card">
        <MovieCard
          v-for="movie in searchedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: { MovieCard },
  setup() {
    const trendingShows = ref([]);
    const recommendedShows = ref([]);
    const searchedMovies = ref([]);
    const searchQuery = ref("");

    const fetchTrendingShows = async () => {
      // const apiKey = b5549b7208a29cf5e4d8e62819aa403e
      const movieEndPoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`
      const tvEndPoint = `https://api.themoviedb.org/3/trending/tv/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`

      try {
        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(movieEndPoint),
          axios.get(tvEndPoint)
        ])

        trendingShows.value = [...moviesResponse.data.results, ...tvResponse.data.results].sort((a, b) => b.poplarity - a.popularity);
      } catch (error) {
        console.log('Error fetching trending shows', error.message)
      }
    }

    // const fetchTrendingMovies = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://api.themoviedb.org/3/trending/movie/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`
    //     );
    //     trendingShows.value = response.data.results;
    //   } catch (error) {
    //     console.log("Error fetching trending movies", error.message);
    //   }
    // };
    // const fetchTrendingTVSeries = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://api.themoviedb.org/3/trending/tv/day?api_key=b5549b7208a29cf5e4d8e62819aa403e`
    //     );
    //     trendingShows.value = response.data.results;
    //   } catch (error) {
    //     console.log("Error fetching trending TV Series", error.message);
    //   }
    // };
    const fetchRecommendedShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        recommendedShows.value = response.data.results;
      } catch (error) {
        console.log("Error fetching recommended movies", error.message);
      }
    };

    const fetchSearchResults = async () => {
      if (searchQuery.value.trim() === "") {
        fetchTrendingShows();
        fetchRecommendedShows();
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery.value}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        searchedMovies.value = response.data.results; // adjust as needed
      } catch (error) {
        console.log("Error fetching search results", error.message);
      }
    };

    onMounted(() => {
      fetchTrendingShows();
      fetchRecommendedShows();
    });

    return {
      trendingShows,
      recommendedShows,
      searchedMovies,
      searchQuery,
      fetchSearchResults,
    };
  },
};
</script>

<style scoped></style>
