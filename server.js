// create a server and listen for connections on port 5000
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const cors = require("cors");

// // connect to the database
// const db = mongoose.connect(
//   "mongodb+srv://leivao:UdHGtjetWgliwMYK@simple-workouts-cluster.ppkmo2t.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

const data = require("./data.json");

// Middleware
app.use(bodyParser.json());

// This allows me to run the react app locally and make requests to the server. Cors issue otherwise
app.use(
  cors({
    origin: "*",
  })
);

// app.get("/api", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.send(data));

app.listen(port, () => console.log(`Server running on port ${port}`));
