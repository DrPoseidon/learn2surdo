<template>
  <div :class="$style.root">
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
            <Component
              :is="getComponent(answer.exercise)"
              :answer="answer.answer"
              :correct="answer.gesture"
              :success="answer.success"
            />
          </div>
        </div>
        <Comparison v-else :answer="answer" :index="index" />
      </div>
    </div>
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import Comparison from "../Comparison";
import NameSelection from "../NameSelection";
import ImageSelection from "../ImageSelection";
export default {
  name: "CheckResults",
  components: {
    L2SMedia,
    Comparison,
    NameSelection,
    ImageSelection,
  },
  data() {
    return {
      answerIndex: 0,
    };
  },
  props: {
    answers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getComponent(name) {
      return name === "imageSelection" ? ImageSelection : NameSelection;
    },
  },
  created() {
    console.log(this.answers);
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
