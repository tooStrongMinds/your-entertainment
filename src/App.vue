<template>
  <nav>
    <img :src="logo" alt="MovieLogo" id="logo" />
    <NavBar />
    <img :src="displayPic" alt="Profile Pic" id="displayPic" />
  </nav>
  <router-view />
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      logo: require("@/assets/Movie-Logo.png"),
      displayPic: require("@/assets/display.jpg"),
    };
  },
};
</script>
<style scoped>
#displayPic {
  border: 1px solid #fff;
  border-radius: 50%;
  width: 30px;
}
#logo {
  width: 30px;
}
</style>
