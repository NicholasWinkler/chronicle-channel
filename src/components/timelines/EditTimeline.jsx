import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTimelineById, updateTimeline } from '../../services/timelineService';
import { getAllCategories } from '../../services/categoriesService';

export const EditTimeline = () => {
  const { id } = useParams();
  const [timeline, setTimeline] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTimelineById(id).then(setTimeline);
    getAllCategories().then(setCategories);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTimeline(prevTimeline => ({
      ...prevTimeline,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTimeline = {
      ...timeline,
      categoryId: parseInt(timeline.categoryId) // Ensure categoryId is a number
    };
    updateTimeline(id, updatedTimeline).then(() => navigate('/timelines'));
  };

  if (!timeline) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Timeline</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={timeline.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={timeline.description} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="categoryId" value={timeline.categoryId} onChange={handleChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
