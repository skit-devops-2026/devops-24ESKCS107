import "../../public/legacy/Dashboard.css";
import { useState, useEffect } from "react";
import { getWorkoutHistory } from "../utils/workoutData";

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(getWorkoutHistory());
  }, []);

  const today = new Date().toDateString();

  const todayWorkouts = workouts.filter(
    (workout) => new Date(workout.date).toDateString() === today
  );

  const calories = todayWorkouts.reduce(
    (total, workout) => total + workout.calories, 0
  );

  const duration = todayWorkouts.reduce(
    (total, workout) => total + workout.duration, 0
  );

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
          <h2>Welcome Back!</h2>
          <p>Track your fitness journey with FitForge.</p>
        </section>

        <section className="section">
          <h2>Today's Activity</h2>

          <div className="cards">
            <div className="card">
              <h3>{calories}</h3>
              <p>Calories Burned</p>
            </div>

            <div className="card">
              <h3>{duration} min</h3>
              <p>Workout Time</p>
            </div>

            <div className="card">
              <h3>{todayWorkouts.length}</h3>
              <p>Workouts Completed</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Recent Workouts</h2>

          <div className="workouts">
            {workouts.length === 0 ? (
              <p>No completed workouts yet. Start your first workout!</p>
            ) : (
              workouts.slice(0, 5).map((workout) => (
                <div key={workout.id}>
                  <span>{workout.name}</span>
                  <span>
                    {workout.duration} min · {workout.calories} kcal
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© FitForge - Fitness Progress Tracker</p>
      </footer>
    </>
  );
}

export default Dashboard;
