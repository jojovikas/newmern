const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE; // Ensure you load the DATABASE URL from .env

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Database connection error:", err);
  });
