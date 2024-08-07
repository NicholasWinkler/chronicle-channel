import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTimeline } from '../../services/timelineService';
import { getAllCategories } from '../../services/categoriesService';

export const AddTimeline = () => {
  const [timeline, setTimeline] = useState({
    title: '',
    description: '',
    categoryId: '', // Added to match the updated structure
    userId: JSON.parse(localStorage.getItem("chronicle_user")).id
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories for the dropdown
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (event) => {
    setTimeline({ ...timeline, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTimeline = {
      ...timeline,
      createdDate: new Date().toISOString().split('T')[0] // Set createdDate to the current date in YYYY-MM-DD format
    };
    createTimeline(newTimeline).then(() => navigate('/timelines'));
  };

  return (
    <div>
      <h1>Add Timeline</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            name="title" 
            value={timeline.title} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Description:
          <input 
            name="description" 
            value={timeline.description} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Category:
          <select name="categoryId" value={timeline.categoryId} onChange={handleChange}>
            <option value="">Select Category</option>
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
