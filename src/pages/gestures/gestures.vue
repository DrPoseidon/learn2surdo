<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
      <div v-for="(category, index) in GESTURES_BY_CATEGORIES" :key="index">
        <div v-if="category.length">
          <b-button :class="$style.btn" @click="visibility(index)">
            {{
              categoryName(index)[0].toUpperCase() +
                categoryName(index).slice(1)
            }}</b-button
          >
          <div v-if="checkVisibility(index)" :class="$style.gestures">
            <router-link
              :to="`/gesture/${categoryName(index)}/${gesture._id}`"
              v-for="gesture in category"
              :key="gesture._id"
              :class="$style.gesture"
            >
              {{ gesture.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import L2SHeader from "Components/L2SHeader";
export default {
  name: "L2SGestures",
  components: {
    L2SHeader,
  },
  data() {
    return {
      visibilityArray: [],
    };
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "CATEGORIES", "USER_ID"]),
  },
  methods: {
    ...mapActions(["GET_GESTURES_BY_CATEGORIES"]),
    categoryName(index) {
      return this.CATEGORIES[index].title;
    },
    visibility(index) {
      if (this.visibilityArray.indexOf(index) === -1) {
        this.visibilityArray.push(index);
      } else {
        const i = this.visibilityArray.indexOf(index);
        if (i > -1) {
          this.visibilityArray.splice(i, 1);
        }
      }
    },
    checkVisibility(index) {
      return !!(this.visibilityArray.indexOf(index) !== -1);
    },
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_GESTURES_BY_CATEGORIES();
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
