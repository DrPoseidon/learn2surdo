import Vue from "vue";
import VueRouter from "vue-router";
import profile from "Pages/profile";
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
    { path: "/", component: exercises }, // редиректит
    { path: "/profile", component: profile },
    { path: "/gesture/:category/:id", component: gesture }, // редиректит
    { path: "/theory", component: gestures }, // редиректит
    { path: "/admin", component: admin },
    { path: "/exercise/:category", component: exercise }, // редиректит
    { path: "/register", component: register },
    { path: "/login", component: login },
    { path: "/test", component: test },
    { path: "/personalProgress", component: personalProgress },
    { path: "/testResult/:id", component: testResult },
  ],
});
