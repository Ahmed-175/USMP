import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import fetchUserInfo from "./features/user/fetchUserInfo";

// Components
import Sidebar from "./components/sidebar/Sidebar";
import RightsideHome from "./components/RightSideHome/RightsideHome";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Profile from "./pages/Profile";

const App = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/sign-up";
  useEffect(() => {
    if (data && isAuthPage) {
      navigate("/");
    }
    if (!data && !isAuthPage) {
      navigate("/login");
    }
  }, [data, isAuthPage, navigate]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      {!isAuthPage && <Sidebar />}

      <div className="max-w-screen min-h-screen flex justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!isAuthPage && <RightsideHome />}
    </>
  );
};

export default App;
