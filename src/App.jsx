import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { NonUserHome } from "./components/homepage/NonUserHome";
import { NavBar } from "./components/nav/NavBar";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />{" "}
          </>
        }
      >
        <Route path="/" element={<NonUserHome />} />
      </Route>
    </Routes>
  );
};

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavBar from './components/nav/NavBar';
// import NonUserHome from './components/home/NonUserHome';
// import UserHome from './components/home/UserHome';
// import Login from './components/authorization/Login';
// import Register from './components/authorization/Register';
// import AllTimelines from './components/timelines/AllTimelines';
// import Timeline from './components/timelines/Timeline';
// import AddTimeline from './components/timelines/AddTimeline';
// import AddEvent from './components/events/AddEvent';
// import EditEvent from './components/events/EditEvent';
// import Event from './components/events/Event';
// import Profile from './components/profiles/Profile';

// export const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <NavBar isAuthenticated={isAuthenticated} />
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <UserHome /> : <NonUserHome />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/timelines" element={<AllTimelines />} />
//         <Route path="/timelines/:id" element={<Timeline />} />
//         <Route path="/add-timeline" element={<AddTimeline />} />
//         <Route path="/add-event" element={<AddEvent />} />
//         <Route path="/events/:id" element={<Event />} />
//         <Route path="/edit-event/:id" element={<EditEvent />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// };
