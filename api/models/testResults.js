const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testResultsSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const TestResults = mongoose.model("TestResults", testResultsSchema);
module.exports = TestResults;
