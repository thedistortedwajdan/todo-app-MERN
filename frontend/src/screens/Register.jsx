import React, { useContext, useState } from "react";
import { register } from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // we will use this hook to navigate to login page after the user is registered // a hook is a function that lets you hook into react features

  const { user, setUser } = useContext(UserContext); // we want to update the user context after the user is registered so that the user can be redirected to the home page

  const onSubmit = async (e) => {
    try {
      e.preventDefault(); // prevents the default action of the form // the form will not be submitted to the backend // why are we doing this when we eventually will submit the form to the backend? because we want to do some validation before submitting the form to the backend

      if (password !== confirmPassword) {
        alert("Passwords do not match. Try again.");
      } else {
        const data = {
          name,
          email,
          age,
          password,
        };
        const res = await register(data);

        if (res.data.success) {
          alert("User registered successfully");
          setUser(res.data.user); // update the user context
          navigate("/"); // navigate to the home page
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
        <h1 className="text-3xl my-3 font-bold text-white">Register</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Name"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter E-mail"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Enter Age"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
