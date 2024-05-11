const Books = require("./models");

const create = async (req, res) => {
  try {
    const { code, title, author, stock } = req.body;
    const result = await Books.create({
      code,
      title,
      author,
      stock,
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
    const result = await Books.find({ stock: { $gte: 1 } }).select(
      "_id code title author stock"
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
};
