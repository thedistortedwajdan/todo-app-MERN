import React, { useState } from "react";
import { updatePassword } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  // const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        alert("New Passwords do not match");
      } else {
        const data = {
          currentPassword,
          newPassword,
        };
        const res = await updatePassword(data);
        if (res.data.success) {
          alert("Password Updated Successfully");
          navigate("/user/profile");
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
        <h1 className="text-3xl my-3 font-bold text-white">Update Password</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Old Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="New Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
