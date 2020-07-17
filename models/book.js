const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const BookScore = require("./bookScore");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Book;
