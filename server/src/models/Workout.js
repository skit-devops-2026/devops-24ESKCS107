import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  met: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  sets: {
  type: Number,
  default: 0
  },
  reps: {
  type: Number,
  default: 0
  },
  duration: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;