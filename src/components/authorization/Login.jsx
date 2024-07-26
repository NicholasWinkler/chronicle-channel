import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByUsername } from "../../services/userService";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByUsername(username).then((foundUsers) => {
      const user = foundUsers.find(user => user.password === password);
      
      if (user) {
        localStorage.setItem(
          "chronicle_user",
          JSON.stringify({
            id: user.id,
            isStaff: user.isStaff,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>The Chronicle Channel</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
