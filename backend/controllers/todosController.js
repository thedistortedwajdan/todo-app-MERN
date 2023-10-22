import Todo from "../models/Todo.js";

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params; // it gets the id of the todo from the url // what is req.params? it is an object that contains the parameters that we pass in the url

    const todo = await Todo.findById(id); // it finds the todo by id

    if (!todo) {
      res.json({ success: false, error: "Todo does not exist" });
    } else {
      if (todo.user.toString() !== req.user.toString()) {
        res.json({ success: false, error: "Not authorized" });
      } else {
        res.json({ success: true, todo });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }); // what does this do? it finds all the todos that belong to the user
    if (!todos) {
      res.json({ success: false, error: "Todo does not exist" });
    } else {
      res.json({ success: true, todos });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      user: req.user,
    });
    res.json({ success: true, todo });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.json({ success: false, error: "Todo does not exist" });
    } else {
      if (todo.user.toString() !== req.user.toString()) {
        res.json({ success: false, error: "Not authorized" });
      } else {
        const { title, description, completed } = req.body;
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        await todo.save();
        res.json({ success: true, todo });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.json({ success: false, error: "Todo does not exist" });
    } else {
      if (todo.user.toString() !== req.user.toString()) {
        res.json({ success: false, error: "Not authorized" });
      } else {
        await todo.deleteOne();
        res.json({ success: true, message: "Todo deleted" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
