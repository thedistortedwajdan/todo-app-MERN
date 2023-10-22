import axios from "axios";

export const getAllTodos = async () => {
  try {
    const res = await axios.get("/todos/");
    return res;
  } catch (error) {
    return error;
  }
};

export const createTodo = async (data) => {
  try {
    const res = await axios.post("/todos/create", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getTodoById = async (id) => {
  try {
    const res = await axios.get(`/todos/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const res = await axios.put(`/todos/update/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`/todos/delete/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
