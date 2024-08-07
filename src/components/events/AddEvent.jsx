import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createEvent } from "../../services/eventService";
import { getAllTimelines } from "../../services/timelineService";
import "./Event.css";

export const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState(null);
  const [timelines, setTimelines] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Retrieve user data from localStorage and fetch timelines
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chronicle_user"));
    if (user && user.id) {
      setUserId(user.id);
      // Fetch timelines for the user
      getAllTimelines(user.id).then(data => {
        const userTimelines = data.filter(timeline => timeline.userId === user.id);
        setTimelines(userTimelines);
      });
    } else {
      console.error("User ID not found. Please log in again.");
      window.alert("User ID not found. Please log in again.");
    }
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const handleTimelineChange = (e) => {
    setSelectedTimeline(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      date,
      description,
      image: image || null, // Set image to null if it's an empty string
      timelineId: parseInt(selectedTimeline, 10),
      userId,
    };
    createEvent(newEvent)
      .then((response) => {
        console.log("Event created:", response);
        // Reset the form fields
        setTitle("");
        setDate("");
        setDescription("");
        setImage("");
        setSelectedTimeline("");
        // Redirect to the timeline page
        navigate(`/timelines/${selectedTimeline}`);
      })
      .catch((error) => {
        console.error("Error creating new event:", error);
      });
  };

  return (
    <div className="event-container">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
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
              onChange={handleTitleChange}
              required
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
              onChange={handleDateChange}
              required
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
              onChange={handleDescriptionChange}
              required
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
              onChange={handleImageChange}
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
              name="timelineId"
              value={selectedTimeline}
              onChange={handleTimelineChange}
              required
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
