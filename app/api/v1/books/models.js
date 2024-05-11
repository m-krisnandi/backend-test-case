const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code harus diisi"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title harus diisi"],
    },
    author: {
      type: String,
      required: [true, "Author harus diisi"],
    },
    stock: {
      type: Number,
      required: [true, "stock harus diisi"],
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
