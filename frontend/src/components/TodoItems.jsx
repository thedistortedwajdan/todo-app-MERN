import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteTodo } from "../api/todo";

export default function TodoItems({ item }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this todo?")) {
        const res = await deleteTodo(item._id);
        if (res.data.success) {
          alert("Todo deleted successfully");
          window.location.reload();
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
      <tr>
        <td className="border px-4 py-2 text-white">{item.title}</td>
        <td className="border px-4 py-2 text-white">{item.description}</td>
        <td className="border px-4 py-2 text-white">
          {item.completed ? "completed" : "not completed"}
        </td>
        <td className="border px-4 py-2">
          <button
            className="bg-blue-500 text-white px-2 rounded"
            onClick={() => navigate(`/todo/view/${item._id}`)}
          >
            View
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            className="bg-green-500 text-white px-2 rounded"
            onClick={() => navigate(`/todo/update/${item._id}`)}
          >
            Update
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            className="bg-red-500 text-white px-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
