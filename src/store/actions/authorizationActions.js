import axios from "axios";
import { uri } from "./index";

const REGISTER = async ({ commit }, data) => {
  const res = await axios.post(`${uri}register`, data);
  if (res.data === "error") {
    return res;
  } else {
    commit("SET_USER_ID", res.data.id);
    localStorage.setItem("userID", res.data.id);
    localStorage.setItem("login", res.data.login);
    localStorage.setItem("role", res.data.role);
    return "redirectToHome";
  }
};
const LOGIN = async ({ commit }, data) => {
  const res = await axios.post(`${uri}login`, data);
  if (res.data?.message) {
    return res.data.message;
  }
  if (res.data?.id) {
    commit("SET_USER_ID", res.data.id);
    localStorage.setItem("userID", res.data.id);
    localStorage.setItem("login", res.data.login);
    localStorage.setItem("role", res.data.role);
    return "redirectToHome";
  }
};

export { REGISTER, LOGIN };
