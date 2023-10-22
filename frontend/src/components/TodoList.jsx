import React, { useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItems from "./TodoItems";
import { getAllTodos } from "../api/todo";
export default function TodoList() {
  const { todo, setTodo } = useContext(TodoContext);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getAllTodos();
        if (res.data.success) {
          setTodo(res.data.todos);
        } else {
          alert(res.data.error);
        }
      };

      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }, []);
  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2"> Description</th>
          <th className="border px-4 py-2">Completed</th>
          <th className="border px-4 py-2">View</th>
          <th className="border px-4 py-2">Update</th>
          <th className="border px-4 py-2">Delete</th>
        </thead>
        <tbody>
          {todo.length > 0 &&
            todo.map((item) => {
              return <TodoItems key={item.id} item={item} />;
            })}
        </tbody>
      </table>
    </>
  );
}
