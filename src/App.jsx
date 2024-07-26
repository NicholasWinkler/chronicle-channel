import { Route, Routes } from "react-router-dom";
import { Login } from "./components/authorization/Login";
import { Register } from "./components/authorization/Register";
import { Authorized } from "./views/Authorized";
import { NonUserHome } from "./components/homepage/NonUserHome";
import { NavBar } from "./components/nav/NavBar";
import { UserHome } from "./components/homepage/UserHome";

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<NonUserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
              <UserHome />
            </Authorized>
          }
        />
      </Routes>
    </div>
  );
};
