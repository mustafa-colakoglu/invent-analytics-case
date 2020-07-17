const { body, param } = require("express-validator");
module.exports = {
  create: [body("name").isString().isLength({ max: 50, min: 5 })],
  findById: [param("id").isInt()],
  borrowBook: [param("id").isInt(), param("bookId").isInt()],
  returnBook: [
    param("id").isInt(),
    param("bookId").isInt(),
    body("score").isInt({ min: 1, max: 10 }),
  ],
};
