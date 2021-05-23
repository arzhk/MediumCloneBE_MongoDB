const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const articleSchema = new Schema(
  {
    headLine: String,
    content: String,
    category: {
      img: String,
      name: String,
    },
    author: {
      name: String,
      img: String,
    },
    cover: String,
    responses: [String],
  },
  {
    timestamps: true,
  }
);

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Article", articleSchema);
