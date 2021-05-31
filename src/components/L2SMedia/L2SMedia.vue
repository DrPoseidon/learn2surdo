<template>
  <div :class="$style.root" v-if="fileName">
    <img
      :src="require(`PublicGestures/${category}/${fileName}`)"
      alt=""
      v-if="
        getFormat(fileName) === '.jpg' ||
          getFormat(fileName) === '.png' ||
          getFormat(fileName) === '.jpeg'
      "
      :class="$style.media"
      :style="{ width: width }"
    />
    <video
      v-else
      :src="require(`PublicGestures/${category}/${fileName}`)"
      autoplay
      loop
      muted
      preload
      :class="$style.media"
      :style="{ width: width }"
    ></video>
  </div>
</template>
<script>
export default {
  name: "L2SMedia",
  props: {
    category: String,
    fileName: String,
    width: {
      type: String,
      default: "20vw",
    },
  },
  methods: {
    getFormat(fileName) {
      return fileName.substring(fileName.indexOf("."), fileName.length);
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
