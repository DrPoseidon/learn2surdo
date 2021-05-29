export default {
  SET_CATEGORIES: (state, data) => {
    state.categories = data;
  },
  SET_GESTURES: (state, data) => {
    state.gestures = data;
  },
  SET_GESTURES_BY_CATEGORIES: (state, data) => {
    state.gesturesByCategories = data;
  },
  SET_USER_ID: (state, data) => {
    state.userID = data;
  },
};
