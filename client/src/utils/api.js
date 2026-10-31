const API_URL = "http://localhost:5000/api";

export async function getWorkouts() {
  const response = await fetch(`${API_URL}/workouts`);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export async function addWorkout(workout) {
  const response = await fetch(`${API_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workout)
  });

  if (!response.ok) {
    throw new Error("Failed to save workout");
  }

  return response.json();
}

export async function deleteWorkout(id) {
  const response = await fetch(`${API_URL}/workouts/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete workout");
  }

  return response.json();
}