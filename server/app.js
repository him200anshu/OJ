const express = require("express");
const collection = require("./mongo");
const { problemCollection } = require("./mongo");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Fetch questions from the API and save them in the database
app.post("/fetch-questions", async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const questions = response.data.stat_status_pairs;

    for (const question of questions) {
      const problemId = question.stat.question_id;
      const title = question.stat.question__title;
      const link = `https://leetcode.com/problems/${question.stat.question__title_slug}`;

      await problemCollection.findOneAndUpdate(
        { problemId },
        { problemId, title, link },
        { upsert: true }
      );
    }

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "fail" });
  }
});

app.get("/problems", async (req, res) => {
  try {
    const questions = await problemCollection.find({});
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.json([]);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({ status: "success", userId: user._id });
      } else {
        res.json({ status: "incorrect_password" });
      }
    } else {
      res.json({ status: "notexist" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json({ status: "exist" });
    } else {
      await collection.create(data);
      res.json({ status: "success" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

app.listen(8000, () => {
  console.log("Server connected on port 8000");
});
