import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTimelineById, updateTimeline } from "../../services/timelineService";
import { getCategories } from "../../services/categoriesService";
import "./Timelines.css";

export const EditTimeline = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleUpdate = location.state?.handleUpdate;

  useEffect(() => {
    getTimelineById(id)
      .then((timeline) => {
        setTitle(timeline.title);
        setDescription(timeline.description);
        setCategory(timeline.categoryId);
        setCreatedDate(timeline.createdDate);
      })
      .catch((error) => {
        console.error("Error fetching timeline:", error);
      });

    getCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTimeline = {
      title,
      description,
      categoryId: parseInt(category, 10),
      createdDate,
      id,
      userId: 3, // Replace with dynamic userId if needed
    };

    updateTimeline(id, updatedTimeline)
      .then((response) => {
        console.log("Timeline updated successfully!");
        handleUpdate(response); // Update state in AllTimelines
        navigate(`/timelines`);
      })
      .catch((error) => {
        console.error("Error updating timeline:", error);
      });
  };

  return (
    <div className="edit-timeline-container">
      <h2>Edit Timeline</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button className="submit-button" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
