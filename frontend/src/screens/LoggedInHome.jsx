import React from "react";
import TodoList from "../components/TodoList";

export default function LoggedInHome() {
  return (
    <>
      <div className="w-5/6 m-auto text-center">
        <h1 className="text-3xl my-3 font-bold text-white">My Todos</h1>
        <TodoList />
      </div>
    </>
  );
}
