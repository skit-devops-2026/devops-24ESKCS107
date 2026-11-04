import Navbar from "../components/Navbar";
import "../../public/legacy/Progress.css";
import { useState, useEffect } from "react";
import { getWorkouts } from "../utils/api";

function Progress() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch((error) => console.error("Progress error:", error));
  }, []);

  const totalWorkouts = workouts.length;

  const totalDuration = workouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.calories,
    0
  );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const weeklyData = days.map((day) => {
    const dayWorkouts = workouts.filter(
      (workout) => new Date(workout.date).getDay() === days.indexOf(day)
    );

    const duration = dayWorkouts.reduce(
      (total, workout) => total + workout.duration,
      0
    );

    return { day, duration };
  });

  const maxDuration = Math.max(
    ...weeklyData.map((item) => item.duration),
    1
  );

  return (
    <>
      <Navbar />

      <main>
        <section className="section">
          <h1>My Progress</h1>

          <div className="cards">
            <div className="card">
              <i className="fa-solid fa-dumbbell"></i>
              <h2>{totalWorkouts}</h2>
              <p>Workouts Completed</p>
            </div>

            <div className="card">
              <i className="fa-solid fa-clock"></i>
              <h2>{totalDuration} min</h2>
              <p>Workout Time</p>
            </div>

            <div className="card">
              <i className="fa-solid fa-fire"></i>
              <h2>{totalCalories.toLocaleString()}</h2>
              <p>Calories Burned</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Weekly Progress</h2>

          <div className="weekly">
            {weeklyData.map((item) => {
              const percentage = Math.round(
                (item.duration / maxDuration) * 100
              );

              return (
                <div key={item.day}>
                  <span>{item.day}</span>
                  <div className="bar">
                    <div style={{ width: `${percentage}%` }}></div>
                  </div>
                  <small>{percentage}%</small>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer>
        <p>© FitForge - Fitness Progress Tracker</p>
      </footer>
    </>
  );
}

export default Progress;
