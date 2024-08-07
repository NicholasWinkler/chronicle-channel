import "./NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const NavBar = ({ isAuthenticated, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Log the value of isAuthenticated
  console.log('isAuthenticated:', isAuthenticated);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link className={`navbar-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link className={`navbar-link ${isActive('/timelines') ? 'active' : ''}`} to="/timelines">All Timelines</Link>
          <Link className={`navbar-link ${isActive('/add-timeline') ? 'active' : ''}`} to="/add-timeline">Add Timeline</Link>
          <Link className={`navbar-link ${isActive('/add-event') ? 'active' : ''}`} to="/add-event">Add Event</Link>
          <Link className={`navbar-link ${isActive('/profile') ? 'active' : ''}`} to="/profile">Profile</Link>
          <a
            href="#"
            className="navbar-link"
            onClick={() => {
              localStorage.removeItem("chronicle_user");
              setCurrentUser(null); // Update the current user state
              navigate("/", { replace: true });
            }}
          >
            Logout
          </a>
        </>
      ) : (
        <>
          <Link className={`navbar-link ${isActive('/login') ? 'active' : ''}`} to="/login">Login</Link>
          <Link className={`navbar-link ${isActive('/register') ? 'active' : ''}`} to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};
