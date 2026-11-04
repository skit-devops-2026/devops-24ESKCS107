const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export function signupUser(name, email, password) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
}

export function loginUser(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function getCurrentUser() {
  return request("/auth/me");
}

export function getWorkouts() {
  return request("/workouts");
}

export function addWorkout(workout) {
  return request("/workouts", {
    method: "POST",
    body: JSON.stringify(workout)
  });
}

export function deleteWorkout(id) {
  return request(`/workouts/${id}`, {
    method: "DELETE"
  });
}