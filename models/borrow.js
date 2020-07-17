const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Book = require("./book");

const Borrow = sequelize.define("Borrow", {
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
  returned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Borrow;
