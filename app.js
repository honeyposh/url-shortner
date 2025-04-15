const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const shortUrl = require("./routes/shorturl");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", shortUrl);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });
