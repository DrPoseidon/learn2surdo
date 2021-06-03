<template>
  <div :class="$style.root">
    <L2SHeader />
    <L2SProgressBar :percent="getWidth" />
    <div :class="$style.message" v-if="getWidth === 100">
      Вы завершили эту категорию<br />Желаете начать сначала?
      <b-button variant="success" @click="reset()">Да</b-button>
      <b-button variant="danger" @click="redirect()">Нет</b-button>
    </div>
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
              @click="forwardBtn(gesture)"
              >Вперед</b-button
            >
          </div>
        </div>
      </div>
      <div v-else>
        <L2SExercise
          :curGestures="curGestures"
          :gestures="gesturesByCategories()"
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
      "SET_GESTURE_PROGRESS",
    ]),
    reset() {
      this.SET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.$route.params.category,
        beginIndex: 0,
      });
      window.location.href = `/exercise/${this.$route.params.category}`;
    },
    redirect() {
      window.location.href = "/";
    },
    nextPack() {
      const sendToProgress = [];
      [...this.curGestures].forEach((el) => {
        sendToProgress.push({
          userID: localStorage.getItem("userID"),
          gestureID: el._id,
          category: el.category,
        });
      });
      this.SET_GESTURE_PROGRESS(sendToProgress);

      this.curGestures = [];
      this.SET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.$route.params.category,
        beginIndex: this.globalIndex + 3,
      });
      this.globalIndex += 3;
      this.theoryIndex = 0;
      this.maxIndex = 0;
    },
    getFormat(fileName) {
      return fileName.substring(fileName.indexOf("."), fileName.length);
    },
    forwardBtn(el) {
      if (this.theoryIndex !== this.gestures.length - 1) {
        this.theoryIndex++;
        if (this.maxIndex < this.theoryIndex) {
          this.maxIndex++;
          this.curGestures.push(el);
        }
      } else {
        const array = this.gesturesByCategories().filter((el) => {
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
        const sorted = [...array]
          .sort(() => Math.random() - Math.random())
          .slice(0, 3 - this.curGestures.length);
        this.curGestures = [...this.curGestures, ...sorted];
      }
    },
    gesturesByCategories() {
      let arr = [];
      this.GESTURES_BY_CATEGORIES.forEach((el) => {
        if (el.length && el[0].category === this.$route.params.category) {
          arr = el;
        }
      });
      return arr;
    },
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "USER_ID"]),
    gestures() {
      const arr = this.gesturesByCategories();
      const returnedArr = [...arr].splice(this.globalIndex, arr.length);
      return returnedArr;
    },
    getWidth() {
      let arr = [];
      this.GESTURES_BY_CATEGORIES.forEach((el) => {
        if (el.length && el[0].category === this.$route.params.category) {
          arr = el;
        }
      });
      if (this.globalIndex > arr.length) {
        return 100;
      } else {
        return Math.round((this.globalIndex * 100) / arr.length);
      }
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
