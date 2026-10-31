export const workoutOptions = [
  { name: "Push Ups", met: 8, category: "Strength" },
  { name: "Squats", met: 5, category: "Strength" },
  { name: "Plank", met: 3, category: "Strength" },
  { name: "Running", met: 9.8, category: "Cardio" },
  { name: "Jumping Jacks", met: 8, category: "Cardio" },
  { name: "Stretching", met: 2.5, category: "Flexibility" }
];

export function getWorkoutHistory() {
  return JSON.parse(localStorage.getItem("fitforgeWorkouts")) || [];
}

export function saveWorkout(workout) {
  const history = getWorkoutHistory();
  history.unshift(workout);
  localStorage.setItem("fitforgeWorkouts", JSON.stringify(history));
}

export function calculateCalories(met, weight, duration) {
  return Math.round((met * 3.5 * weight / 200) * duration);
}
