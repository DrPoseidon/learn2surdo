<template>
  <div :class="$style.root">
    <a href="/"><h2>Learn2Surdo</h2></a>
    <div :class="$style.headers">
      <div :class="$style.bigHeader" v-if="DEVICE === 'pc'">
        <div :class="$style.links">
          <a href="/theory">Глоссарий</a>
          <a href="/">Упражнения</a>
          <a href="/test">Тестирование</a>
          <a href="/personalProgress" v-if="progress">Прогресс</a>
        </div>
        <div :class="$style.login">
          <b-button variant="danger" @click="quit">Выйти</b-button>
          <p>{{ login }}</p>
        </div>
      </div>

      <div :class="$style.miniHeader" v-if="DEVICE === 'mobile'">
        <div :class="$style.login">
          <p>{{ login }}</p>
        </div>
        <a @click="showList = !showList">
          <img
            :src="require('PublicAssets/menu-btn.svg')"
            :class="$style.hamburger"
        /></a>
        <transition
          :enter-active-class="$style.right"
          :leave-active-class="$style.left"
        >
          <div :class="$style.links" v-if="showList">
            <div @click="showList = !showList">
              <img
                :src="require('PublicAssets/close-btn.svg')"
                :class="$style.close"
              />
            </div>
            <div :class="$style.aa">
              <a href="/theory">Глоссарий</a>
              <a href="/">Упражнения</a>
              <a href="/test">Тестирование</a>
              <a href="/personalProgress" v-if="progress">Прогресс</a>
              <a @click="quit" :class="$style.quit">Выйти</a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  title: "L2SHeader",
  data() {
    return {
      showList: false,
      progress: true,
    };
  },
  methods: {
    ...mapActions(["GET_TEST_RESULTS", "GET_PROGRESS"]),
    quit() {
      localStorage.removeItem("userID");
      localStorage.removeItem("login");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["DEVICE"]),
    login() {
      return localStorage.getItem("login");
    },
  },
  created() {
    this.GET_TEST_RESULTS({ userID: localStorage.getItem("userID") }).then(
      (testresult) => {
        this.testResults = testresult;
        this.GET_PROGRESS({ userID: localStorage.getItem("userID") }).then(
          (progressresult) => {
            if (
              !testresult.length &&
              (!progressresult || progressresult.beginIndex === 0)
            ) {
              this.progress = false;
            }
          }
        );
      }
    );
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
