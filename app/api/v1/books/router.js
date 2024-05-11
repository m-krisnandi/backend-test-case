const express = require("express");
const { create, index } = require("./controllers");
const router = express.Router();

router.post('/books', create)
router.get('/books', index)

module.exports = router;
