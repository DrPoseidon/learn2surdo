import axios from "axios";
import { uri } from "./index";

const GET_ALL_CATEGORIES_FROM_DB = async ({ commit }) => {
  const res = await axios.get(`${uri}get-categories`);
  commit("SET_CATEGORIES", res.data);
};
const GET_ALL_GESTURES_FROM_DB = async ({ commit }) => {
  const res = await axios.get(`${uri}all-gestures`);
  commit("SET_GESTURES", res.data);
};
const GET_GESTURES_BY_CATEGORIES = async ({ dispatch, commit, state }) => {
  await dispatch("GET_ALL_CATEGORIES_FROM_DB");
  await dispatch("GET_ALL_GESTURES_FROM_DB");
  let newGestures = [];
  const { categories, gestures } = state;
  for (let i = 0; i < categories.length; i++) {
    let tmp = [];
    for (let j = 0; j < gestures.length; j++) {
      if (gestures[j].category === categories[i].title) {
        tmp.push(gestures[j]);
      }
    }
    newGestures.push(tmp);
  }
  commit("SET_GESTURES_BY_CATEGORIES", newGestures);
};
const GET_GESTURES_OF_CATEGORY = async (vuex, data) => {
  const res = await axios.post(`${uri}gesture`, data);
  return res.data;
};
const GET_PROGRESS = async (vuex, data) => {
  const res = await axios.post(`${uri}get-progress`, data);
  return res.data;
};
const GET_GESTURE_PROGRESS = async (vuex, data) => {
  const res = await axios.post(`${uri}get-gesture-progress`, data);
  return res.data;
};
const GET_TEST_RESULTS = async (vuex, data) => {
  const res = await axios.post(`${uri}get-test-results`, data);
  return res.data;
};

export {
  GET_ALL_CATEGORIES_FROM_DB,
  GET_ALL_GESTURES_FROM_DB,
  GET_GESTURES_BY_CATEGORIES,
  GET_GESTURES_OF_CATEGORY,
  GET_PROGRESS,
  GET_GESTURE_PROGRESS,
  GET_TEST_RESULTS,
};
