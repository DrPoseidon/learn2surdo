<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.choose" v-if="chooseVisibility">
      <div>
        <b-button variant="warning" @click="chooseVisibility = false"
          >Назад</b-button
        >
        <b-button variant="primary" @click="cont()">Продолжить</b-button>
        <b-button variant="danger" @click="reset()">Начать сначала</b-button>
      </div>
    </div>
    <div :class="$style.main" v-if="!chooseVisibility">
      <h2>Выберете категорию для изучения</h2>
      <div :class="$style.categories">
        <div v-for="(category, index) in GESTURES_BY_CATEGORIES" :key="index">
          <div v-if="category.length">
            <a @click="check(index)">
              <b-button :class="$style.btn">
                {{
                  categoryName(index)[0].toUpperCase() +
                    categoryName(index).slice(1)
                }}</b-button
              >
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
    };
  },
  methods: {
    ...mapActions([
      "GET_GESTURES_BY_CATEGORIES",
      "GET_PROGRESS",
      "SET_PROGRESS",
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
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "CATEGORIES", "USER_ID"]),
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_GESTURES_BY_CATEGORIES();
    } else {
      this.$router.push("/register");
    }
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
