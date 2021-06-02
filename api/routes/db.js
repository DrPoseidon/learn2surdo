const mongoose = require("mongoose");
const dbConnectionString =
  "mongodb+srv://DrPoseidon:I2DGNYEtkCk5au5a@drposeidoncluster.cy20x.mongodb.net/learn2sudo?retryWrites=true&w=majority";
const Gestures = require("../models/gestures");
const Categories = require("../models/categories");
const Users = require("../models/users");
const Progress = require("../models/progress");
const GestureProgress = require("../models/gestureProgress");
const TestResults = require("../models/testResults");

try {
  mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connection successful");
} catch (err) {
  console.error(err);
}

module.exports = {
  Gestures,
  Categories,
  Users,
  Progress,
  GestureProgress,
  TestResults,
};
