import { useEffect, useState } from "react";
import { createTimeline } from "../../services/timelineService";
import "./Timelines.css";

export const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chronicle_user"));
    if (user && user.id) {
      setUserId(user.id);
    } else {
      console.error("User ID not found.");
    }
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTimeline = {
      userId: userId,
      title,
      description,
      categoryId: parseInt(category, 10),
      createdDate: new Date().toISOString().split("T")[0],
    };
    createTimeline(newTimeline)
      .then((response) => {
        console.log("Timeline created:", response);
        setTitle("");
        setDescription("");
        setCategory("");
      })
      .catch((error) => {
        console.error("Error creating timeline:", error);
      });
  };

  return (
    <div className="timeline-form">
      <h1>Create Timeline</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            <option value="1">Business</option>
            <option value="2">Education</option>
            <option value="3">Personal</option>
            <option value="4">Other</option>
          </select>
        </div>
        <div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
