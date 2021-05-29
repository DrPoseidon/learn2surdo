const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gesturesScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Gesture = mongoose.model("Gestures", gesturesScheme);

module.exports = Gesture;
