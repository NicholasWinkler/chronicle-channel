import { useState, useEffect } from "react";

export const TimelineSearch = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof onFilter === 'function') {
      onFilter(searchTerm);
    }
  }, [searchTerm, onFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};
