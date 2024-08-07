import { useEffect, useState } from "react";
import { getAllTimelines, deleteTimeline } from "../../services/timelineService";
import { getCategories } from "../../services/categoriesService";
import { Link, useNavigate } from "react-router-dom";
import "./Timelines.css";
import { TimelineFilterDropdown } from "./TimelineFilterBar";
import { TimelineSearch } from "./TimelineSearch";

export const AllTimelines = () => {
  const [allTimelines, setAllTimelines] = useState([]);
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchTimelines = () => {
    const user = JSON.parse(localStorage.getItem("chronicle_user"));
    if (user && user.id) {
      setUserId(user.id);

      getAllTimelines()
        .then((timelineArray) => {
          const userTimelines = timelineArray.filter(
            (timeline) => timeline.userId === user.id
          );
          setAllTimelines(userTimelines);
        })
        .catch((error) => {
          console.error("Error fetching timelines:", error);
        });
    } else {
      window.alert("User ID not found. Please log in again.");
    }
  };

  useEffect(() => {
    fetchTimelines();
  }, []);

  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteTimeline(id)
      .then(() => {
        setAllTimelines(allTimelines.filter((timeline) => timeline.id !== id));
        console.log("Timeline deleted with id:", id);
      })
      .catch((error) => console.error("Error deleting timeline:", error));
  };

  const handleUpdate = (updatedTimeline) => {
    setAllTimelines(allTimelines.map((timeline) =>
      timeline.id === updatedTimeline.id ? updatedTimeline : timeline
    ));
  };

  const filteredTimelines = allTimelines
    .filter((timeline) =>
      timeline.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((timeline) =>
      selectedCategory ? timeline.category.id === parseInt(selectedCategory, 10) : true
    );

  return (
    <div className="timeline-container">
      <h2>All Timelines</h2>
      <div className="filter-bar">
        <TimelineFilterDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(categoryId) => setSelectedCategory(categoryId)}
        />
        <TimelineSearch
          searchQuery={searchQuery}
          onSearchChange={(query) => setSearchQuery(query)}
        />
      </div>
      <Link to="/add-timeline">
        <button className="btn-create-new">Create New Timeline</button>
      </Link>
      <article className="timelines">
        {filteredTimelines.map((timeline) => (
          <section className="timeline" key={timeline.id}>
            <Link to={`/timelines/${timeline.id}`}>
              <header className="timeline-info">Title: {timeline.title}</header>
              <div className="timeline-info">Category: {timeline.category.name}</div>
              <div className="timeline-info">Description: {timeline.description}</div>
            </Link>
            <footer className="timeline-actions">
              <button onClick={() => navigate(`/edit-timeline/${timeline.id}`, { state: { handleUpdate } })}>
                Edit
              </button>
              <button onClick={() => handleDelete(timeline.id)}>Delete</button>
            </footer>
          </section>
        ))}
      </article>
    </div>
  );
};
