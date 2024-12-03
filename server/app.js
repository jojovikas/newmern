require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const PORT = 6010;

app.get("/", (req, res) => {
  res.status(201).json("Servr Start");
});

app.listen(PORT, () => {
  console.log(`Server Start at port no ${PORT}`);
});
