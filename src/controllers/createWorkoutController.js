const WorkoutModel = require("../models/Workout");

async function createWorkoutController(req, res) {
  const workout = new WorkoutModel({
    title: req.body.title,
    body: req.body.body,
  });

  const createWorkout = await workout.save();

  res.json(createWorkout);
}

module.exports = { createWorkoutController };
