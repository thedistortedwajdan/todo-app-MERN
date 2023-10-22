import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { updateDetails } from "../api/user";

export default function UpdateProfile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        name,
        email,
        age,
      };
      const res = await updateDetails(data);

      if (res.data.success) {
        alert("User Details Updated successfully");
        setUser(res.data.user);
        navigate("/user/profile");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="w-1/4 m-auto text-center">
        <h1 className="text-3xl my-3 font-bold text-white">Update Profile</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder={user.name}
              className="focus:outline-none border-none p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder={user.email}
              className="focus:outline-none border-none p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder={user.age}
              className="focus:outline-none border-none p-2 rounded w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}
