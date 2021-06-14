import Vue from "vue";
import VueRouter from "vue-router";
import gesture from "Pages/gesture";
import gestures from "Pages/gestures";
import admin from "Pages/admin";
import exercises from "Pages/exercises";
import exercise from "Pages/exercises/exercise";
import register from "Pages/register";
import login from "Pages/login";
import test from "Pages/test";
import personalProgress from "Pages/personalProgress";
import testResult from "Pages/personalProgress/testResult";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: exercises },
    { path: "/gesture/:category/:id", component: gesture },
    { path: "/theory", component: gestures },
    { path: "/admin", component: admin },
    { path: "/exercise/:category", component: exercise },
    { path: "/register", component: register },
    { path: "/login", component: login },
    { path: "/test", component: test },
    { path: "/personalProgress", component: personalProgress },
    { path: "/testResult/:id", component: testResult },
  ],
});
