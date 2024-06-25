<template>
  <div class="nav-container">
    <router-link to="/" title="Home"
      ><i class="fa-brands fa-windows"></i
    ></router-link>
    <router-link to="/movies" title="Movies"
      ><i class="fa-solid fa-film"></i
    ></router-link>
    <router-link to="/tv-series" title="Tv Series"
      ><i class="fa-solid fa-tv"></i
    ></router-link>
    <router-link to="/bookmarked" title="Bookmarked"
      ><i class="fa-solid fa-bookmark"></i
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-container {
  display: flex;
  gap: 24px;
}
i {
  font-size: 20px;
}
</style>
