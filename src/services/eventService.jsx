export const allEvents = () => {
    return fetch("http://localhost:3000/events")
      .then((res) => res.json());
}

export const getEventById = (id) => {
    return fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    }).then((res) => res.json())
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };