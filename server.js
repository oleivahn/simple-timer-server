// create a server and listen for connections on port 5000
const express = require("express");
const app = express();
const port = 5000;

// app.get("/api", (req, res) => res.send("Hello World!"));
app.get("/api", (req, res) => res.json({ msg: "Hello World!" }));

app.listen(port, () => console.log(`Server running on port ${port}`));
