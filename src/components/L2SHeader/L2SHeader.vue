<template>
  <div :class="$style.root">
    <a href="/"><h2>Learn2Surdo</h2></a>
    <div :class="$style.links">
      <a href="/theory">Глоссарий</a>
      <a href="/exercises">Упражнения</a>
      <a href="/test">Тестирование</a>
      <div :class="$style.login">
        <b-button variant="danger" @click="quit">Выйти</b-button>
        <p>{{ login }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  title: "L2SHeader",
  methods: {
    quit() {
      localStorage.removeItem("userID");
      localStorage.removeItem("login");
      this.$router.push("/login");
    },
  },
  computed: {
    login() {
      return localStorage.getItem("login");
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
