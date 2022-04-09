const express = require("express");
const userController = require("../controllers/userController");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const axios = require("axios");

const API_KEY = process.env.API_KEY || "somekey";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Nodejs is working");
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login sucess", user: user });
      } else {
        res.send({ message: "Invalid credentials" });
      }
    } else {
      res.send("User not Found");
    }
  });
});

userRouter.post("/register", async (req, res) => {
  let { name, email, password, phone } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      // password = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password, phone });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfully registered" });
        }
      });
    }
  });
});

userRouter.get("/movies", async (req, res) => {
  let query = req.query.type;
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    console.error("ERROR ", error);
  }
});

userRouter.get("/movies/top-rated", async (req, res) => {
  let query = req.query.type;
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    console.error("ERROR ", error);
  }
});

userRouter.get("/movies/popular", async (req, res) => {
  let query = req.query.type;
  try {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    console.error("ERROR ", error);
  }
});

module.exports = userRouter;
