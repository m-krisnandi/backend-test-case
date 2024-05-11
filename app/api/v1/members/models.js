const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code harus diisi"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    penalty: {
      type: Boolean,
      default: false,
    },
    penaltyDate: {
      type: Date,
      default: null,
    },
    borrowedBooks: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        borrowDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
