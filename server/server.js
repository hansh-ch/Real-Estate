const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv").config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
