<template>
  <div :class="$style.root">
    <router-link to="/"><h2>Learn2Surdo</h2></router-link>
    <div :class="$style.headers">
      <div :class="$style.bigHeader" v-if="DEVICE === 'pc'">
        <div :class="$style.links">
          <router-link to="/theory" v-if="$route.path !== '/theory'"
            >Глоссарий</router-link
          >
          <router-link to="/" v-if="$route.path !== '/'"
            >Упражнения</router-link
          >
          <router-link to="/test" v-if="$route.path !== '/test'"
            >Тестирование</router-link
          >
          <router-link
            to="/personalProgress"
            v-if="progress && $route.path !== '/personalProgress'"
            >Прогресс</router-link
          >
        </div>
        <div :class="$style.login">
          <b-button variant="danger" @click="quit">Выйти</b-button>
          <p v-if="!role" :class="$style.loginText">{{ login }}</p>
          <router-link v-else :class="$style.adminPanel" to="/admin"
            >ADMIN</router-link
          >
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
              <a @click="redirect('/theory')" v-if="$route.path !== '/theory'"
                >Глоссарий</a
              >
              <a @click="redirect('/')" v-if="$route.path !== '/'"
                >Упражнения</a
              >
              <a @click="redirect('/test')" v-if="$route.path !== '/test'"
                >Тестирование</a
              >
              <a
                v-if="progress && $route.path !== '/personalProgress'"
                @click="redirect('/personalProgress')"
                >Прогресс</a
              >
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
      progress: false,
      role: false,
    };
  },
  methods: {
    ...mapActions(["GET_TEST_RESULTS", "GET_PROGRESS"]),
    quit() {
      localStorage.removeItem("userID");
      localStorage.removeItem("login");
      this.$router.push("/login");
    },
    redirect(url) {
      this.showList = !this.showList;
      setTimeout(() => {
        this.$router.push(url);
      }, 300);
    },
  },
  computed: {
    ...mapGetters(["DEVICE"]),
    login() {
      return localStorage.getItem("login");
    },
  },
  created() {
    this.role = JSON.parse(localStorage.getItem("role"));
    this.GET_TEST_RESULTS({ userID: localStorage.getItem("userID") }).then(
      (testresult) => {
        this.testResults = testresult;
        this.GET_PROGRESS({ userID: localStorage.getItem("userID") }).then(
          (progressresult) => {
            if (
              testresult.length &&
              (progressresult || progressresult.beginIndex !== 0)
            ) {
              this.progress = true;
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
