<template>
  <div :class="$style.root">
    <div :class="$style.mediaBlock">
      <L2SMedia :category="category" :fileName="fileName" :width="getWidth" />
    </div>
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.description">
      {{ description }}
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import { mapGetters } from "vuex";
export default {
  name: "L2STheory",
  components: {
    L2SMedia,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["DEVICE"]),
    getWidth() {
      return this.DEVICE === "pc" ? "20vw" : "40vw";
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
