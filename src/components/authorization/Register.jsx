import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByUsername } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "chronicle_user",
          JSON.stringify({
            id: createdUser.id
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByUsername(user.username).then((response) => {
      if (response.length > 0) {
        // Duplicate username. No good.
        window.alert("Account with that username already exists")
      } else {
        // Good username, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Chronicle Channel</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="username"
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
              onChange={updateUser}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
