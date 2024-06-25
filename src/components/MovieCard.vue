<template>
  <div class="movies">
    <div class="moviecards" :title="movie.overview">
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        alt="Movie Poster"
      />
      <h2 >{{ movie.title || movie.name }}</h2>

      <p>{{ movie.release_date }}</p>
      <p>{{movie.media_type}}</p>
      
      <button @click.prevent="toggleBookmarked(movie)" class="bookmark-button">
        <i :class="['fa-bookmark', isBookmarked ? 'fa' : 'fa-regular']"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  emits: ['bookmark-toggled'],
  setup(props, {emit}) {
    const isBookmarked = ref(false);

    const toggleBookmarked = (movie) => {
      let bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];

      

      if (isBookmarked.value) {
        bookmarkedMovies = bookmarkedMovies.filter(m => m.id !== movie.id);
      } else {
        bookmarkedMovies.push(movie);
      }

      localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
      isBookmarked.value = !isBookmarked.value;
    };

    const checkIfBookmarked = (movie) => {
      const bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
      isBookmarked.value = bookmarkedMovies.some(m => m.id === movie.id);
    };

    onMounted(() => {
      checkIfBookmarked(props.movie);
    });

    return {
      isBookmarked,
      toggleBookmarked,
    };
  },
};
</script>

<style>
.moviecards {
  position: relative;
  margin: 10px;
}

.bookmark-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
}

.bookmark-button .fa {
  color: white;
}



.moviecards img {
  width: 100%;
  height: auto;
}

.movie-overview {
  display: none;
  position: absolute;
  bottom: 0;
  left: 20px;
  right: -20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  box-sizing: border-box;
}

.moviecards:hover .movie-overview {
  display: block;
}
</style>