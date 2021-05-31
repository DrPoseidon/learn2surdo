<template>
  <div :class="$style.root">
    <div :class="$style.pp">
      <p>Нужно было выбрать жест</p>
      <p style="color:green">{{ correct.title }}</p>
    </div>
    <p v-if="!success">Вы выбрали</p>
    <L2SMedia
      v-if="!success"
      :fileName="answer.fileName"
      :category="answer.category"
      width="200px"
    />
    <p v-if="!success">А нужно было</p>
    <L2SMedia
      :fileName="correct.fileName"
      :category="correct.category"
      width="200px"
    />
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
export default {
  name: "ImageSelection",
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
