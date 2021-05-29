<template>
  <div :class="$style.root">
    <L2SHeader />
    <L2SProgressBar :percent="getWidth" />
    <div :class="$style.main">
      <div v-if="curGestures.length < 3">
        <div v-for="(gesture, index) in gestures" :key="gesture._id">
          <div v-if="theoryIndex === index" :class="$style.theory">
            <b-button
              variant="primary"
              :class="$style.back"
              v-if="index !== 0"
              @click="theoryIndex--"
              >Назад</b-button
            >
            <L2STheory
              :category="$route.params.category"
              :fileName="gesture.fileName"
              :title="gesture.title"
              :description="gesture.description"
              :format="getFormat(gesture.fileName)"
            />
            <b-button
              variant="primary"
              :class="$style.forward"
              v-if="index !== gestures.length - 1"
              @click="forwardBtn(gesture)"
              >Вперед</b-button
            >
          </div>
        </div>
      </div>
      <div v-else>
        <L2SExercise
          :curGestures="curGestures"
          :gestures="gestures"
          @nextPack="nextPack"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import L2STheory from "./L2STheory";
import L2SHeader from "Components/L2SHeader";
import L2SExercise from "./L2SExercise";
import L2SProgressBar from "./L2SProgressBar";
export default {
  name: "exercise",
  components: {
    L2STheory,
    L2SHeader,
    L2SExercise,
    L2SProgressBar,
  },
  data() {
    return {
      theoryIndex: 0,
      curGestures: [],
      maxIndex: 0,
      globalIndex: 0,
    };
  },
  methods: {
    ...mapActions([
      "GET_GESTURES_BY_CATEGORIES",
      "SET_PROGRESS",
      "GET_PROGRESS",
    ]),
    nextPack() {
      this.curGestures = [];
      this.SET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.$route.params.category,
        beginIndex: this.globalIndex + 3,
      });
      this.globalIndex += 3;
    },
    getFormat(fileName) {
      return fileName.substring(fileName.indexOf("."), fileName.length);
    },
    forwardBtn(el) {
      this.theoryIndex++;
      if (this.maxIndex < this.theoryIndex) {
        this.maxIndex++;
        this.curGestures.push(el);
      }
    },
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "USER_ID"]),
    gestures() {
      let arr = [];
      this.GESTURES_BY_CATEGORIES.forEach((el) => {
        if (el.length && el[0].category === this.$route.params.category) {
          arr = el;
        }
      });
      return [...arr].splice(this.globalIndex, arr.length);
    },
    getWidth() {
      let arr = [];
      this.GESTURES_BY_CATEGORIES.forEach((el) => {
        if (el.length && el[0].category === this.$route.params.category) {
          arr = el;
        }
      });
      return Math.round((this.globalIndex * 100) / arr.length);
    },
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_GESTURES_BY_CATEGORIES();
      this.GET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.$route.params.category,
      }).then((result) => {
        if (!result) {
          this.SET_PROGRESS({
            userID: localStorage.getItem("userID"),
            category: this.$route.params.category,
            beginIndex: 0,
          });
        } else {
          this.globalIndex = result.beginIndex;
        }
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
