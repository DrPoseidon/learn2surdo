<template>
  <div :class="$style.root">
    <L2SMedia
      :fileName="correct.fileName"
      :category="correct.category"
      width="200px"
    />
    <div :class="$style.pp">
      <p>Здесь изображен жест</p>
      <p style="color:green">{{ correct.title }}</p>
    </div>
    <div :class="$style.pp" v-if="!success">
      <p>Вы указали его как</p>
      <p style="color:red">{{ answer.title }}</p>
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
export default {
  name: "NameSelection",
  components: {
    L2SMedia,
  },
  props: {
    answer: {
      type: Object,
      required: true,
    },
    correct: {
      type: Object,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
