const WorkoutModel = require("../models/Workout");

async function createWorkoutController(req, res) {
  const workout = new WorkoutModel({
    user: req.body.user,
    workout: req.body.workout,
    date: req.body.date,
    values: req.body.values,
  });

  const createWorkout = await workout.save();
  console.log("Data added successfully to the database!");
  res.json(createWorkout);
}

module.exports = { createWorkoutController };
