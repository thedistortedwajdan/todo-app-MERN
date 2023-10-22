import express from "express";
import authorize from "../middleware/auth.js";
import { validateResults } from "../middleware/validationResults.js";
import {
  validateCreateTodo,
  validateUpdateTodo,
} from "../middleware/validate.js";
import {
  getTodoById,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todosController.js";
const router = express.Router();
router.get("/:id", authorize, getTodoById);
router.get("/", authorize, getAllTodos);
router.post(
  "/create",
  authorize,
  validateCreateTodo,
  validateResults,
  createTodo
);
router.put(
  "/update/:id",
  authorize,
  validateUpdateTodo,
  validateResults,
  updateTodo
);
router.delete("/delete/:id", authorize, deleteTodo);

export default router;
