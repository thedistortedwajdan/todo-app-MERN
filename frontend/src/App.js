import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import LoggedInHome from "./screens/LoggedInHome";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { getUser } from "./api/user";
import UnprotectedRoutes from "./components/UnprotectedRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateTodo from "./screens/CreateTodo";
import UpdateProfile from "./screens/UpdateProfile";
import UpdatePassword from "./screens/UpdatePassword";
import ViewTodo from "./screens/ViewTodo";
import UpdateTodo from "./screens/UpdateTodo";

function App() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getUser();
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          if (res.data.error === "You need to login first") {
          } else {
            alert(res.data.error);
          }
        }
      };
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar user={user} />
      <Routes>
        <Route
          exact
          path="/"
          element={user._id ? <LoggedInHome /> : <Home />}
        />
        <Route
          exact
          path="/user/register"
          element={
            <UnprotectedRoutes loggedIn={user._id ? true : false}>
              <Register />
            </UnprotectedRoutes>
          }
        />
        <Route
          exact
          path="/user/login"
          element={
            <UnprotectedRoutes loggedIn={user._id ? true : false}>
              <Login />
            </UnprotectedRoutes>
          }
        />
        <Route
          exact
          path="/user/profile"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/todo/create"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <CreateTodo />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/user/updateProfile"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/user/updatePassword"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdatePassword />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/todo/view/:id"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <ViewTodo />
            </ProtectedRoutes>
          }
        />
        <Route
          exact
          path="/todo/update/:id"
          element={
            <ProtectedRoutes loggedIn={user._id ? true : false}>
              <UpdateTodo />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
