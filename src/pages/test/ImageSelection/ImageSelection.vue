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
      :width="getWidth"
    />
    <p v-if="!success">А нужно было</p>
    <L2SMedia
      :fileName="correct.fileName"
      :category="correct.category"
      :width="getWidth"
    />
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["DEVICE"]),
    getWidth() {
      return this.DEVICE === "pc" ? "200px" : "130px";
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
