<template>
  <div id="app" >
   <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Home from "@/views/Home.vue";

export default {
  name: "app",
  components: {
    Home,
  },
};
</script>

<style >
@import url('./assets/css/base.css');
#app {
  height: 100%;
}
</style>
