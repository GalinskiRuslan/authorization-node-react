const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routers/index");
const errorMiddleware = require("./middleware/error-middleware");

const URL = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(URL, () => {
      console.log(`Server start on ${URL} port`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
