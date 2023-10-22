import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById } from "../api/todo";

export default function ViewTodo() {
  const [todo, setTodo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodoById(id);
      if (res.data.success) {
        setTodo(res.data.todo);
      } else {
        alert(res.data.error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="text-center bg-white w-3/4 m-auto rounded py-3 mt-3">
        <h1 className="text-3xl mt-4 font-bold">Title: {todo.title}</h1>
        <h2 className="mt-3 text-2xl">
          Completed: {todo.completed ? "completed" : "not completed"}
        </h2>
        <p className="mt-3">Description: {todo.description}</p>
        <p className="mt-3">CreatedAt: {todo.createdAt}</p>
        <p className="mt-3">UpdatedAt: {todo.updatedAt}</p>
      </div>
    </>
  );
}
