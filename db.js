const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mysql://root@127.0.0.1/invent");
module.exports = sequelize;
