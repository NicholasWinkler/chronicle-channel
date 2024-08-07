import { useEffect, useState } from "react";
import { createEvent } from "../../services/eventService";
import { getAllTimelines } from "../../services/timelineService";
import "./Event.css"

export const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(null);
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState("");

  // Retrieve user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chronicle_user"));
    if (user && user.id) {
      setUserId(user.id);
      // Fetch timelines for the user
      getAllTimelines().then(data => {
        const userTimelines = data.filter(timeline => timeline.userId === user.id);
        setTimelines(userTimelines);
      });
    } else {
      console.error("User ID not found. Please log in again.");
      window.alert("User ID not found. Please log in again.");
    }
  }, []);

  const eventTitle = (e) => setTitle(e.target.value);
  const eventDate = (e) => setDate(e.target.value);
  const eventDescription = (e) => setDescription(e.target.value);
  const eventImage = (e) => setImage(e.target.value);

  const handleTimelineChange = (e) => {
    setSelectedTimeline(e.target.value);
  };

  const eventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      date,
      description,
      image,
      timelineId: parseInt(selectedTimeline, 10),
      userId,
    };
    createEvent(newEvent)
      .then((response) => {
        console.log("Event created;", response);
        setTitle("");
        setDate("");
        setDescription("");
        setImage("");
        setSelectedTimeline("");
      })
      .catch((error) => {
        console.error("Error creating new event:", error);
      });
  };

  return (
    <div className="event-container">
      <h2>Add Event</h2>
      <form onSubmit={eventSubmit}>
        <div className="event-row">
          <div className="event-col-16">
            <label className="event-label" htmlFor="title">Title</label>
          </div>
          <div className="event-col-75">
            <input
              className="event-input"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={eventTitle}
            />
          </div>
        </div>

        <div className="event-row">
          <div className="event-col-16">
            <label className="event-label" htmlFor="date">Date</label>
          </div>
          <div className="event-col-75">
            <input
              className="event-input"
              type="text"
              id="date"
              name="date"
              value={date}
              onChange={eventDate}
            />
          </div>
        </div>

        <div className="event-row">
          <div className="event-col-16">
            <label className="event-label" htmlFor="description">Description</label>
          </div>
          <div className="event-col-75">
            <textarea
              className="event-textarea"
              id="description"
              name="description"
              value={description}
              onChange={eventDescription}
            />
          </div>
        </div>

        <div className="event-row">
          <div className="event-col-16">
            <label className="event-label" htmlFor="image">Image URL</label>
          </div>
          <div className="event-col-75">
            <input
              className="event-input"
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={eventImage}
            />
          </div>
        </div>

        <div className="event-row">
          <div className="event-col-16">
            <label className="event-label" htmlFor="timeline">Timeline</label>
          </div>
          <div className="event-col-75">
            <select
              className="event-select"
              id="timeline"
              name="timeline"
              value={selectedTimeline}
              onChange={handleTimelineChange}
            >
              <option value="">Select a timeline</option>
              {timelines.map((timeline) => (
                <option key={timeline.id} value={timeline.id}>
                  {timeline.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="event-row">
          <input
            className="event-submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};