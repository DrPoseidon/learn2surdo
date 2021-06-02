import axios from "axios";
import { uri } from "./index";

const REFRESH_GESTURE_INFORMATION = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}refresh-gesture-information`, data);
  dispatch("GET_ALL_GESTURES_FROM_DB");
  return res;
};
const REFRESH_CATEGORY_INFORMATION = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}resfresh-category-information`, data);
  dispatch("GET_ALL_CATEGORIES_FROM_DB");
  return res;
};

export { REFRESH_GESTURE_INFORMATION, REFRESH_CATEGORY_INFORMATION };
