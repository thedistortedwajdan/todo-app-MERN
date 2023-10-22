import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  deleteUser,
  updateDetails,
  updatePassword,
} from "../controllers/usersController.js";
import authorize from "../middleware/auth.js";
import { validateResults } from "../middleware/validationResults.js";
import {
  validateRegister,
  validateLogin,
  validateUpdateDetails,
  validateUpdatePassword,
} from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validateRegister, validateResults, register);
router.post("/login", validateLogin, validateResults, login);
router.get("/logout", authorize, logout);
router.get("/me", authorize, getMe);
router.put(
  "/updatedetails",
  authorize,
  validateUpdateDetails,
  validateResults,
  updateDetails
);
router.put(
  "/updatepassword",
  authorize,
  validateUpdatePassword,
  validateResults,
  updatePassword
);
router.delete("/delete", authorize, deleteUser);

export default router;
