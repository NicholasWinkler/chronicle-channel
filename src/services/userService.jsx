export const getAllUsers = () => {
  return fetch("http://localhost:3000/users")
    .then((res) => res.json())
}

export const updateUser = (id, updatedUserData) => {
  return fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUserData)
  }).then((res) => res.json());
};

export const getUserByUsername = (username) => {
    return fetch(`http://localhost:3000/users?username=${username}`)
      .then((res) => res.json())
  }

  export const getUserById = (id) => {
    return fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
  }
  
  export const createUser = (user) => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  }
  