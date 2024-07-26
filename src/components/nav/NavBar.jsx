import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = ({ isAuthenticated }) => {
  return (
    <nav>
      <ul className="navbar">
        <li className="navbar-item">
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="navbar-item">
              <Link className="navbar-link" to="/timelines">
                All Timelines
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/add-timeline">
                Add Timeline
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/add-event">
                Add Event
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/logout">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link className="navbar-link" to="/login">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
