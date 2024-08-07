import { Route, Routes } from "react-router-dom";
import { Login } from "./components/authorization/Login";
import { Register } from "./components/authorization/Register";
import { Authorized } from "./views/Authorized";
import { NonUserHome } from "./components/homepage/NonUserHome";
import { UserHome } from "./components/homepage/UserHome";
import { NavBar } from "./components/nav/NavBar";
import { useEffect, useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const localChronicleUser = localStorage.getItem("chronicle_user");
    const foundUser = localChronicleUser ? JSON.parse(localChronicleUser) : null;
    setCurrentUser(foundUser);
  }, []);

  return (
    <div>
      <NavBar isAuthenticated={currentUser !== null} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={currentUser ? <UserHome /> : <NonUserHome />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationViews />
            </Authorized>
          }
        />
      </Routes>
    </div>
  );
};
