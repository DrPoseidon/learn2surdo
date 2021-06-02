<template>
  <div :class="$style.root">
    <L2SMedia
      :category="gesture.category"
      :fileName="gesture.fileName"
      :width="getWidth"
    />
    <div :class="$style.description">
      Какой жест изображен?
    </div>
    <div :class="$style.buttons">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        :class="[$style.button]"
        @click="getSuccess(button.title, button)"
      >
        <p>{{ button.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import { mapGetters } from "vuex";
export default {
  name: "L2STestNameSelectionTask",
  components: {
    L2SMedia,
  },
  props: {
    gesture: {
      type: Object,
      required: true,
    },
    gestures: {
      type: Array,
      required: true,
    },
    curGestures: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      errorIndex: undefined,
      successIndex: undefined,
      globalError: 0,
    };
  },
  methods: {
    getSuccess(title, answer) {
      let success = undefined;
      title === this.gesture.title ? (success = true) : (success = false);
      this.$emit("nextGesture", {
        success,
        gesture: this.gesture,
        answer,
        exercise: "nameSelection",
      });
    },
  },
  computed: {
    ...mapGetters(["DEVICE"]),
    getWidth() {
      return this.DEVICE === "pc" ? "20vw" : "40vw";
    },
    buttons() {
      const arr = this.gestures.filter((el) => {
        let exist = false;
        for (let i = 0; i < this.curGestures.length; i++) {
          if (el === this.curGestures[i]) {
            exist = true;
          }
        }
        if (!exist) {
          return el;
        }
      });
      const sorted = [...arr]
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);
      sorted.push(this.gesture);
      return sorted.sort(() => Math.random() - 0.5);
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
