import { Link } from "react-router-dom";
import "./homepage.css";

export const UserHome = () => {
  return (
    <div className="homepage-container">
      <h1>
        <p>
          Create engaging timelines and highlight the evolution of projects,
          stories, milestones, events, products and more — no design experience
          required!
        </p>
      </h1>
      <h3>Select a button below to begin your journey.</h3>
      <div>
        <Link to="/timelines">
          <button className="btn-primary">MY TIMELINES</button>
        </Link>
        <Link to="/add-timeline">
          <button className="btn-primary">CREATE A TIMELINE</button>
        </Link>
      </div>
    </div>
  );
};
