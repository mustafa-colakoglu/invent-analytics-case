const express = require("express");
const user = require("./routes/users");
const book = require("./routes/books");
const sequelize = require("./db");
const relationships = require("./models/relationships");

relationships();
const app = express();
app.listen(3000);
app.use(express.json());
app.use("/users", user);
app.use("/books", book);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Mysql connection established");
  } catch (err) {
    console.log("Mysql connection failed");
    console.log(err);
    process.exit();
  }
};
start();
