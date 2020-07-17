const { body, param } = require("express-validator");
module.exports = {
  create: [body("name").isString().isLength({ max: 50, min: 1 })],
  findById: [param("id").isInt()],
};
