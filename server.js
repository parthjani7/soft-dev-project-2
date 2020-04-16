const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");

// Loads .env file
require("dotenv").config();

// Configuration
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // allows us to parse json

// Loading the routing files
require("./routes/index.route")(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Used for logging
} else if (process.env.NODE_ENV === "production") {
  app.use(compression()); // used for compression, when deployed
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// DB Connection
const uri = process.env.MONGO_URI; // Connection URI(String)

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Listening on server
app.listen(port, () => {
  console.log(`Server in running on port : ${port}`);
});
