<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
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
          :gestures="GESTURES"
          @nextGesture="nextGesture"
        />
        <L2STestNameSelectionTask
          v-if="exercises[index] === 'nameSelection' && curIndex === index"
          :gesture="gesture"
          :curGestures="gestures"
          :gestures="GESTURES"
          @nextGesture="nextGesture"
        />
      </div>
      <div :class="$style.answers" v-if="answers.length === 10">
        <div v-for="(answer, index) in answers" :key="index">
          <b-button
            @click="answerIndex--"
            v-if="index !== 0 && index === answerIndex"
            :class="$style.backBtn"
            >Назад</b-button
          >
          <b-button
            @click="answerIndex++"
            v-if="index !== answers.length - 1 && index === answerIndex"
            :class="$style.forwardBtn"
            >Вперед</b-button
          >
          <div v-if="answerIndex === index">
            <div v-if="answer.exercise !== 'comparison'">
              <div>
                <p :class="$style.correct" v-if="answer.success">
                  В задании №{{ index + 1 }} Вы ответили правильно
                </p>
                <p :class="$style.error" v-else>
                  В задании №{{ index + 1 }} Вы ошиблись
                </p>
                <div
                  v-if="answer.exercise === 'imageSelection'"
                  :class="$style.imageSelection"
                >
                  <div :class="$style.pp">
                    <p>Нужно было выбрать жест</p>
                    <p style="color:green">{{ answer.gesture.title }}</p>
                  </div>
                  <p v-if="!answer.success">Вы выбрали</p>
                  <L2SMedia
                    v-if="!answer.success"
                    :fileName="answer.answer.fileName"
                    :category="answer.answer.category"
                    width="200px"
                  />
                  <p v-if="!answer.success">А нужно было</p>
                  <L2SMedia
                    :fileName="answer.gesture.fileName"
                    :category="answer.gesture.category"
                    width="200px"
                  />
                </div>
                <div
                  v-if="answer.exercise === 'nameSelection'"
                  :class="$style.nameSelection"
                >
                  <L2SMedia
                    :fileName="answer.gesture.fileName"
                    :category="answer.gesture.category"
                    width="200px"
                  />
                  <div :class="$style.pp">
                    <p>Здесь изображен жест</p>
                    <p style="color:green">{{ answer.gesture.title }}</p>
                  </div>
                  <div :class="$style.pp" v-if="!answer.success">
                    <p>Вы указали его как</p>
                    <p style="color:red">{{ answer.answer.title }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.comparison" v-else>
              <p :class="$style.correct" v-if="answer.success">
                В задании №{{ index + 1 }} Вы ответили правильно
              </p>
              <p :class="$style.error" v-else>
                В задании №{{ index + 1 }} Вы ошиблись. Ниже указан правильный
                вариант
              </p>
              <div
                v-for="(comp, i) in answer.gesture"
                :key="i"
                :class="$style.comp"
              >
                <p>{{ comp.title }}</p>
                <L2SMedia
                  :fileName="comp.fileName"
                  :category="comp.category"
                  width="170px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import L2SHeader from "Components/L2SHeader";
import { mapActions, mapGetters } from "vuex";
import L2SMedia from "Components/L2SMedia";
import L2STestComparisonTask from "./L2STestComparisonTask";
import L2STestImageSelectionTask from "./L2STestImageSelectionTask";
import L2STestNameSelectionTask from "./L2STestNameSelectionTask";
export default {
  name: "test",
  components: {
    L2SHeader,
    L2SMedia,
    L2STestComparisonTask,
    L2STestImageSelectionTask,
    L2STestNameSelectionTask,
  },
  data() {
    return {
      exercises: ["comparison", "imageSelection", "nameSelection"],
      gof: undefined,
      gestures: undefined,
      curIndex: 0,
      answers: [],
      answerIndex: 0,
    };
  },
  methods: {
    ...mapActions(["GET_ALL_GESTURES_FROM_DB", "GET_GESTURES_OF_CATEGORY"]),
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
