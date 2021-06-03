<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
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
  </div>
</template>
<script>
import L2SMedia from "Components/L2SMedia";
import L2SHeader from "Components/L2SHeader";
import Comparison from "Pages/test/Comparison";
import NameSelection from "Pages/test/NameSelection";
import ImageSelection from "Pages/test/ImageSelection";
import { mapActions } from "vuex";
export default {
  name: "testResult",
  components: {
    L2SMedia,
    Comparison,
    NameSelection,
    ImageSelection,
    L2SHeader,
  },
  data() {
    return {
      answerIndex: 0,
      answers: [],
    };
  },
  methods: {
    getComponent(name) {
      return name === "imageSelection" ? ImageSelection : NameSelection;
    },
    ...mapActions(["GET_TEST_RESULTS"]),
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_TEST_RESULTS({ _id: this.$route.params.id }).then((result) => {
        this.answers = result[0].results;
      });
    }
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
