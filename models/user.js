const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const BookScore = require("./bookScore");
const Borrow = require("./borrow");

const User = sequelize.define("User", {
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
module.exports = User;
