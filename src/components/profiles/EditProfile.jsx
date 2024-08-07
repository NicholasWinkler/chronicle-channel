import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAllUsers, updateUser } from "../../services/userService";
import "./Profile.css"; // Ensure you include your CSS file

export const EditProfile = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chronicle_user"));
    console.log("Stored User:", storedUser); // Debugging

    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      getAllUsers().then((data) => {
        console.log("Fetched Users Data:", data); // Debugging
        const userDetails = data.find((user) => user.id === storedUser.id);
        console.log("User Details:", userDetails); // Debugging
        if (userDetails) {
          setUsername(userDetails.username || "");
          setPassword(userDetails.password || "");
          setEmail(userDetails.email || "");
        }
      }).catch((error) => {
        console.error("Error fetching users:", error);
      });
    } else {
      console.error("User ID not found.");
    }
  }, []);

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);

  const updateProfileSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: userId,
      username,
      password,
      email
    };
    updateUser(userId, updatedUser).then((response) => {
      console.log("Profile updated:", response);
      // Navigate back to profile page after successful update
      navigate("/profile");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
  };

  return (
    <div className="profileContainer">
      <h2>Edit Profile</h2>
      <form onSubmit={updateProfileSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={changeUsername}
            placeholder="Enter new username"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changePassword}
            placeholder="Enter new password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={changeEmail}
            placeholder="Enter new email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Submit"
            className="btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
