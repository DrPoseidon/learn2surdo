<template>
  <div :class="$style.root">
    <div :class="$style.mediaBlock">
      <router-link
        :to="`/gesture/${$route.params.category}/${getBackID}`"
        v-if="getBackID !== undefined"
        :class="$style.back"
      >
        <b-button variant="primary">Назад</b-button>
      </router-link>
      <L2SMedia
        :category="$route.params.category"
        :fileName="gesture.fileName"
        :class="$style.media"
        :width="getWidth"
      />
      <router-link
        :to="`/gesture/${$route.params.category}/${getForwardID}`"
        v-if="getForwardID !== undefined"
        :class="$style.forward"
      >
        <b-button variant="primary">Вперед</b-button>
      </router-link>
    </div>
    <div :class="$style.title">{{ gesture.title }}</div>
    <div :class="$style.description">
      {{ gesture.description }}
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import L2SMedia from "Components/L2SMedia";
export default {
  name: "gesture",
  components: {
    L2SMedia,
  },
  computed: {
    ...mapGetters(["GESTURES", "USER_ID", "DEVICE"]),
    getWidth() {
      return this.DEVICE === "pc" ? "20vw" : "40vw";
    },
    gesture() {
      const { category, id } = this.$route.params;
      let gesture;
      this.GESTURES.forEach((el) => {
        if (el.category === category && el._id === id) {
          gesture = el;
        }
      });
      return gesture;
    },
    getBackID() {
      const { category, id } = this.$route.params;
      let gestures = [];
      let gesture;
      this.GESTURES.forEach((el) => {
        if (el.category === category && el._id === id) {
          gesture = el;
        }
        if (el.category === category) {
          gestures.push(el);
        }
      });
      const backID = gestures[gestures.indexOf(gesture) - 1]?._id;
      return backID;
    },

    getForwardID() {
      const { category, id } = this.$route.params;
      let gestures = [];
      let gesture;

      this.GESTURES.forEach((el) => {
        if (el.category === category && el._id === id) {
          gesture = el;
        }
        if (el.category === category) {
          gestures.push(el);
        }
      });
      const forwardID = gestures[gestures.indexOf(gesture) + 1]?._id;
      return forwardID;
    },
  },
  methods: {
    ...mapActions(["GET_ALL_GESTURES_FROM_DB"]),
  },
  created() {
    if (localStorage.getItem("userID")) {
      this.GET_ALL_GESTURES_FROM_DB();
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" module>
@import "./styles.scss";
</style>
