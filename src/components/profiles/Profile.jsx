import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/userService";
import "./Profile.css"; // Ensure you include your CSS file

export const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chronicle_user"));
    if (user && user.id) {
      setUserId(user.id);
      getAllUsers().then((data) => {
        const userDetails = data.find((user) => user.id === user.id);
        setUserDetails(userDetails);
      });
    }
  }, []);

  return (
    <div className="profileContainer">
      <div className="header">
        <h1>Hello {userDetails.username || "User"},</h1>
        <p>This is your profile page. You can see your account details here.</p>
      </div>
      <div className="myAccountSection">
        <h3>My Account</h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" value={userDetails.username || ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={userDetails.password || ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" value={userDetails.email || ''} readOnly />
          </div>
          <Link to="/editprofile">
          <button className="btn-primary">Edit Profile</button>
        </Link>
        </form>
      </div>
    </div>
  );
};
