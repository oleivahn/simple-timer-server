const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const WorkoutSchema = new Schema({
  user: String,
  workout: String,
  date: String,
  values: { type: Array, default: [] },
});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);

// A model is just the skeleton of the data that will be stored in the database. It is not the data itself.
module.exports = WorkoutModel;
