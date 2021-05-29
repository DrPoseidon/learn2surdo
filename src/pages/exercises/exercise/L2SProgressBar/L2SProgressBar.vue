<template>
  <div :class="$style.root">
    <div :class="$style.placeHolder">
      <div :class="$style.progress" :style="{ width: `${percent}%` }"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "L2SProgressBar",
  props: {
    percent: Number,
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
