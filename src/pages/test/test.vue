<template>
  <div :class="$style.root">
    <L2SHeader />

    <div :class="$style.main">
      <Exercises
        v-if="gestures"
        :gestures="gestures"
        :exercises="exercises"
        :allGestures="GESTURES"
        @goToCheck="goToCheck"
      />
      <CheckResults v-if="check" :answers="answers" />
    </div>
  </div>
</template>
<script>
import L2SHeader from "Components/L2SHeader";
import { mapActions, mapGetters } from "vuex";
import CheckResults from "./CheckResults";

import Exercises from "./Exercises";
export default {
  name: "test",
  components: {
    L2SHeader,
    Exercises,
    CheckResults,
  },
  data() {
    return {
      exercises: ["comparison", "imageSelection", "nameSelection"],
      gestures: undefined,
      answers: [],
      check: false,
    };
  },
  methods: {
    ...mapActions([
      "GET_ALL_GESTURES_FROM_DB",
      "GET_GESTURES_OF_CATEGORY",
      "SET_TEST_RESULT",
    ]),
    exercisesVariants() {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(...this.exercises.sort(() => Math.random() - 0.5));
      }
      this.exercises = arr
        .sort(() => Math.random() - Math.random())
        .slice(0, 10);
    },
    getGestures() {
      this.gestures = this.GESTURES.sort(
        () => Math.random() - Math.random()
      ).slice(0, 10);
    },
    nextGesture(data) {
      this.answers.push(data);
      this.curIndex++;
    },
    goToCheck(data) {
      this.answers = data;
      this.SET_TEST_RESULT({
        userID: localStorage.getItem("userID"),
        results: this.answers,
      });
      this.check = true;
    },
  },
  computed: {
    ...mapGetters(["GESTURES"]),
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_ALL_GESTURES_FROM_DB().then(() => {
        this.exercisesVariants();
        this.getGestures();
      });
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
