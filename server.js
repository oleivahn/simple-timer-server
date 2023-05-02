const express = require("express");
// MONGODB
const { MongoClient, ServerApiVersion } = require("mongodb");

const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const cors = require("cors");

// // MONGOOSE
const uri =
  "mongodb+srv://leivao:TgkzKJz5VVhR0LsH@simple-workouts-cluster.ppkmo2t.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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

// TITLE: CONNECT TO MONGODB FIRST AND THE START THE SERVER
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // START THE SERVER
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
