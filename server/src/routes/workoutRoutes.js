import express from "express";
import Workout from "../models/Workout.js";

const router = express.Router();

// Get all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add workout
router.post("/", async (req, res) => {
  try {
    const {
  name,
  met,
  category,
  weight,
  sets,
  reps,
  duration,
  date
} = req.body;

    if (!name || !category || !(met > 0) || !(weight > 0) || !(duration > 0)) {
      return res.status(400).json({ message: "Invalid workout details" });
    }

    const calories = Math.round((met * 3.5 * weight / 200) * duration);

    const workout = await Workout.create({
      name,
      met,
      category,
      weight,
      sets,
      reps,
      duration,
      calories,
      date: date || new Date()
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete workout
router.delete("/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;