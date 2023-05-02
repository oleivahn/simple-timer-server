// create a server and listen for connections on port 5000
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

const data = require("./data.json");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// app.get("/api", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.send(data));

app.listen(port, () => console.log(`Server running on port ${port}`));
