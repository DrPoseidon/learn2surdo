<template>
  <div :class="$style.root">
    <div v-for="(category, index) in GESTURES_BY_CATEGORIES" :key="index">
      <div v-if="category.length">
        <b-button :class="$style.btn" @click="visibility(index)">
          {{
            categoryName(index)[0].toUpperCase() + categoryName(index).slice(1)
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
            <img
              :src="require(`PublicStatuses/completed.png`)"
              v-if="getProgress(gesture._id, gesture.category)"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "L2SGestures",

  data() {
    return {
      visibilityArray: [],
      progress: [],
    };
  },
  computed: {
    ...mapGetters(["GESTURES_BY_CATEGORIES", "CATEGORIES", "USER_ID"]),
  },
  methods: {
    ...mapActions(["GET_GESTURES_BY_CATEGORIES", "GET_GESTURE_PROGRESS"]),
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
    getStatus() {
      this.GET_GESTURE_PROGRESS({
        userID: localStorage.getItem("userID"),
      }).then((result) => {
        if (result.length) {
          this.progress = result;
        }
      });
    },
    getProgress(id, category) {
      let progress = false;
      [...this.progress].forEach((el) => {
        if (el.gestureID === id && el.category === category) progress = true;
      });
      return progress;
    },
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_GESTURES_BY_CATEGORIES().then(() => {
        this.getStatus();
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
