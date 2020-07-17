const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      error: 1,
      message: "Validation Error",
      errors: validationErrors.array(),
    });
  } else {
    next();
  }
};
