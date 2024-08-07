import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTimelineById } from "../../services/timelineService";
import { allEvents, deleteEvent } from "../../services/eventService";
import "./TimelineEvents.css";

export const TimelineEvents = () => {
  const { timelineId } = useParams();
  const [events, setEvents] = useState([]);
  const [timelineTitle, setTimelineTitle] = useState("");
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    // Fetch the timeline details
    getTimelineById(timelineId)
      .then((timeline) => {
        setTimelineTitle(timeline.title);
      })
      .catch((error) => {
        console.error("Error fetching timeline:", error);
      });

    // Fetch the events associated with this timeline
    fetchEvents();
  }, [timelineId]);

  const fetchEvents = () => {
    allEvents()
      .then((data) => {
        const filteredEvents = data.filter(
          (event) => event.timelineId === parseInt(timelineId)
        );
        setEvents(filteredEvents);
        setEventCount(filteredEvents.length);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id)
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
        setEventCount(eventCount - 1);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };
  return (
    <div className="timeline-container">
      <div className="header">
        <h1>{timelineTitle}</h1>
        <p>Number of events: {eventCount}</p>
        <div className="button-group-top">
          <Link to={`/add-event`}>
            <button>New Event</button>
          </Link>
          <Link to={`/timelines`}>
            <button>Back to All Timelines</button>
          </Link>
        </div>
      </div>
      <hr className="divider" />
      <div className="timeline">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`container ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <h2>{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.description}</p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
              )}
              <div className="button-group">
                <Link to={`/edit-event/${event.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
