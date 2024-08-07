import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTimeline, getAllTimelines } from '../../services/timelineService';
import './AllTimelines.css'; // Import your updated CSS

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

  const handleTimelineClick = (id) => {
    navigate(`/timelines/${id}`);
  };

  const filteredTimelines = timelines.filter(timeline =>
    timeline.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || timeline.category.name === category)
  );

  return (
    <div className="timelines">
      <div className="filter-bar">
        <input
          className="timeline-search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <select
          className="category-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
        <button
          className="filter-btn"
          onClick={() => navigate('/add-timeline')}
        >
          Add New Timeline
        </button>
      </div>
      <ul>
        {filteredTimelines.map(timeline => (
          <li key={timeline.id} className="timeline-item" onClick={() => handleTimelineClick(timeline.id)}>
            <div className="timeline-content">
              <h2>{timeline.title}</h2>
              <p>{timeline.description}</p>
              <p>Category: {timeline.category.name}</p>
            </div>
            <div className="timeline-actions">
              <button
                className="btn-primary"
                onClick={(e) => { e.stopPropagation(); navigate(`/edit-timeline/${timeline.id}`); }}
              >
                Edit
              </button>
              <button
                className="btn-primary"
                onClick={(e) => { e.stopPropagation(); handleDeleteTimeline(timeline.id); }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
