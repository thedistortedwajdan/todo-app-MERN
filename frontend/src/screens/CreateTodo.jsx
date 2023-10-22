import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../api/todo";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { title, description };
      const res = await createTodo(data);
      if (res.data.success) {
        alert("Todo created successfully");
        navigate("/");
      } else {
        alert(res.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="w-1/4 m-auto text-center">
        <h1 className="text-3xl my-3 font-bold text-white">Create Todo</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="TITLE"
              className="focus:outline-none border-none p-2 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              name="textarea"
              className="focus:outline-none border-none p-2 rounded w-full"
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
