import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
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
      <Routes>
        <Route path="/" element={<UserHome />} />
        {/* Add more routes here */}
      </Routes>
    </>
  );
};
