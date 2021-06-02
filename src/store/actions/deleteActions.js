import axios from "axios";
import { uri } from "./index";

const DELETE_GESTURE_FROM_DB = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}delete-gesture`, data);
  dispatch("GET_ALL_GESTURES_FROM_DB");
  return res;
};
const DELETE_CATEGORY_FROM_DB = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}delete-category`, data);
  dispatch("GET_ALL_CATEGORIES_FROM_DB");
  return res;
};

export { DELETE_GESTURE_FROM_DB, DELETE_CATEGORY_FROM_DB };
