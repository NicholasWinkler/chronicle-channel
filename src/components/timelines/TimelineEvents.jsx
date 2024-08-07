import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTimelineById } from '../../services/timelineService';
import { allEvents, deleteEvent } from '../../services/eventService';

export const TimelineEvents = () => {
  const { timelineId } = useParams();
  const [events, setEvents] = useState([]);
  const [timelineTitle, setTimelineTitle] = useState('');

  useEffect(() => {
    // Fetch the timeline details
    getTimelineById(timelineId).then(timeline => {
      setTimelineTitle(timeline.title);
    });

    // Fetch the events associated with this timeline
    fetchEvents();
  }, [timelineId]);

  const fetchEvents = () => {
    allEvents().then(data => {
      const filteredEvents = data.filter(event => event.timelineId === parseInt(timelineId));
      setEvents(filteredEvents);
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id).then(() => {
      setEvents(events.filter(event => event.id !== id));
    });
  };

  return (
    <div>
      <h1>{timelineTitle}</h1>
      <p>Number of events: {events.length}</p>
      <Link to={`/timelines`}><button>Back to All Timelines</button></Link>
      <Link to={`/add-event`}><button>New Event</button></Link>
      {events.map(event => (
        <div key={event.id} className="event-card">
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.description}</p>
          <img src={event.image} alt={event.title} />
          <Link to={`/edit-event/${event.id}`}><button>Edit</button></Link>
          <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
