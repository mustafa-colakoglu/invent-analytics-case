const User = require("./user");
const Borrow = require("./borrow");
const BookScore = require("./bookScore");
const Book = require("./book");

module.exports = () => {
  User.hasMany(Borrow, { foreignKey: "userId", as: "present" });
  Borrow.belongsTo(User);

  User.hasMany(BookScore, { foreignKey: "userId", as: "past" });
  BookScore.belongsTo(User);

  Book.hasMany(BookScore, { foreignKey: "bookId", as: "bookScore" });
  BookScore.belongsTo(Book, {
    targetKey: "id",
    foreignKey: "bookId",
    as: "book",
  });
  Book.hasMany(Borrow, { foreignKey: "bookId", as: "bookBorrow" });
  Borrow.belongsTo(Book, {
    targetKey: "id",
    foreignKey: "bookId",
    as: "book",
  });
};
