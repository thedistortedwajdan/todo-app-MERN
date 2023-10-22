import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useParams, useNavigate } from "react-router-dom";
import { updateTodo } from "../api/todo";

export default function UpdateTodo() {
  const { todo, setTodo } = useContext(TodoContext);
  const { id } = useParams();
  const myTodo = todo.find((todo) => todo._id === id); // find the todo with the id // why are we doing this? // we need to prefill the form with the todo data
  const [title, setTitle] = useState(myTodo.title);
  const [description, setDescription] = useState(myTodo.description);
  const [completed, setCompleted] = useState(myTodo.completed);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { title, description, completed };
      const res = await updateTodo(id, data);
      if (res.data.success) {
        alert("Todo updated successfully");
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
        <h1 className="text-3xl my-3 font-bold text-white">Update Todo</h1>
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
            <div className="mb-3">
              <select
                className="focus:outline-none border-none p-2 rounded w-full"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
              >
                <option value="false">Not Completed</option>
                <option value="true">Completed</option>
              </select>
            </div>
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
