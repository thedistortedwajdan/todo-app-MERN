import mongoose from "mongoose";

const Todoschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      //   enum: ["active", "completed"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //   default: Date.now,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", Todoschema);

export default Todo;
