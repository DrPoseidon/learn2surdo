import Vue from "vue";
import VueRouter from "vue-router";
import main from "Pages/main";
import profile from "Pages/profile";
import gesture from "Pages/gesture";
import gestures from "Pages/gestures";
import admin from "Pages/admin";
import exercises from "Pages/exercises";
import exercise from "Pages/exercises/exercise";
import register from "Pages/register";
import login from "Pages/login";
import test from "Pages/test";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: main }, // редиректит
    { path: "/profile", component: profile },
    { path: "/gesture/:category/:id", component: gesture }, // редиректит
    { path: "/theory", component: gestures }, // редиректит
    { path: "/admin", component: admin },
    { path: "/exercises", component: exercises }, // редиректит
    { path: "/exercise/:category", component: exercise }, // редиректит
    { path: "/register", component: register },
    { path: "/login", component: login },
    { path: "/test", component: test },
  ],
});
