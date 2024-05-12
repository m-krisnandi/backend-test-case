const mongoose = require("mongoose");
const moment = require("moment-timezone");

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
      type: String,
      default: null,
    },
    borrowedBooks: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        borrowDate: {
          type: String,
          default: () => moment().tz("Asia/Jakarta"),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
