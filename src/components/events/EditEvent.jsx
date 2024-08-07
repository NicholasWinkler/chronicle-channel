import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/eventService';

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    getEventById(id).then(data => {
      setEvent(data);
      setTitle(data.title);
      setDate(data.date);
      setDescription(data.description);
      setImage(data.image);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      date,
      description,
      image,
      timelineId: event.timelineId, // Preserve timelineId
      userId: event.userId, // Preserve userId
    };
    updateEvent(id, updatedEvent).then(() => {
      navigate(`/timelines/${event.timelineId}`);
    });
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
