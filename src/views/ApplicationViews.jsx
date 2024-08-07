import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserHome } from "../components/homepage/UserHome";
import { AllTimelines } from "../components/timelines/AllTimelines";
import { AddTimeline } from "../components/timelines/AddTimeline";
import { AddEvent } from "../components/events/AddEvent";
import { Profile } from "../components/profiles/Profile";
import { EditProfile } from "../components/profiles/EditProfile";
import { EditTimeline } from "../components/timelines/EditTimeline"; // Import the EditTimeline component
import { TimelineEvents } from "../components/timelines/TimelineEvents";
import { EditEvent } from "../components/events/EditEvent";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const localChronicleUser = localStorage.getItem("chronicle_user");
    const foundUser = localChronicleUser
      ? JSON.parse(localChronicleUser)
      : null;
    setCurrentUser(foundUser);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="timelines/*" element={<AllTimelines />} />
        <Route path="add-timeline/*" element={<AddTimeline />} />
        <Route path="add-event/*" element={<AddEvent />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="editprofile" element={<EditProfile />} />
        <Route path="edit-timeline/:id" element={<EditTimeline />} />
        <Route path="/timelines/:timelineId" element={<TimelineEvents />} />
        <Route path="edit-event/:id" element={<EditEvent />} />
      </Routes>
    </>
  );
};
