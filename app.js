const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout.js");
const { db } = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

const toSend = layout();

const app = express();

app.use(morgan("dev"));

// static middleware serves content from the public folder
app.use(express.static(__dirname + "/public"));

// app.use(express.json()); might not be needed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(toSend);
});

app.listen(3000, () => {
  console.log("The app is running!");
});
