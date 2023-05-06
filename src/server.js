const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { auth } = require("express-oauth2-jwt-bearer");
const { oAuth } = require("./middleware/oAuth");
const guard = require("express-jwt-permissions")();

const { color } = require("console-log-colors");

const cors = require("cors");
const data = require("./testData/chestAndBack.json");

const {
  createWorkoutController,
} = require("./controllers/createWorkoutController");
const {
  startWorkoutController,
} = require("./controllers/startWorkoutController");
// ==================== IMPORTS FINISHED ====================

const app = express();
const port = 5000;

// Config Auth0
const jwtCheck = auth({
  secret: process.env.SECRET,
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SINGNING_ALGORITHM,
});

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

// enforce on all endpoints
app.use(jwtCheck);
// app.use(oAuth);

// Section: ROUTES
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send("Auth page");
});

app.get("/api", (req, res) => {
  console.log("api hit");
  console.log("Request: ", req);

  res.send(data);
});

app.get("/home", (req, res) => res.send("HOME"));

app.get(
  "/startworkout",
  guard.check(["read:workouts"]),
  startWorkoutController
); // GET EXAMPLEs

app.post("/workout", createWorkoutController); // POST EXAMPLE

// ATTEMPTING TO AUTHORIZE THE ROUTES
app.get("/api/workout", (req, res) => console.log(req.body));

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
