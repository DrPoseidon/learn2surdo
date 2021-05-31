<template>
  <div :class="$style.root">
    <div
      v-for="(gesture, index) in gestures"
      :key="gesture._id"
      :class="$style.exercise"
    >
      <L2STestComparisonTask
        v-if="exercises[index] === 'comparison' && curIndex === index"
        :curGestures="getComparisonGestures(gesture)"
        @nextGesture="nextGesture"
      />
      <L2STestImageSelectionTask
        v-if="exercises[index] === 'imageSelection' && curIndex === index"
        :gesture="gesture"
        :curGestures="gestures"
        :gestures="allGestures"
        @nextGesture="nextGesture"
      />
      <L2STestNameSelectionTask
        v-if="exercises[index] === 'nameSelection' && curIndex === index"
        :gesture="gesture"
        :curGestures="gestures"
        :gestures="allGestures"
        @nextGesture="nextGesture"
      />
    </div>
  </div>
</template>
<script>
import L2STestComparisonTask from "../L2STestComparisonTask";
import L2STestImageSelectionTask from "../L2STestImageSelectionTask";
import L2STestNameSelectionTask from "../L2STestNameSelectionTask";
export default {
  name: "Exercises",
  data() {
    return {
      curIndex: 0,
      answers: [],
    };
  },
  components: {
    L2STestComparisonTask,
    L2STestImageSelectionTask,
    L2STestNameSelectionTask,
  },
  props: {
    gestures: {
      type: Array,
      required: true,
    },
    exercises: {
      type: Array,
      required: true,
    },
    allGestures: {
      type: Array,
      required: true,
    },
  },
  methods: {
    nextGesture(data) {
      this.answers.push(data);
      this.curIndex++;
      if (this.answers.length === 10) {
        this.$emit("goToCheck", this.answers);
      }
    },
    getComparisonGestures(gesture) {
      let arr = [];
      this.gestures.forEach((el) => {
        if (el !== gesture) {
          arr.push(el);
        }
      });
      arr = arr.sort(() => Math.random() - Math.random()).slice(0, 2);
      arr.push(gesture);
      return arr;
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
