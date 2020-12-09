<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    console.log("ESTOY EN MOUNTED DE APP");
    this.$router.replace("/");
    console.log("SALGO DE MOUNTED DE APP");
  }
};
</script>
