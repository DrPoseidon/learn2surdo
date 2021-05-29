const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    beginIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
