export const uri = "http://localhost:3000/";
// export const uri = "https://api.drposeidon.ru/";
import { ADD_GESTURES_TO_DB, ADD_CATEGORIES_TO_DB } from "./addActions";
import {
  DELETE_GESTURE_FROM_DB,
  DELETE_CATEGORY_FROM_DB,
} from "./deleteActions";
import {
  GET_ALL_CATEGORIES_FROM_DB,
  GET_ALL_GESTURES_FROM_DB,
  GET_GESTURES_BY_CATEGORIES,
  GET_GESTURES_OF_CATEGORY,
  GET_PROGRESS,
  GET_GESTURE_PROGRESS,
  GET_TEST_RESULTS,
} from "./getActions";
import {
  SET_PROGRESS,
  SET_GESTURE_PROGRESS,
  SET_TEST_RESULT,
  SET_DEVICE_ACTION,
} from "./setActions";
import { REGISTER, LOGIN } from "./authorizationActions";
import {
  REFRESH_GESTURE_INFORMATION,
  REFRESH_CATEGORY_INFORMATION,
} from "./refreshActions";

export default {
  ADD_GESTURES_TO_DB,
  ADD_CATEGORIES_TO_DB,
  DELETE_GESTURE_FROM_DB,
  DELETE_CATEGORY_FROM_DB,
  GET_ALL_CATEGORIES_FROM_DB,
  GET_ALL_GESTURES_FROM_DB,
  GET_GESTURES_BY_CATEGORIES,
  GET_GESTURES_OF_CATEGORY,
  GET_PROGRESS,
  GET_GESTURE_PROGRESS,
  GET_TEST_RESULTS,
  SET_PROGRESS,
  SET_GESTURE_PROGRESS,
  SET_TEST_RESULT,
  REGISTER,
  LOGIN,
  REFRESH_GESTURE_INFORMATION,
  REFRESH_CATEGORY_INFORMATION,
  SET_DEVICE_ACTION,
};
