import { Navigate } from "react-router-dom";

const UnprotectedRoutes = ({ loggedIn, children }) => {
  if (loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default UnprotectedRoutes;
