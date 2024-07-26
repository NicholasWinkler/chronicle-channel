// Function to get a user by username
export const getUserByUsername = (username) => {
    return fetch(`http://localhost:3000/users?username=${username}`)
      .then((res) => res.json())
  }
  
  // Function to create a new user
  export const createUser = (user) => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  }
  