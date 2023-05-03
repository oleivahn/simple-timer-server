const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const WorkoutModel = require("./models/Workout");

const { color, log } = require("console-log-colors");

// Middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = 5000;

// Use Middleware
// app.use(bodyParser.json());
app.use(express.json());

// TITLE: CORS
// This allows me to run the react app locally and make requests to the server. Cors issue otherwise
// Desc: Basically saying, anyone on this local host(your pc) can make requests to the server (that is also on the same pc. 2 Repos running locally)
// By default, the server will only accept requests from itself (port:5000 to 5000) so we need to allow it to accept requests from other places (react-app port: 3000 so port:3000 to 5000) by allowing cors
app.use(
  cors({
    origin: "*",
  })
);

// app.get("/api", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.send(data));

app.post("/api", (req, res) => res.send("HELLO WORLD!"));

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
    // log.cyan("Connecting to the database!");
    console.log(color.cyanBright("Connected to the database!"));

    // START THE SERVER
    app.listen(port, () =>
      console.log(color.yellowBright(`Server running on port ${port}`))
    );
  })
  .catch((err) => {
    console.log(
      color.red(
        "Cannot connect to the database!, check your config files maybe"
      )
    );
    console.log(err);
    process.exit();
  });
