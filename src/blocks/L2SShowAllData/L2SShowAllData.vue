<template>
  <div :class="$style.root">
    <b-form-group :class="$style.whatToShowGroup">
      <b-form-radio v-model="whatToShow" title="whatToShow" value="categories"
        >Показать категории</b-form-radio
      >
      <b-form-radio v-model="whatToShow" title="whatToShow" value="gestures"
        >Показать жесты</b-form-radio
      >
    </b-form-group>
    <div v-if="whatToShow === 'gestures'">
      <div v-for="(category, categoryNumber) in gestures" :key="categoryNumber">
        <div v-if="category.length">
          <L2SGesturesInCategory
            :rows="category"
            :columnNames="[
              category[0].category,
              'Название',
              'Описание',
              'Файл',
            ]"
            :categoryNumber="Number(categoryNumber)"
            :searchDataArr="searchDataArr"
          />
        </div>
      </div>
    </div>
    <div v-if="whatToShow === 'categories'">
      <L2SCategory />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import L2SGesturesInCategory from "./L2SGesturesInCategory";
import L2SCategory from "./L2SCategory";
export default {
  title: "L2SShowAllData",
  components: {
    L2SGesturesInCategory,
    L2SCategory,
  },
  data() {
    return {
      searchDataArr: [
        {
          title: "",
          description: "",
        },
      ],
      whatToShow: "",
    };
  },
  computed: {
    ...mapGetters(["GESTURES", "CATEGORIES"]),
    gestures() {
      let gestures = {};
      const { CATEGORIES, GESTURES } = this;
      for (let i = 0; i < CATEGORIES.length; i++) {
        let tmp = [];
        for (let j = 0; j < GESTURES.length; j++) {
          if (GESTURES[j].category === CATEGORIES[i].title) {
            tmp.push(GESTURES[j]);
          }
        }

        gestures[i] = tmp;
      }

      Object.entries(gestures).forEach((el, index) => {
        if (index > 0) {
          this.searchDataArr.push({
            title: "",
            description: "",
          });
        }
      });

      return gestures;
    },
  },
  methods: {
    ...mapActions(["GET_ALL_GESTURES_FROM_DB", "GET_ALL_CATEGORIES_FROM_DB"]),
  },
  mounted() {
    this.GET_ALL_GESTURES_FROM_DB();
    this.GET_ALL_CATEGORIES_FROM_DB();
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
