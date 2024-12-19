const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const listingRouter = require("./routes/listingRoutes");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = 3000;

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("DB connection error"));

// const __dirname = path.resolve();
app.use("/uploads", express.static("./uploads"));

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});

//UPLOADING FILE
// app.post("/upload", upload.single("image"), (req, res, next) => {
//   console.log(req.file);
//   res.json({ imageURL: `/${req.file.path}` });
//   next();
// });
//ROUTES
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    status: "fail",
    message,
  });
});
