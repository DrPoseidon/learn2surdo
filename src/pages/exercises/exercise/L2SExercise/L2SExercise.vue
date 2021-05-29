<template>
  <div :class="$style.root">
    <div v-if="exerciseIndex === 0">
      <div
        v-for="(gesture, index) in curGestures"
        :key="gesture._id"
        :class="$style.mediaBlock"
      >
        <div v-if="index === curIndex">
          <L2SNameSelectionTask
            :gesture="gesture"
            :gestures="gestures"
            :curGestures="curGestures"
            @nextGesture="nextGesture"
          />
        </div>
      </div>
    </div>
    <div v-if="exerciseIndex === 1">
      <div
        v-for="(gesture, index) in curGestures"
        :key="gesture._id"
        :class="$style.mediaBlock"
      >
        <div v-if="index === curIndex">
          <L2SImageSelectionTask
            :gesture="gesture"
            :gestures="gestures"
            :curGestures="curGestures"
            @nextGesture="nextGesture"
          />
        </div>
      </div>
    </div>

    <div v-if="exerciseIndex === 2">
      <div
        v-for="(gesture, index) in curGestures"
        :key="gesture._id"
        :class="$style.mediaBlock"
      >
        <div v-if="index === curIndex">
          <L2SComparisonTask
            :curGestures="curGestures"
            @nextGesture="nextGestureComparison"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import L2SNameSelectionTask from "../L2SNameSelectionTask";
import L2SImageSelectionTask from "../L2SImageSelectionTask";
import L2SComparisonTask from "../L2SComparisonTask";

export default {
  name: "L2SExercise",
  components: {
    L2SNameSelectionTask,
    L2SImageSelectionTask,
    L2SComparisonTask,
  },
  data() {
    return {
      curIndex: 0,
      exerciseIndex: 0,
      globalError: 0,
    };
  },
  props: {
    curGestures: {
      type: Array,
      required: true,
    },
    gestures: {
      type: Array,
      required: true,
    },
  },
  methods: {
    nextGesture(error) {
      this.curIndex++;
      this.globalError += error;
      console.log(this.curIndex);
      console.log("Ошибки " + this.globalError);
      if (this.curIndex === this.curGestures.length) {
        this.curIndex = 0;
        if (this.globalError < 4) {
          this.exerciseIndex++;
        } else {
          console.log("Много ошибок");
        }
        this.globalError = 0;
      }
      if (this.exerciseIndex === 3) {
        this.$emit("nextPack");
      }
    },
    nextGestureComparison(error) {
      this.curIndex = 0;
      this.globalError += error;
      console.log("Ошибки " + this.globalError);
      if (this.globalError < 1) {
        this.exerciseIndex++;
        if (this.exerciseIndex === 3) {
          this.$emit("nextPack");
        }
      } else {
        this.curIndex = 0;
        console.log("Много ошибок");
      }
      this.globalError = 0;
    },
    randCurGestures() {
      return [...this.curGestures].sort(() => Math.random() - 0.5);
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
