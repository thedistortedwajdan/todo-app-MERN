import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token; // it gets the token from the cookie which is coming from the browser when the user registers or logs in

    if (!token) {
      res.json({ success: false, error: "You need to login first" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //it verifies the token and decodes it to get the user id

      req.user = decoded.user; //it sets the user id to req.user so that we can use it in the next middleware

      next();
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};

export default authorize;
