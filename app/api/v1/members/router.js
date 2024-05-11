const express = require("express");
const { create, index, borrowedBook, returnBook } = require("./controllers");
const router = express.Router();

router.post("/members", create);
router.get("/members", index);
router.post("/borrow/:memberCode/:bookCode", borrowedBook);
router.post("/return/:memberCode/:bookCode", returnBook);

module.exports = router;
