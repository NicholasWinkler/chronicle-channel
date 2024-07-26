import { Route, Outlet, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/nav/NavBar";
import { UserHome } from "../components/homepage/UserHome";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const localChronicleUser = localStorage.getItem("chronicle_user");
    const foundUser = JSON.parse(localChronicleUser);
    
    setCurrentUser(foundUser);
  }, []);

  return (
    <>
      <NavBar isAuthenticated={currentUser !== null} />
      <Routes>
        <Route path="/" element={<UserHome />} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
};
