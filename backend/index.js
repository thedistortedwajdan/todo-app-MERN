import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";

import todosRoutes from "./routes/todos.js";
import usersRoutes from "./routes/users.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json()); // what does this do? it parses the json data and makes it available in req.body

app.use(express.urlencoded({ extended: true })); // what does this do? it parses the urlencoded data and makes it available in req.body

app.use(cookieParser()); // what does this do? it parses the cookie data and makes it available in req.cookies

app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
