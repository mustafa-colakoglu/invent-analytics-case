const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Book = require("./book");
const User = require("./user");

const BookScore = sequelize.define("BookScore", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  bookId: {
    type: DataTypes.INTEGER,
  },
  score: {
    type: DataTypes.INTEGER,
  },
});
// BookScore.belongsTo(Book, { foreignKey: "bookId", targetKey: "id" });
// BookScore.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
module.exports = BookScore;
