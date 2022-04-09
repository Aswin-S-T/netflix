const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRouter = require("./routes/userRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/netflixxx",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongodb connected successfully");
    app.listen(port, () => {
      console.log(`Server is running at the port ${port}`);
    });
  }
);

app.use("/api/v1/user", userRouter);
