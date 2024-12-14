const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = 3000;

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("DB connection error"));

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    status: "fail",
    message,
  });
});
