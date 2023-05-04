const WorkoutModel = require("../models/Workout");

async function startWorkoutController(req, res) {
  // Get all the workouts
  // const workout = await WorkoutModel.find();

  // Get the last 5 workouts
  // const workout = await WorkoutModel.find().limit(5).sort({ $natural: -1 });

  // Get the last workout
  const workout = await WorkoutModel.find().limit(1).sort({ $natural: -1 });

  console.log("Data successfully retrieved from the database!");
  res.json(workout);
}

module.exports = { startWorkoutController };
