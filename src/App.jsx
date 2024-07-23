import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav/NavBar';          // Updated path
import NonUserHome from './components/home/NonUserHome'; // Updated path
import UserHome from './components/home/UserHome';     // Updated path
import Login from './components/authorization/Login'; // Updated path
import Register from './components/authorization/Register'; // Updated path
import AllTimelines from './components/timelines/AllTimelines'; // Updated path
import Timeline from './components/timelines/Timeline'; // Updated path
import AddTimeline from './components/timelines/AddTimeline'; // Updated path
import AddEvent from './components/events/AddEvent';    // Updated path
import EditEvent from './components/events/EditEvent';  // Updated path
import Event from './components/events/Event';          // Updated path
import Profile from './components/profiles/Profile';    // Updated path

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <UserHome /> : <NonUserHome />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timelines" element={<AllTimelines />} />
        <Route path="/timelines/:id" element={<Timeline />} />
        <Route path="/add-timeline" element={<AddTimeline />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};
