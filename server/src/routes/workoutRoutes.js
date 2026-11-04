import express from "express";
import Workout from "../models/Workout.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All workout routes require authentication.
router.use(protect);

// Get logged-in user's workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user._id
    }).sort({ date: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch workouts."
    });
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

    if (
      !name ||
      !category ||
      !(Number(met) > 0) ||
      !(Number(weight) > 0) ||
      !(Number(duration) > 0)
    ) {
      return res.status(400).json({
        message: "Invalid workout details."
      });
    }

    const calories = Math.round(
      (Number(met) * 3.5 * Number(weight) / 200) *
      Number(duration)
    );

    const workout = await Workout.create({
      user: req.user._id,
      name,
      met: Number(met),
      category,
      weight: Number(weight),
      sets: Number(sets) || 0,
      reps: Number(reps) || 0,
      duration: Number(duration),
      calories,
      date: date || new Date()
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Unable to save workout."
    });
  }
});

// Delete only the logged-in user's workout
router.delete("/:id", async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found."
      });
    }

    res.json({
      message: "Workout deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete workout."
    });
  }
});

export default router;