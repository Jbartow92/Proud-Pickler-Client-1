import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { PostList } from "../pages/PostList";
import { CourtList } from "../pages/CourtList";
import { Profile } from "../pages/Profile";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<Home setToken={setToken} />} />
          <Route path="/posts" element={<PostList token={token} setToken={setToken} />}/>
          <Route path="/courts" element={<CourtList token={token} setToken={setToken} />}/>
          <Route path="/profile" element={<Profile token={token} setToken={setToken} />}/>
         
        </Route>
      </Routes>
    </>
  );
};
