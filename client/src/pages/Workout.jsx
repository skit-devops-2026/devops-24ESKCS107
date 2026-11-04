import Navbar from "../components/Navbar";
import "../../public/legacy/Workout.css";
import { useState, useEffect } from "react";
import {
  getWorkouts,
  addWorkout,
  deleteWorkout
} from "../utils/api";
import { workoutOptions } from "../utils/workoutData";

function Workout() {
  const [selected, setSelected] = useState(workoutOptions[0].name);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(60);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [workouts, setWorkouts] = useState([]);

  async function loadWorkouts() {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Workout history error:", error);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((old) => old + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  function startWorkout() {
    if (sets < 1 || reps < 1 || weight < 1) {
      setMessage("Please enter valid workout details.");
      return;
    }

    setSeconds(0);
    setMessage("");
    setRunning(true);
  }

  async function finishWorkout() {
    if (!running) return;

    const duration = Math.max(1, Math.round(seconds / 60));

    const selectedWorkout = workoutOptions.find(
      (item) => item.name === selected
    );

    try {
      const savedWorkout = await addWorkout({
        name: selected,
        met: selectedWorkout.met,
        category: selectedWorkout.category,
        weight: Number(weight),
        sets: Number(sets),
        reps: Number(reps),
        duration,
        date: new Date().toISOString()
      });

      setRunning(false);
      setMessage(
        `${selected} completed! Estimated ${savedWorkout.calories} calories burned.`
      );
      setSeconds(0);

      await loadWorkouts();
    } catch (error) {
      setMessage("Could not save workout. Please try again.");
      console.error(error);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmDelete) return;

    try {
      await deleteWorkout(id);
      setMessage("Workout deleted successfully!");
      await loadWorkouts();
    } catch (error) {
      setMessage("Could not delete workout. Please try again.");
      console.error(error);
    }
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <>
      <Navbar />

      <main>
        <section className="section">
          <h2>Workout Categories</h2>

          <div className="cards">
            <div className="card"><h3>Strength</h3></div>
            <div className="card"><h3>Cardio</h3></div>
            <div className="card"><h3>Flexibility</h3></div>
          </div>
        </section>

        <section className="section">
          <h2>Choose Your Workout</h2>

          <div className="choose-workout">
            <label>Select Workout</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              disabled={running}
            >
              {workoutOptions.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <label>Sets</label>
            <input
              type="number"
              min="1"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              disabled={running}
            />

            <label>Reps</label>
            <input
              type="number"
              min="1"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              disabled={running}
            />

            <label>Weight (kg)</label>
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              disabled={running}
            />

            <h3>
              Timer: {minutes}:{String(remainingSeconds).padStart(2, "0")}
            </h3>

            {!running ? (
              <button className="btn" onClick={startWorkout}>
                Start Workout
              </button>
            ) : (
              <button className="btn" onClick={finishWorkout}>
                Finish Workout
              </button>
            )}

            {message && <p>{message}</p>}
          </div>
        </section>

        <section className="section history-section">
          <h2>Workout History</h2>

          {workouts.length === 0 ? (
            <p>No workout history available.</p>
          ) : (
            <div className="workouts">
              {workouts.map((workout) => (
                <div className="card workout-card" key={workout._id}>
                  <div className="workout-name">
                    <h3>{workout.name}</h3>
                    <span>
                      {new Date(workout.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="workout-details">
                    <div>
                      <small>Sets</small>
                      <strong>{workout.sets}</strong>
                    </div>

                    <div>
                      <small>Reps</small>
                      <strong>{workout.reps}</strong>
                    </div>

                    <div>
                      <small>Duration</small>
                      <strong>{workout.duration} min</strong>
                    </div>

                    <div>
                      <small>Calories</small>
                      <strong>{workout.calories} kcal</strong>
                    </div>
                  </div>

                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(workout._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>© FitForge - Fitness Progress Tracker</p>
      </footer>
    </>
  );
}

export default Workout;
