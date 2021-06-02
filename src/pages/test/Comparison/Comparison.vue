<template>
  <div :class="$style.root">
    <p :class="$style.correct" v-if="answer.success">
      В задании №{{ index + 1 }} на соответствие Вы ответили правильно
    </p>
    <p :class="$style.error" v-else>
      В задании №{{ index + 1 }} на соответствие Вы ошиблись. Ниже указан
      правильный вариант
    </p>
    <div v-for="(comp, i) in answer.gesture" :key="i" :class="$style.comp">
      <p>{{ comp.title }}</p>
      <L2SMedia
        :fileName="comp.fileName"
        :category="comp.category"
        :width="getWidth"
      />
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import { mapGetters } from "vuex";
export default {
  name: "Comparison",
  components: {
    L2SMedia,
  },
  props: {
    answer: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["DEVICE"]),
    getWidth() {
      return this.DEVICE === "pc" ? "170px" : "130px";
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
