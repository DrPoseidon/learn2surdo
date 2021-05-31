<template>
  <div :class="$style.root">
    <L2SHeader />
    <div :class="$style.main">
      <div :class="$style.mediaBlock">
        <router-link
          :to="`/gesture/${$route.params.category}/${getBackID}`"
          v-if="getBackID !== undefined"
          :class="$style.back"
        >
          <b-button variant="primary">Назад</b-button>
        </router-link>
        <img
          :src="
            require(`PublicGestures/${$route.params.category}/${gesture.fileName}`)
          "
          alt=""
          v-if="
            getFormat(gesture.fileName) === '.jpg' ||
              getFormat(gesture.fileName) === '.png' ||
              getFormat(gesture.fileName) === '.jpeg'
          "
          :class="$style.media"
        />
        <video
          v-else
          :src="
            require(`PublicGestures/${$route.params.category}/${gesture.fileName}`)
          "
          autoplay
          loop
          muted
          preload=""
          :class="$style.media"
        ></video>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import L2SHeader from "Components/L2SHeader";
export default {
  name: "L2SGesture",
  components: {
    L2SHeader,
  },
  computed: {
    ...mapGetters(["GESTURES", "USER_ID"]),
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
    getFormat(fileName) {
      return fileName.substring(fileName.indexOf("."), fileName.length);
    },
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
