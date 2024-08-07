import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/userService";

//get user data from database
//display user data
//create edit profile button
//link to edit profile page

export const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

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
      <div className="profileCard">
        <h1>User Profile</h1>
        <section>
        <div>Username: {userDetails.username}</div>
        <div>Password: {userDetails.password}</div>
        <div>Email: {userDetails.email}</div>
        </section>
        <br />
        <Link to="/editprofile">
          <button className="btn-primary">Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};
