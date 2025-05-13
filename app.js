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
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.elsi0yn.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });
