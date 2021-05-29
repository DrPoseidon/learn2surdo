<template>
  <div :class="$style.root">
    <div :class="$style.description">
      Где изображен жест
      <p style="color:green;">{{ gesture.title }}</p>
      ?
    </div>
    <div :class="$style.buttons">
      <a
        v-for="(button, index) in buttons"
        :key="index"
        @click="getSuccess(button.fileName, index)"
      >
        <div
          :class="[
            $style.background,
            {
              [$style.error]: index === errorIndex,
              [$style.success]: index === successIndex,
            },
          ]"
        ></div>
        <L2SMedia
          :class="$style.button"
          :category="button.category"
          :fileName="button.fileName"
          width="15vw"
        />
      </a>
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
export default {
  name: "L2SImageSelectionTask",
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
    getSuccess(fileName, index) {
      if (fileName === this.gesture.fileName) {
        this.successIndex = index;
        this.errorIndex = undefined;
        setTimeout(() => {
          this.curIndex++;
          this.successIndex = undefined;
          this.$emit("nextGesture", this.globalError);
        }, 1000);
      } else {
        this.errorIndex = index;
        this.globalError++;
        setTimeout(() => {
          this.errorIndex = undefined;
        }, 1000);
      }
    },
  },
  computed: {
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
