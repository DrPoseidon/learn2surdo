<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.choose" v-if="chooseVisibility">
      <div>
        <p v-if="getProgress(categoryName(index)) === 'completed'">
          Вы уже завершили эту категорию
        </p>
        <b-button variant="warning" @click="chooseVisibility = false"
          >Назад</b-button
        >
        <b-button
          variant="primary"
          @click="cont()"
          v-if="getProgress(categoryName(index)) !== 'completed'"
          >Продолжить</b-button
        >

        <b-button variant="danger" @click="reset()">Начать сначала</b-button>
      </div>
    </div>
    <div :class="$style.main" v-if="!chooseVisibility">
      <h2>Выберете категорию для изучения</h2>
      <div :class="$style.categories">
        <div v-for="(category, index) in GESTURES_BY_CATEGORIES" :key="index">
          <div v-if="category.length">
            <a @click="check(index)">
              <div :class="$style.btn">
                <div :class="$style.pp">
                  <p>
                    {{
                      categoryName(index)[0].toUpperCase() +
                        categoryName(index).slice(1)
                    }}
                  </p>

                  <div :class="$style.progress">
                    <p
                      v-if="
                        getProgress(categoryName(index)) !== 0 &&
                          getProgress(categoryName(index)) !== 'completed' &&
                          getProgress(categoryName(index)) !== undefined
                      "
                    >
                      {{ getProgress(categoryName(index)) }}
                    </p>
                    <p
                      v-if="
                        getProgress(categoryName(index)) === 'completed' &&
                          getProgress(categoryName(index)) !== undefined
                      "
                    >
                      {{ category.length }}/{{ category.length }}
                    </p>
                    <img
                      :src="require(`PublicStatuses/inTheProcess.png`)"
                      v-if="
                        getProgress(categoryName(index)) !== 0 &&
                          getProgress(categoryName(index)) !== 'completed' &&
                          getProgress(categoryName(index)) !== undefined
                      "
                    />
                    <img
                      :src="require(`PublicStatuses/completed.png`)"
                      v-if="
                        getProgress(categoryName(index)) === 'completed' &&
                          getProgress(categoryName(index)) !== undefined
                      "
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import L2SHeader from "Components/L2SHeader";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "exercises",
  components: {
    L2SHeader,
  },
  data() {
    return {
      chooseVisibility: false,
      index: undefined,
      progress: [],
    };
  },
  methods: {
    ...mapActions([
      "GET_GESTURES_BY_CATEGORIES",
      "GET_PROGRESS",
      "SET_PROGRESS",
      "GET_ALL_GESTURES_FROM_DB",
      "GET_ALL_CATEGORIES_FROM_DB",
    ]),
    categoryName(index) {
      return this.CATEGORIES[index].title;
    },
    cont() {
      window.location.href = `/exercise/${this.categoryName(this.index)}`;
    },
    reset() {
      this.SET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.categoryName(this.index),
        beginIndex: 0,
      });
      window.location.href = `/exercise/${this.categoryName(this.index)}`;
    },
    check(index) {
      this.GET_PROGRESS({
        userID: localStorage.getItem("userID"),
        category: this.categoryName(index),
      }).then((result) => {
        if (!result || result.beginIndex === 0) {
          window.location.href = `/exercise/${this.categoryName(index)}`;
        } else {
          this.chooseVisibility = true;
          this.index = index;
        }
      });
    },
    gesturesByCategories(index) {
      let arr = [];
      this.GESTURES_BY_CATEGORIES.forEach((el) => {
        if (el.length && el[0].category === this.categoryName(index)) {
          arr = el;
        }
      });
      return arr;
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
                progress: "completed",
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
    getProgress(categoryName) {
      let progress;
      this.progress.forEach((el) => {
        if (el.category === categoryName) {
          progress = el.progress;
        }
      });
      // console.log(progress);
      return progress;
    },
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "CATEGORIES", "USER_ID"]),
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_ALL_GESTURES_FROM_DB();
      this.GET_ALL_CATEGORIES_FROM_DB();
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
