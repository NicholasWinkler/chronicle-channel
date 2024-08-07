import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTimelineById, deleteTimeline } from "../../services/timelineService";
import "./Timelines.css";
import { allEvents } from "../../services/eventService";

export const TimelineEvents = () => {
  const { id } = useParams(); // Get the timeline ID from the URL
  const [timeline, setTimeline] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the timeline details
    getTimelineById(id)
      .then((data) => setTimeline(data))
      .catch((error) => console.error("Error fetching timeline:", error));

    // Fetch events for the timeline
    allEvents()
      .then((eventsArray) => setEvents(eventsArray.filter((event) => event.timelineId === parseInt(id, 10))))
      .catch((error) => console.error("Error fetching events:", error));
  }, [id]);

  const handleDeleteEvent = (eventId) => {
    deleteTimeline(eventId)
      .then(() => {
        setEvents(events.filter((event) => event.id !== eventId));
        console.log("Event deleted with id:", eventId);
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div className="timeline-events">
      <h3>Events for Timeline: {timeline?.title}</h3>
      <button onClick={() => navigate(`/add-event/${id}`)}>Add New Event</button>
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <h4>{event.title}</h4>
          <p>{event.date}</p>
          <p>{event.description}</p>
          <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>
          <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
