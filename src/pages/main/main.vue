<template>
  <div :class="$style.root">
    <L2SHeader />
  </div>
</template>
<script>
import L2SHeader from "Components/L2SHeader";
import { mapActions, mapGetters } from "vuex";
export default {
  title: "mainPage",
  components: {
    L2SHeader,
  },
  methods: {
    ...mapActions(["GET_ALL_GESTURES_FROM_DB", "GET_ALL_CATEGORIES_FROM_DB"]),
  },
  computed: {
    ...mapGetters(["USER_ID"]),
  },
  mounted() {
    if (localStorage.getItem("userID")) {
      this.GET_ALL_GESTURES_FROM_DB();
      this.GET_ALL_CATEGORIES_FROM_DB();
    } else {
      this.$router.push("/login");
    }
    this.$router.push("/exercises");
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
