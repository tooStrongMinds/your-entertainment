<template>
  <div class="head tvSeries">
    <span class="searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" placeholder="Search by TV series" v-model="searchQuery"
      @input="fetchSearchResults"/>
    </span>

    <div class="main" v-if="!searchQuery">
      <h1>TV Series</h1>
      <div class="card">
        <MovieCard v-for="series in displaySeries" :key="series.id" :movie="series" />
      </div>
    </div>
    <div v-else>
      <h1>Search results for "{{ searchQuery }}"</h1>
      <MovieCard v-for="series in searchedSeries" :key="series.id" :movie="series" />
    </div>
    <button v-if="!searchQuery && !isAllSeriesLoaded" @click="loadMoreSeries">Load More</button>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";

export default {
  name: "TVSeries",
  components: {
    MovieCard,
  },
  setup() {
    const series = ref([]);
    const searchedSeries = ref([]);
    const searchQuery = ref("");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const isAllSeriesLoaded = ref(false);

    const fetchSeries = async () => {
      if (currentPage.value > totalPages.value) {
        isAllSeriesLoaded.value = true;
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=b5549b7208a29cf5e4d8e62819aa403e&page=${currentPage.value}`
        );
        series.value.push(...response.data.results);
        totalPages.value = response.data.total_pages;
        currentPage.value++;
      } catch (error) {
        console.log("Error fetching series", error.message);
      }
    };

    const fetchSearchResults = async () => {
      if (searchQuery.value.trim() === "") {
        searchedSeries.value = [];
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/tv?query=${searchQuery.value}&api_key=b5549b7208a29cf5e4d8e62819aa403e`
        );
        searchedSeries.value = response.data.results;
      } catch (error) {
        console.log("Error fetching search results", error.message);
      }
    };

    const displaySeries = computed(() => {
      return searchQuery.value.trim() ? searchedSeries.value : series.value;
    });

    const loadMoreSeries = () => {
      fetchSeries();
    };

    onMounted(() => {
      fetchSeries();
    });

    return {
      fetchSeries,
      fetchSearchResults,
      series,
      searchedSeries,
      searchQuery,
      displaySeries,
      loadMoreSeries,
      isAllSeriesLoaded,
    };
  },
};
</script>

<style>

</style>