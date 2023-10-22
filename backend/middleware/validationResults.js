import { validationResult } from "express-validator";
export const validateResults = (req, res, next) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      // if there are errors
      let error = {};
      errors.array().map((err) => (error[err.param] = err.msg)); // it maps through the errors and creates an object of errors
      res.json({ success: false, error: error });
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};
