const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gestureProgressSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    gestureID: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GestureProgress = mongoose.model(
  "GestureProgress",
  gestureProgressSchema
);
module.exports = GestureProgress;
