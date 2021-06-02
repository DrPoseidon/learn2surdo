import axios from "axios";
import { uri } from "./index";

const SET_PROGRESS = async (vuex, data) => {
  await axios.post(`${uri}set-progress`, data);
};

const SET_GESTURE_PROGRESS = async (vuex, data) => {
  await axios.post(`${uri}add-gesture-progress`, data);
};

const SET_TEST_RESULT = async (vuex, data) => {
  await axios.post(`${uri}set-test-result`, data);
};

const SET_DEVICE_ACTION = async ({ commit }, data) => {
  commit("SET_DEVICE_MUTATION", data);
};

export {
  SET_PROGRESS,
  SET_GESTURE_PROGRESS,
  SET_TEST_RESULT,
  SET_DEVICE_ACTION,
};
