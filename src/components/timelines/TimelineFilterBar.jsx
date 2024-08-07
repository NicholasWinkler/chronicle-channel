import React from 'react';
import "./Timelines.css";

export const TimelineFilterDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <select
      value={selectedCategory}
      onChange={(event) => onCategoryChange(event.target.value)}
      className="category-select"
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export const TimelineSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="timeline-search"
    />
  );
};
