const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Loads .env file
require("dotenv").config();

// Configuration
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // allows us to parse json

// DB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

// Listening on server
app.listen(port, () => {
  console.log(`Server in running on port : ${port}`);
});
