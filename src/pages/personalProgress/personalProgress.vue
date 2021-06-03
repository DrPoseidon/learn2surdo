<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
      <div :class="$style.categoriesProgress" v-if="progress.length">
        <h2>Прогресс категорий</h2>
        <div
          v-for="(category, index) in progress"
          :key="index"
          :class="$style.res"
        >
          <div
            :class="$style.progressBar"
            :style="{ width: `${category.percent}%` }"
          ></div>
          <p :class="$style.category" v-if="category.progress">
            {{ category.category }}
          </p>
          <p :class="$style.progress" v-if="category.progress">
            {{ category.progress }}
          </p>
        </div>
      </div>
      <div :class="$style.testResults" v-if="testResults.length">
        <h2>Результаты тестов</h2>
        <router-link
          :to="`/testResult/${result._id}`"
          v-for="result in testResults"
          :key="result._d"
          :class="[$style.res, $style.test]"
        >
          <div
            :class="$style.progressBar"
            :style="{
              width: `${Math.round((getAVG(result) * 100) / 10)}%`,
              backgroundColor: getColor(
                Math.round((getAVG(result) * 100) / 10)
              ),
            }"
          ></div>
          <p :class="$style.category">
            {{ getRusDate(result.createdAt.slice(0, 10)) }}
          </p>
          <p :class="$style.progress">{{ getAVG(result) }}/10</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import L2SHeader from "Components/L2SHeader";
export default {
  name: "personalProgress",
  components: {
    L2SHeader,
  },
  data() {
    return {
      testResults: [],
      progress: [],
    };
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES"]),
  },
  methods: {
    ...mapActions([
      "GET_TEST_RESULTS",
      "GET_GESTURES_BY_CATEGORIES",
      "GET_PROGRESS",
    ]),
    getColor(percent) {
      if (percent < 50) {
        return "tomato";
      } else if (percent >= 50 && percent < 80) {
        return "orange";
      } else {
        return "greenyellow";
      }
    },
    getAVG(element) {
      let completed = 0;
      element.results.forEach((el) => {
        if (el.success) {
          completed++;
        }
      });
      return completed;
    },
    getRusDate(date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      return `${day}.${month}.${year}`;
    },
    completed(arr) {
      arr.forEach((el) => {
        if (el.length) {
          this.GET_PROGRESS({
            userID: localStorage.getItem("userID"),
            category: el[0].category,
          }).then((result) => {
            if (result.beginIndex && result?.beginIndex > el.length) {
              this.progress.push({
                category: result.category,
                progress: `${el.length}/${el.length}`,
                percent: 100,
              });
            } else if (result.beginIndex && result?.beginIndex < el.length) {
              this.progress.push({
                category: result.category,
                progress: `${result.beginIndex}/${el.length}`,
                percent: Math.round(result.beginIndex * 100) / el.length,
              });
            }
          });
        }
      });
    },
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_TEST_RESULTS({ userID: localStorage.getItem("userID") }).then(
        (result) => {
          this.testResults = result;
        }
      );

      this.GET_GESTURES_BY_CATEGORIES().then(() => {
        this.completed(this.GESTURES_BY_CATEGORIES);
      });
    } else {
      this.$router.push("/login");
    }
  },
  watch: {
    redirect() {
      if (this.redirect) {
        window.location.href = "/";
      }
    },
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
