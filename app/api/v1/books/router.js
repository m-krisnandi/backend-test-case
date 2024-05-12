const express = require("express");
const { create, index } = require("./controllers");
const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post("/books", create);
router.get("/books", index);

module.exports = router;
