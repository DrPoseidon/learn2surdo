const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categoriesSchema);
module.exports = Categories;
