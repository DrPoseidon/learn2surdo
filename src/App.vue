<template>
  <div class="root">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
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
<style lang="scss" module>
* {
  margin: 0;
  padding: 0;
  background-color: rgb(85, 197, 255);
}
</style>
