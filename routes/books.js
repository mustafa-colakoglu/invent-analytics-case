const Router = require("express").Router;
const booksValidator = require("./validator/booksValidator");
const validatorChechMiddleware = require("./middeware/validatorChechMiddleware");
const Book = require("../models/book");
const BookScore = require("../models/bookScore");
const errors = require("./errors");
const sequelize = require("../db");
const { Sequelize } = require("../db");
const router = Router();

router.post(
  "/",
  booksValidator.create,
  validatorChechMiddleware,
  async (req, res) => {
    await Book.create({ name: req.body.name });
    res.status(201);
    res.send("");
  }
);

router.get("/", async (req, res) => {
  const getBooks = await Book.findAll({ attributes: ["id", "name"] });
  res.json(getBooks);
});

router.get(
  "/:id",
  booksValidator.findById,
  validatorChechMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    let find = await Book.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        [Sequelize.fn("AVG", Sequelize.col("bookScore.score")), "score"],
      ],
      include: [{ model: BookScore, as: "bookScore" }],
    });
    if (!find) {
      res.status(500);
      res.json(errors.bookNotFound);
    } else {
      find = find.toJSON();
      if (find.score === 0) find.score = -1;
      // if (find.bookScore.length == 0) find.score = -1;
      // else {
      //   let sum = 0;
      //   for (let i = 0; i < find.bookScore.length; i++) {
      //     sum += find.bookScore[i].score;
      //   }
      //   find.score = sum / find.bookScore.length;
      // }
      delete find.bookScore;
      res.json(find);
    }
  }
);

module.exports = router;
