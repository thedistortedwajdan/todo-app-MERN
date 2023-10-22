import User from "../models/User.js";
import Todo from "../models/Todo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.json({ success: false, error: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await User.create({ name, email, password: hashedPassword, age });

      const payload = {
        // this is the payload that we will use to create the token
        user: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET); //creating the token

      res.cookie("token", token, { httpOnly: true }); // sending the token in a cookie // why in a cookie? because we want the browser to store the token// why? because we want the user to be logged in after registering// what does { httpOnly: true } do? it makes sure that the cookie is only accessible by the server and not the client

      const { password: pass, ...rest } = user._doc; // remove password from the response because we don't want to send the password to the client

      res.json({ success: true, user: rest });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.json({ success: false, error: "User does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.json({ success: false, error: "Invalid credentials" });
      } else {
        const payload = {
          user: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true });

        const { password: pass, ...rest } = user._doc;

        res.json({ success: true, user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // this clears the cookie named token // what will happen after clearing the cookie? the user will be logged out

    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user); // req.user is coming from the authorize middleware // what will happen after finding the user? we will send the user data to the client // why not doing User.findOne({email}) ? because we don't have the email in the req.user // why? because we are not sending the email in the payload when creating the token // why? because we don't want to send the email to the client

    if (!user) {
      res.json({ success: false, error: "User does not exist" });
    } else {
      const { password: pass, ...rest } = user._doc;
      res.json({ success: true, user: rest });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const updateDetails = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    let user = await User.findById(req.user);
    if (!user) {
      res.json({ success: false, error: "User does not exist" });
    } else {
      let exists = await User.findOne({ email });
      if (exists && exists._id.toString() !== user._id.toString()) {
        // checks if the email exists and it is not the user's email
        res.json({
          success: false,
          error: "Email already exists by another user",
        });
      } else {
        user.name = name;
        user.email = email;
        user.age = age;
        await user.save();

        const { password: pass, ...rest } = user._doc;
        res.json({ success: true, user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let user = await User.findById(req.user);
    if (!user) {
      res.json({ success: false, error: "User does not exist" });
    } else {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        res.json({ success: false, error: "Invalid credentials" });
      } else {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        const { password: pass, ...rest } = user._doc;
        res.json({ success: true, user: rest });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user });
    if (!user) {
      res.json({ success: false, error: "User does not exist" });
    } else {
      const todos = await Todo.find({ user: req.user });
      if (todos.length > 0) {
        await Todo.deleteMany({ user: req.user }); // delete all the todos that belong to the user
      }
      res.clearCookie("token");
      await user.deleteOne();
      res.json({ success: true, message: "User deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
