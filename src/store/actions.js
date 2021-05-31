import axios from "axios";
const uri = "http://localhost:3000/";
// const uri = "https://api.drposeidon.ru/";
export default {
  async ADD_GESTURES_TO_DB({ dispatch }, data) {
    const res = await axios.post(`${uri}add-multiple-gestures`, data);
    dispatch("GET_ALL_GESTURES_FROM_DB");
    return res;
  },
  async ADD_CATEGORIES_TO_DB({ dispatch }, data) {
    const res = await axios.post(`${uri}add-multiple-categories`, data);
    dispatch("GET_ALL_CATEGORIES_FROM_DB");
    return res;
  },
  async GET_ALL_CATEGORIES_FROM_DB({ commit }) {
    const res = await axios.get(`${uri}get-categories`);
    commit("SET_CATEGORIES", res.data);
  },
  async GET_ALL_GESTURES_FROM_DB({ commit }) {
    const res = await axios.get(`${uri}all-gestures`);
    commit("SET_GESTURES", res.data);
  },

  async GET_GESTURES_BY_CATEGORIES({ dispatch, commit, state }) {
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
  },

  async GET_GESTURES_OF_CATEGORY(vuex, data) {
    const res = await axios.post(`${uri}gesture`, data);
    return res.data;
  },

  async DELETE_GESTURE_FROM_DB({ dispatch }, data) {
    const res = await axios.post(`${uri}delete-gesture`, data);
    dispatch("GET_ALL_GESTURES_FROM_DB");
    return res;
  },
  async REFRESH_GESTURE_INFORMATION({ dispatch }, data) {
    const res = await axios.post(`${uri}refresh-gesture-information`, data);
    dispatch("GET_ALL_GESTURES_FROM_DB");
    return res;
  },
  async REFRESH_CATEGORY_INFORMATION({ dispatch }, data) {
    const res = await axios.post(`${uri}resfresh-category-information`, data);
    dispatch("GET_ALL_CATEGORIES_FROM_DB");
    return res;
  },

  async DELETE_CATEGORY_FROM_DB({ dispatch }, data) {
    const res = await axios.post(`${uri}delete-category`, data);
    dispatch("GET_ALL_CATEGORIES_FROM_DB");
    return res;
  },

  async REGISTER({ commit }, data) {
    const res = await axios.post(`${uri}register`, data);
    if (res.data === "error") {
      return res;
    } else {
      commit("SET_USER_ID", res.data.id);
      localStorage.setItem("userID", res.data.id);
      localStorage.setItem("login", res.data.login);
      return "redirectToHome";
    }
  },
  async LOGIN({ commit }, data) {
    const res = await axios.post(`${uri}login`, data);
    if (res.data?.message) {
      return res.data.message;
    }
    if (res.data?.id) {
      commit("SET_USER_ID", res.data.id);
      localStorage.setItem("userID", res.data.id);
      localStorage.setItem("login", res.data.login);
      return "redirectToHome";
    }
  },

  async GET_PROGRESS(vuex, data) {
    const res = await axios.post(`${uri}get-progress`, data);
    return res.data;
  },

  async SET_PROGRESS(vuex, data) {
    const res = await axios.post(`${uri}set-progress`, data);
    res;
  },
};
