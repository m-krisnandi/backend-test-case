const Members = require("./models");
const Books = require("../books/models");
const moment = require("moment-timezone");

const create = async (req, res) => {
  try {
    const { code, name } = req.body;
    const result = await Members.create({
      code,
      name,
    });
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const index = async (req, res) => {
  try {
    const result = await Members.find()
      .populate({
        path: "borrowedBooks.book",
        select: "-_id code title author",
      })
      .select(
        "_id code name penalty penaltyDate borrowedBooks.book borrowedBooks.borrowDate"
      );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const borrowedBook = async (req, res) => {
  try {
    const member = await Members.findOne({
      code: req.params.memberCode,
    });
    const book = await Books.findOne({
      code: req.params.bookCode,
    });

    if (!member || !book) {
      return res.status(404).json({
        message: "Member atau buku tidak ditemukan",
      });
    }

    if (member.penalty) {
      return res.status(400).json({
        message: "Member saat ini dikenakan sanksi!",
      });
    }

    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({
        message: "Member telah meminjam buku dalam jumlah maksimum",
      });
    }

    if (book.stock === 0) {
      return res.status(400).json({
        message: "Stok buku habis",
      });
    }

    const bookIdToCheck = book._id;
    const isBookAlreadyBorrowed = member.borrowedBooks.some((borrowedBook) => {
      return borrowedBook.book.equals(bookIdToCheck);
    });

    if (isBookAlreadyBorrowed) {
      return res.status(400).json({
        message: "Buku sudah dipinjam oleh member",
      });
    }

    member.borrowedBooks.push({
      book: book._id,
      borrowDate: new Date(),
    });
    await member.save();

    book.stock--;
    await book.save();

    res.status(200).json({
      message: "Buku berhasil dipinjam",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const member = await Members.findOne({
      code: req.params.memberCode,
    });
    const book = await Books.findOne({
      code: req.params.bookCode,
    });

    if (!member || !book) {
      return res.status(404).json({
        message: "Member atau buku tidak ditemukan",
      });
    }

    const borrowedBook = member.borrowedBooks.find(
      (b) => b.book.toString() === book._id.toString()
    );

    if (!borrowedBook) {
      return res.status(404).json({
        message: "Buku tidak ditemukan pada daftar",
      });
    }

    const returnDate = new Date();
    const borrowDate = new Date(borrowedBook.borrowDate);
    const timeDifference = returnDate.getTime() - borrowDate.getTime();
    const daysDifference = Math.abs(timeDifference / (1000 * 3600 * 24));

    if (daysDifference > 7) {
      member.penalty = true;
      member.penaltyDate = moment().tz("Asia/Jakarta").add(3, "days").format();
      await member.save();

      setTimeout(async () => {
        member.penalty = false;
        member.penaltyDate = null;
        await member.save();
      }, 3 * 24 * 60 * 60 * 1000);

      member.borrowedBooks = member.borrowedBooks.filter(
        (b) => b.book.toString() !== book._id.toString()
      );
      await member.save();

      book.stock++;
      await book.save();
      return res.status(400).json({
        message: "Buku dikembalikan setelah 7 hari. Sanksi diterapkan.",
      });
    }

    member.borrowedBooks = member.borrowedBooks.filter(
      (b) => b.book.toString() !== book._id.toString()
    );
    await member.save();

    book.stock++;
    await book.save();

    res.json({
      message: "Buku berhasil dikembalikan",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  index,
  borrowedBook,
  returnBook,
};
