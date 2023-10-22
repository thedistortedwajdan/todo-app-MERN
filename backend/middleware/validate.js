import { check } from "express-validator";
export const validateRegister = [
  check("name", "Name is required").notEmpty().trim().escape(), // what does .trim do? removes whitespace from both ends of a string // what does .escape do? replaces <, >, &, ', " and / with their corresponding HTML entities
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }), // what does .normalizeEmail do? normalizes the email address // what does normailizing an email mean? it converts the email to lowercase and removes dots from gmail addresses
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
];
export const validateLogin = [
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  check("password", "Password is required").isLength({ min: 6 }),
];
export const validateUpdateDetails = [
  check("name", "Name is required").notEmpty().trim().escape(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
];

export const validateUpdatePassword = [
  check("currentPassword", "Password is required").isLength({ min: 6 }),
  check(
    "newPassword",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

export const validateCreateTodo = [
  check("title", "Title is required").notEmpty().trim().escape(),
  check("description", "Description is required").notEmpty().trim().escape(),
];

export const validateUpdateTodo = [
  check("title", "Title is required").notEmpty().trim().escape(),
  check("description", "Description is required").notEmpty().trim().escape(),
  check("completed", "Completed is required")
    .notEmpty()
    .trim()
    .escape()
    .isBoolean(),
];
