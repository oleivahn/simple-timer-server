const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
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

//  CHECK THIS
// Configure middelware to accept access tokens...
//  https://auth0.com/docs/quickstart/backend/nodejs/01-authorization#configure-the-middleware

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
// app.use(jwtCheck);
// app.use(oAuth);

// Section: ROUTES
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send("Auth page");
});

// TODO: SWAP THIS TO KEEP TESTING THE FULL ENDPOINT
// app.get("/api", startWorkoutController);

const checkScopes = requiredScopes(
  "read:current_user update:current_user_metadata read:workouts write:workouts"
);

app.get("/api", jwtCheck, (req, res) => {
  // app.get("/api", jwtCheck, checkScopes, (req, res) => {
  console.log("api hit");
  // console.log("Request: ", req.headers);

  res.send(data);
});

app.get("/home", (req, res) => res.send("HOME"));

app.get("/startworkout", startWorkoutController); // GET EXAMPLEs

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
