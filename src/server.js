const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const WorkoutModel = require("./models/Workout");

// Middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = 5000;

// Use Middleware
// app.use(bodyParser.json());
app.use(express.json());

// This allows me to run the react app locally and make requests to the server. Cors issue otherwise
app.use(
  cors({
    origin: "*",
  })
);

// app.get("/api", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.send(data));

app.post("/workout", async (req, res) => {
  const workout = new WorkoutModel({
    title: req.body.title,
    body: req.body.body,
  });

  const createWorkout = await workout.save();

  res.json(createWorkout);
});

// // connect to the database and start the server
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/workout")
  .then(() => {
    console.log("Connected to the database!");

    // START THE SERVER
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
