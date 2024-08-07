import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTimeline, getAllTimelines } from '../../services/timelineService';

export const AllTimelines = () => {
  const [timelines, setTimelines] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('chronicle_user')).id; // Get logged-in user ID

  useEffect(() => {
    getAllTimelines(userId).then(setTimelines);
  }, [userId]);

  const handleDeleteTimeline = (id) => {
    deleteTimeline(id).then(() => {
      setTimelines(timelines.filter(timeline => timeline.id !== id));
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredTimelines = timelines.filter(timeline =>
    timeline.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || timeline.category.name === category)
  );

  return (
    <div>
      <h1>All Timelines</h1>
      <button onClick={() => navigate('/add-timeline')}>Add New Timeline</button>
      <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <ul>
        {filteredTimelines.map(timeline => (
          <li key={timeline.id}>
            <h2>{timeline.title}</h2>
            <p>{timeline.description}</p>
            <p>Category: {timeline.category.name}</p>
            <button onClick={() => navigate(`/edit-timeline/${timeline.id}`)}>Edit</button>
            <button onClick={() => handleDeleteTimeline(timeline.id)}>Delete</button>
            <button onClick={() => navigate(`/timelines/${timeline.id}`)}>View Events</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
