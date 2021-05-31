<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
      <div :class="$style.testResults" v-if="testResults.length">
        <h2>Результаты тестов</h2>
        <div
          v-for="result in testResults"
          :key="result._d"
          :class="$style.test"
        >
          <p :class="$style.date">
            {{ getRusDate(result.createdAt.slice(0, 10)) }}
          </p>
          <p :class="$style.result">
            {{ getAVG(result) }}
          </p>
        </div>
      </div>
      <div :class="$style.categoriesProgress">
        <h2>Прогресс упраженений</h2>
        <div
          v-for="(category, index) in progress"
          :key="index"
          :class="$style.res"
        >
          <p :class="$style.category" v-if="category.progress">
            {{ category.category }}
          </p>
          <p :class="$style.progress" v-if="category.progress">
            {{ category.progress }}
          </p>
        </div>
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
    getAVG(element) {
      let completed = 0;
      element.results.forEach((el) => {
        if (el.success) {
          completed++;
        }
      });
      return `${completed}/10`;
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
            if (result?.beginIndex === 0 || !result?.beginIndex) {
              this.progress.push({ category: result.category, progress: 0 });
            } else if (result?.beginIndex > el.length) {
              this.progress.push({
                category: result.category,
                progress: `${el.length}/${el.length}`,
              });
            } else {
              this.progress.push({
                category: result.category,
                progress: `${result.beginIndex}/${el.length}`,
              });
            }
          });
        }
      });
    },
  },
  mounted() {
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
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
