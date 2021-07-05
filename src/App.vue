<template>
  <div class="root">
    <L2SHeader v-if="$route.path !== '/login' && $route.path !== '/register'" />
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import L2SHeader from "Components/L2SHeader";
export default {
  components: {
    L2SHeader,
  },
  computed: {
    ...mapGetters(["DEVICE"]),
  },
  created() {
    this.checkWidth();
    window.addEventListener("resize", this.checkWidth);
  },
  methods: {
    ...mapActions(["SET_DEVICE_ACTION"]),
    checkWidth() {
      const width = window.innerWidth;
      width < 1300
        ? this.SET_DEVICE_ACTION("mobile")
        : this.SET_DEVICE_ACTION("pc");
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  background-color: rgb(85, 197, 255);
}
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
