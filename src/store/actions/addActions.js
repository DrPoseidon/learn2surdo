import axios from "axios";
import { uri } from "./index";

const ADD_GESTURES_TO_DB = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}add-multiple-gestures`, data);
  dispatch("GET_ALL_GESTURES_FROM_DB");
  return res;
};
const ADD_CATEGORIES_TO_DB = async ({ dispatch }, data) => {
  const res = await axios.post(`${uri}add-multiple-categories`, data);
  dispatch("GET_ALL_CATEGORIES_FROM_DB");
  return res;
};

export { ADD_GESTURES_TO_DB, ADD_CATEGORIES_TO_DB };
