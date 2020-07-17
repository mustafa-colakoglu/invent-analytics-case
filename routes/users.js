const Router = require("express").Router;
const usersValidator = require("./validator/usersValidator");
const validatorChechMiddleware = require("./middeware/validatorChechMiddleware");
const User = require("../models/user");
const Book = require("../models/book");
const Borrow = require("../models/borrow");
const BookScore = require("../models/bookScore");
const errors = require("./errors");
const router = Router();

router.post(
  "/",
  usersValidator.create,
  validatorChechMiddleware,
  async (req, res) => {
    const name = req.body.name;
    await User.create({ name });
    res.status(201);
    res.send("");
  }
);
router.get("/", async (req, res) => {
  const getUsers = await User.findAll({ attributes: ["id", "name"] });
  res.json(getUsers);
});

router.post(
  "/:id/borrow/:bookId",
  usersValidator.borrowBook,
  validatorChechMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);
    const userFind = await User.findOne({ where: { id } });
    const bookFind = await Book.findOne({ where: { id: bookId } });
    const bookBorrowing = await Borrow.findOne({
      where: { bookId, returned: false },
    });
    if (!userFind || !bookFind || bookBorrowing) {
      res.status(500);
      if (!userFind) {
        res.json(errors.userNotFound);
      } else if (!bookFind) {
        res.json(errors.bookNotFound);
      } else if (bookBorrowing) {
        res.json(errors.bookBorrowing);
      }
    } else {
      await Borrow.create({ userId: id, bookId });
      res.status(204);
      res.send("");
    }
  }
);

router.post(
  "/:id/return/:bookId",
  usersValidator.returnBook,
  validatorChechMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);
    const score = parseInt(req.body.score);
    const userFind = await User.findOne({ where: { id } });
    const bookFind = await Book.findOne({ where: { id: bookId } });
    const bookBorrowing = await Borrow.findOne({
      where: { bookId, userId: id, returned: false },
    });
    if (!userFind || !bookFind || !bookBorrowing) {
      res.status(500);
      if (!userFind) {
        res.json(errors.userNotFound);
      } else if (!bookFind) {
        res.json(errors.bookNotFound);
      } else if (!bookBorrowing) {
        res.json(errors.bookNotBorrowing);
      }
    } else {
      await Borrow.update(
        { returned: true },
        { where: { userId: id, bookId, returned: false } }
      );
      await BookScore.create({ userId: id, bookId, score });
      res.status(204);
      res.send("");
    }
  }
);

router.get(
  "/:id",
  usersValidator.findById,
  validatorChechMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    let find = await User.findOne({
      where: { id },
      attributes: ["id", "name"],
      include: [
        {
          model: BookScore,
          as: "past",
          include: [{ model: Book, as: "book" }],
          required: false,
        },
        {
          model: Borrow,
          as: "present",
          where: { returned: false },
          include: [{ model: Book, as: "book" }],
          required: false,
        },
      ],
    });
    if (!find) {
      res.status(500);
      res.json(errors.userNotFound);
    } else {
      find = find.toJSON();
      find.books = {
        past: find.past.map((item) => ({
          name: item.book.name,
          userScore: item.score,
        })),
        present: find.present.map((item) => ({ name: item.book.name })),
      };
      delete find.past;
      delete find.present;
      res.json(find);
    }
  }
);
module.exports = router;
