import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <i className="fa-solid fa-dumbbell"></i>
          FitForge
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/progress">Progress</Link>
        </nav>

        <div className="auth-nav">
          {user && <span>Hi, {user.name}</span>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;