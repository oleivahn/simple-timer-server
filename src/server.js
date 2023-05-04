const express = require("express");
const mongoose = require("mongoose");
const { color } = require("console-log-colors");
require("dotenv").config();

const cors = require("cors");
const data = require("./testData/chestAndBack.json");

const {
  createWorkoutController,
} = require("./controllers/createWorkoutController");
const {
  startWorkoutController,
} = require("./controllers/startWorkoutController");
// ==================== DONE IMPORTS ====================
// TEST PUSH
// Section: SETUP

const app = express();
const port = 5000;

// Section: MIDDLEWARE
app.use(express.json());

// CORS {
// Desc: This allows me to run the react app locally and make requests to the server. Cors issue otherwise
// Basically saying, anyone on this local host(your pc) can make requests to the server (that is also on the same pc. 2 Repos running locally)
// By default, the server will only accept requests from itself (port:5000 to 5000) so we need to allow it to accept requests from other places (react-app port: 3000 so port:3000 to 5000) by allowing cors
// }
app.use(
  cors({
    origin: "*",
  })
);

// Section: ROUTES
app.get("/api", (req, res) => res.send(data));
app.get("/startworkout", startWorkoutController); // GET EXAMPLEs
app.post("/workout", createWorkoutController); // POST EXAMPLE

// ==================== START SERVER ====================
// Section: Connect to the database and start the server
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/workout")
  .then(() => {
    console.log(color.cyanBright("Connected to the database!"));

    // START THE SERVER
    app.listen(port, () =>
      console.log(
        color.magentaBright(`Server running on port: `) +
          color.yellow(`${port}`)
      )
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
