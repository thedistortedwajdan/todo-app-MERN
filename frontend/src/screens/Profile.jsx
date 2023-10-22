import React, { useContext } from "react";
import { deleteUser, logout } from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await logout();
      if (res.data.success) {
        alert("User logged out successfully");
        setUser({});
        navigate("/user/login");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDeleteAccount = async (e) => {
    try {
      e.preventDefault();
      if (window.confirm("Are you sure you want to delete your account?")) {
        const res = await deleteUser();
        if (res.data.success) {
          alert("Account deleted successfully");
          setUser({});
          navigate("/user/register");
        } else {
          alert(res.data.error);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="w-1/4 m-auto text-center">
        <h1 className="text-3xl my-3 font-bold text-white">User Profile</h1>
        <div className="mt-3">
          <h2 className="text-20xl text-white">Name: {user.name}</h2>
          <h2 className="text-20xl text-white">E-mail: {user.email}</h2>
          <h2 className="text-20xl text-white">Age: {user.age}</h2>
        </div>
        <div className="mt-3">
          <Link to="/user/updateProfile">
            <button className="my-2 bg-green-400 text-white hover:text-black w-full py-2 rounded">
              Update Profile
            </button>
          </Link>

          <Link to="/user/updatePassword">
            <button className="my-2 bg-green-400 text-white hover:text-black w-full py-2 rounded">
              Update Password
            </button>
          </Link>
          <button
            className="my-2 bg-blue-300 text-white hover:text-black w-full py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="my-2 bg-red-500 text-white hover:text-black w-full py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
