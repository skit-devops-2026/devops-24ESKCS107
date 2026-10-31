import "../assets/Progress.css";
import { useEffect, useState } from "react";
import { getWorkoutHistory } from "../utils/workoutData";
import "../assets/Progress.css";

function Progress() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(getWorkoutHistory());
  }, []);

  const totalWorkouts = workouts.length;

  const totalDuration = workouts.reduce(
    (total, workout) => total + workout.duration, 0
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.calories, 0
  );

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));

  const weeklyWorkouts = workouts.filter(
    (workout) => new Date(workout.date) >= startOfWeek
  );

  const weeklyGoal = 6;
  const weeklyPercentage = Math.min(
    100,
    Math.round((weeklyWorkouts.length / weeklyGoal) * 100)
  );

  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
  ];

  const dailyProgress = days.map((day, index) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + index);

    const count = weeklyWorkouts.filter(
      (workout) =>
        new Date(workout.date).toDateString() === dayDate.toDateString()
    ).length;

    return { day, count, percentage: Math.min(100, count * 50) };
  });

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo">
            <i className="fa-solid fa-dumbbell"></i>
            FitForge
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/workouts">Workouts</a>
            <a href="/progress">Progress</a>
          </nav>
        </div>
      </header>

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
          <p>Weekly Goal: {weeklyWorkouts.length} / {weeklyGoal} workouts</p>

          <div className="bar">
            <div style={{ width: `${weeklyPercentage}%` }}></div>
          </div>

          <p>{weeklyPercentage}% completed</p>

          <div className="weekly">
            {dailyProgress.map((item) => (
              <div key={item.day}>
                <span>{item.day}</span>
                <div className="bar">
                  <div style={{ width: `${item.percentage}%` }}></div>
                </div>
                <small>{item.count} workouts</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Recent Activity</h2>

          {workouts.length === 0 ? (
            <p>No workout data yet. Complete a workout to track progress.</p>
          ) : (
            workouts.slice(0, 5).map((workout) => (
              <div key={workout.id}>
                <strong>{workout.name}</strong>
                <p>{workout.duration} min · {workout.calories} kcal</p>
              </div>
            ))
          )}
        </section>
      </main>

      <footer>
        <p>© FitForge - Fitness Progress Tracker</p>
      </footer>
    </>
  );
}

export default Progress;
