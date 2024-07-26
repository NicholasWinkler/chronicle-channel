import { Link } from "react-router-dom";
import "./homepage.css";

export const NonUserHome = () => {
  return (
    <div className="homepage-container">
      <h1>
        <span>Welcome to</span>
        <span>The Chronicle Channel</span>
      </h1>
      <h3>Map Out Events, One Timeline at a Time</h3>
      <div>
        <Link to="/register">
          <button className="btn-primary">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn-primary">Login</button>
        </Link>
      </div>
    </div>
  );
};
