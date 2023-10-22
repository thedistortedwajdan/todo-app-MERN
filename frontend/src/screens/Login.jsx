import React, { useContext, useState } from "react";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await login(data);
      if (res.data.success) {
        alert("User logged in successfully");
        setUser(res.data.user);
        navigate("/");
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
        <h1 className="text-3xl my-3 font-bold text-white">Login</h1>
        <form onSubmit={onSubmit}>
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
              type="password"
              placeholder="Enter Password"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
